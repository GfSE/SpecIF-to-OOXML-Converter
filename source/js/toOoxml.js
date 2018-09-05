function toOoxml( specifData, opts ) {
	"use strict";
	// Accepts data-sets according to SpecIF v0.10.4 or v0.11.2 and later.
	// Limitations:
	// - HTML ids are made from resource ids, so multiple reference of a resource results in mutiple occurrences of the same id.
	// - Title links are only correct if they reference objects in the same SpecIF hierarchy (hence, the same xhtml file)

	// Check for missing options:
//	if( !opts ) return;
	if( !opts ) opts = {};
	if( !opts.headingProperties ) opts.headingProperties = ['SpecIF:Heading','ReqIF.ChapterName','Heading','Überschrift'];
	if( !opts.titleProperties ) opts.titleProperties = ['dcterms:title','DC.title','ReqIF.Name','Title','Titel'];
	if( !opts.descriptionProperties ) opts.descriptionProperties = ['dcterms:description','DC.description','SpecIF:Diagram','ReqIF.Text','Description','Beschreibung'];
	// If a hidden property is defined with value, it is suppressed only if it has this value;
	// if the value is undefined, the property is suppressed in all cases.
	if( !opts.hiddenProperties ) opts.hiddenProperties = [];
	if( !opts.stereotypeProperties ) opts.stereotypeProperties = ['SpecIF:Stereotype'];	
	// If no lable is provided, the respective properties are skipped:
	if( !opts.propertiesLabel ) opts.propertiesLabel = 'Properties';	
	if( !opts.statementsLabel ) opts.statementsLabel = 'Statements';	
	if( !opts.titleLinkBegin ) opts.titleLinkBegin = '\\[\\[';		// must escape javascript AND RegExp
	if( !opts.titleLinkEnd ) opts.titleLinkEnd = '\\]\\]';			// must escape javascript AND RegExp
	if( opts.titleLinkMinLength==undefined ) opts.titleLinkMinLength = 3;	
	opts.addTitleLinks = opts.titleLinkBegin && opts.titleLinkEnd && opts.titleLinkMinLength>0;
	if( opts.titleLinkBegin && opts.titleLinkEnd )
		opts.RETitleLink = new RegExp( opts.titleLinkBegin+'(.+?)'+opts.titleLinkEnd, 'g' );
	
	switch( specifData.specifVersion ) {
		case '0.10.3':
			var rClasses = 'resourceTypes',
				sClasses = 'statementTypes',
				pClasses = 'propertyTypes',
				rClass = 'resourceType',				
				sClass = 'statementType',
				pClass = 'propertyType';
			break;
		case '0.10.4':
			var rClasses = 'resourceClasses',
				sClasses = 'statementClasses',
				pClasses = 'propertyClasses',
				rClass = 'class';
				sClass = 'class'
				pClass = 'class';
			break
	};
	
	// All required parameters are available, so we can begin.
	var ooxml = {
			headings: [],
			sections: [],		// a xhtml file per SpecIF hierarchy
			images: []
		};
	
	var hyperlinkID = 0; 		//variable to count up w:id for hyperlinks
//	var imageIDcount = 7; 		//variable to count up rId for pictures
	
	// The first section is a xhtml-file with the title page:
	ooxml.sections.push(
		ooxmlOf( 
			null,
			specifData.title,
			'<div class="title">'+specifData.title+'</div>'
		)
		
	)
//	console.debug('sections push',ooxml.sections.push);
	
	// For each SpecIF hierarchy a xhtml-file is created and returned as subsequent sections:
	let firstHierarchySection = ooxml.sections.length;  // index of the next section number
	for( var h=0,H=specifData.hierarchies.length; h<H; h++ ) {
		ooxml.sections.push(
			ooxmlOf( 
				specifData.hierarchies[h].id,			
				specifData.hierarchies[h].title,			
				paragraphOf( specifData.hierarchies[h], 1 )	
			)
		)
	};

//    console.debug('ooxmlinhalt',ooxml);
	return ooxml
	
function pushHeading( t, pars ) {
		ooxml.headings.push({
				id: pars.nodeId,
				title: t,
				section: ooxml.sections.length,  // the index of the section in preparation (before it is pushed)
				level: pars.level
		})
	}	
	
	// ---------------
	function titleValOf( r, rC, opts ) {
		// get the title value of the properties:
		if( r.properties ) {
			let pr=null;
			for( var a=0,A=r.properties.length; a<A; a++ ) {
				pr = r.properties[a];
				rC.isHeading = rC.isHeading || opts.headingProperties.indexOf(pr.title)>-1;
				if( opts.headingProperties.indexOf(pr.title)>-1
					|| opts.titleProperties.indexOf(pr.title)>-1 ) {
						return pr.value
				}
			}
		};
		// ... or take the resource's title, if there is no title property:
		return r.title
	}
	function titleOf( r, rC, pars, opts ) { // resource, resourceClass, parameters, options
		// liefert den Titel der Ressource
		let ic = rC.icon;
		if( ic==undefined ) ic = '';
		if( ic ) ic += '&#160;'; // non-breakable space
		let ti = titleValOf( r, rC, opts );
		if( !pars || pars.level<1 ) return  (ti?ic+ti:'');  // Rückgabe als Rohtext
/*		if( !pars || pars.level<1 ) return	'	<w:p w:rsidR="002676EC" w:rsidRDefault="002676EC" w:rsidP="00997056">	'
		+	'	                        <w:pPr>	'
		+	'	                            <w:rPr>	'
		+	'	                                <w:lang w:val="en-US" />	'
		+	'	                            </w:rPr>	'
		+	'	                        </w:pPr>	'
		+	'	                        <w:proofErr w:type="spellStart" />	'
		+	'	                        <w:r w:rsidRPr="002676EC">	'
		+	'	                            <w:rPr>	'
		+	'	                                <w:lang w:val="en-US" />	'
		+	'	                            </w:rPr>	'
		+	'	                            <w:t>'+(ti?ic+ti:'')+'</w:t>	'
		+	'	                        </w:r>	'
		+	'	                        <w:r w:rsidR="00997056">	'
		+	'	                            <w:rPr>	'
		+	'	                                <w:lang w:val="en-US" />	'
		+	'	                            </w:rPr>	'
		+	'	                            <w:t>Standard</w:t>	'
		+	'	                        </w:r>	'
		+	'	                        <w:proofErr w:type="spellEnd" />	'
		+	'	                    </w:p>	'
*/

// andernfalls Rückgabe als Kapitelüberschrift:
		let h = rC.isHeading?2:3;
//		return '<h'+h+' id="'+pars.nodeId+'">'+(ti?ic+ti:'')+'</h'+h+'>'
		hyperlinkID++;
//		console.debug('hyperlinkID',hyperlinkID);
		return '<w:p w:rsidR="00932176" w:rsidRPr="00997056" w:rsidRDefault="00932176" w:rsidP="00997056">'
                +        '<w:pPr>'
                +            '<w:pStyle w:val="berschrift'+h+'" />'
                +        '</w:pPr>'
				+		 '<w:bookmarkStart w:id="'+(hyperlinkID-1)+'" w:name="_'+pars.nodeId+'"/>'
				+		 '<w:bookmarkEnd w:id="'+(hyperlinkID-1)+'"/>'
                +        '<w:r w:rsidRPr="00997056">'
//              +            '<w:t>'+h+' id="'+pars.nodeId+'" '+(ti?ic+ti:'')+'</w:t>'
				+            '<w:t>'+(ti?ic+ti:'')+'</w:t>'
                +        '</w:r>'
                +    '</w:p>'

	}	
	
	function statementsOf( r, opts ) {
		if( !opts.statementsLabel ) return '';
		let i, I, sts={}, st, cl, cid, oid, sid, ct='', r2, noSts=true;
		// Collect statements by type:
		for( i=0, I=specifData.statements.length; i<I; i++ ) {		// alle Relationen = Statements
			st = specifData.statements[i];
			cid = st[sClass];			// id der Klasse von st
			// SpecIF v0.10.x: subject/object without revision, v0.11.y: with revision
			sid = st.subject.id || st.subject;
			oid = st.object.id || st.object;
//			console.debug(st,cid);
			if( sid==r.id || oid==r.id ) {    // nur Relationen mit der betreffenden Ressource st
				noSts = false;
				if( !sts[cid] ) sts[cid] = {subjects:[],objects:[]};
				if( sid==r.id ) sts[cid].objects.push( itemById(specifData.resources,oid) )
				else sts[cid].subjects.push( itemById(specifData.resources,sid) )
			}
		};
//		console.debug( 'statements', r.title, sts );
//		if( Object.keys(sts).length<1 ) return '';
		if( noSts ) return '';
/*		ct = '<w:p w:rsidR="00BC2601" w:rsidRPr="00E5017E" w:rsidRDefault="00E5017E" w:rsidP="00E5017E"><w:r><w:t>'+opts.statementsLabel+'</w:t></w:r></w:p>';
		ct += '<w:tbl><w:tblPr><w:tblStyle w:val="Tabellenraster"/><w:tblW w:w="0" w:type="auto"/><w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr><w:tblGrid><w:gridCol w:w="3020"/><w:gridCol w:w="3021"/><w:gridCol w:w="3021"/></w:tblGrid>';
		for( cid in sts ) {
			// we don't have (and don't need) the individual statement, just the class:
			cl = itemById(specifData[sClasses],cid);   // Suche die Klasse der betreffenden Relation
			// table with 3 columns:		
			if( sts[cid].subjects.length>0 ) {
				ct += '<w:tr w:rsidR="006438EE" w:rsidTr="006438EE"><w:tc><w:tcPr><w:tcW w:w="3020" w:type="dxa"/></w:tcPr><w:p w:rsidR="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:r><w:t>';
				for( i=0, I=sts[cid].subjects.length; i<I; i++ ) {
					r2 = sts[cid].subjects[i];
	//				console.debug('r2',r2,itemById( specifData[rClasses], r2[rClass]))
	//				ct += '%%a href="'+anchorOf( r2 )+'"%%'+titleOf( r2, itemById( specifData[rClasses], r2[rClass]), null, opts )+'%%/a%%%%br/%%'
					ct += '%hl% '+titleOf( r2, itemById( specifData[rClasses], r2[rClass]), null, opts )+' %/hl%'+'</w:t></w:r></w:p><w:p w:rsidR="00C90706" w:rsidRDefault="00C90706" w:rsidP="006438EE"><w:r><w:t>'
				};
				ct += '</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="3020" w:type="dxa"/></w:tcPr><w:p w:rsidR="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:r><w:t>'+cl.title;
				ct += '</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="3020" w:type="dxa"/></w:tcPr><w:p w:rsidR="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:r><w:t>'+titleOf( r, itemById(specifData[rClasses],r[rClass]), null, opts );
				ct += '</w:t></w:r></w:p></w:tc></w:tr>'
			};
			if( sts[cid].objects.length>0 ) {
				ct += '<w:tr w:rsidR="006438EE" w:rsidTr="006438EE"><w:tc><w:tcPr><w:tcW w:w="2929" w:type="dxa"/></w:tcPr><w:p w:rsidR="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:r><w:t>'+titleOf( r, itemById(specifData[rClasses],r[rClass]), null, opts );
				ct += '</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="3020" w:type="dxa"/></w:tcPr><w:p w:rsidR="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:r><w:t>'+cl.title+'</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2266" w:type="dxa"/></w:tcPr><w:p w:rsidR="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:r><w:t>';
				for( i=0, I=sts[cid].objects.length; i<I; i++ ) {
					r2 = sts[cid].objects[i];
	//				ct += '%%a href="'+anchorOf( r2 )+'"%%'+titleOf( r2, itemById( specifData[rClasses], r2[rClass]), null, opts )+'%%/a%%%%br/%%'
					ct += '%hl% '+titleOf( r2, itemById( specifData[rClasses], r2[rClass]), null, opts )+' %/hl%'+'</w:t></w:r></w:p><w:p w:rsidR="00C90706" w:rsidRDefault="00C90706" w:rsidP="006438EE"><w:r><w:t>'
				};
				ct += '</w:t></w:r></w:p></w:tc></w:tr>'
			}
/*			ct = ct.replace( /((<w:p[\s\S]*?>)|(<w:p[\s\S]*?>))*(%hl% ([\s\S]*?) %\/hl%)(<\/w:t>[\s]*<\/w:r>[\s]*<\/w:p>)/g,   
				function( $0, $1, $2, $3 , $4, $5) {
					var s0 = $0
					s0 = s0.replace(/
					var s1 = $1
					var s2 = $2
					var s3 = $3
					var s4 = $4
					var s5 = $5
					
					}
				)
			)	
*/

		ct = '<w:p w:rsidR="00BC2601" w:rsidRPr="00E5017E" w:rsidRDefault="00E5017E" w:rsidP="00E5017E"><w:r><w:t>'+opts.statementsLabel+'</w:t></w:r></w:p>';
		ct += '<w:tbl><w:tblPr><w:tblStyle w:val="Tabellenraster"/><w:tblW w:w="0" w:type="auto"/><w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr><w:tblGrid><w:gridCol w:w="3020"/><w:gridCol w:w="3021"/><w:gridCol w:w="3021"/></w:tblGrid>';
		for( cid in sts ) {
			// we don't have (and don't need) the individual statement, just the class:
			cl = itemById(specifData[sClasses],cid);

			// 3 columns:
			if( sts[cid].subjects.length>0 ) {
				ct += '<w:tr w:rsidR="006438EE" w:rsidTr="006438EE"><w:tc><w:tcPr><w:tcW w:w="3020" w:type="dxa"/></w:tcPr>';
				for( i=0, I=sts[cid].subjects.length; i<I; i++ ) {
					r2 = sts[cid].subjects[i];
	//				console.debug('r2',r2,itemById( specifData[rClasses], r2[rClass]))
					ct += '<w:p w:rsidR="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:hyperlink w:anchor="_'+anchorOf( r2 )+'"><w:r><w:rPr><w:rStyle w:val="Hyperlink"/></w:rPr><w:t>'+titleOf( r2, itemById( specifData[rClasses], r2[rClass]), null, opts )+'</w:t></w:r></w:hyperlink></w:p>';
				};
				ct += '</w:tc><w:tc><w:tcPr><w:tcW w:w="3020" w:type="dxa"/></w:tcPr><w:p w:rsidR="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:r><w:t>'+cl.title+'</w:t></w:r></w:p></w:tc>';
				ct += '<w:tc><w:tcPr><w:tcW w:w="3020" w:type="dxa"/></w:tcPr><w:p w:rsidR="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:r><w:t>'+titleOf( r, itemById(specifData[rClasses],r[rClass]), null, opts )+'</w:t></w:r></w:p></w:tc>';
				ct += '</w:tr>'
			};
			
			if( sts[cid].objects.length>0 ) {
				ct += '<w:tr w:rsidR="006438EE" w:rsidTr="006438EE"><w:tc><w:tcPr><w:tcW w:w="2929" w:type="dxa"/></w:tcPr><w:p w:rsidR="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:r><w:t>'+titleOf( r, itemById(specifData[rClasses],r[rClass]), null, opts )+'</w:t></w:r></w:p></w:tc>';
				ct += '<w:tc><w:tcPr><w:tcW w:w="3020" w:type="dxa"/></w:tcPr><w:p w:rsidR="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:r><w:t>'+cl.title+'</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="3020" w:type="dxa"/></w:tcPr>';
				for( i=0, I=sts[cid].objects.length; i<I; i++ ) {
					r2 = sts[cid].objects[i];
					ct += '<w:p w:rsidR="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:hyperlink w:anchor="_'+anchorOf( r2 )+'"><w:r><w:rPr><w:rStyle w:val="Hyperlink"/></w:rPr><w:t>'+titleOf( r2, itemById( specifData[rClasses], r2[rClass]), null, opts )+'</w:t></w:r></w:hyperlink></w:p>';
				};
				ct += '</w:tc></w:tr>'
			}
			
		};
			
//		console.debug('ct',ct);
		return ct + '</w:tbl>'
		
	}
	
	function anchorOf( res ) {
		// Find the hierarchy node id for a given resource;
		// the first occurrence is returned:
		let m=null, M=null, y=null, n=null, N=null, ndId=null;
		for( m=0, M=specifData.hierarchies.length; m<M; m++ ) {
			// for all hierarchies starting with the current one 'h':
			y = (m+h) % M; 
//			console.debug( 'nodes', m, y, specifData.hierarchies );
			if( specifData.hierarchies[y].nodes )
				for( n=0, N=specifData.hierarchies[y].nodes.length; n<N; n++ ) {
					ndId = ndByRef( specifData.hierarchies[y].nodes[n] );
//					console.debug('ndId',n,ndId);
					if( ndId ) return ndId		// return node id
				}
		};
		return null;	// not found
		
		function ndByRef( nd ) {
			let ndId=null;
			if( nd.resource==res.id ) return nd.id;
			//			if( nd.resource==res.id ) return 'sect'+(y+firstHierarchySection)+'.xhtml#'+nd.id;  // fully qualified anchor including filename
			if( nd.nodes )
				for( var t=0, T=nd.nodes.length; t<T; t++ ) {
					ndId = ndByRef( nd.nodes[t] );
	//				console.debug('ndId2',n,ndId);
					if( ndId ) return ndId
				};
			return null
		}
	}
	function propertiesOf( r, rC, opts ) {
		// return the values of all resource's properties as ooxml:
		if( !r.properties || r.properties.length<1 ) return '';
		// return the content of all properties, sorted by description and other properties:
		let a=null, A=null, c1='', c2='', hPi=null, rt=null;
		for( a=0,A=r.properties.length; a<A; a++ ) {
			rt = r.properties[a].title;
			// The content of the title property is already used as chapter title; so skip it here:
			if( opts.headingProperties.indexOf(rt)>-1
				|| opts.titleProperties.indexOf(rt)>-1 ) continue;
			// First the resource's description properties in full width:
			if( r.properties[a].value
				&& opts.descriptionProperties.indexOf(rt)>-1 ) {
				c1 += valOf( r.properties[a] )
//				console.debug('valOfProp',c1);
			}
		};
		// Skip the remaining properties, if no label is provided:
		if( !opts.propertiesLabel ) return c1;
		
		// Finally, list the remaining properties with property title (name) and value:
		for( a=0,A=r.properties.length; a<A; a++ ) {
			rt = r.properties[a].title;
			hPi = indexBy(opts.hiddenProperties,'title',rt);
//			console.debug('hPi',hPi);
//			console.debug('rt',rt);
//			console.debug('propVal',r.properties[a].value);
			if( opts.hideEmptyProperties && isEmpty(r.properties[a].value)
				|| hPi>-1 && ( opts.hiddenProperties[hPi].value==undefined || opts.hiddenProperties[hPi].value==r.properties[a].value )
				|| opts.headingProperties.indexOf(rt)>-1
				|| opts.titleProperties.indexOf(rt)>-1 
				|| opts.descriptionProperties.indexOf(rt)>-1 ) continue;
//			c2 += '<tr><td class="propertyTitle">'+rt+'</td><td>'+valOf( r.properties[a] )+'</td></tr>'
// 			Inner table
			c2 += '<w:tr w:rsidR="00E266C5" w:rsidTr="00E35BF5">'			//Beginning first line of the table
				+			'<w:tc>'
				+				'<w:tcPr>'
				+					'<w:tcW w:w="4531" w:type="dxa"/>'
				+				'</w:tcPr>'
				+				'<w:p w:rsidR="00E266C5" w:rsidRDefault="000E6D0F" w:rsidP="00E35BF5">'		//1. Column
				+					'<w:r><w:t>'+rt+'</w:t></w:r></w:p></w:tc>'
				+				'<w:tc>'																	//2. Column
				+				'<w:tcPr>'
				+					'<w:tcW w:w="4531" w:type="dxa"/>'
				+				'</w:tcPr>'
				+				'<w:p w:rsidR="00E266C5" w:rsidRDefault="00E266C5" w:rsidP="00E35BF5">'
				+				'<w:r>'
				+					'<w:t>'+valOf( r.properties[a] )+'</w:t></w:r></w:p></w:tc>'
				+	'</w:tr>'
//				console.debug('propertyTable',c2);
		};
		if( !c2 ) return c1; 		//if c2 is empty return c1
		return c1+'<w:p w:rsidR="00E266C5" w:rsidRDefault="00E266C5">'		//else return c1 + propertiesLabel and according c2 table with values
			+			'<w:r>'
			+				'<w:t>'+opts.propertiesLabel+'</w:t>'
			+			'</w:r>'
			+		'</w:p>'
			+		'<w:tbl>'
			+			'<w:tblPr>'
			+				'<w:tblStyle w:val="Tabellenraster"/>'
			+				'<w:tblW w:w="0" w:type="auto"/>'
			+				'<w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/>'
			+			'</w:tblPr>'+c2+'</w:tbl>'

		// ---------------
		function isEmpty( str ) {
			// checks whether str has content or a file reference:
			
//			console.debug('str',str);
			return str.replace(/<[^>]+>/g, '').trim().length<1	// strip HTML and trim
				&& !/<object[^>]+(\/>|>[\s\S]*?<\/object>)/.test(str)
				&& !/<img[^>]+(\/>|>[\s\S]*?<\/img>)/.test(str)
		}
		function fileRef( txt, opts ) {
			if( !opts ) return txt;
	//		if( opts.rev==undefined ) opts.rev = 0;
			if( opts.imgExtensions==undefined ) opts.imgExtensions = [ 'png', 'jpg', 'svg', 'gif', 'jpeg' ];
	//		if( opts.clickableElements==undefined ) opts.clickableElements = false;
			
				function addEpubPath( u ) {
					return opts.epubImgPath+withoutPath( u )
				}
				function getType( str ) {
					var t = /type="([^"]+)"/.exec( str );
					if( t==null ) return '';
					return (' '+t[1])
				}
/*				function getStyle( str ) {
					var s = /(style="[^"]+")/.exec( str );
					if( s==null ) return '';  
					return (' '+s[1])
				}
*/				function getUrl( str ) {
					// get the URL:
					var l = /(href|data)="([^"]+)"/.exec( str );  // url in l[2]
					// return null, because an URL is expected in any case:
					if( l == null ) { return null };    
					// ToDo: Replace any backslashes by slashes ??
					return l[2]
				}
				function withoutPath( str ) {
					str = str.replace('\\','/');
					return str.substring(str.lastIndexOf('/')+1)
				}
				function fileExt( str ) {
					return str.substring( str.lastIndexOf('.')+1 )
				}
				function fileName( str ) {
					str = str.replace('\\','/');
					return str.substring( 0, str.lastIndexOf('.') )
				}
				function pushReferencedFiles( u, t ) {
					// avoid duplicate entries:
					if( indexBy( ooxml.images, 'id', u )<0 ) {
						ooxml.images.push({
							id: u,					// is the distinguishing/relative part of the URL
							title: withoutPath(u),
							mimeType: t
						})
					}
				}

			// Prepare a file reference for viewing and editing:
//			console.debug('fromServer 0: ', txt);
				
			// 1. transform two nested objects to link+object resp. link+image:
			//    Especially OLE-Objects from DOORS are coming in this format; the outer object is the OLE, the inner is the preview image.
			//    The inner object can be a tag pair <object .. >....</object> or comprehensive tag <object .. />.
			//		Sample data from french branch of a japanese car OEM:
			//			<object data=\"OLE_AB_4b448d054fad33a1_23_2100028c0d_28000001c9__2bb521e3-8a8c-484d-988a-62f532b73612_OBJECTTEXT_0.ole\" type=\"text/rtf\">
			//				<object data=\"OLE_AB_4b448d054fad33a1_23_2100028c0d_28000001c9__2bb521e3-8a8c-484d-988a-62f532b73612_OBJECTTEXT_0.png\" type=\"image/png\">OLE Object</object>
			//			</object>
			//		Sample data from ReX:
			//			<object data=\"Tabelle mit WordPics_Partner1/4_Object_Text_0.ole\" type=\"application/oleobject\">\n   
			//				<object data=\"Tabelle mit WordPics_Partner1/4_Object_Text_0.png\" type=\"image/png\">OLE Object</object>\n 
			//			</object>
			//		Sample from ProSTEP ReqIF Implementation Guide:
			//			<xhtml:object data="files/powerpoint.rtf" height="96" type="application/rtf" width="96">
			//				<xhtml:object data="files/powerpoint.png" height="96" type="image/png" 	width="96">
			//					This text is shown if alternative image can't be shown
			//				</xhtml:object>
			//			</xhtml:object>
			txt = txt.replace( /<object([^>]+)>[\s\S]*?<object([^>]+)(\/>|>([\s\S]*?)<\/object>)[\s\S]*?<\/object>/g,   
				function( $0, $1, $2, $3, $4 ) {        // description is $4
					var u1 = getUrl( $1 ),  			// the primary information
//						t1 = getType( $1 ), 
						u2 = getUrl( $2 ), 				// the preview image
//						s2 = getStyle( $2 ), 
						t2 = getType( $2 );
					
					// If there is no description, use the name of the link target:
					if( !$4 ) {
						$4 = u1;   // $4 is now the description between object tags

					};
					
					// if the type is svg, png is preferred and available, replace it:
					let png = itemById( specifData.files, fileName(u2)+'.png' );
					if( t2.indexOf('svg')>-1 && opts.preferPng && png ) {
						u2 = png.id.replace('\\','/');
						t2 = png.mimeType
					} 

					pushReferencedFiles( u2, t2 );
//					console.debug( $0, $4, u1, u2, t2 );
					
					// get the file extension:
					let e = fileExt(u2);
					imageType.push(e);
					
					return 	'	<w:p w:rsidR="00BB24CF" w:rsidRDefault="00BB24CF">				'
						+	'		<w:r>			'
						+	'			<w:pict>		'
						+	'				<v:shape id="_x0000_i1025" type="#_x0000_t75" style="width:453pt;height:264.75pt">	'
						+	'				<v:imagedata r:id="rId'+imageIDcount+'" o:title="'+$4+'"/>	'
						+	'				</v:shape>	'
						+	'			</w:pict>		'
						+	'		</w:r>			'
						+	'	</w:p>				'

/*					return '	<w:p wsp:rsidR="005A3E7D" wsp:rsidRDefault="00F82A01">					'
						+	'		<w:r>				'
						+	'			<w:pict>			'
						+	'				<w:binData w:name="wordml://'+$4+'" xml:space="preserve">		'
						+	' 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 '
						+	'				</w:binData>		'
						+	'				<v:shape id="_x0000_i1026" type="#_x0000_t75" style="width:244.5pt;height:272.25pt">		'
						+	'					<v:imagedata src="wordml://'+$4+'" />	'
						+	'				</v:shape>		'
						+	'			</w:pict>			'
						+	'		</w:r>				'
						+	'	</w:p>					'
*/
//					return'<img src="'+addEpubPath(u2)+'" style="max-width:100%" alt="'+$4+'" />'
//					return'<div class="forImage"><object data="'+addEpubPath(u2)+'"'+t2+s2+' >'+$4+'</object></div>'
				}
			);
//			console.debug('fromServer 1: ', txt);
				
			// 2. transform a single object to link+object resp. link+image:
			//      For example, the ARCWAY Cockpit export uses this pattern:
			//			<object data=\"files_and_images\\27420ffc0000c3a8013ab527ca1b71f5.svg\" name=\"27420ffc0000c3a8013ab527ca1b71f5.svg\" type=\"image/svg+xml\"/>
			txt = txt.replace( /<object([^>]+)(\/>|>([\s\S]*?)<\/object>)/g,   //  comprehensive tag or tag pair
				function( $0, $1, $2, $3 ){ 
					let u1 = getUrl( $1 ), 
//						s1 = getStyle( $1 ), 
						t1 = getType( $1 );

					// get the file extension:
					let e = fileExt(u1);
					if( !e ) return $0

/*					// $3 is the description between the tags <object></object>:
					let d = />([^<]*)<\/object>$/i.exec($2);    	// the description is in d[1]
					if( d && d[1].length ) d = withoutPath( d[1] )	// if there is a description, use it
					else d = withoutPath( u1 );						// use the target name, otherwise
*/					let d = withoutPath( $3 || u1 );
						
//					let hasImg = true;
					e = e.toLowerCase();
//					console.debug( $0, $1, 'url: ', u1, 'ext: ', e );
						
					let png = itemById( specifData.files, fileName(u1)+'.png' );
					
					if( opts.imgExtensions.indexOf( e )>-1 ) {  
						// it is an image, show it:
						
						imageIDcount++;		//count up image ID
						
						// if the type is svg, png is preferred and available, replace it:
						if( t1.indexOf('svg')>-1 && opts.preferPng && png ) {
							u1 = png.id.replace('\\','/');
							t1 = png.mimeType
						};
						pushReferencedFiles( u1, t1 );
						
						d = '	<w:p w:rsidR="00BB24CF" w:rsidRDefault="00BB24CF">				'
						+	'		<w:r>			'
						+	'			<w:pict>		'
						+	'				<v:shape id="_x0000_i1026" type="#_x0000_t75" style="width:222pt;height:57.75pt">	'
						+	'				<v:imagedata r:id="rId'+imageIDcount+'" o:title="'+d+'"/>	'
						+	'				</v:shape>		'
						+	'			</w:pict>		'
						+	'		</w:r>			'
						+	'	</w:p>			'
//						d = '<img src="'+addEpubPath(u1)+'" style="max-width:100%" alt="'+d+'" />'
//						console.debug('d1', d);
						//						d = '<object data="'+addEpubPath(u1)+'"'+t1+s1+' >'+d+'</object>
						
						imageType.push(e);
						
						
					} else {
						
						imageIDcount++;		//count up image ID
						
						if( e=='ole' && png ) {  
							// It is an ole-file, so add a preview image;
							u1 = png.id.replace('\\','/');
							t1 = png.mimeType;
							pushReferencedFiles( u1, t1 );
							
							d = '	<w:p w:rsidR="00BB24CF" w:rsidRDefault="00BB24CF">				'
						+	'		<w:r>			'
						+	'			<w:pict>		'
						+	'				<v:shape id="_x0000_i1026" type="#_x0000_t75" style="width:222pt;height:57.75pt">	'
						+	'				<v:imagedata r:id="rId'+imageIDcount+'" o:title="'+d+'"/>	'
						+	'				</v:shape>		'
						+	'			</w:pict>		'
						+	'		</w:r>			'
						+	'	</w:p>			'
//							console.debug('d2', d);
//							d = '<img src="'+addEpubPath(u1)+'" style="max-width:100%" alt="'+d+'" />'
//							d = '<object data="'+addEpubPath( fileName(u1) )+'.png" type="image/png" >'+d+'</object>'
						} else {
							// in absence of an image, just show the description:
//							hasImg = false;
//							d = '<span>'+d+'</span>'  
							d = '<w:p w:rsidR="00BC2601" w:rsidRPr="00E5017E" w:rsidRDefault="00E5017E" w:rsidP="00E5017E">'
									'<w:r>'
										'<w:t>'+d+'</w:t>'
									'</w:r>'
								'</w:p>';
						}
						imageType.push(e);
					};
//					console.debug('imageType',imageType);
//					if( hasImg )
//						return '<span class="forImage">'+d+'</span>'
//					else
	
//					console.debug('d',d);
						return d
				}
			);
/*
 
Recoginze the following html tags and replace them to see differences and remainig tags better
<p></p>             ->      %abs% %/abs%
<div></div>         ->      %cont% %/cont%
<li></li>           ->      %lst% %/lst%
<ul></ul>           ->      %ulst% %ulst%
<th></th>           ->      %tkpf% %/tkpf%
<tr></tr>           ->      %trei% %/trei%
<td></td>           ->      %tzel% %/tzel%
<table></table>     ->      %tab% %/tab%
<tbody></tbody>     ->      %tkoe% %/tkoe%
<img([\s\S]+?)>     ->      %img%
<a



txt = txt.replace(/<p[\s\S]*?>/g,'%abs%');         txt = txt.replace(/<\/p>/g,'%/abs%');
txt = txt.replace(/<div[\s\S]*?>/g,'%cont%');      txt = txt.replace(/<\/div>/g,'%/cont%');
txt = txt.replace(/<li>/g,'%lst%');                txt = txt.replace(/<\/li>/g,'%/lst%');
txt = txt.replace(/<ul>/g,'%ulst%');               txt = txt.replace(/<\/ul>/g,'%/ulst%');
txt = txt.replace(/<th>/g,'%tkpf%');               txt = txt.replace(/<\/th>/g,'%/tkpf%');
txt = txt.replace(/<tr>/g,'%trei%');               txt = txt.replace(/<\/tr>/g,'%/trei%');
txt = txt.replace(/<td>/g,'%tzel%');               txt = txt.replace(/<\/td>/g,'%/tzel%');
txt = txt.replace(/<table[\s\S]*?>/g,'%tab%');     txt = txt.replace(/<\/table>/g,'%/tab%');
txt = txt.replace(/<tbody>/g,'%tkoe%');            txt = txt.replace(/<\/tbody>/g,'%/tkoe%');
txt = txt.replace(/<img([\s\S]+?)>/g,'%img%');

*/

// Bilder werden vorerst entfernt
//txt = txt.replace(/<div class="forImage" style="max-width: [0-9]{3}px;"[\s\S]*?>[\s]*<img src=".+?(?=\")"[\s\S]*?style="max-width:[0-9]{3}%"[\s\S]*?alt=".+?(?=\")"[\s\S]*?\/>[\s]*<\/div>/g,''); 
txt = txt.replace(/<div class="forImage" style="max-width: [0-9]{3}px;"[\s\S]*?>/g,'');
txt = txt.replace(/<img[\s\S]+?>/g,'');

// leere Container entfernen
txt = txt.replace(/<div> <\/div>|<div\/>/g,'');
// alle Container <div> / </div> entfernen
txt = txt.replace(/<div>|<\/div>/g,'');
// alle Zeilen umwandeln
txt = txt.replace(/<p\/>/g,'<w:p w:rsidRDefault="00F717F9" w:rsidP="00F717F9"><w:pPr><w:rPr><w:lang w:val="en-US" /></w:rPr></w:pPr><w:r><w:rPr><w:lang w:val="en-US" /></w:rPr><w:t/></w:r></w:p>');
txt = txt.replace(/<p[\s\S]*?>/g,'<w:p w:rsidRDefault="00F717C9" w:rsidP="00F717F9"><w:pPr><w:rPr><w:lang w:val="en-US" /></w:rPr></w:pPr><w:r><w:rPr><w:lang w:val="en-US" /></w:rPr><w:t>');
// hiermit wird <p>, <p class xxx> gefunden und ersetzt
txt = txt.replace(/<\/p>/g,'</w:t></w:r></w:p>');
// Aufzählungen filtern und umwandeln
txt = txt.replace(/<ul>|<\/ul>/g,'');
txt = txt.replace(/<li>/g,'<w:p w:rsidR="000C0D2D" w:rsidRPr="00335752" w:rsidRDefault="00FB4B48" w:rsidP="00FB4B48"><w:pPr><w:pStyle w:val="Listenabsatz"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr><w:rPr><w:lang w:val="en-US"/></w:rPr></w:pPr><w:bookmarkStart w:id="0" w:name="_GoBack"/><w:r w:rsidRPr="00335752"><w:rPr><w:lang w:val="en-US"/></w:rPr><w:t>');
txt = txt.replace(/<\/li>/g,'</w:t></w:r></w:p>');
// Leerzeilen entfernen

txt = txt.replace(/<br \/>/g,'');

// Tabellen umwandeln
// head
txt = txt.replace(/<table class="stdInlineWithBorder"> <tbody>/g,'<w:tbl><w:tblPr><w:tblStyle w:val="Tabellenraster"/><w:tblW w:w="0" w:type="auto"/><w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr>');
// Tabellenkopf
txt = txt.replace(/<th>/g,'<w:tc><w:tcPr><w:tcW w:w="2265" w:type="dxa"/></w:tcPr><w:p w:rsidR="006438EE" w:rsidRPr="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:pPr><w:rPr><w:b/></w:rPr></w:pPr><w:r w:rsidRPr="006438EE"><w:rPr><w:b/></w:rPr><w:t>');
txt = txt.replace(/<\/th>/g,'</w:t></w:r></w:p></w:tc>');
// Zeilen
txt = txt.replace(/<tr>/g,'<w:tr w:rsidR="006438EE" w:rsidTr="006438EE">');
txt = txt.replace(/<\/tr>/g,'</w:tr>');
// Felder
txt = txt.replace(/<td>/g,'<w:tc><w:tcPr><w:tcW w:w="3020" w:type="dxa"/></w:tcPr><w:p w:rsidR="006438EE" w:rsidRDefault="006438EE" w:rsidP="006438EE"><w:r><w:t>');
txt = txt.replace(/<\/td>/g,'</w:t></w:r></w:p></w:tc>');
// tail
txt = txt.replace(/<\/tbody><\/table>/g,'</w:tbl>');
		
//			console.debug('fileRef result: ', txt);
			return txt
		}
		
		
		function titleLinks( str, opts ) {
			// Transform sub-strings with dynamic linking pattern to internal links.
			// Syntax:
			// - A resource (object) title between CONFIG.dynLinkBegin and CONFIG.dynLinkEnd will be transformed to a link to that resource.
			// - Icons in front of titles are ignored
			// - Titles shorter than 4 characters are ignored
			// - see: https://www.mediawiki.org/wiki/Help:Links

//			console.debug('*',opts.RETitleLink,str);
			
			// in certain situations, remove the dynamic linking pattern from the text:
			if( !opts.addTitleLinks )
				return str.replace( opts.RETitleLink, function( $0, $1 ) { return $1 } )
				
			// else, find all dynamic link patterns in the current property and replace them by a link, if possible:
			let replaced = null;
			do {
				replaced = false;
				str = str.replace( opts.RETitleLink, 
					function( $0, $1 ) { 
						replaced = true;
//						if( $1.length<opts.titleLinkMinLength ) return $1;
						let m=$1.toLowerCase(), cO=null, ti=null;
						// is ti a title of any resource?
						for( var x=specifData.resources.length-1;x>-1;x-- ) {
							cO = specifData.resources[x];
										
							// avoid self-reflection:
//							if(ob.id==cO.id) continue;

							// disregard resources which are not referenced in the current tree (selected spec):
//	??						if( myProject.selectedSpec.objectRefs.indexOf(cO.id)<0 ) continue;

							// get the pure title text:
							ti = titleValOf( cO, itemById( specifData[rClasses], cO[rClass] ), opts );
							//	console.debug('title',ti);
							
							// disregard objects whose title is too short:
							if( !ti || ti.length<opts.titleLinkMinLength ) continue;

							// if the titleLink content equals a resource's title, replace it with a link:
//							console.debug('anchorOf(cO)',anchorOf(cO));
//							if(m==ti.toLowerCase()) return '%%a href="'+anchorOf(cO)+'"%%'+$1+'%%/a%%'
							if(m==ti.toLowerCase()) return '</w:t></w:r><w:r w:rsidR="009C59AE"><w:t xml:space="preserve"> </w:t></w:r>'
															+'<w:hyperlink w:anchor="_'+$1+'" w:history="1"><w:r w:rsidRPr="000E1FEF"><w:rPr><w:rStyle w:val="Hyperlink"/></w:rPr><w:t>'
															+$1
															+'</w:t></w:r></w:hyperlink><w:r w:rsidR="00D06029"><w:t>'
							/* link incomplete at the moment
							
							need to mark the heading with
							<w:bookmarkStart w:id="1" w:name="_HEADING"/>
							<w:bookmarkEnd w:id="1"/>
							<w:r w:rsidRPr="00997056">
								<w:t>HEADING</w:t>
							<w:bookmarkEnd w:id="0"/>	
							*/
							};
						// The dynamic link has NOT been matched/replaced, so mark it:
						return '</w:t></w:r><w:p w:rsidR="00C00F3A" w:rsidRPr="00B43A41" w:rsidRDefault="00C00F3A" w:rsidP="00222307"><w:pPr><w:rPr><w:color w:val="FF0000"/></w:rPr></w:pPr><w:r w:rsidRPr="00B43A41"><w:rPr><w:color w:val="FF0000"/></w:rPr><w:t>'+$1+'</w:t></w:r>'
					}
				)
			} while( replaced );
			return str
		}
		function valOf( pr ) {
			// return the value of a single property:
//			console.debug('#',rC,pr,rClass);
			let dT = dataTypeOf(specifData.dataTypes, rC, pr[pClass] );
			switch( dT.type ) {
				case 'xs:enumeration':
					let ct = '',
						val = null,
						st = opts.stereotypeProperties.indexOf(pr.title)>-1,
						vL = pr.value.split(',');  // in case of ENUMERATION, content carries comma-separated value-IDs
					for( var v=0,V=vL.length;v<V;v++ ) {
						val = itemById(dT.values,vL[v].trim());
						// If 'val' is an id, replace it by title, otherwise don't change:
						// Add 'double-angle quotation' in case of stereotype values.
						if( val ) ct += (v==0?'':', ')+(st?('&#x00ab;'+val.title+'&#x00bb;'):val.title)
						else ct += (v==0?'':', ')+vL[v]
					};
					return ct;
				case 'xhtml':
					return titleLinks( fileRef( pr.value, opts ), opts )
				case 'xs:string':
					return titleLinks( pr.value, opts )
				default:
					return pr.value
			}
		}
	}
	function paragraphOf( nd, lvl ) {
		// For each of the children of specified hierarchy node 'nd', 
		// write a paragraph for the referenced resource:
//		console.debug( nd, lvl )
		if( !nd.nodes || nd.nodes.length<1 ) return '';
		let i=null, I=null, r=null, rC=null,
			params={
				level: lvl
			};
		var ch = '';
		for( i=0,I=nd.nodes.length; i<I; i++ ) {
			r = itemById( specifData.resources,nd.nodes[i].resource );  // suche Objekt zur Referenz im Baum - resource
			rC = itemById( specifData[rClasses], r[rClass] );			// suche Klasse des referenzierten Objekts - resourceClass
			params.nodeId = nd.nodes[i].id;
			ch += 	titleOf( r, rC, params, opts )
 				+	propertiesOf( r, rC, opts )
				+	statementsOf( r, opts )
				+	paragraphOf( nd.nodes[i], lvl+1 )					// rekursiv für den Unterbaum - Chapter
		};
//		console.debug( 'ch', ch )
				return ch
	}
	function ooxmlOf( sectId, sectTitle, body ) {
		// make a ooxml file from the content provided,
		// this is the frame of the file:
		let v1 = sectId?' id="'+sectId+'"':'';
		let v3 = body? body:'';
		return (v3)
		}


	function itemById(L,id) {
		if(!L||!id) return undefined;
		// given the ID of an element in a list, return the element itself:
//		id = id.trim();
		for( var i=L.length-1;i>-1;i-- )
			if( L[i].id === id ) return L[i];   // return list item
		return undefined
	}
	function indexBy( L, p, s ) {
		if(!L||!p||!s) return -1;
		// Return the index of an element in list 'L' whose property 'p' equals searchterm 's':
		// hand in property and searchTerm as string !
		for( var i=L.length-1;i>-1;i-- )
			if (L[i][p] === s) return i;
		return -1
	}
	function dataTypeOf( dTs, sT, pCid ) {
//		console.debug( dTs, sT, pCid );
		// given an attributeType ID, return it's dataType:
		return itemById( dTs, itemById( sT[pClasses], pCid ).dataType )
		//                    get propertyClass
		//	   get dataType
	}
}
