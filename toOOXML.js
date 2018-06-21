function toOOXML( specifData, opts ) {
	"use strict";
	// Accepts data-sets according to SpecIF v0.10.4 or v0.11.2 and later.
	// Limitations:
	// - HTML ids are made from resource ids, so multiple reference of a resource results in mutiple occurrences of the same id.
	// - Title links are only correct if they reference objects in the same SpecIF hierarchy (hence, the same ooxml file)

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
			headings: [],		// used to build the ePub table of contents
			sections: [],		// a ooxml file per SpecIF hierarchy
			images: []
		};

	// The first section is a xml-file with the title page:
	ooxml.sections.push(
		ooxmlOf(
			specifData.title,
			null,
			null,
			'<div class="title">'+specifData.title+'</div>'
		)
	);

	// For each SpecIF hierarchy a ooxml-file is created and returned as subsequent sections:
	let firstHierarchySection = ooxml.sections.length;  // index of the next section number
	for( var h=0,H=specifData.hierarchies.length; h<H; h++ ) {
		pushHeading( specifData.hierarchies[h].title, {nodeId: specifData.hierarchies[h].id, level: 1} );
		ooxml.sections.push(
			ooxmlOf(
				specifData.title,
				specifData.hierarchies[h].id,
				specifData.hierarchies[h].title,
				paragraphOf( specifData.hierarchies[h], 1 )
			)
		)
	};

//	console.debug('ooxml',ooxml);
	return ooxml

	// ---------------
	function pushHeading( t, pars ) {
		ooxml.headings.push({
				id: pars.nodeId,
				title: t,
				section: ooxml.sections.length,  // the index of the section in preparation (before it is pushed)
				level: pars.level
		})
	}
	function titleValOf( r, rC, opts ) {
		// get the title value of the properties:
		if( r.properties ) {
			let pr=null;
			for( var a=0,A=r.properties.length; a<A; a++ ) {
				pr = r.properties[a];
				rC.isHeading = rC.isHeading || opts.headingProperties.indexOf(pr.title)>-1;
				if( opts.headingProperties.indexOf(pr.title)>-1
					|| opts.titleProperties.indexOf(pr.title)>-1 ) {
						return escapeHTML( pr.value )
				}
			}
		};
		// ... or take the resource's title, if there is no title property:
		return r.title
	}
	function titleOf( r, rC, pars, opts ) { // resource, resourceClass, parameters, options
		let ic = rC.icon;
		if( ic==undefined ) ic = '';
		if( ic ) ic += '&#160;'; // non-breakable space
		let ti =  ( r, rC, opts );
		if( !pars || pars.level<1 ) return (ti?ic+ti:'');
		if( rC.isHeading ) pushHeading( ti, pars );
		let h = rC.isHeading?2:3;
		return '<h'+h+' id="'+pars.nodeId+'">'+(ti?ic+ti:'')+'</h'+h+'>'				// open tag + Heading + ID des Knotens + close tag + ??? + open tag + Heading + close tag
	}

/*	noch nicht relevant

function statementsOf( r, opts ) {
		if( !opts.statementsLabel ) return '';
		let i, I, sts={}, st, cl, cid, oid, sid, ct='', r2, noSts=true;
		// Collect statements by type:
		for( i=0, I=specifData.statements.length; i<I; i++ ) {
			st = specifData.statements[i];
			cid = st[sClass];
			// SpecIF v0.10.x: subject/object without revision, v0.11.y: with revision
			oid = st.object.id || st.object;
			sid = st.subject.id || st.subject;
//			console.debug(st,cid);
			if( sid==r.id || oid==r.id ) {
				noSts = false;
				if( !sts[cid] ) sts[cid] = {subjects:[],objects:[]};
				if( sid==r.id ) sts[cid].objects.push( itemById(specifData.resources,oid) )
				else sts[cid].subjects.push( itemById(specifData.resources,sid) )
			}
		};
//		console.debug( 'statements', r.title, sts );
//		if( Object.keys(sts).length<1 ) return '';
		if( noSts ) return '';
		ct = '<p class="metaTitle">'+opts.statementsLabel+'</p>';
		ct += '<table class="statementTable"><tbody>';
		for( cid in sts ) {
			// we don't have (and don't need) the individual statement, just the class:
			cl = itemById(specifData[sClasses],cid);
/* 
War bereits auskommentiert
			// 5 columns:
			ct += '<tr><td>';
			for( i=0, I=sts[cid].subjects.length; i<I; i++ ) {
				r2 = sts[cid].subjects[i];
//				console.debug('r2',r2,itemById( specifData[rClasses], r2[rClass]))
				ct += '<a href="#'+r2.id+'">'+titleOf( r2, itemById( specifData[rClasses], r2[rClass]), null, opts )+'</a><br/>'
			};
			ct += '</td><td class="statementTitle">'+(sts[cid].subjects.length>0?cl.title:'');
			ct += '</td><td>'+titleOf( r, itemById(specifData[rClasses],r[rClass]), null, opts );
			ct += '</td><td class="statementTitle">'+(sts[cid].objects.length>0?cl.title:'')+'</td><td>';
			for( i=0, I=sts[cid].objects.length; i<I; i++ ) {
				r2 = sts[cid].objects[i];
				ct += '<a href="#'+r2.id+'">'+titleOf( r2, itemById( specifData[rClasses], r2[rClass]), null, opts )+'</a><br/>'
			};
			ct += '</td></tr>'
*/

/*
			// 3 columns:
			if( sts[cid].subjects.length>0 ) {
				ct += '<tr><td>';
				for( i=0, I=sts[cid].subjects.length; i<I; i++ ) {
					r2 = sts[cid].subjects[i];
	//				console.debug('r2',r2,itemById( specifData[rClasses], r2[rClass]))
					ct += '<a href="'+anchorOf( r2 )+'">'+titleOf( r2, itemById( specifData[rClasses], r2[rClass]), null, opts )+'</a><br/>'
				};
				ct += '</td><td class="statementTitle">'+cl.title;
				ct += '</td><td>'+titleOf( r, itemById(specifData[rClasses],r[rClass]), null, opts );
				ct += '</td></tr>'
			};
			if( sts[cid].objects.length>0 ) {
				ct += '<tr><td>'+titleOf( r, itemById(specifData[rClasses],r[rClass]), null, opts );
				ct += '</td><td class="statementTitle">'+cl.title+'</td><td>';
				for( i=0, I=sts[cid].objects.length; i<I; i++ ) {
					r2 = sts[cid].objects[i];
					ct += '<a href="'+anchorOf( r2 )+'">'+titleOf( r2, itemById( specifData[rClasses], r2[rClass]), null, opts )+'</a><br/>'
				};
				ct += '</td></tr>'
			}
		};
		return ct + '</tbody></table>'
	}
*/

/* noch nicht relevant (in statementsOf)

	function anchorOf( res ) {
		// Find the hierarchy node id for a given resource;
		// the first occurrence is returned:
		let m=null, M=null, y=null, n=null, N=null, ndId=null;
		for( m=0, M=specifData.hierarchies.length; m<M; m++ ) {
			// for all hierarchies starting with the current one 'h':
			y = (m+h) % M;
	//		console.debug( 'nodes', m, y, specifData.hierarchies );
			if( specifData.hierarchies[y].nodes )
				for( n=0, N=specifData.hierarchies[y].nodes.length; n<N; n++ ) {
					ndId = ndByRef( specifData.hierarchies[y].nodes[n] );
	//				console.debug('ndId',n,ndId);
					if( ndId ) return ndId		// return node id
				}
		};
		return null;	// not found

		function ndByRef( nd ) {
			let ndId=null;
			if( nd.resource==res.id ) return 'sect'+(y+firstHierarchySection)+'.ooxml#'+nd.id;  // fully qualified anchor including filename
			if( nd.nodes )
				for( var t=0, T=nd.nodes.length; t<T; t++ ) {
					ndId = ndByRef( nd.nodes[t] );
	//				console.debug('ndId2',n,ndId);
					if( ndId ) return ndId
				};
			return null
		}
	}
	
*/	

/* noch nicht relevant

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
			}
		};
		// Skip the remaining properties, if no label is provided:
		if( !opts.propertiesLabel ) return c1;

		// Finally, list the remaining properties with property title (name) and value:
		for( a=0,A=r.properties.length; a<A; a++ ) {
			rt = r.properties[a].title;
			hPi = indexBy(opts.hiddenProperties,'title',rt);
//			console.debug('hPi',hPi,rt,r.properties[a].value);
			if( opts.hideEmptyProperties && isEmpty(r.properties[a].value)
				|| hPi>-1 && ( opts.hiddenProperties[hPi].value==undefined || opts.hiddenProperties[hPi].value==r.properties[a].value )
				|| opts.headingProperties.indexOf(rt)>-1
				|| opts.titleProperties.indexOf(rt)>-1
				|| opts.descriptionProperties.indexOf(rt)>-1 ) continue;
//		c2 += '<tr><td class="propertyTitle">'+rt+'</td><td>'+valOf( r.properties[a] )+'</td></tr>'
			c2 += '<w:tr w:rsidR="000313F5"><w:tc><w:tcPr><w:tcW w:w="2448" w:type="dxa"/></w:tcPr><w:p w:rsidR="000313F5" w:rsidRDefault="005D7890"><w:r><w:t>'+rt+'</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2880" w:type="dxa" /></w:tcPr><w:p w:rsidR="000313F5" w:rsidRDefault="005D7890"><w:r>'+valOf( r.properties[a] )+'</w:t> </w:r></w:p></w:tc></w:tr>'
		};
		if( !c2 ) return c1;
//		return c1+'<p class="metaTitle">'+opts.propertiesLabel+'</p><table class="propertyTable"><tbody>'+c2+'</tbody></table>'
// 		??
		return c1+'<p class="metaTitle">'+opts.propertiesLabel+'</p><w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto" /><w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1" /></w:tblPr>'+c2+'</w:tbl>'


		// ---------------
		function isEmpty( str ) {
			// checks whether str has content or a file reference:
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
//				function getStyle( str ) {
//					var s = /(style="[^"]+")/.exec( str );
//					if( s==null ) return '';
//					return (' '+s[1])
//				}
				function getUrl( str ) {
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
	//		console.debug('fromServer 0: ', txt);

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
			//			<ooxml:object data="files/powerpoint.rtf" height="96" type="application/rtf" width="96">
			//				<ooxml:object data="files/powerpoint.png" height="96" type="image/png" 	width="96">
			//					This text is shown if alternative image can't be shown
			//				</ooxml:object>
			//			</ooxml:object>
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
	//				console.debug( $0, $4, u1, t1, u2, t2 );
					return'<img src="'+addEpubPath(u2)+'" style="max-width:100%" alt="'+$4+'" />'
//					return'<div class="forImage"><object data="'+addEpubPath(u2)+'"'+t2+s2+' >'+$4+'</object></div>'
				}
			);
	//		console.debug('fromServer 1: ', txt);

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

//					// $3 is the description between the tags <object></object>:
//					let d = />([^<]*)<\/object>$/i.exec($2);    	// the description is in d[1]
//					if( d && d[1].length ) d = withoutPath( d[1] )	// if there is a description, use it
//					else d = withoutPath( u1 );						// use the target name, otherwise
  					let d = withoutPath( $3 || u1 );

//					let hasImg = true;
					e = e.toLowerCase();
	//				console.debug( $0, $1, 'url: ', u1, 'ext: ', e );

					let png = itemById( specifData.files, fileName(u1)+'.png' );
					if( opts.imgExtensions.indexOf( e )>-1 ) {
						// it is an image, show it:

						// if the type is svg, png is preferred and available, replace it:
						if( t1.indexOf('svg')>-1 && opts.preferPng && png ) {
							u1 = png.id.replace('\\','/');
							t1 = png.mimeType
						};
						pushReferencedFiles( u1, t1 );
						d = '<img src="'+addEpubPath(u1)+'" style="max-width:100%" alt="'+d+'" />'
//						d = '<object data="'+addEpubPath(u1)+'"'+t1+s1+' >'+d+'</object>
					} else {
						if( e=='ole' && png ) {
							// It is an ole-file, so add a preview image;
							u1 = png.id.replace('\\','/');
							t1 = png.mimeType;
							pushReferencedFiles( u1, t1 );
							d = '<img src="'+addEpubPath(u1)+'" style="max-width:100%" alt="'+d+'" />'
//							d = '<object data="'+addEpubPath( fileName(u1) )+'.png" type="image/png" >'+d+'</object>'
						} else {
							// in absence of an image, just show the description:
//							hasImg = false;
							d = '<span>'+d+'</span>'
						}
					};

//					if( hasImg )
//						return '<span class="forImage">'+d+'</span>'
//					else
						return d
				}
			);
	//		console.debug('fileRef result: ', txt);
			return txt
		}
		function titleLinks( str, opts ) {
			// Transform sub-strings with dynamic linking pattern to internal links.
			// Syntax:
			// - A resource (object) title between CONFIG.dynLinkBegin and CONFIG.dynLinkEnd will be transformed to a link to that resource.
			// - Icons in front of titles are ignored
			// - Titles shorter than 4 characters are ignored
			// - see: https://www.mediawiki.org/wiki/Help:Links

//			console.log('*',opts.RETitleLink,str);

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

							// disregard objects whose title is too short:
							if( !ti || ti.length<opts.titleLinkMinLength ) continue;

							// if the titleLink content equals a resource's title, replace it with a link:
							if(m==ti.toLowerCase()) return '<a href="'+anchorOf(cO)+'">'+$1+'</a>'
						};
						// The dynamic link has NOT been matched/replaced, so mark it:
						return '<span style="color:#D82020">'+$1+'</span>'
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
					return escapeHTML( ct );
				case 'ooxml':
					return titleLinks( fileRef( pr.value, opts ), opts )
				case 'xs:string':
					return titleLinks( escapeHTML( pr.value ), opts )
				default:
					return escapeHTML( pr.value )
			}
		}
	}

*/

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
			r = itemById( specifData.resources,nd.nodes[i].resource );
			rC = itemById( specifData[rClasses], r[rClass] );
			params.nodeId = nd.nodes[i].id;
			ch += 	titleOf( r, rC, params, opts )
//				+	propertiesOf( r, rC, opts )
//				+	statementsOf( r, opts )
				+	paragraphOf( nd.nodes[i], lvl+1 )
		};
		return ch
	}
	function ooxmlOf( headTitle, sectId, sectTitle, body ) {
		// make a ooxml file from the content provided:
		return	<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
+	<?mso-application progid="Word.Document"?>
+	<pkg:package xmlns:pkg="http://schemas.microsoft.com/office/2006/xmlPackage">
+	 <pkg:part pkg:name="/_rels/.rels" pkg:contentType="application/vnd.openxmlformats-package.relationships+xml" pkg:padding="512">
+	  <pkg:xmlData>
+	   <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
+	    <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml" />
+	    <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml" />
+	    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml" />
+	   </Relationships>
+	  </pkg:xmlData>
+	 </pkg:part>
+	 <pkg:part pkg:name="/word/_rels/document.xml.rels" pkg:contentType="application/vnd.openxmlformats-package.relationships+xml" pkg:padding="256">
+	  <pkg:xmlData>
+	   <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
+	    <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings" Target="webSettings.xml" />
+	    <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml" />
+	    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml" />
+	    <Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml" />
+	    <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable" Target="fontTable.xml" />
+	   </Relationships>
+	  </pkg:xmlData>
+	 </pkg:part>
+	 <pkg:part pkg:name="/word/document.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml">
+	  <pkg:xmlData>
+	   <w:document mc:Ignorable="w14 w15 wp14" xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">
+	    <w:body> 
		+	(sectTitle?	'<h1'+(sectId?' id="'+sectId+'"':'')+'>'+sectTitle+'</h1>' : '')
		+				body
+	<w:sectPr w:rsidR="00CC7C02" w:rsidRPr="002D0214">
+	      <w:pgSz w:w="11906" w:h="16838" />
+	      <w:pgMar w:top="1417" w:right="1417" w:bottom="1134" w:left="1417" w:header="708" w:footer="708" w:gutter="0" />
+	      <w:cols w:space="708" />
+	      <w:docGrid w:linePitch="360" />
+	     </w:sectPr>
+	    </w:body>
+	   </w:document>
+	  </pkg:xmlData>
+	 </pkg:part>
+	 <pkg:part pkg:name="/word/theme/theme1.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.theme+xml">
+	  <pkg:xmlData>
+	   <a:theme name="Office Theme" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
+	    <a:themeElements>
+	     <a:clrScheme name="Office">
+	      <a:dk1>
+	       <a:sysClr val="windowText" lastClr="000000" />
+	      </a:dk1>
+	      <a:lt1>
+	       <a:sysClr val="window" lastClr="FFFFFF" />
+	      </a:lt1>
+	      <a:dk2>
+	       <a:srgbClr val="44546A" />
+	      </a:dk2>
+	      <a:lt2>
+	       <a:srgbClr val="E7E6E6" />
+	      </a:lt2>
+	      <a:accent1>
+	       <a:srgbClr val="5B9BD5" />
+	      </a:accent1>
+	      <a:accent2>
+	       <a:srgbClr val="ED7D31" />
+	      </a:accent2>
+	      <a:accent3>
+	       <a:srgbClr val="A5A5A5" />
+	      </a:accent3>
+	      <a:accent4>
+	       <a:srgbClr val="FFC000" />
+	      </a:accent4>
+	      <a:accent5>
+	       <a:srgbClr val="4472C4" />
+	      </a:accent5>
+	      <a:accent6>
+	       <a:srgbClr val="70AD47" />
+	      </a:accent6>
+	      <a:hlink>
+	       <a:srgbClr val="0563C1" />
+	      </a:hlink>
+	      <a:folHlink>
+	       <a:srgbClr val="954F72" />
+	      </a:folHlink>
+	     </a:clrScheme>
+	     <a:fontScheme name="Office">
+	      <a:majorFont>
+	       <a:latin typeface="Calibri Light" panose="020F0302020204030204" />
+	       <a:ea typeface="" />
+	       <a:cs typeface="" />
+	       <a:font script="Jpan" typeface="ＭＳ ゴシック" />
+	       <a:font script="Hang" typeface="맑은 고딕" />
+	       <a:font script="Hans" typeface="宋体" />
+	       <a:font script="Hant" typeface="新細明體" />
+	       <a:font script="Arab" typeface="Times New Roman" />
+	       <a:font script="Hebr" typeface="Times New Roman" />
+	       <a:font script="Thai" typeface="Angsana New" />
+	       <a:font script="Ethi" typeface="Nyala" />
+	       <a:font script="Beng" typeface="Vrinda" />
+	       <a:font script="Gujr" typeface="Shruti" />
+	       <a:font script="Khmr" typeface="MoolBoran" />
+	       <a:font script="Knda" typeface="Tunga" />
+	       <a:font script="Guru" typeface="Raavi" />
+	       <a:font script="Cans" typeface="Euphemia" />
+	       <a:font script="Cher" typeface="Plantagenet Cherokee" />
+	       <a:font script="Yiii" typeface="Microsoft Yi Baiti" />
+	       <a:font script="Tibt" typeface="Microsoft Himalaya" />
+	       <a:font script="Thaa" typeface="MV Boli" />
+	       <a:font script="Deva" typeface="Mangal" />
+	       <a:font script="Telu" typeface="Gautami" />
+	       <a:font script="Taml" typeface="Latha" />
+	       <a:font script="Syrc" typeface="Estrangelo Edessa" />
+	       <a:font script="Orya" typeface="Kalinga" />
+	       <a:font script="Mlym" typeface="Kartika" />
+	       <a:font script="Laoo" typeface="DokChampa" />
+	       <a:font script="Sinh" typeface="Iskoola Pota" />
+	       <a:font script="Mong" typeface="Mongolian Baiti" />
+	       <a:font script="Viet" typeface="Times New Roman" />
+	       <a:font script="Uigh" typeface="Microsoft Uighur" />
+	       <a:font script="Geor" typeface="Sylfaen" />
+	      </a:majorFont>
+	      <a:minorFont>
+	       <a:latin typeface="Calibri" panose="020F0502020204030204" />
+	       <a:ea typeface="" />
+	       <a:cs typeface="" />
+	       <a:font script="Jpan" typeface="ＭＳ 明朝" />
+	       <a:font script="Hang" typeface="맑은 고딕" />
+	       <a:font script="Hans" typeface="宋体" />
+	       <a:font script="Hant" typeface="新細明體" />
+	       <a:font script="Arab" typeface="Arial" />
+	       <a:font script="Hebr" typeface="Arial" />
+	       <a:font script="Thai" typeface="Cordia New" />
+	       <a:font script="Ethi" typeface="Nyala" />
+	       <a:font script="Beng" typeface="Vrinda" />
+	       <a:font script="Gujr" typeface="Shruti" />
+	       <a:font script="Khmr" typeface="DaunPenh" />
+	       <a:font script="Knda" typeface="Tunga" />
+	       <a:font script="Guru" typeface="Raavi" />
+	       <a:font script="Cans" typeface="Euphemia" />
+	       <a:font script="Cher" typeface="Plantagenet Cherokee" />
+	       <a:font script="Yiii" typeface="Microsoft Yi Baiti" />
+	       <a:font script="Tibt" typeface="Microsoft Himalaya" />
+	       <a:font script="Thaa" typeface="MV Boli" />
+	       <a:font script="Deva" typeface="Mangal" />
+	       <a:font script="Telu" typeface="Gautami" />
+	       <a:font script="Taml" typeface="Latha" />
+	       <a:font script="Syrc" typeface="Estrangelo Edessa" />
+	       <a:font script="Orya" typeface="Kalinga" />
+	       <a:font script="Mlym" typeface="Kartika" />
+	       <a:font script="Laoo" typeface="DokChampa" />
+	       <a:font script="Sinh" typeface="Iskoola Pota" />
+	       <a:font script="Mong" typeface="Mongolian Baiti" />
+	       <a:font script="Viet" typeface="Arial" />
+	       <a:font script="Uigh" typeface="Microsoft Uighur" />
+	       <a:font script="Geor" typeface="Sylfaen" />
+	      </a:minorFont>
+	     </a:fontScheme>
+	     <a:fmtScheme name="Office">
+	      <a:fillStyleLst>
+	       <a:solidFill>
+	        <a:schemeClr val="phClr" />
+	       </a:solidFill>
+	       <a:gradFill rotWithShape="1">
+	        <a:gsLst>
+	         <a:gs pos="0">
+	          <a:schemeClr val="phClr">
+	           <a:lumMod val="110000" />
+	           <a:satMod val="105000" />
+	           <a:tint val="67000" />
+	          </a:schemeClr>
+	         </a:gs>
+	         <a:gs pos="50000">
+	          <a:schemeClr val="phClr">
+	           <a:lumMod val="105000" />
+	           <a:satMod val="103000" />
+	           <a:tint val="73000" />
+	          </a:schemeClr>
+	         </a:gs>
+	         <a:gs pos="100000">
+	          <a:schemeClr val="phClr">
+	           <a:lumMod val="105000" />
+	           <a:satMod val="109000" />
+	           <a:tint val="81000" />
+	          </a:schemeClr>
+	         </a:gs>
+	        </a:gsLst>
+	        <a:lin ang="5400000" scaled="0" />
+	       </a:gradFill>
+	       <a:gradFill rotWithShape="1">
+	        <a:gsLst>
+	         <a:gs pos="0">
+	          <a:schemeClr val="phClr">
+	           <a:satMod val="103000" />
+	           <a:lumMod val="102000" />
+	           <a:tint val="94000" />
+	          </a:schemeClr>
+	         </a:gs>
+	         <a:gs pos="50000">
+	          <a:schemeClr val="phClr">
+	           <a:satMod val="110000" />
+	           <a:lumMod val="100000" />
+	           <a:shade val="100000" />
+	          </a:schemeClr>
+	         </a:gs>
+	         <a:gs pos="100000">
+	          <a:schemeClr val="phClr">
+	           <a:lumMod val="99000" />
+	           <a:satMod val="120000" />
+	           <a:shade val="78000" />
+	          </a:schemeClr>
+	         </a:gs>
+	        </a:gsLst>
+	        <a:lin ang="5400000" scaled="0" />
+	       </a:gradFill>
+	      </a:fillStyleLst>
+	      <a:lnStyleLst>
+	       <a:ln w="6350" cap="flat" cmpd="sng" algn="ctr">
+	        <a:solidFill>
+	         <a:schemeClr val="phClr" />
+	        </a:solidFill>
+	        <a:prstDash val="solid" />
+	        <a:miter lim="800000" />
+	       </a:ln>
+	       <a:ln w="12700" cap="flat" cmpd="sng" algn="ctr">
+	        <a:solidFill>
+	         <a:schemeClr val="phClr" />
+	        </a:solidFill>
+	        <a:prstDash val="solid" />
+	        <a:miter lim="800000" />
+	       </a:ln>
+	       <a:ln w="19050" cap="flat" cmpd="sng" algn="ctr">
+	        <a:solidFill>
+	         <a:schemeClr val="phClr" />
+	        </a:solidFill>
+	        <a:prstDash val="solid" />
+	        <a:miter lim="800000" />
+	       </a:ln>
+	      </a:lnStyleLst>
+	      <a:effectStyleLst>
+	       <a:effectStyle>
+	        <a:effectLst />
+	       </a:effectStyle>
+	       <a:effectStyle>
+	        <a:effectLst />
+	       </a:effectStyle>
+	       <a:effectStyle>
+	        <a:effectLst>
+	         <a:outerShdw blurRad="57150" dist="19050" dir="5400000" algn="ctr" rotWithShape="0">
+	          <a:srgbClr val="000000">
+	           <a:alpha val="63000" />
+	          </a:srgbClr>
+	         </a:outerShdw>
+	        </a:effectLst>
+	       </a:effectStyle>
+	      </a:effectStyleLst>
+	      <a:bgFillStyleLst>
+	       <a:solidFill>
+	        <a:schemeClr val="phClr" />
+	       </a:solidFill>
+	       <a:solidFill>
+	        <a:schemeClr val="phClr">
+	         <a:tint val="95000" />
+	         <a:satMod val="170000" />
+	        </a:schemeClr>
+	       </a:solidFill>
+	       <a:gradFill rotWithShape="1">
+	        <a:gsLst>
+	         <a:gs pos="0">
+	          <a:schemeClr val="phClr">
+	           <a:tint val="93000" />
+	           <a:satMod val="150000" />
+	           <a:shade val="98000" />
+	           <a:lumMod val="102000" />
+	          </a:schemeClr>
+	         </a:gs>
+	         <a:gs pos="50000">
+	          <a:schemeClr val="phClr">
+	           <a:tint val="98000" />
+	           <a:satMod val="130000" />
+	           <a:shade val="90000" />
+	           <a:lumMod val="103000" />
+	          </a:schemeClr>
+	         </a:gs>
+	         <a:gs pos="100000">
+	          <a:schemeClr val="phClr">
+	           <a:shade val="63000" />
+	           <a:satMod val="120000" />
+	          </a:schemeClr>
+	         </a:gs>
+	        </a:gsLst>
+	        <a:lin ang="5400000" scaled="0" />
+	       </a:gradFill>
+	      </a:bgFillStyleLst>
+	     </a:fmtScheme>
+	    </a:themeElements>
+	    <a:objectDefaults />
+	    <a:extraClrSchemeLst />
+	    <a:extLst>
+	     <a:ext uri="{05A4C25C-085E-4340-85A3-A5531E510DB2}">
+	      <thm15:themeFamily name="Office Theme" id="{62F939B6-93AF-4DB8-9C6B-D6C7DFDC589F}" vid="{4A3C46E8-61CC-4603-A589-7422A47A8E4A}" xmlns:thm15="http://schemas.microsoft.com/office/thememl/2012/main" />
+	     </a:ext>
+	    </a:extLst>
+	   </a:theme>
+	  </pkg:xmlData>
+	 </pkg:part>
+	 <pkg:part pkg:name="/word/settings.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml">
+	  <pkg:xmlData>
+	   <w:settings mc:Ignorable="w14 w15" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:sl="http://schemas.openxmlformats.org/schemaLibrary/2006/main">
+	    <w:zoom w:percent="110" />
+	    <w:proofState w:spelling="clean" w:grammar="clean" />
+	    <w:defaultTabStop w:val="708" />
+	    <w:hyphenationZone w:val="425" />
+	    <w:characterSpacingControl w:val="doNotCompress" />
+	    <w:compat>
+	     <w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15" />
+	     <w:compatSetting w:name="overrideTableStyleFontSizeAndJustification" w:uri="http://schemas.microsoft.com/office/word" w:val="1" />
+	     <w:compatSetting w:name="enableOpenTypeFeatures" w:uri="http://schemas.microsoft.com/office/word" w:val="1" />
+	     <w:compatSetting w:name="doNotFlipMirrorIndents" w:uri="http://schemas.microsoft.com/office/word" w:val="1" />
+	     <w:compatSetting w:name="differentiateMultirowTableHeaders" w:uri="http://schemas.microsoft.com/office/word" w:val="1" />
+	    </w:compat>
+	    <w:rsids>
+	     <w:rsidRoot w:val="00932176" />
+	     <w:rsid w:val="002D0214" />
+	     <w:rsid w:val="00932176" />
+	     <w:rsid w:val="00CC7C02" />
+	    </w:rsids>
+	    <m:mathPr>
+	     <m:mathFont m:val="Cambria Math" />
+	     <m:brkBin m:val="before" />
+	     <m:brkBinSub m:val="--" />
+	     <m:smallFrac m:val="0" />
+	     <m:dispDef />
+	     <m:lMargin m:val="0" />
+	     <m:rMargin m:val="0" />
+	     <m:defJc m:val="centerGroup" />
+	     <m:wrapIndent m:val="1440" />
+	     <m:intLim m:val="subSup" />
+	     <m:naryLim m:val="undOvr" />
+	    </m:mathPr>
+	    <w:themeFontLang w:val="de-DE" />
+	    <w:clrSchemeMapping w:bg1="light1" w:t1="dark1" w:bg2="light2" w:t2="dark2" w:accent1="accent1" w:accent2="accent2" w:accent3="accent3" w:accent4="accent4" w:accent5="accent5" w:accent6="accent6" w:hyperlink="hyperlink" w:followedHyperlink="followedHyperlink" />
+	    <w:shapeDefaults>
+	     <o:shapedefaults v:ext="edit" spidmax="1026" />
+	     <o:shapelayout v:ext="edit">
+	      <o:idmap v:ext="edit" data="1" />
+	     </o:shapelayout>
+	    </w:shapeDefaults>
+	    <w:decimalSymbol w:val="," />
+	    <w:listSeparator w:val=";" />
+	    <w15:chartTrackingRefBased />
+	    <w15:docId w15:val="{14255EB0-4E5F-4AD9-8155-C3B93431A0AE}" />
+	   </w:settings>
+	  </pkg:xmlData>
+	 </pkg:part>
+	 <pkg:part pkg:name="/word/fontTable.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml">
+	  <pkg:xmlData>
+	   <w:fonts mc:Ignorable="w14 w15" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml">
+	    <w:font w:name="Calibri">
+	     <w:panose1 w:val="020F0502020204030204" />
+	     <w:charset w:val="00" />
+	     <w:family w:val="swiss" />
+	     <w:pitch w:val="variable" />
+	     <w:sig w:usb0="E0002AFF" w:usb1="C000247B" w:usb2="00000009" w:usb3="00000000" w:csb0="000001FF" w:csb1="00000000" />
+	    </w:font>
+	    <w:font w:name="Times New Roman">
+	     <w:panose1 w:val="02020603050405020304" />
+	     <w:charset w:val="00" />
+	     <w:family w:val="roman" />
+	     <w:pitch w:val="variable" />
+	     <w:sig w:usb0="E0002EFF" w:usb1="C000785B" w:usb2="00000009" w:usb3="00000000" w:csb0="000001FF" w:csb1="00000000" />
+	    </w:font>
+	    <w:font w:name="Calibri Light">
+	     <w:panose1 w:val="020F0302020204030204" />
+	     <w:charset w:val="00" />
+	     <w:family w:val="swiss" />
+	     <w:pitch w:val="variable" />
+	     <w:sig w:usb0="E0002AFF" w:usb1="C000247B" w:usb2="00000009" w:usb3="00000000" w:csb0="000001FF" w:csb1="00000000" />
+	    </w:font>
+	   </w:fonts>
+	  </pkg:xmlData>
+	 </pkg:part>
+	 <pkg:part pkg:name="/word/webSettings.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml">
+	  <pkg:xmlData>
+	   <w:webSettings mc:Ignorable="w14 w15" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml">
+	    <w:optimizeForBrowser />
+	    <w:allowPNG />
+	   </w:webSettings>
+	  </pkg:xmlData>
+	 </pkg:part>
+	 <pkg:part pkg:name="/docProps/app.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.extended-properties+xml" pkg:padding="256">
+	  <pkg:xmlData>
+	   <Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
+	    <Template>Normal.dotm</Template>
+	    <TotalTime>0</TotalTime>
+	    <Pages>1</Pages>
+	    <Words>3</Words>
+	    <Characters>21</Characters>
+	    <Application>Microsoft Office Word</Application>
+	    <DocSecurity>0</DocSecurity>
+	    <Lines>1</Lines>
+	    <Paragraphs>1</Paragraphs>
+	    <ScaleCrop>false</ScaleCrop>
+	    <HeadingPairs>
+	     <vt:vector size="2" baseType="variant">
+	      <vt:variant>
+	       <vt:lpstr>Titel</vt:lpstr>
+	      </vt:variant>
+	      <vt:variant>
+	       <vt:i4>1</vt:i4>
+	      </vt:variant>
+	     </vt:vector>
+	    </HeadingPairs>
+	    <TitlesOfParts>
+	     <vt:vector size="1" baseType="lpstr">
+	      <vt:lpstr />
+	     </vt:vector>
+	    </TitlesOfParts>
+	    <Company>adesso AG</Company>
+	    <LinksUpToDate>false</LinksUpToDate>
+	    <CharactersWithSpaces>23</CharactersWithSpaces>
+	    <SharedDoc>false</SharedDoc>
+	    <HyperlinksChanged>false</HyperlinksChanged>
+	    <AppVersion>15.0000</AppVersion>
+	   </Properties>
+	  </pkg:xmlData>
+	 </pkg:part>
+	 <pkg:part pkg:name="/docProps/core.xml" pkg:contentType="application/vnd.openxmlformats-package.core-properties+xml" pkg:padding="256">
+	  <pkg:xmlData>
+	   <cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
+	    <dc:title />
+	    <dc:subject />
+	    <dc:creator>Schulz, Philip</dc:creator>
+	    <cp:keywords />
+	    <dc:description />
+	    <cp:lastModifiedBy>Schulz, Philip</cp:lastModifiedBy>
+	    <cp:revision>3</cp:revision>
+	    <dcterms:created xsi:type="dcterms:W3CDTF">2018-05-09T06:31:00Z</dcterms:created>
+	    <dcterms:modified xsi:type="dcterms:W3CDTF">2018-05-09T06:36:00Z</dcterms:modified>
+	   </cp:coreProperties>
+	  </pkg:xmlData>
+	 </pkg:part>
+	 <pkg:part pkg:name="/word/styles.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml">
+	  <pkg:xmlData>
+	   <w:styles mc:Ignorable="w14 w15" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml">
+	    <w:docDefaults>
+	     <w:rPrDefault>
+	      <w:rPr>
+	       <w:rFonts w:asciiTheme="minorHAnsi" w:eastAsiaTheme="minorHAnsi" w:hAnsiTheme="minorHAnsi" w:cstheme="minorBidi" />
+	       <w:sz w:val="22" />
+	       <w:szCs w:val="22" />
+	       <w:lang w:val="de-DE" w:eastAsia="en-US" w:bidi="ar-SA" />
+	      </w:rPr>
+	     </w:rPrDefault>
+	     <w:pPrDefault>
+	      <w:pPr>
+	       <w:spacing w:after="160" w:line="259" w:lineRule="auto" />
+	      </w:pPr>
+	     </w:pPrDefault>
+	    </w:docDefaults>
+	    <w:latentStyles w:defLockedState="0" w:defUIPriority="99" w:defSemiHidden="0" w:defUnhideWhenUsed="0" w:defQFormat="0" w:count="371">
+	     <w:lsdException w:name="Normal" w:uiPriority="0" w:qFormat="1" />
+	     <w:lsdException w:name="heading 1" w:uiPriority="9" w:qFormat="1" />
+	     <w:lsdException w:name="heading 2" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1" />
+	     <w:lsdException w:name="heading 3" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1" />
+	     <w:lsdException w:name="heading 4" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1" />
+	     <w:lsdException w:name="heading 5" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1" />
+	     <w:lsdException w:name="heading 6" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1" />
+	     <w:lsdException w:name="heading 7" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1" />
+	     <w:lsdException w:name="heading 8" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1" />
+	     <w:lsdException w:name="heading 9" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1" />
+	     <w:lsdException w:name="index 1" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="index 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="index 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="index 4" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="index 5" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="index 6" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="index 7" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="index 8" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="index 9" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="toc 1" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="toc 2" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="toc 3" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="toc 4" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="toc 5" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="toc 6" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="toc 7" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="toc 8" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="toc 9" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Normal Indent" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="footnote text" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="annotation text" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="header" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="footer" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="index heading" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="caption" w:semiHidden="1" w:uiPriority="35" w:unhideWhenUsed="1" w:qFormat="1" />
+	     <w:lsdException w:name="table of figures" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="envelope address" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="envelope return" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="footnote reference" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="annotation reference" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="line number" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="page number" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="endnote reference" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="endnote text" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="table of authorities" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="macro" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="toa heading" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Bullet" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Number" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List 4" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List 5" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Bullet 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Bullet 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Bullet 4" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Bullet 5" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Number 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Number 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Number 4" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Number 5" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Title" w:uiPriority="10" w:qFormat="1" />
+	     <w:lsdException w:name="Closing" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Signature" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Default Paragraph Font" w:semiHidden="1" w:uiPriority="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Body Text" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Body Text Indent" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Continue" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Continue 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Continue 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Continue 4" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="List Continue 5" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Message Header" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Subtitle" w:uiPriority="11" w:qFormat="1" />
+	     <w:lsdException w:name="Salutation" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Date" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Body Text First Indent" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Body Text First Indent 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Note Heading" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Body Text 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Body Text 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Body Text Indent 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Body Text Indent 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Block Text" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Hyperlink" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="FollowedHyperlink" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Strong" w:uiPriority="22" w:qFormat="1" />
+	     <w:lsdException w:name="Emphasis" w:uiPriority="20" w:qFormat="1" />
+	     <w:lsdException w:name="Document Map" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Plain Text" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="E-mail Signature" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="HTML Top of Form" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="HTML Bottom of Form" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Normal (Web)" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="HTML Acronym" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="HTML Address" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="HTML Cite" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="HTML Code" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="HTML Definition" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="HTML Keyboard" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="HTML Preformatted" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="HTML Sample" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="HTML Typewriter" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="HTML Variable" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Normal Table" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="annotation subject" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="No List" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Outline List 1" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Outline List 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Outline List 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Simple 1" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Simple 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Simple 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Classic 1" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Classic 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Classic 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Classic 4" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Colorful 1" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Colorful 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Colorful 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Columns 1" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Columns 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Columns 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Columns 4" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Columns 5" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Grid 1" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Grid 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Grid 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Grid 4" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Grid 5" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Grid 6" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Grid 7" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Grid 8" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table List 1" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table List 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table List 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table List 4" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table List 5" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table List 6" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table List 7" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table List 8" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table 3D effects 1" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table 3D effects 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table 3D effects 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Contemporary" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Elegant" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Professional" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Subtle 1" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Subtle 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Web 1" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Web 2" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Web 3" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Balloon Text" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Table Grid" w:uiPriority="39" />
+	     <w:lsdException w:name="Table Theme" w:semiHidden="1" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="Placeholder Text" w:semiHidden="1" />
+	     <w:lsdException w:name="No Spacing" w:uiPriority="1" w:qFormat="1" />
+	     <w:lsdException w:name="Light Shading" w:uiPriority="60" />
+	     <w:lsdException w:name="Light List" w:uiPriority="61" />
+	     <w:lsdException w:name="Light Grid" w:uiPriority="62" />
+	     <w:lsdException w:name="Medium Shading 1" w:uiPriority="63" />
+	     <w:lsdException w:name="Medium Shading 2" w:uiPriority="64" />
+	     <w:lsdException w:name="Medium List 1" w:uiPriority="65" />
+	     <w:lsdException w:name="Medium List 2" w:uiPriority="66" />
+	     <w:lsdException w:name="Medium Grid 1" w:uiPriority="67" />
+	     <w:lsdException w:name="Medium Grid 2" w:uiPriority="68" />
+	     <w:lsdException w:name="Medium Grid 3" w:uiPriority="69" />
+	     <w:lsdException w:name="Dark List" w:uiPriority="70" />
+	     <w:lsdException w:name="Colorful Shading" w:uiPriority="71" />
+	     <w:lsdException w:name="Colorful List" w:uiPriority="72" />
+	     <w:lsdException w:name="Colorful Grid" w:uiPriority="73" />
+	     <w:lsdException w:name="Light Shading Accent 1" w:uiPriority="60" />
+	     <w:lsdException w:name="Light List Accent 1" w:uiPriority="61" />
+	     <w:lsdException w:name="Light Grid Accent 1" w:uiPriority="62" />
+	     <w:lsdException w:name="Medium Shading 1 Accent 1" w:uiPriority="63" />
+	     <w:lsdException w:name="Medium Shading 2 Accent 1" w:uiPriority="64" />
+	     <w:lsdException w:name="Medium List 1 Accent 1" w:uiPriority="65" />
+	     <w:lsdException w:name="Revision" w:semiHidden="1" />
+	     <w:lsdException w:name="List Paragraph" w:uiPriority="34" w:qFormat="1" />
+	     <w:lsdException w:name="Quote" w:uiPriority="29" w:qFormat="1" />
+	     <w:lsdException w:name="Intense Quote" w:uiPriority="30" w:qFormat="1" />
+	     <w:lsdException w:name="Medium List 2 Accent 1" w:uiPriority="66" />
+	     <w:lsdException w:name="Medium Grid 1 Accent 1" w:uiPriority="67" />
+	     <w:lsdException w:name="Medium Grid 2 Accent 1" w:uiPriority="68" />
+	     <w:lsdException w:name="Medium Grid 3 Accent 1" w:uiPriority="69" />
+	     <w:lsdException w:name="Dark List Accent 1" w:uiPriority="70" />
+	     <w:lsdException w:name="Colorful Shading Accent 1" w:uiPriority="71" />
+	     <w:lsdException w:name="Colorful List Accent 1" w:uiPriority="72" />
+	     <w:lsdException w:name="Colorful Grid Accent 1" w:uiPriority="73" />
+	     <w:lsdException w:name="Light Shading Accent 2" w:uiPriority="60" />
+	     <w:lsdException w:name="Light List Accent 2" w:uiPriority="61" />
+	     <w:lsdException w:name="Light Grid Accent 2" w:uiPriority="62" />
+	     <w:lsdException w:name="Medium Shading 1 Accent 2" w:uiPriority="63" />
+	     <w:lsdException w:name="Medium Shading 2 Accent 2" w:uiPriority="64" />
+	     <w:lsdException w:name="Medium List 1 Accent 2" w:uiPriority="65" />
+	     <w:lsdException w:name="Medium List 2 Accent 2" w:uiPriority="66" />
+	     <w:lsdException w:name="Medium Grid 1 Accent 2" w:uiPriority="67" />
+	     <w:lsdException w:name="Medium Grid 2 Accent 2" w:uiPriority="68" />
+	     <w:lsdException w:name="Medium Grid 3 Accent 2" w:uiPriority="69" />
+	     <w:lsdException w:name="Dark List Accent 2" w:uiPriority="70" />
+	     <w:lsdException w:name="Colorful Shading Accent 2" w:uiPriority="71" />
+	     <w:lsdException w:name="Colorful List Accent 2" w:uiPriority="72" />
+	     <w:lsdException w:name="Colorful Grid Accent 2" w:uiPriority="73" />
+	     <w:lsdException w:name="Light Shading Accent 3" w:uiPriority="60" />
+	     <w:lsdException w:name="Light List Accent 3" w:uiPriority="61" />
+	     <w:lsdException w:name="Light Grid Accent 3" w:uiPriority="62" />
+	     <w:lsdException w:name="Medium Shading 1 Accent 3" w:uiPriority="63" />
+	     <w:lsdException w:name="Medium Shading 2 Accent 3" w:uiPriority="64" />
+	     <w:lsdException w:name="Medium List 1 Accent 3" w:uiPriority="65" />
+	     <w:lsdException w:name="Medium List 2 Accent 3" w:uiPriority="66" />
+	     <w:lsdException w:name="Medium Grid 1 Accent 3" w:uiPriority="67" />
+	     <w:lsdException w:name="Medium Grid 2 Accent 3" w:uiPriority="68" />
+	     <w:lsdException w:name="Medium Grid 3 Accent 3" w:uiPriority="69" />
+	     <w:lsdException w:name="Dark List Accent 3" w:uiPriority="70" />
+	     <w:lsdException w:name="Colorful Shading Accent 3" w:uiPriority="71" />
+	     <w:lsdException w:name="Colorful List Accent 3" w:uiPriority="72" />
+	     <w:lsdException w:name="Colorful Grid Accent 3" w:uiPriority="73" />
+	     <w:lsdException w:name="Light Shading Accent 4" w:uiPriority="60" />
+	     <w:lsdException w:name="Light List Accent 4" w:uiPriority="61" />
+	     <w:lsdException w:name="Light Grid Accent 4" w:uiPriority="62" />
+	     <w:lsdException w:name="Medium Shading 1 Accent 4" w:uiPriority="63" />
+	     <w:lsdException w:name="Medium Shading 2 Accent 4" w:uiPriority="64" />
+	     <w:lsdException w:name="Medium List 1 Accent 4" w:uiPriority="65" />
+	     <w:lsdException w:name="Medium List 2 Accent 4" w:uiPriority="66" />
+	     <w:lsdException w:name="Medium Grid 1 Accent 4" w:uiPriority="67" />
+	     <w:lsdException w:name="Medium Grid 2 Accent 4" w:uiPriority="68" />
+	     <w:lsdException w:name="Medium Grid 3 Accent 4" w:uiPriority="69" />
+	     <w:lsdException w:name="Dark List Accent 4" w:uiPriority="70" />
+	     <w:lsdException w:name="Colorful Shading Accent 4" w:uiPriority="71" />
+	     <w:lsdException w:name="Colorful List Accent 4" w:uiPriority="72" />
+	     <w:lsdException w:name="Colorful Grid Accent 4" w:uiPriority="73" />
+	     <w:lsdException w:name="Light Shading Accent 5" w:uiPriority="60" />
+	     <w:lsdException w:name="Light List Accent 5" w:uiPriority="61" />
+	     <w:lsdException w:name="Light Grid Accent 5" w:uiPriority="62" />
+	     <w:lsdException w:name="Medium Shading 1 Accent 5" w:uiPriority="63" />
+	     <w:lsdException w:name="Medium Shading 2 Accent 5" w:uiPriority="64" />
+	     <w:lsdException w:name="Medium List 1 Accent 5" w:uiPriority="65" />
+	     <w:lsdException w:name="Medium List 2 Accent 5" w:uiPriority="66" />
+	     <w:lsdException w:name="Medium Grid 1 Accent 5" w:uiPriority="67" />
+	     <w:lsdException w:name="Medium Grid 2 Accent 5" w:uiPriority="68" />
+	     <w:lsdException w:name="Medium Grid 3 Accent 5" w:uiPriority="69" />
+	     <w:lsdException w:name="Dark List Accent 5" w:uiPriority="70" />
+	     <w:lsdException w:name="Colorful Shading Accent 5" w:uiPriority="71" />
+	     <w:lsdException w:name="Colorful List Accent 5" w:uiPriority="72" />
+	     <w:lsdException w:name="Colorful Grid Accent 5" w:uiPriority="73" />
+	     <w:lsdException w:name="Light Shading Accent 6" w:uiPriority="60" />
+	     <w:lsdException w:name="Light List Accent 6" w:uiPriority="61" />
+	     <w:lsdException w:name="Light Grid Accent 6" w:uiPriority="62" />
+	     <w:lsdException w:name="Medium Shading 1 Accent 6" w:uiPriority="63" />
+	     <w:lsdException w:name="Medium Shading 2 Accent 6" w:uiPriority="64" />
+	     <w:lsdException w:name="Medium List 1 Accent 6" w:uiPriority="65" />
+	     <w:lsdException w:name="Medium List 2 Accent 6" w:uiPriority="66" />
+	     <w:lsdException w:name="Medium Grid 1 Accent 6" w:uiPriority="67" />
+	     <w:lsdException w:name="Medium Grid 2 Accent 6" w:uiPriority="68" />
+	     <w:lsdException w:name="Medium Grid 3 Accent 6" w:uiPriority="69" />
+	     <w:lsdException w:name="Dark List Accent 6" w:uiPriority="70" />
+	     <w:lsdException w:name="Colorful Shading Accent 6" w:uiPriority="71" />
+	     <w:lsdException w:name="Colorful List Accent 6" w:uiPriority="72" />
+	     <w:lsdException w:name="Colorful Grid Accent 6" w:uiPriority="73" />
+	     <w:lsdException w:name="Subtle Emphasis" w:uiPriority="19" w:qFormat="1" />
+	     <w:lsdException w:name="Intense Emphasis" w:uiPriority="21" w:qFormat="1" />
+	     <w:lsdException w:name="Subtle Reference" w:uiPriority="31" w:qFormat="1" />
+	     <w:lsdException w:name="Intense Reference" w:uiPriority="32" w:qFormat="1" />
+	     <w:lsdException w:name="Book Title" w:uiPriority="33" w:qFormat="1" />
+	     <w:lsdException w:name="Bibliography" w:semiHidden="1" w:uiPriority="37" w:unhideWhenUsed="1" />
+	     <w:lsdException w:name="TOC Heading" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1" w:qFormat="1" />
+	     <w:lsdException w:name="Plain Table 1" w:uiPriority="41" />
+	     <w:lsdException w:name="Plain Table 2" w:uiPriority="42" />
+	     <w:lsdException w:name="Plain Table 3" w:uiPriority="43" />
+	     <w:lsdException w:name="Plain Table 4" w:uiPriority="44" />
+	     <w:lsdException w:name="Plain Table 5" w:uiPriority="45" />
+	     <w:lsdException w:name="Grid Table Light" w:uiPriority="40" />
+	     <w:lsdException w:name="Grid Table 1 Light" w:uiPriority="46" />
+	     <w:lsdException w:name="Grid Table 2" w:uiPriority="47" />
+	     <w:lsdException w:name="Grid Table 3" w:uiPriority="48" />
+	     <w:lsdException w:name="Grid Table 4" w:uiPriority="49" />
+	     <w:lsdException w:name="Grid Table 5 Dark" w:uiPriority="50" />
+	     <w:lsdException w:name="Grid Table 6 Colorful" w:uiPriority="51" />
+	     <w:lsdException w:name="Grid Table 7 Colorful" w:uiPriority="52" />
+	     <w:lsdException w:name="Grid Table 1 Light Accent 1" w:uiPriority="46" />
+	     <w:lsdException w:name="Grid Table 2 Accent 1" w:uiPriority="47" />
+	     <w:lsdException w:name="Grid Table 3 Accent 1" w:uiPriority="48" />
+	     <w:lsdException w:name="Grid Table 4 Accent 1" w:uiPriority="49" />
+	     <w:lsdException w:name="Grid Table 5 Dark Accent 1" w:uiPriority="50" />
+	     <w:lsdException w:name="Grid Table 6 Colorful Accent 1" w:uiPriority="51" />
+	     <w:lsdException w:name="Grid Table 7 Colorful Accent 1" w:uiPriority="52" />
+	     <w:lsdException w:name="Grid Table 1 Light Accent 2" w:uiPriority="46" />
+	     <w:lsdException w:name="Grid Table 2 Accent 2" w:uiPriority="47" />
+	     <w:lsdException w:name="Grid Table 3 Accent 2" w:uiPriority="48" />
+	     <w:lsdException w:name="Grid Table 4 Accent 2" w:uiPriority="49" />
+	     <w:lsdException w:name="Grid Table 5 Dark Accent 2" w:uiPriority="50" />
+	     <w:lsdException w:name="Grid Table 6 Colorful Accent 2" w:uiPriority="51" />
+	     <w:lsdException w:name="Grid Table 7 Colorful Accent 2" w:uiPriority="52" />
+	     <w:lsdException w:name="Grid Table 1 Light Accent 3" w:uiPriority="46" />
+	     <w:lsdException w:name="Grid Table 2 Accent 3" w:uiPriority="47" />
+	     <w:lsdException w:name="Grid Table 3 Accent 3" w:uiPriority="48" />
+	     <w:lsdException w:name="Grid Table 4 Accent 3" w:uiPriority="49" />
+	     <w:lsdException w:name="Grid Table 5 Dark Accent 3" w:uiPriority="50" />
+	     <w:lsdException w:name="Grid Table 6 Colorful Accent 3" w:uiPriority="51" />
+	     <w:lsdException w:name="Grid Table 7 Colorful Accent 3" w:uiPriority="52" />
+	     <w:lsdException w:name="Grid Table 1 Light Accent 4" w:uiPriority="46" />
+	     <w:lsdException w:name="Grid Table 2 Accent 4" w:uiPriority="47" />
+	     <w:lsdException w:name="Grid Table 3 Accent 4" w:uiPriority="48" />
+	     <w:lsdException w:name="Grid Table 4 Accent 4" w:uiPriority="49" />
+	     <w:lsdException w:name="Grid Table 5 Dark Accent 4" w:uiPriority="50" />
+	     <w:lsdException w:name="Grid Table 6 Colorful Accent 4" w:uiPriority="51" />
+	     <w:lsdException w:name="Grid Table 7 Colorful Accent 4" w:uiPriority="52" />
+	     <w:lsdException w:name="Grid Table 1 Light Accent 5" w:uiPriority="46" />
+	     <w:lsdException w:name="Grid Table 2 Accent 5" w:uiPriority="47" />
+	     <w:lsdException w:name="Grid Table 3 Accent 5" w:uiPriority="48" />
+	     <w:lsdException w:name="Grid Table 4 Accent 5" w:uiPriority="49" />
+	     <w:lsdException w:name="Grid Table 5 Dark Accent 5" w:uiPriority="50" />
+	     <w:lsdException w:name="Grid Table 6 Colorful Accent 5" w:uiPriority="51" />
+	     <w:lsdException w:name="Grid Table 7 Colorful Accent 5" w:uiPriority="52" />
+	     <w:lsdException w:name="Grid Table 1 Light Accent 6" w:uiPriority="46" />
+	     <w:lsdException w:name="Grid Table 2 Accent 6" w:uiPriority="47" />
+	     <w:lsdException w:name="Grid Table 3 Accent 6" w:uiPriority="48" />
+	     <w:lsdException w:name="Grid Table 4 Accent 6" w:uiPriority="49" />
+	     <w:lsdException w:name="Grid Table 5 Dark Accent 6" w:uiPriority="50" />
+	     <w:lsdException w:name="Grid Table 6 Colorful Accent 6" w:uiPriority="51" />
+	     <w:lsdException w:name="Grid Table 7 Colorful Accent 6" w:uiPriority="52" />
+	     <w:lsdException w:name="List Table 1 Light" w:uiPriority="46" />
+	     <w:lsdException w:name="List Table 2" w:uiPriority="47" />
+	     <w:lsdException w:name="List Table 3" w:uiPriority="48" />
+	     <w:lsdException w:name="List Table 4" w:uiPriority="49" />
+	     <w:lsdException w:name="List Table 5 Dark" w:uiPriority="50" />
+	     <w:lsdException w:name="List Table 6 Colorful" w:uiPriority="51" />
+	     <w:lsdException w:name="List Table 7 Colorful" w:uiPriority="52" />
+	     <w:lsdException w:name="List Table 1 Light Accent 1" w:uiPriority="46" />
+	     <w:lsdException w:name="List Table 2 Accent 1" w:uiPriority="47" />
+	     <w:lsdException w:name="List Table 3 Accent 1" w:uiPriority="48" />
+	     <w:lsdException w:name="List Table 4 Accent 1" w:uiPriority="49" />
+	     <w:lsdException w:name="List Table 5 Dark Accent 1" w:uiPriority="50" />
+	     <w:lsdException w:name="List Table 6 Colorful Accent 1" w:uiPriority="51" />
+	     <w:lsdException w:name="List Table 7 Colorful Accent 1" w:uiPriority="52" />
+	     <w:lsdException w:name="List Table 1 Light Accent 2" w:uiPriority="46" />
+	     <w:lsdException w:name="List Table 2 Accent 2" w:uiPriority="47" />
+	     <w:lsdException w:name="List Table 3 Accent 2" w:uiPriority="48" />
+	     <w:lsdException w:name="List Table 4 Accent 2" w:uiPriority="49" />
+	     <w:lsdException w:name="List Table 5 Dark Accent 2" w:uiPriority="50" />
+	     <w:lsdException w:name="List Table 6 Colorful Accent 2" w:uiPriority="51" />
+	     <w:lsdException w:name="List Table 7 Colorful Accent 2" w:uiPriority="52" />
+	     <w:lsdException w:name="List Table 1 Light Accent 3" w:uiPriority="46" />
+	     <w:lsdException w:name="List Table 2 Accent 3" w:uiPriority="47" />
+	     <w:lsdException w:name="List Table 3 Accent 3" w:uiPriority="48" />
+	     <w:lsdException w:name="List Table 4 Accent 3" w:uiPriority="49" />
+	     <w:lsdException w:name="List Table 5 Dark Accent 3" w:uiPriority="50" />
+	     <w:lsdException w:name="List Table 6 Colorful Accent 3" w:uiPriority="51" />
+	     <w:lsdException w:name="List Table 7 Colorful Accent 3" w:uiPriority="52" />
+	     <w:lsdException w:name="List Table 1 Light Accent 4" w:uiPriority="46" />
+	     <w:lsdException w:name="List Table 2 Accent 4" w:uiPriority="47" />
+	     <w:lsdException w:name="List Table 3 Accent 4" w:uiPriority="48" />
+	     <w:lsdException w:name="List Table 4 Accent 4" w:uiPriority="49" />
+	     <w:lsdException w:name="List Table 5 Dark Accent 4" w:uiPriority="50" />
+	     <w:lsdException w:name="List Table 6 Colorful Accent 4" w:uiPriority="51" />
+	     <w:lsdException w:name="List Table 7 Colorful Accent 4" w:uiPriority="52" />
+	     <w:lsdException w:name="List Table 1 Light Accent 5" w:uiPriority="46" />
+	     <w:lsdException w:name="List Table 2 Accent 5" w:uiPriority="47" />
+	     <w:lsdException w:name="List Table 3 Accent 5" w:uiPriority="48" />
+	     <w:lsdException w:name="List Table 4 Accent 5" w:uiPriority="49" />
+	     <w:lsdException w:name="List Table 5 Dark Accent 5" w:uiPriority="50" />
+	     <w:lsdException w:name="List Table 6 Colorful Accent 5" w:uiPriority="51" />
+	     <w:lsdException w:name="List Table 7 Colorful Accent 5" w:uiPriority="52" />
+	     <w:lsdException w:name="List Table 1 Light Accent 6" w:uiPriority="46" />
+	     <w:lsdException w:name="List Table 2 Accent 6" w:uiPriority="47" />
+	     <w:lsdException w:name="List Table 3 Accent 6" w:uiPriority="48" />
+	     <w:lsdException w:name="List Table 4 Accent 6" w:uiPriority="49" />
+	     <w:lsdException w:name="List Table 5 Dark Accent 6" w:uiPriority="50" />
+	     <w:lsdException w:name="List Table 6 Colorful Accent 6" w:uiPriority="51" />
+	     <w:lsdException w:name="List Table 7 Colorful Accent 6" w:uiPriority="52" />
+	    </w:latentStyles>
+	    <w:style w:type="paragraph" w:default="1" w:styleId="Standard">
+	     <w:name w:val="Normal" />
+	     <w:qFormat />
+	    </w:style>
+	    <w:style w:type="paragraph" w:styleId="berschrift1">
+	     <w:name w:val="heading 1" />
+	     <w:basedOn w:val="Standard" />
+	     <w:next w:val="Standard" />
+	     <w:link w:val="berschrift1Zchn" />
+	     <w:uiPriority w:val="9" />
+	     <w:qFormat />
+	     <w:rsid w:val="002D0214" />
+	     <w:pPr>
+	      <w:keepNext />
+	      <w:keepLines />
+	      <w:spacing w:before="240" w:after="0" />
+	      <w:outlineLvl w:val="0" />
+	     </w:pPr>
+	     <w:rPr>
+	      <w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi" />
+	      <w:color w:val="2E74B5" w:themeColor="accent1" w:themeShade="BF" />
+	      <w:sz w:val="32" />
+	      <w:szCs w:val="32" />
+	     </w:rPr>
+	    </w:style>
+	    <w:style w:type="paragraph" w:styleId="berschrift2">
+	     <w:name w:val="heading 2" />
+	     <w:basedOn w:val="Standard" />
+	     <w:next w:val="Standard" />
+	     <w:link w:val="berschrift2Zchn" />
+	     <w:uiPriority w:val="9" />
+	     <w:unhideWhenUsed />
+	     <w:qFormat />
+	     <w:rsid w:val="002D0214" />
+	     <w:pPr>
+	      <w:keepNext />
+	      <w:keepLines />
+	      <w:spacing w:before="40" w:after="0" />
+	      <w:outlineLvl w:val="1" />
+	     </w:pPr>
+	     <w:rPr>
+	      <w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi" />
+	      <w:color w:val="2E74B5" w:themeColor="accent1" w:themeShade="BF" />
+	      <w:sz w:val="26" />
+	      <w:szCs w:val="26" />
+	     </w:rPr>
+	    </w:style>
+	    <w:style w:type="character" w:default="1" w:styleId="Absatz-Standardschriftart">
+	     <w:name w:val="Default Paragraph Font" />
+	     <w:uiPriority w:val="1" />
+	     <w:semiHidden />
+	     <w:unhideWhenUsed />
+	    </w:style>
+	    <w:style w:type="table" w:default="1" w:styleId="NormaleTabelle">
+	     <w:name w:val="Normal Table" />
+	     <w:uiPriority w:val="99" />
+	     <w:semiHidden />
+	     <w:unhideWhenUsed />
+	     <w:tblPr>
+	      <w:tblInd w:w="0" w:type="dxa" />
+	      <w:tblCellMar>
+	       <w:top w:w="0" w:type="dxa" />
+	       <w:left w:w="108" w:type="dxa" />
+	       <w:bottom w:w="0" w:type="dxa" />
+	       <w:right w:w="108" w:type="dxa" />
+	      </w:tblCellMar>
+	     </w:tblPr>
+	    </w:style>
+	    <w:style w:type="numbering" w:default="1" w:styleId="KeineListe">
+	     <w:name w:val="No List" />
+	     <w:uiPriority w:val="99" />
+	     <w:semiHidden />
+	     <w:unhideWhenUsed />
+	    </w:style>
+	    <w:style w:type="character" w:customStyle="1" w:styleId="berschrift1Zchn">
+	     <w:name w:val="Überschrift 1 Zchn" />
+	     <w:basedOn w:val="Absatz-Standardschriftart" />
+	     <w:link w:val="berschrift1" />
+	     <w:uiPriority w:val="9" />
+	     <w:rsid w:val="002D0214" />
+	     <w:rPr>
+	      <w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi" />
+	      <w:color w:val="2E74B5" w:themeColor="accent1" w:themeShade="BF" />
+	      <w:sz w:val="32" />
+	      <w:szCs w:val="32" />
+	     </w:rPr>
+	    </w:style>
+	    <w:style w:type="character" w:customStyle="1" w:styleId="berschrift2Zchn">
+	     <w:name w:val="Überschrift 2 Zchn" />
+	     <w:basedOn w:val="Absatz-Standardschriftart" />
+	     <w:link w:val="berschrift2" />
+	     <w:uiPriority w:val="9" />
+	     <w:rsid w:val="002D0214" />
+	     <w:rPr>
+	      <w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi" />
+	      <w:color w:val="2E74B5" w:themeColor="accent1" w:themeShade="BF" />
+	      <w:sz w:val="26" />
+	      <w:szCs w:val="26" />
+	     </w:rPr>
+	    </w:style>
+		<w:style w:type="character" w:customStyle="1" w:styleId="berschrift3Zchn">
+	 	<w:name w:val="Überschrift 3 Zchn" />
+		<w:basedOn w:val="Absatz-Standardschriftart" />
+	 	<w:link w:val="berschrift3" />
+	 	<w:uiPriority w:val="9" />
+	 	<w:rsid w:val="002D3244" />
+	 	<w:rPr>
+	     <w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi" />
+	     <w:color w:val="1F4D78" w:themeColor="accent1" w:themeShade="7F" />
+	     <w:sz w:val="24" />
+	     <w:szCs w:val="24" />
+	 	</w:rPr>
+	 	</w:style>
+	 	<w:style w:type="character" w:customStyle="1" w:styleId="berschrift4Zchn">
+	 	<w:name w:val="Überschrift 4 Zchn" />
+	 	<w:basedOn w:val="Absatz-Standardschriftart" />
+	 	<w:link w:val="berschrift4" />
+	 	<w:uiPriority w:val="9" />
+	 	<w:rsid w:val="002D3244" />
+	 	<w:rPr>
+	     <w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi" />
+	     <w:i />
+	     <w:iCs />
+	     <w:color w:val="2E74B5" w:themeColor="accent1" w:themeShade="BF" />
+	 </w:rPr>
+	 </w:style>

+	   </w:styles>
+	  </pkg:xmlData>
+	 </pkg:part>
+	</pkg:package>
	}

	function itemById(L,id) {
		if(!L||!id) return undefined;
		// given the ID of an element in a list, return the element itself:
//		id = id.trim();
		for( var i=L.length-1;i>-1;i-- )
			if( L[i].id === id ) return L[i];   // return list item
		return undefined
	}

	/* noch nicht relevant, in propertiesOf benötigt
	
	function indexBy( L, p, s ) {
		if(!L||!p||!s) return -1;
		// Return the index of an element in list 'L' whose property 'p' equals searchterm 's':
		// hand in property and searchTerm as string !
		for( var i=L.length-1;i>-1;i-- )
			if (L[i][p] === s) return i;
		return -1
	}
	

	function escapeHTML( str ) {
		return str.replace(/["'&<>]/g, function($0) {
			return "&" + {'"':"quot", "'":"#39", "&":"amp", "<":"lt", ">":"gt"}[$0] + ";";
		})
	};
	
	
	

	function dataTypeOf( dTs, sT, pCid ) {
//		console.debug( dTs, sT, pCid );
		// given an attributeType ID, return it's dataType:
		return itemById( dTs, itemById( sT[pClasses], pCid ).dataType )
		//                    get propertyClass
		//	   get dataType
	}
*/

function storeOOXML( xml ) {
		let zip = new JSZip(),
			i=null, I=null;
		zip.file( "mimetype", xml.mimetype );
		zip.file( "META-INF/container.xml", xml.container );
		zip.file( "OEBPS/content.opf", xml.content );

		// Add the table of contents:
		zip.file( "OEBPS/toc.ncx", xml.toc );
		
		// Add the styles:
		if( xml.styles ) 
			zip.file( "OEBPS/Styles/styles.css", xml.styles );
		
//		zip.file( "OEBPS/Text/title.xhtml", xml.title );
		// Add the hierarchies:
		for( i=0,I=xml.sections.length; i<I; i++ ) {
			zip.file( "OEBPS/Text/sect"+i+".xhtml", xml.sections[i] )
		};

		// Add the images:
		i=xml.images.length;
		next();
		return

		// ---------------
		function addFilePath( u ) {
			if( /^https?:\/\/|^mailto:/i.test( u ) ) {
				// don't change an external link starting with 'http://', 'https://' or 'mailto:'
//				console.debug('addFilePath no change',u);
				return u  		
			};
			// else, add path:
			return opts.filePath+'/'+u.replace( '\\', '/' )
		}
		function next() {
			if( i>0 ) {
				// download next image:
				get( addFilePath(xml.images[--i].id), 'blob', save, next )
			} else {
				// done, store the specifz:
				zip.generateAsync({
						type: "blob"
					})
					.then(function(blob) {
						saveAs(blob, xml.fileName+".xml")
					})
			};
			return 
			
			function fileExt( str ) {
				return str.substring( str.lastIndexOf('.')+1 )
			}
			function fileName( str ) {
				return str.substring( 0, str.lastIndexOf('.') )
			}
		}
		function save(rspO) {
			// gets here only, if the file has been received successfully:
			let name = rspO.responseURL.replace('\\','/').split("/");
			zip.file( 'OEBPS/Images/'+name[name.length-1], rspO.response )
		}
	}

}
