function toOxml( specifData, opts ) {
	"use strict";
	// Create and save an OpenXML document from SpecIF data.
	// OpenXML can be opened by MS-Office, see "OpenXML Explained" by Wouter van Vugt: 
	// http://openxmldeveloper.org/cfs-filesystemfile.ashx/__key/communityserver-components-postattachments/00-00-00-19-70/Open-XML-Explained.pdf
	// Accepts data-sets according to SpecIF v0.10.2 and later.
	// License: Apache 2.0 (https://apache.org/licenses/LICENSE-2.0)

	// Check for missing options:
	if ( !opts ) return null;
//	if( !opts.metaFontSize ) opts.metaFontSize = '70%';	
//	if( !opts.metaFontColor ) opts.metaFontColor = '#0071B9';	// adesso blue
//	if( !opts.linkFontColor ) opts.linkFontColor = '#0071B9';
//	if( !opts.linkFontColor ) opts.linkFontColor = '#005A92';	// darker
//	if( typeof(opts.linkNotUnderlined)!='boolean' ) opts.linkNotUnderlined = false;
	if( typeof(opts.preferPng)!='boolean' ) opts.preferPng = true;
	opts.startRID = 7;
	const maxHeading = 4;  // Headings from 1 to maxHeading are defined
	
	// Create a local list of images, which can be used in OXML:
	// ToDo: Transform SVG to PNG, if not present.
	// ToDo: Determine image size, if not specified,
	// to get the image size, see: https://stackoverflow.com/questions/8903854/check-image-width-and-height-before-upload-with-javascript
	var images = [],
		f = null,
		pend = 0;		// the number of pending operations
	for (var i=0, I=specifData.files.length; i<I; i++) {
		f = specifData.files[i];
		if ( f.blob && ['image/png','image/jpg','image/jpeg'].indexOf(f.type)>-1) {
			pend++;
			// transform the file and continue processing, as soon as all are done:
			image2base64(f)
		}
	};
	if(specifData.files.length==0)
		// start right away:
		createOxml();
	return;

	// Convert an image to base64:
	function image2base64(f) {			
		const reader = new FileReader();
		reader.addEventListener('loadend', function(e) {
			images.push( {id:f.id,type:f.type,b64:e.target.result} );
			if( --pend<1 ) {
				// all images have been converted, continue processing:
				createOxml()
			}
		});
		reader.readAsDataURL(f.blob)
	}
	
// -----------------------
	function createOxml() {
		// create the file content as OXML:

		function createText( specifData, opts ) {
			"use strict";
			// Accepts data-sets according to SpecIF v0.10.4 or v0.11.2 and later.

			// Check for missing options:
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
			
			// set certain SpecIF element names according to the SpecIF version:
			switch( specifData.specifVersion ) {
				case '0.10.0':
				case '0.10.1':
		//			return { result: null, status: 903, statusText: 'SpecIF version '+specifData.specifVersion+' is not any more supported!' };
					console.error('SpecIF version '+specifData.specifVersion+' is not any more supported!');
					return null;
				case '0.10.2':
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
					break;
				default:
					console.error('SpecIF version '+specifData.specifVersion+' is not (yet) supported!');
					return null;
			};
			
			// All required parameters are available, so we can begin.
			const nbsp = '&#160;'; // non-breakable space
			var oxml = {
	//				headings: [],
					sections: [],		// a xhtml file per SpecIF hierarchy
					imageLinks: []
				};
			let imgCnt = 0;
			
			// For each SpecIF hierarchy a xhtml-file is created and returned as subsequent sections:
			for( var h=0,H=specifData.hierarchies.length; h<H; h++ ) {
				oxml.sections.push(
					// The heading of the hierarchy=section:
					wParagraph( {content:specifData.hierarchies[h].title,heading:1} )
					// ... and the content:
					+ renderChildrenOf( specifData.hierarchies[h], 1 )
				)
			};

//			console.debug('oxml',oxml);
			return oxml
			
	/*		function pushHeading( t, pars ) {
				oxml.headings.push({
						id: pars.nodeId,
						title: t,
						section: oxml.sections.length,  // the index of the section in preparation (before it is pushed)
						level: pars.level
				})
			}	
	*/		
			// ---------------
			function titleValOf( r, rC, opts ) {
				// get the title value defined by one of the properties:
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
				// get the title of the resource
				let ic = rC.icon;
				if( typeof(ic)!= 'string' ) ic = '';
				if( ic ) ic += nbsp;
				let ti = titleValOf( r, rC, opts );
				if( !pars || pars.level<1 ) return  (ti?ic+ti:'');  // return raw text

				// SpecIF headings are chapter level 2, all others level 3:
				let h = rC.isHeading?2:3;

				return wParagraph( {content: (ti?ic+ti:''), heading:h, bookmark:pars.nodeId } )
/*				return '<w:p>'
						+        '<w:pPr>'
						+            '<w:pStyle w:val="heading'+h+'" />'
						+        '</w:pPr>'
						+		 '<w:bookmarkStart w:id="bm-'+bookmarkId+'" w:name="_'+pars.nodeId+'"/>'
						+        '<w:r>'
		//              +            '<w:t>'+h+' id="'+pars.nodeId+'" '+(ti?ic+ti:'')+'</w:t>'
						+            '<w:t>'+(ti?ic+ti:'')+'</w:t>'
						+        '</w:r>'
						+		 '<w:bookmarkEnd w:id="bm-'+bookmarkId+'"/>'
						+    '</w:p>'
*/			}	
			
			function statementsOf( r, opts ) {
				// get the statements of the resource as table:
				if( !opts.statementsLabel ) return '';
				let i, I, sts={}, st, cid, oid, sid, r2, noSts=true;
				// Sort statements by type:
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
				if( noSts ) return '';	// no statements ...

				// the heading:
				let ct = wParagraph( {content: opts.statementsLabel, heading: 4} ),
					sTi, row, cell;
				// build a table of the statements/relations by type:
				for( cid in sts ) {
					// we don't have the individual statement's title; so we determine the class to get it's title, instead:
					sTi = itemById(specifData[sClasses],cid).title;

					// 3 columns:
					if( sts[cid].subjects.length>0 ) {
						cell = '';
						for( i=0, I=sts[cid].subjects.length; i<I; i++ ) {
							r2 = sts[cid].subjects[i];
							cell += wParagraph( {content:titleOf( r2, itemById( specifData[rClasses], r2[rClass]), null, opts ), hyperlink:anchorOf( r2 )} )
						};
						row = wTableCell( {content:cell,borders:{type:'single'}} );
						row += wTableCell( {content:wParagraph( sTi ),borders:{type:'single'}});
						row += wTableCell( {content:wParagraph( titleOf( r, itemById(specifData[rClasses],r[rClass]), null, opts ) ),borders:{type:'single'}});
						ct += wTableRow( row )
					};
					
					if( sts[cid].objects.length>0 ) {
						row = wTableCell( {content:wParagraph( titleOf( r, itemById(specifData[rClasses],r[rClass]), null, opts ) ),borders:{type:'single'}});
						row += wTableCell( {content:wParagraph( sTi ),borders:{type:'single'}});
						cell = '';
						for( i=0, I=sts[cid].objects.length; i<I; i++ ) {
							r2 = sts[cid].objects[i];
							cell += wParagraph( {content:titleOf( r2, itemById( specifData[rClasses], r2[rClass]), null, opts ), hyperlink:anchorOf( r2 )} )
						};
						row += wTableCell( {content:cell,borders:{type:'single'}} );
						ct += wTableRow( row )
					}
				};
				console.debug('statementsOf',ct);
				return wTable( ct )
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
				// return the values of all resource's properties as oxml:
				if( !r.properties || r.properties.length<1 ) return '';
				// return the content of all properties, sorted by description and other properties:
				let a=null, A=null, c1='', c2='', c3, hPi=null, rt=null;
				for( a=0,A=r.properties.length; a<A; a++ ) {
					rt = r.properties[a].title;
					// The content of the title property is already used as chapter title; so skip it here:
					if( opts.headingProperties.indexOf(rt)>-1
						|| opts.titleProperties.indexOf(rt)>-1 ) continue;
					// First the resource's description properties in full width:
					if( r.properties[a].value
						&& opts.descriptionProperties.indexOf(rt)>-1 ) {
//							console.debug('description propertiesOf',valOf( r.properties[a] ));
							valOf( r.properties[a] ).forEach(function(e){ c1 += generateOxml(e) })
					}
				};
				console.debug('propertiesOf',r,c1)
				// Skip the remaining properties, if no label is provided:
				if( !opts.propertiesLabel ) return c1;
				
				// Finally, list the remaining properties with title (name) and value:
				for( a=0,A=r.properties.length; a<A; a++ ) {
					rt = r.properties[a].title;
					hPi = indexBy(opts.hiddenProperties,'title',rt);
		
					// skip hidden properties and those which have been included before,
					// namely properties classified as heading, title and description:
					if( opts.hideEmptyProperties && isEmpty(r.properties[a].value)
						|| hPi>-1 && ( opts.hiddenProperties[hPi].value==undefined || opts.hiddenProperties[hPi].value==r.properties[a].value )
						|| opts.headingProperties.indexOf(rt)>-1
						|| opts.titleProperties.indexOf(rt)>-1 
						|| opts.descriptionProperties.indexOf(rt)>-1 ) continue;

					c3 = '';
//					console.debug('other propertiesOf',valOf( r.properties[a] ));
					valOf( r.properties[a] ).forEach(function(e){ c3 += generateOxml(e) });
					c2 += wTableRow( wTableCell( wParagraph(rt)) + wTableCell( c3 ))
				};
				if( !c2 ) return c1;  // no other properties

				return c1 
						+ wParagraph( {content: opts.propertiesLabel, heading: 4} )
						+ wTable( c2 )

				// ---------------
				function parseXhtml( txt, opts ) {
			//		if( !opts ) return txt;
			//		if( opts.rev==undefined ) opts.rev = 0;
					if( !Array.isArray(opts.imgExtensions) ) opts.imgExtensions = [ 'png', 'jpg', 'svg', 'gif', 'jpeg' ];
			//		if( typeof(opts.clickableElements)!='boolean' ) opts.clickableElements = false;

					// Transform an XHTML text to an internal data structure which allows easy generation of OpenXML.
					// While XHTML is block structured, OpenXML expects a series of paragraphs with a series of 'runs' within.
					// Formatting information may be applied both at paragraph and run level.
					// So the original XHTML text is split into pieces ("text runs") with a certain formatting each.
					var  blocks = [];  // the list of identified blocks
					
					// Prepare:
					// Remove empty <div> tags:
			//		txt = txt.replace(/<div[^>]*>\s*<\/div>|<div *\/>/g,'');
			//		// Transform atomic, inner dividers:
			//		txt = txt.replace(/<div>([\s\S]*?)<\/div>/g, function($1,$2) {
			//			// ToDo: Replace by a paragraph without margins,
			//			// if there are no contained paragraphs <p>.
			//			return $2
			//		});
					// Remove remaining, i.e. outer dividers:
			//		txt = txt.replace(/<div[^>]*>|<\/div>/g,'');

					// First identify and separate the blocks:
					splitParagraphs(blocks,txt);
					
					// Finally identify and separate the runs per block:
					blocks.forEach( splitRuns );
					
					console.debug('parseXhtml',txt,blocks);
					return blocks;
					
					function splitParagraphs(bL,txt) {
						// Identify paragraphs and store them in the block list:
						// Note that <ul>, <ol> and <table> are block-level elements like <p> and
						// that none of them may be inside <p>..</p>
						let found;
						do {
							found = false;
							// look for the next block-level construct with any preceding text,
							// be sure to consume the transformed text in every loop.
							// To maintain the sequence, any block-level construct is matched in a first step ...
							txt = txt.replace(/([\s\S]*?)(<p *\/>|<p[^>]*>[\s\S]*?<\/p>|<ul[^>]*>[\s\S]*?<\/ul>|<ol[^>]*>[\s\S]*?<\/ol>|<table[^>]*>[\s\S]*?<\/table>)/, function($1,$2,$3) {
								// ... and then the difference is made:

								// a) <div> enclosed text in the preceding part,
								//    there could be several ones:
								$2 = $2.replace(/<div[^>]*>([\s\S]*?)<\/div>/g, function($1,$2) {
									bL.push( {p:{content:$2}} );
									return ''
								});
								// a) any text preceding the block:
								//    In fact, if the XHTML is properly built, there shouldn't be any content outside the blocks,
								//    but we do not want to ignore any content in case there is ...
								if( !isEmpty($2) ) 
									bL.push( {p:{content:$2}} );
								// b) an empty paragraph:
								if( /<p *\/>/.test($3) ) {
									found = true;
									bL.push( {p:{content:''}} );
									return ''
								};
								// c) a paragraph:
								$3 = $3.replace(/<p[^>]*>([\s\S]*?)<\/p>/, function($1,$2) {
									found = true;
									bL.push( {p:{content:$2}} );
									return ''
								});
								// d) an unordered list:
								$3 = $3.replace(/<ul>([\s\S]*?)<\/ul>/, function($1,$2) {
									$2.replace(/<li>([\s\S]*?)<\/li>/g, function($1,$2) {
										bL.push( {p:{content:$2,style:'bulleted'}} );
										return ''
									});
									return ''
								});
								// e) an ordered list:
								$3 = $3.replace(/<ol>([\s\S]*?)<\/ol>/, function($1,$2) {
									$2.replace(/<li>([\s\S]*?)<\/li>/g, function($1,$2) {
										bL.push( {p:{content:$2,style:'numbered'}} );
										return ''
									});
									return ''
								});
								// f) a table:
								var tbl = {
									rows: []
								};
									function parseRow(str) {
										return str.replace(/<tr>([\s\S]*?)<\/tr>/g, function($1,$2) {
											var cs = [];
											$2 = $2.replace(/<th>([\s\S]*?)<\/th>/g, function($1,$2) {
													// the 'th' cell with it's content
													// ToDo: cell content may consist of several blocks
													cs.push( {content:{p:{content:$2, font:{weight:'bold'}}},borders:{type:'single'}} );
													return ''
													});
											$2 = $2.replace(/<td>([\s\S]*?)<\/td>/g, function($1,$2) {
													// the 'td' cell with it's content
													// ToDo: cell content may consist of several blocks
													cs.push( {content:{p:{content:$2}},borders:{type:'single'}} );
													return ''
													});
											// the row with it's content:
											tbl.rows.push( {cells: cs} );
											return ''
											})
									}
								$3 = $3.replace(/<table[^>]*>([\s\S]*?)<\/table>/, function($1,$2) {
									// for the time being, no difference is made between 'thead', 'tbody' and 'tfoot' sections:
									// the table head with it's content:
									$2 = $2.replace( /<thead>([\s\S]*?)<\/thead>/, function($1,$2) {
										return parseRow($2)
									});
									// the table body with it's content:
									$2 = $2.replace( /<tbody>([\s\S]*?)<\/tbody>/, function($1,$2) {
										return parseRow($2)
									});
									// the table body with it's content:
									$2 = $2.replace( /<tfoot>([\s\S]*?)<\/tfoot>/, function($1,$2) {
										return parseRow($2)
									});
									return blocks.push( {table:tbl} )
								});
								return ''
							})
						} while(found);
						// add the remainder:
						// In fact, if the XHTML is properly built, there shouldn't be any remainder,
						// but we do not want to ignore any content in case there is ...
						// A <div> enclosed text:
						txt = txt.replace(/<div[^>]*>([\s\S]*?)<\/div>/g, function($1,$2) {
							bL.push( {p:{content:$2}} );
							return ''
						});
						if( !isEmpty(txt) ) 
							bL.push( {p:{content:txt}} )
					}
					function splitRuns(bl) {
//						console.debug('splitRuns',bl);
						if( bl.table ) {
							// every table cell may contain XHTML-formatted text:
							for( var i=bl.table.rows.length-1; i>-1; i-- ) 
								for( var j=bl.table.rows[i].cells.length-1; j>-1; j-- ) {
									split( bl.table.rows[i].cells[j].content.p )
								};
							return
						};
						split(bl.p);
						return
						
							function split(p) {
								let txt = p.content,
									fmt = p.font?{font:{weight:p.font.weight,style:p.font.style,color:p.font.color}}:{font:{}};
								p.runs = [];

								txt = txt.replace(/<a href=[^>]*>/g,'');
								txt = txt.replace(/<\/a>/g,'');
								// ToDo: Zeilenumbrüche ersetzen, nicht löschen!
								txt = txt.replace(/<br *\/>/g,'');

								// replace '<' and '>', when used in front of numeric values:
								txt = txt.replace(/<( ?)([.,]?[0-9]+)/g, function ($0,$1,$2){ return '&lt;' + $1 + $2 });
								txt = txt.replace(/>( ?)([.,]?[0-9]+)/g, function ($0,$1,$2){ return '&gt;' + $1 + $2 });
								// replace all remaining '<' and '>':
						//		txt = txt.replace(/</g, function ($0){ return '&lt;' });
						//		txt = txt.replace(/>/g, function ($0){ return '&gt;' });

								// Find the next tag:
								// - for all those which can be nested (such as <b> or <em>), the opening and closing tags are specified individually
								//   to identify any formatting change - the preceding text will be stored as a 'run'.
								// - for all others which cannot be nested and which cannot contain others (such as <object>), the pair is specified.
								//   In that case, the total construct is stored as a run.
								txt = txt.replace(/([\s\S]*?)(<b>|<\/b>|<i>|<\/i>|<em>|<\/em>|<span[^>]*>|<\/span>|<object[^>]+\/>|<object[^>]+>[\s\S]*?<\/object>)/g, function($0,$1,$2) {
									// store the preceding run with a clone of the current formatting:
									if( !isEmpty($1) )
										p.runs.push({content:$1,font:cloneOf(fmt.font)});

									// remove the next tag and update the formatting,
									// $2 can only be one of the following:
									if( /<b>/.test($2) )
										fmt.font.weight = 'bold';
									if( /<\/b>/.test($2) )
										delete fmt.font.weight;	// simply, since there is only one value so far.
									// assuming that <i> and <em> are not nested:
									if( /<i>|<em>/.test($2) )
										fmt.font.style = 'italic';
									if( /<\/i>|<\/em>/.test($2) )
										delete fmt.font.style;	// simply, since there is only one value so far.
									// ToDo: simplify:
									$2 = $2.replace(/<span([^>]*)>/, function($0,$1) {
										// for the time being, extract just any color information:
										let c = /color: ?#([0-9a-fA-F]{6})/.exec($1);
										if( c && c.length>1 )
											fmt.font.color = c[1].toUpperCase();
//											console.debug('<span>',fmt);
									});
									if( /<\/span>/.test($2) )
										delete fmt.font.color;	// simply, since there is only one value so far.
									if( /<object[^>]+\/>|<object[^>]+>[\s\S]*?<\/object>/.test($2) ) {
										p.runs.push(parseObject( $2 ))
									};
									return ''  // be sure to consume the matched text
								});
								// finally store the remainder:
								p.runs.push({content:txt,font:fmt.font});
								delete p.content;
								delete p.font
							}
					}

					function parseObject(txt) {
						// Parse <object> tag, usually with an image or file reference
						// and return a 'run' element:

							function getType( str ) {
								var t = /type="([^"]+)"/.exec( str );
								if( t==null ) return '';
								return (' '+t[1])
							}
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
							function nameOf( str ) {
								return str.substring( 0, str.lastIndexOf('.') )
							}
							function pushReferencedFile( u, t ) {
			//					console.debug('u',u);
								// avoid duplicate entries:
								let n = indexBy( oxml.imageLinks, 'id', u );
								if( n<0 ) {
									n = oxml.imageLinks.length;
									oxml.imageLinks.push({
										ref: opts.startRID + n,
										id: u,  // is the distinguishing/relative part of the URL
										title: t,
										type: extOf(u)
									})
								};
								return opts.startRID + n
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
						let atts = /<object([^>]+)>[\s\S]*?<object([^>]+)(\/>|>([\s\S]*?)<\/object>)[\s\S]*?<\/object>/.exec(txt),
							run = {};
						if( atts && atts.length>4 ) {
//							function( $0, $1, $2, $3, $4 ){ 
							var u1 = getUrl( atts[1] ).replace('\\','/'),  	// the primary information
		//						t1 = getType( atts[1] ), 
								u2 = getUrl( atts[2] ).replace('\\','/'), 	// the preview image
								t2 = getType( atts[2] ),
								// If there is no description, use the name of the link target:
								d = withoutPath( atts[4] || u1 ),			// the description
								e = extOf(u2);								// the file extension
							
							// if the type is svg, png is preferred and available, replace it:
							let png = itemById( specifData.files, nameOf(u2)+'.png' );
							if( t2.indexOf('svg')>-1 && opts.preferPng && png ) {
								u2 = png.id.replace('\\','/');
								t2 = "application/png"
						//		t2 = png.type
							} 
		//					let i2 = hashCode(u2)+'.'+extOf(u2);
		//					console.debug( $0, d, u1, u2, t2 );
							
							// find the image to get width and height
		//					img = itemById(specifData.files,u2);
		//					...
		// to get the image size, see: https://stackoverflow.com/questions/8903854/check-image-width-and-height-before-upload-with-javascript
		
							imgCnt = pushReferencedFile( u2, d );
		//					oxml.imageLinks.push({ref:imageIDcount,id:u2.replace('\\','/'),type:extOf(u2)});
							run = {picture:{idx:imgCnt,id:u1,title:d,width:'200pt',height:'100pt'}}
							console.debug('parseObject',run);
							return run
						};
							
						// 2. transform a single object to link+object resp. link+image:
						//      For example, the ARCWAY Cockpit export uses this pattern:
						//			<object data=\"files_and_images\\27420ffc0000c3a8013ab527ca1b71f5.svg\" name=\"27420ffc0000c3a8013ab527ca1b71f5.svg\" type=\"image/svg+xml\"/>
						atts = /<object([^>]+)(\/>|>([\s\S]*?)<\/object>)/.exec(txt);   //  comprehensive tag or tag pair
						if( atts && atts.length>3 ) {
//							function( $0, $1, $2, $3 ){ 
							let u1 = getUrl( atts[1] ).replace('\\','/'), 
								t1 = getType( atts[1] ),
								d = withoutPath( atts[3] || u1 ),	// the description
								e = extOf(u1).toLowerCase();		// the file extension
		//					if( !e ) return $0

		//					// $3 is the description between the tags <object></object>:
		//					let d = />([^<]*)<\/object>$/i.exec($2);    	// the description is in d[1]
		//					if( d && d[1].length ) d = withoutPath( d[1] )	// if there is a description, use it
		//					else d = withoutPath( u1 );						// use the target name, otherwise
		//					let d = withoutPath( $3 || u1 );
								
		//					let hasImg = true;
		//					console.debug( $0, $1, 'url: ', u1, 'ext: ', e );
								
							let png = itemById( specifData.files, nameOf(u1)+'.png' );
							
							if( opts.imgExtensions.indexOf( e )>-1 ) {  
								// it is an image, show it:
								
								// if the type is svg, png is preferred and available, replace it:
								if( t1.indexOf('svg')>-1 && opts.preferPng && png ) {
									u1 = png.id.replace('\\','/');
									t1 = png.type
								};
		//						let i1 = hashCode(u1)+'.'+extOf(u1);
		//						console.debug('u1',u1.replace('\\','/'));
								imgCnt = pushReferencedFile( u1, d );
		//						oxml.imageLinks.push({ref:imageIDcount,id:u1.replace('\\','/'),type:extOf(u1)});
								
								run = {picture:{idx:imgCnt,title:d,width:'200pt',height:'100pt'}}
								
							} else {
								
								if( e=='ole' && png ) {  
									// It is an ole-file, so add a preview image;
									u1 = png.id.replace('\\','/');
									t1 = png.mimeType;
		//							let i1 = hashCode(u1)+'.'+extOf(u1);
		//							console.debug('u2', u1);
									imgCnt = pushReferencedFile( u1, d );
		//							oxml.imageLinks.push({ref:imageIDcount,id:u1.replace('\\','/'),type:extOf(u1)});
									
									run = {picture:{idx:imgCnt,id:u1,title:d,width:'200pt',height:'100pt'}}

								} else {
									// in absence of an image, just show the description:
		//							hasImg = false; 
									run = {content:d}
								}
							};
							console.debug('parseObject',r);
							return run
						};
						return null 	// should never arrive here
					}
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
					// return the value of a single property
					// as a list of paragraphs in normalized (internal) data structure,
					// where XHTML-formatted text is parsed.
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
							return [{p:{content:ct}}];
						case 'xhtml':
//							return titleLinks( parseXhtml( pr.value, opts ), opts );
							return parseXhtml( pr.value, opts );
//						case 'xs:string':
//							return titleLinks( pr.value, opts );
						default:
							return [{p:{content:pr.value}}]
					}
				}
				function isEmpty( str ) {
					// check whether str has content or a file reference:
		//			console.debug('str',str);
					return str.replace(/<[^>]+>/g, '').trim().length<1	// strip HTML and trim
						&& !/<object[^>]+(\/>|>[\s\S]*?<\/object>)/.test(str)
						&& !/<img[^>]+(\/>|>[\s\S]*?<\/img>)/.test(str)
				}
			}
			function renderChildrenOf( nd, lvl ) {
				// For each of the children of specified hierarchy node 'nd', 
				// write a paragraph for the referenced resource:
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
						+	renderChildrenOf( nd.nodes[i], lvl+1 )					// rekursiv für den Unterbaum - Chapter
				};
				return ch
			}

			function generateOxml( ct ) {
				if( Array.isArray(ct) ) {
					var bs = '';
					ct.forEach( function(b) {
						bs += single(b) 
					});
					return bs
				};
				return single(ct)

					function single(ct) {
						if( ct.p )
							return wParagraph( ct.p )
						if( ct.table ) {
							var rs = '';
							ct.table.rows.forEach( function(r) {
								var cs = '';
								r.cells.forEach( function(c) {
									cs += wTableCell( wParagraph( c.p ) )
								});
								rs += wTableRow( cs )
							});
							return wTable( rs )
						}
					}
			}
			function wParagraph( ct ) {
				console.debug('wParagraph',ct)
				// ct is simple text without any option:
				if( typeof(ct) == 'string' ) 
					return '<w:p>'+wRun(ct)+'</w:p>';
				// else, ct is an object with options.
				// the following options are implemented:
				// - 0 < heading < maxHeading+1
				// - font.weight == 'bold'
				// - style == 'bulleted'
				// - style == 'numbered'
				// - hyperlink to an internal 'bookmark'
				// - bookmark
				if( ct.content ) {
					// ct is an object with property 'content' and individual formatting option:
					ct.runs = [{content:ct.content,font:ct.font}]; // clone
					delete ct.content
				};
				if( Array.isArray(ct.runs) ) {
					// multiple text items with individual formatting options:
					let p = '';
					ct.runs.forEach( function(r) {
						p += wRun(r)
					});
//					console.debug('wP.run',ct.runs[i]);
					if( ct.style=='bulleted' ) {
						return '<w:p><w:pPr><w:pStyle w:val="Listenabsatz"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr><w:rPr></w:rPr></w:pPr><w:bookmarkStart w:id="0" w:name="_GoBack"/>'
								+ p
								+ '</w:p>'
					};
					if( ct.style=='numbered' ) {
						// ToDo: use style for ordered lists:
						return '<w:p><w:pPr><w:pStyle w:val="Listenabsatz"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr><w:rPr></w:rPr></w:pPr><w:bookmarkStart w:id="0" w:name="_GoBack"/>'
								+ p
								+ '</w:p>'
					};
					// default:
					return '<w:p>'+pPr(ct)+p+'</w:p>'
				};
				return null  // should never arrive here
				
				function pPr(ct) {
//					console.debug('pPr',ct);
					let lvl = ct.heading;
					if( typeof(lvl) != 'number' || lvl<1 ) return '';
					return 	'<w:pPr><w:pStyle w:val="heading'+Math.min(lvl,maxHeading)+'" /></w:pPr>'
				}
			}
			function wRun( ct ) {
				if( ct.picture )
					return '<w:r>'+wPict(ct)+'</w:r>';
				if( ct.hyperlink ) 
					return '<w:hyperlink w:anchor="_'+ct.hyperlink+'"><w:r><w:rPr><w:rStyle w:val="Hyperlink"/></w:rPr>'+wText(ct)+'</w:r></w:hyperlink>';
				if( ct.bookmark )
					var bmId = 'bm-'+ hashCode(ct.bookmark);
				return 	(bmId?'<w:bookmarkStart w:id="'+bmId+'" w:name="_'+ct.bookmark+'"/>':'')	
					+ 			'<w:r>'+rPr(ct)+wText(ct)+'</w:r>'
					+	(bmId?'<w:bookmarkEnd w:id="'+bmId+'"/>':'')
					
					function rPr(ct) {
						if( ct.font ) {
							return 	'<w:rPr>'
								+		(ct.font.weight=='bold'?'<w:b/>':'')
								+ 		(ct.font.style=='italic'?'<w:i/>':'')
								+ 		(ct.font.color?'<w:color w:val="'+ct.font.color+'"/>':'')
								+	'</w:rPr>'
						};
						// default:
						return ''
					}
			}
			function wText( ct ) {
				return '<w:t xml:space="preserve">'+(typeof(ct)=='string'?ct:ct.content)+'</w:t>'
			}
			function wPict( pic ) {
				// inserts an image at 'run' level:
				// width, height: a string with number and unit, e.g. '100pt' is expected
				console.debug('wPict',pic);
				return	'<w:pict>'
					+		'<v:shape id="_x0000_i1026" type="#_x0000_t75" style="width:'+pic.picture.width+';height:'+pic.picture.height+'">'
					+			'<v:imagedata r:id="rId'+pic.picture.idx+'" o:title="'+pic.picture.title+'"/>'
					+		'</v:shape>'
					+	'</w:pict>'
			}
			// some helpers to build a table with its rows and cells:
			function wTable( ct ) {
				return 	'<w:tbl>'
					+		'<w:tblPr>'
					+			'<w:tblStyle w:val="Tabellenraster"/>'
					+			'<w:tblW w:w="0" w:type="auto"/>'
					+			'<w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/>'
					+		'</w:tblPr>'
					+ 	ct
					+	'</w:tbl>'
			}
			function wTableRow( ct ) {
				return 	'<w:tr>' 
					+	ct 
					+	'</w:tr>'
			}
			function wTableCell( c ) {
				console.debug('wTableCell',c);
				return '<w:tc>'
					+	'<w:tcPr>'
					+		'<w:tcW w:w="0" w:type="auto"/>'
					+		tcBorders(c)
//					+		'<w:tcMar>'
//					+			'<w:left w:w="20" w:type="dxa"/>'
//					+			'<w:right w:w="20" w:type="dxa"/>'
//					+		'</w:tcMar>'
					+		'<w:vAlign w:val="center"/>'
					+	'</w:tcPr>'
					+ (c.content || c)
					+ '</w:tc>'
					
					function tcBorders(c) {
						if( !c.borders ) return '';
						return 	'<w:tcBorders>'
							+		'<w:top w:val="'+(c.borders.type||'single')+'" w:sz="'+(c.borders.width||4)+'" w:space="0" w:color="'+(c.borders.color||'DDDDDD')+'"/>'
							+		'<w:left w:val="'+(c.borders.type||'single')+'" w:sz="'+(c.borders.width||4)+'" w:space="0" w:color="'+(c.borders.color||'DDDDDD')+'"/>'
							+		'<w:bottom w:val="'+(c.borders.type||'single')+'" w:sz="'+(c.borders.width||4)+'" w:space="0" w:color="'+(c.borders.color||'DDDDDD')+'"/>'
							+		'<w:right w:val="'+(c.borders.type||'single')+'" w:sz="'+(c.borders.width||4)+'" w:space="0" w:color="'+(c.borders.color||'DDDDDD')+'"/>'
							+	'</w:tcBorders>'
					}
			}
			
			function dataTypeOf( dTs, sT, pCid ) {
				// given an attributeType ID, return it's dataType:
				return itemById( dTs, itemById( sT[pClasses], pCid ).dataType )
				//                    get propertyClass
				//	   get dataType
			}
		}  // end of 'createText'

	// Start processing 'createOxml':	
	let i=null, I=null, 
		file = createText( specifData, opts );

	file.name = specifData.title;
	file.parts = [];
//	console.debug( 'oxml',file );
	
	file.parts.push( packGlobalRels() );
	file.parts.push( packRels(file.imageLinks) );
	file.parts.push( packDoc(file.sections) );

	// picture content section
	console.debug('files',specifData.files,images,file.imageLinks);
	for (let a=0,A=file.imageLinks.length;a<A;a++) {
		file.parts.push( packImg(a+1,file.imageLinks[a]) )
	};

	file.content = packFile( file.parts );
//	console.debug('file',file);
	store( file );
	}  // end of 'createOxml'

	function packGlobalRels() {
		return '<pkg:part pkg:name="/_rels/.rels" pkg:contentType="application/vnd.openxmlformats-package.relationships+xml" pkg:padding="512">'
		+		'<pkg:xmlData>'
		+			'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
		+				'<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml" />'
		+				'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml" />'
		+				'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml" />'
		+			'</Relationships>'
		+		'</pkg:xmlData>'
		+	'</pkg:part>'
	}
	function packRels( imgL ) {
		var ct = '<pkg:part pkg:name="/word/_rels/document.xml.rels" pkg:contentType="application/vnd.openxmlformats-package.relationships+xml" pkg:padding="256">'
		+		'<pkg:xmlData>'
		+			'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">	'
		+			'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>'
		+			'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
		+			'<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>'
		+			'<Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings" Target="webSettings.xml"/>'
		+			'<Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable" Target="fontTable.xml"/>'
		+			'<Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>';
		// opts.startRID is set to the next index, i.e. 7
		// ToDo: Attention, duplicate Ids are used, but this is the case with MS-generated files, as well ...

		// a line for each image to link the text to the image
		//console.debug('file.imageLinks',file.imageLinks);			
		for (let a=0,A=imgL.length;a<A;a++) {
			ct += '<Relationship Id="rId'+(imgL[a].ref)+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image'+(a+1)+'.'+imgL[a].type+'"/>'
		};
		
		ct +=		'</Relationships>'
		+		' </pkg:xmlData>'
		+	'</pkg:part>';
		return ct
	}
	function packImg( idx, b64 ) {
		const lineLength = 76;
		var ct = '<pkg:part pkg:name="/word/media/image'+idx+'.'+b64.type+'" pkg:contentType="image/'+b64.type+'" pkg:compression="store">'
		+			'<pkg:binaryData>'
		// find the referenced image:
		let imgIdx = indexById(images,b64.id),
			startIdx = images[imgIdx].b64.indexOf(',')+1;	// image data starts after the ','

		// add the image line by line:
		for (var k=startIdx, K=images[imgIdx].b64.length; k<K; k+=lineLength) {
			ct += images[imgIdx].b64.slice(k,k+lineLength) + String.fromCharCode(13)+String.fromCharCode(10) 
		};
		ct +=		'</pkg:binaryData>'
			+'</pkg:part>';
		return ct
	}
	function packDoc( sects ) {
		var ct = '<pkg:part pkg:name="/word/document.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml">'
		+			'<pkg:xmlData>'
		+				'<w:document mc:Ignorable="w14 w15 wp14" xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">'
		+					'<w:body>';

		for( var h=0,H=sects.length; h<H; h++ ) {
			ct += sects[h]
		}
		
		ct += 					'<w:sectPr w:rsidR="00AE0319">'
		+							'<w:pgSz w:w="11906" w:h="16838"/>'
		+							'<w:pgMar w:top="1417" w:right="1417" w:bottom="1134" w:left="1417" w:header="708" w:footer="708" w:gutter="0"/>'
		+							'<w:cols w:space="708"/>'
		+							'<w:docGrid w:linePitch="360"/>'
		+						'</w:sectPr>'
		+					'</w:body>'
		+				'</w:document>'
		+			'</pkg:xmlData>'
		+		'</pkg:part>';
		return ct
	}
	function packFile( partL ) {
		// document begin:				
		var ct = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
		+	'<?mso-application progid="Word.Document"?>	'
		+	'<pkg:package xmlns:pkg="http://schemas.microsoft.com/office/2006/xmlPackage">';
		
		for(var p=0,P=partL.length;p<P;p++ ) {
			ct += partL[p]
//			console.log('part',partL[p])
		};
	
		// document end:
		ct += '		<pkg:part pkg:name="/word/theme/theme1.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.theme+xml">											'
		+	'			<pkg:xmlData>										'
		+	'				<a:theme name="Office Theme" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">									'
		+	'					<a:themeElements>								'
		+	'						<a:clrScheme name="Office">							'
		+	'							<a:dk1>						'
		+	'								<a:sysClr val="windowText" lastClr="000000"/>					'
		+	'							</a:dk1>'
		+	'							<a:lt1>'
		+	'								<a:sysClr val="window" lastClr="FFFFFF"/>'
		+	'							</a:lt1>'
		+	'							<a:dk2>'
		+	'								<a:srgbClr val="44546A"/>'
		+	'							</a:dk2>						'
		+	'							<a:lt2>						'
		+	'								<a:srgbClr val="E7E6E6"/>					'
		+	'							</a:lt2>						'
		+	'							<a:accent1>						'
		+	'								<a:srgbClr val="5B9BD5"/>					'
		+	'							</a:accent1>						'
		+	'							<a:accent2>						'
		+	'								<a:srgbClr val="ED7D31"/>					'
		+	'							</a:accent2>						'
		+	'							<a:accent3>						'
		+	'								<a:srgbClr val="A5A5A5"/>					'
		+	'							</a:accent3>						'
		+	'							<a:accent4>						'
		+	'								<a:srgbClr val="FFC000"/>					'
		+	'							</a:accent4>						'
		+	'							<a:accent5>						'
		+	'								<a:srgbClr val="4472C4"/>					'
		+	'							</a:accent5>						'
		+	'							<a:accent6>						'
		+	'								<a:srgbClr val="70AD47"/>					'
		+	'							</a:accent6>						'
		+	'							<a:hlink>						'
		+	'								<a:srgbClr val="0563C1"/>					'
		+	'							</a:hlink>						'
		+	'							<a:folHlink>						'
		+	'								<a:srgbClr val="954F72"/>					'
		+	'							</a:folHlink>						'
		+	'						</a:clrScheme>							'
		+	'						<a:fontScheme name="Office">							'
		+	'							<a:majorFont>						'
		+	'								<a:latin typeface="Calibri Light" panose="020F0302020204030204"/>					'
		+	'								<a:ea typeface=""/>					'
		+	'								<a:cs typeface=""/>					'
		+	'								<a:font script="Jpan" typeface="ＭＳ ゴシック"/>					'
		+	'								<a:font script="Hang" typeface="맑은 고딕"/>					'
		+	'								<a:font script="Hans" typeface="宋体"/>					'
		+	'								<a:font script="Hant" typeface="新細明體"/>					'
		+	'								<a:font script="Arab" typeface="Times New Roman"/>					'
		+	'								<a:font script="Hebr" typeface="Times New Roman"/>					'
		+	'								<a:font script="Thai" typeface="Angsana New"/>					'
		+	'								<a:font script="Ethi" typeface="Nyala"/>					'
		+	'								<a:font script="Beng" typeface="Vrinda"/>					'
		+	'								<a:font script="Gujr" typeface="Shruti"/>					'
		+	'								<a:font script="Khmr" typeface="MoolBoran"/>					'
		+	'								<a:font script="Knda" typeface="Tunga"/>					'
		+	'								<a:font script="Guru" typeface="Raavi"/>					'
		+	'								<a:font script="Cans" typeface="Euphemia"/>					'
		+	'								<a:font script="Cher" typeface="Plantagenet Cherokee"/>					'
		+	'								<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>					'
		+	'								<a:font script="Tibt" typeface="Microsoft Himalaya"/>					'
		+	'								<a:font script="Thaa" typeface="MV Boli"/>					'
		+	'								<a:font script="Deva" typeface="Mangal"/>					'
		+	'								<a:font script="Telu" typeface="Gautami"/>					'
		+	'								<a:font script="Taml" typeface="Latha"/>					'
		+	'								<a:font script="Syrc" typeface="Estrangelo Edessa"/>					'
		+	'								<a:font script="Orya" typeface="Kalinga"/>					'
		+	'								<a:font script="Mlym" typeface="Kartika"/>					'
		+	'								<a:font script="Laoo" typeface="DokChampa"/>					'
		+	'								<a:font script="Sinh" typeface="Iskoola Pota"/>					'
		+	'								<a:font script="Mong" typeface="Mongolian Baiti"/>					'
		+	'								<a:font script="Viet" typeface="Times New Roman"/>					'
		+	'								<a:font script="Uigh" typeface="Microsoft Uighur"/>					'
		+	'								<a:font script="Geor" typeface="Sylfaen"/>					'
		+	'							</a:majorFont>						'
		+	'							<a:minorFont>						'
		+	'								<a:latin typeface="Calibri" panose="020F0502020204030204"/>					'
		+	'								<a:ea typeface=""/>					'
		+	'								<a:cs typeface=""/>					'
		+	'								<a:font script="Jpan" typeface="ＭＳ 明朝"/>					'
		+	'								<a:font script="Hang" typeface="맑은 고딕"/>					'
		+	'								<a:font script="Hans" typeface="宋体"/>					'
		+	'								<a:font script="Hant" typeface="新細明體"/>					'
		+	'								<a:font script="Arab" typeface="Arial"/>					'
		+	'								<a:font script="Hebr" typeface="Arial"/>					'
		+	'								<a:font script="Thai" typeface="Cordia New"/>					'
		+	'								<a:font script="Ethi" typeface="Nyala"/>					'
		+	'								<a:font script="Beng" typeface="Vrinda"/>					'
		+	'								<a:font script="Gujr" typeface="Shruti"/>					'
		+	'								<a:font script="Khmr" typeface="DaunPenh"/>					'
		+	'								<a:font script="Knda" typeface="Tunga"/>					'
		+	'								<a:font script="Guru" typeface="Raavi"/>					'
		+	'								<a:font script="Cans" typeface="Euphemia"/>					'
		+	'								<a:font script="Cher" typeface="Plantagenet Cherokee"/>					'
		+	'								<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>					'
		+	'								<a:font script="Tibt" typeface="Microsoft Himalaya"/>					'
		+	'								<a:font script="Thaa" typeface="MV Boli"/>					'
		+	'								<a:font script="Deva" typeface="Mangal"/>					'
		+	'								<a:font script="Telu" typeface="Gautami"/>					'
		+	'								<a:font script="Taml" typeface="Latha"/>					'
		+	'								<a:font script="Syrc" typeface="Estrangelo Edessa"/>					'
		+	'								<a:font script="Orya" typeface="Kalinga"/>					'
		+	'								<a:font script="Mlym" typeface="Kartika"/>					'
		+	'								<a:font script="Laoo" typeface="DokChampa"/>					'
		+	'								<a:font script="Sinh" typeface="Iskoola Pota"/>					'
		+	'								<a:font script="Mong" typeface="Mongolian Baiti"/>					'
		+	'								<a:font script="Viet" typeface="Arial"/>					'
		+	'								<a:font script="Uigh" typeface="Microsoft Uighur"/>					'
		+	'								<a:font script="Geor" typeface="Sylfaen"/>					'
		+	'							</a:minorFont>						'
		+	'						</a:fontScheme>							'
		+	'						<a:fmtScheme name="Office">							'
		+	'							<a:fillStyleLst>						'
		+	'								<a:solidFill>					'
		+	'									<a:schemeClr val="phClr"/>				'
		+	'								</a:solidFill>					'
		+	'								<a:gradFill rotWithShape="1">					'
		+	'									<a:gsLst>				'
		+	'										<a:gs pos="0">			'
		+	'											<a:schemeClr val="phClr">		'
		+	'												<a:lumMod val="110000"/>	'
		+	'												<a:satMod val="105000"/>	'
		+	'												<a:tint val="67000"/>	'
		+	'											</a:schemeClr>		'
		+	'										</a:gs>			'
		+	'										<a:gs pos="50000">			'
		+	'											<a:schemeClr val="phClr">		'
		+	'												<a:lumMod val="105000"/>	'
		+	'												<a:satMod val="103000"/>	'
		+	'												<a:tint val="73000"/>	'
		+	'											</a:schemeClr>		'
		+	'										</a:gs>			'
		+	'										<a:gs pos="100000">			'
		+	'											<a:schemeClr val="phClr">		'
		+	'												<a:lumMod val="105000"/>	'
		+	'												<a:satMod val="109000"/>	'
		+	'												<a:tint val="81000"/>	'
		+	'											</a:schemeClr>		'
		+	'										</a:gs>			'
		+	'									</a:gsLst>				'
		+	'									<a:lin ang="5400000" scaled="0"/>				'
		+	'								</a:gradFill>					'
		+	'								<a:gradFill rotWithShape="1">					'
		+	'									<a:gsLst>				'
		+	'										<a:gs pos="0">			'
		+	'											<a:schemeClr val="phClr">		'
		+	'												<a:satMod val="103000"/>	'
		+	'												<a:lumMod val="102000"/>	'
		+	'												<a:tint val="94000"/>	'
		+	'											</a:schemeClr>		'
		+	'										</a:gs>			'
		+	'										<a:gs pos="50000">			'
		+	'											<a:schemeClr val="phClr">		'
		+	'												<a:satMod val="110000"/>	'
		+	'												<a:lumMod val="100000"/>	'
		+	'												<a:shade val="100000"/>	'
		+	'											</a:schemeClr>		'
		+	'										</a:gs>			'
		+	'										<a:gs pos="100000">			'
		+	'											<a:schemeClr val="phClr">		'
		+	'												<a:lumMod val="99000"/>	'
		+	'												<a:satMod val="120000"/>	'
		+	'												<a:shade val="78000"/>	'
		+	'											</a:schemeClr>		'
		+	'										</a:gs>			'
		+	'									</a:gsLst>				'
		+	'									<a:lin ang="5400000" scaled="0"/>				'
		+	'								</a:gradFill>					'
		+	'							</a:fillStyleLst>						'
		+	'							<a:lnStyleLst>						'
		+	'								<a:ln w="6350" cap="flat" cmpd="sng" algn="ctr">					'
		+	'									<a:solidFill>				'
		+	'										<a:schemeClr val="phClr"/>			'
		+	'									</a:solidFill>				'
		+	'									<a:prstDash val="solid"/>				'
		+	'									<a:miter lim="800000"/>				'
		+	'								</a:ln>					'
		+	'								<a:ln w="12700" cap="flat" cmpd="sng" algn="ctr">					'
		+	'									<a:solidFill>				'
		+	'										<a:schemeClr val="phClr"/>			'
		+	'									</a:solidFill>				'
		+	'									<a:prstDash val="solid"/>				'
		+	'									<a:miter lim="800000"/>				'
		+	'								</a:ln>					'
		+	'								<a:ln w="19050" cap="flat" cmpd="sng" algn="ctr">					'
		+	'									<a:solidFill>				'
		+	'										<a:schemeClr val="phClr"/>			'
		+	'									</a:solidFill>				'
		+	'									<a:prstDash val="solid"/>				'
		+	'									<a:miter lim="800000"/>				'
		+	'								</a:ln>					'
		+	'							</a:lnStyleLst>						'
		+	'							<a:effectStyleLst>						'
		+	'								<a:effectStyle>					'
		+	'									<a:effectLst/>				'
		+	'								</a:effectStyle>					'
		+	'								<a:effectStyle>					'
		+	'									<a:effectLst/>				'
		+	'								</a:effectStyle>					'
		+	'								<a:effectStyle>					'
		+	'									<a:effectLst>				'
		+	'										<a:outerShdw blurRad="57150" dist="19050" dir="5400000" algn="ctr" rotWithShape="0">			'
		+	'											<a:srgbClr val="000000">		'
		+	'												<a:alpha val="63000"/>	'
		+	'											</a:srgbClr>		'
		+	'										</a:outerShdw>			'
		+	'									</a:effectLst>				'
		+	'								</a:effectStyle>					'
		+	'							</a:effectStyleLst>						'
		+	'							<a:bgFillStyleLst>						'
		+	'								<a:solidFill>					'
		+	'									<a:schemeClr val="phClr"/>				'
		+	'								</a:solidFill>					'
		+	'								<a:solidFill>					'
		+	'									<a:schemeClr val="phClr">				'
		+	'										<a:tint val="95000"/>			'
		+	'										<a:satMod val="170000"/>			'
		+	'									</a:schemeClr>				'
		+	'								</a:solidFill>					'
		+	'								<a:gradFill rotWithShape="1">					'
		+	'									<a:gsLst>				'
		+	'										<a:gs pos="0">			'
		+	'											<a:schemeClr val="phClr">		'
		+	'												<a:tint val="93000"/>	'
		+	'												<a:satMod val="150000"/>	'
		+	'												<a:shade val="98000"/>	'
		+	'												<a:lumMod val="102000"/>	'
		+	'											</a:schemeClr>		'
		+	'										</a:gs>			'
		+	'										<a:gs pos="50000">			'
		+	'											<a:schemeClr val="phClr">		'
		+	'												<a:tint val="98000"/>	'
		+	'												<a:satMod val="130000"/>	'
		+	'												<a:shade val="90000"/>	'
		+	'												<a:lumMod val="103000"/>	'
		+	'											</a:schemeClr>		'
		+	'										</a:gs>			'
		+	'										<a:gs pos="100000">			'
		+	'											<a:schemeClr val="phClr">		'
		+	'												<a:shade val="63000"/>	'
		+	'												<a:satMod val="120000"/>	'
		+	'											</a:schemeClr>		'
		+	'										</a:gs>			'
		+	'									</a:gsLst>				'
		+	'									<a:lin ang="5400000" scaled="0"/>				'
		+	'								</a:gradFill>					'
		+	'							</a:bgFillStyleLst>						'
		+	'						</a:fmtScheme>							'
		+	'					</a:themeElements>								'
		+	'					<a:objectDefaults/>								'
		+	'					<a:extraClrSchemeLst/>								'
		+	'					<a:extLst>								'
		+	'						<a:ext uri="{05A4C25C-085E-4340-85A3-A5531E510DB2}">							'
		+	'							<thm15:themeFamily name="Office Theme" id="{62F939B6-93AF-4DB8-9C6B-D6C7DFDC589F}" vid="{4A3C46E8-61CC-4603-A589-7422A47A8E4A}" xmlns:thm15="http://schemas.microsoft.com/office/thememl/2012/main"/>						'
		+	'						</a:ext>							'
		+	'					</a:extLst>								'
		+	'				</a:theme>									'
		+	'			</pkg:xmlData>										'
		+	'		</pkg:part>											'
		+	'		<pkg:part pkg:name="/word/settings.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml">											'
		+	'			<pkg:xmlData>										'
		+	'				<w:settings mc:Ignorable="w14 w15" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:sl="http://schemas.openxmlformats.org/schemaLibrary/2006/main">									'
		+	'					<w:zoom w:percent="100"/>								'
		+	'					<w:defaultTabStop w:val="708"/>								'
		+	'					<w:hyphenationZone w:val="425"/>								'
		+	'					<w:characterSpacingControl w:val="doNotCompress"/>								'
		+	'					<w:compat>								'
		+	'						<w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/>							'
		+	'						<w:compatSetting w:name="overrideTableStyleFontSizeAndJustification" w:uri="http://schemas.microsoft.com/office/word" w:val="1"/>							'
		+	'						<w:compatSetting w:name="enableOpenTypeFeatures" w:uri="http://schemas.microsoft.com/office/word" w:val="1"/>							'
		+	'						<w:compatSetting w:name="doNotFlipMirrorIndents" w:uri="http://schemas.microsoft.com/office/word" w:val="1"/>							'
		+	'						<w:compatSetting w:name="differentiateMultirowTableHeaders" w:uri="http://schemas.microsoft.com/office/word" w:val="1"/>							'
		+	'					</w:compat>								'
		+	'					<w:rsids>								'
		+	'						<w:rsidRoot w:val="00932176"/>							'
		+	'						<w:rsid w:val="002D0214"/>							'
		+	'						<w:rsid w:val="00932176"/>							'
		+	'						<w:rsid w:val="00AE0319"/>							'
		+	'						<w:rsid w:val="00B15970"/>							'
		+	'						<w:rsid w:val="00CC7C02"/>							'
		+	'						<w:rsid w:val="00DA07AE"/>							'
		+	'					</w:rsids>								'
		+	'					<m:mathPr>								'
		+	'						<m:mathFont m:val="Cambria Math"/>							'
		+	'						<m:brkBin m:val="before"/>							'
		+	'						<m:brkBinSub m:val="--"/>							'
		+	'						<m:smallFrac m:val="0"/>							'
		+	'						<m:dispDef/>							'
		+	'						<m:lMargin m:val="0"/>							'
		+	'						<m:rMargin m:val="0"/>							'
		+	'						<m:defJc m:val="centerGroup"/>							'
		+	'						<m:wrapIndent m:val="1440"/>							'
		+	'						<m:intLim m:val="subSup"/>							'
		+	'						<m:naryLim m:val="undOvr"/>							'
		+	'					</m:mathPr>								'
		+	'					<w:themeFontLang w:val="de-DE"/>								'
		+	'					<w:clrSchemeMapping w:bg1="light1" w:t1="dark1" w:bg2="light2" w:t2="dark2" w:accent1="accent1" w:accent2="accent2" w:accent3="accent3" w:accent4="accent4" w:accent5="accent5" w:accent6="accent6" w:hyperlink="hyperlink" w:followedHyperlink="followedHyperlink"/>								'
		+	'					<w:shapeDefaults>								'
		+	'						<o:shapedefaults v:ext="edit" spidmax="1026"/>							'
		+	'						<o:shapelayout v:ext="edit">							'
		+	'							<o:idmap v:ext="edit" data="1"/>						'
		+	'						</o:shapelayout>							'
		+	'					</w:shapeDefaults>								'
		+	'					<w:decimalSymbol w:val=","/>								'
		+	'					<w:listSeparator w:val=";"/>								'
		+	'					<w15:chartTrackingRefBased/>								'
		+	'					<w15:docId w15:val="{14255EB0-4E5F-4AD9-8155-C3B93431A0AE}"/>								'
		+	'				</w:settings>									'
		+	'			</pkg:xmlData>										'
		+	'		</pkg:part>											'
		+	'		<pkg:part pkg:name="/word/webSettings.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml">											'
		+	'			<pkg:xmlData>										'
		+	'				<w:webSettings mc:Ignorable="w14 w15" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml">									'
		+	'					<w:optimizeForBrowser/>								'
		+	'					<w:relyOnVML/>								'
		+	'					<w:allowPNG/>								'
		+	'				</w:webSettings>									'
		+	'			</pkg:xmlData>										'
		+	'		</pkg:part>											'
		+	'		<pkg:part pkg:name="/word/styles.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml">											'
		+	'			<pkg:xmlData>										'
		+	'				<w:styles mc:Ignorable="w14 w15" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml">									'
		+	'					<w:docDefaults>								'
		+	'						<w:rPrDefault>							'
		+	'							<w:rPr>						'
		+	'								<w:rFonts w:asciiTheme="minorHAnsi" w:eastAsiaTheme="minorHAnsi" w:hAnsiTheme="minorHAnsi" w:cstheme="minorBidi"/>					'
		+	'								<w:sz w:val="22"/>					'
		+	'								<w:szCs w:val="22"/>					'
		+	'								<w:lang w:val="de-DE" w:eastAsia="en-US" w:bidi="ar-SA"/>					'
		+	'							</w:rPr>						'
		+	'						</w:rPrDefault>							'
		+	'						<w:pPrDefault>							'
		+	'							<w:pPr>						'
		+	'								<w:spacing w:after="160" w:line="259" w:lineRule="auto"/>					'
		+	'							</w:pPr>						'
		+	'						</w:pPrDefault>							'
		+	'					</w:docDefaults>								'
		+	'					<w:latentStyles w:defLockedState="0" w:defUIPriority="99" w:defSemiHidden="0" w:defUnhideWhenUsed="0" w:defQFormat="0" w:count="371">								'
		+	'						<w:lsdException w:name="Normal" w:uiPriority="0" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="heading 1" w:uiPriority="9" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="heading 2" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="heading 3" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="heading 4" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="heading 5" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="heading 6" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="heading 7" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="heading 8" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="heading 9" w:semiHidden="1" w:uiPriority="9" w:unhideWhenUsed="1" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="index 1" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="index 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="index 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="index 4" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="index 5" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="index 6" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="index 7" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="index 8" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="index 9" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="toc 1" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="toc 2" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="toc 3" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="toc 4" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="toc 5" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="toc 6" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="toc 7" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="toc 8" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="toc 9" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Normal Indent" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="footnote text" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="annotation text" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="header" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="footer" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="index heading" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="caption" w:semiHidden="1" w:uiPriority="35" w:unhideWhenUsed="1" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="table of figures" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="envelope address" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="envelope return" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="footnote reference" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="annotation reference" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="line number" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="page number" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="endnote reference" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="endnote text" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="table of authorities" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="macro" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="toa heading" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Bullet" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Number" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List 4" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List 5" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Bullet 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Bullet 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Bullet 4" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Bullet 5" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Number 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Number 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Number 4" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Number 5" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Title" w:uiPriority="10" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Closing" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Signature" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Default Paragraph Font" w:semiHidden="1" w:uiPriority="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Body Text" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Body Text Indent" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Continue" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Continue 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Continue 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Continue 4" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="List Continue 5" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Message Header" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Subtitle" w:uiPriority="11" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Salutation" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Date" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Body Text First Indent" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Body Text First Indent 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Note Heading" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Body Text 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Body Text 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Body Text Indent 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Body Text Indent 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Block Text" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Hyperlink" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="FollowedHyperlink" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Strong" w:uiPriority="22" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Emphasis" w:uiPriority="20" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Document Map" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Plain Text" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="E-mail Signature" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="HTML Top of Form" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="HTML Bottom of Form" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Normal (Web)" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="HTML Acronym" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="HTML Address" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="HTML Cite" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="HTML Code" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="HTML Definition" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="HTML Keyboard" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="HTML Preformatted" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="HTML Sample" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="HTML Typewriter" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="HTML Variable" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Normal Table" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="annotation subject" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="No List" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Outline List 1" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Outline List 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Outline List 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Simple 1" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Simple 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Simple 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Classic 1" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Classic 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Classic 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Classic 4" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Colorful 1" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Colorful 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Colorful 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Columns 1" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Columns 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Columns 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Columns 4" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Columns 5" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Grid 1" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Grid 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Grid 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Grid 4" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Grid 5" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Grid 6" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Grid 7" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Grid 8" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table List 1" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table List 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table List 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table List 4" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table List 5" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table List 6" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table List 7" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table List 8" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table 3D effects 1" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table 3D effects 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table 3D effects 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Contemporary" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Elegant" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Professional" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Subtle 1" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Subtle 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Web 1" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Web 2" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Web 3" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Balloon Text" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Table Grid" w:uiPriority="39"/>							'
		+	'						<w:lsdException w:name="Table Theme" w:semiHidden="1" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="Placeholder Text" w:semiHidden="1"/>							'
		+	'						<w:lsdException w:name="No Spacing" w:uiPriority="1" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Light Shading" w:uiPriority="60"/>							'
		+	'						<w:lsdException w:name="Light List" w:uiPriority="61"/>							'
		+	'						<w:lsdException w:name="Light Grid" w:uiPriority="62"/>							'
		+	'						<w:lsdException w:name="Medium Shading 1" w:uiPriority="63"/>							'
		+	'						<w:lsdException w:name="Medium Shading 2" w:uiPriority="64"/>							'
		+	'						<w:lsdException w:name="Medium List 1" w:uiPriority="65"/>							'
		+	'						<w:lsdException w:name="Medium List 2" w:uiPriority="66"/>							'
		+	'						<w:lsdException w:name="Medium Grid 1" w:uiPriority="67"/>							'
		+	'						<w:lsdException w:name="Medium Grid 2" w:uiPriority="68"/>							'
		+	'						<w:lsdException w:name="Medium Grid 3" w:uiPriority="69"/>							'
		+	'						<w:lsdException w:name="Dark List" w:uiPriority="70"/>							'
		+	'						<w:lsdException w:name="Colorful Shading" w:uiPriority="71"/>							'
		+	'						<w:lsdException w:name="Colorful List" w:uiPriority="72"/>							'
		+	'						<w:lsdException w:name="Colorful Grid" w:uiPriority="73"/>							'
		+	'						<w:lsdException w:name="Light Shading Accent 1" w:uiPriority="60"/>							'
		+	'						<w:lsdException w:name="Light List Accent 1" w:uiPriority="61"/>							'
		+	'						<w:lsdException w:name="Light Grid Accent 1" w:uiPriority="62"/>							'
		+	'						<w:lsdException w:name="Medium Shading 1 Accent 1" w:uiPriority="63"/>							'
		+	'						<w:lsdException w:name="Medium Shading 2 Accent 1" w:uiPriority="64"/>							'
		+	'						<w:lsdException w:name="Medium List 1 Accent 1" w:uiPriority="65"/>							'
		+	'						<w:lsdException w:name="Revision" w:semiHidden="1"/>							'
		+	'						<w:lsdException w:name="List Paragraph" w:uiPriority="34" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Quote" w:uiPriority="29" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Intense Quote" w:uiPriority="30" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Medium List 2 Accent 1" w:uiPriority="66"/>							'
		+	'						<w:lsdException w:name="Medium Grid 1 Accent 1" w:uiPriority="67"/>							'
		+	'						<w:lsdException w:name="Medium Grid 2 Accent 1" w:uiPriority="68"/>							'
		+	'						<w:lsdException w:name="Medium Grid 3 Accent 1" w:uiPriority="69"/>							'
		+	'						<w:lsdException w:name="Dark List Accent 1" w:uiPriority="70"/>							'
		+	'						<w:lsdException w:name="Colorful Shading Accent 1" w:uiPriority="71"/>							'
		+	'						<w:lsdException w:name="Colorful List Accent 1" w:uiPriority="72"/>							'
		+	'						<w:lsdException w:name="Colorful Grid Accent 1" w:uiPriority="73"/>							'
		+	'						<w:lsdException w:name="Light Shading Accent 2" w:uiPriority="60"/>							'
		+	'						<w:lsdException w:name="Light List Accent 2" w:uiPriority="61"/>							'
		+	'						<w:lsdException w:name="Light Grid Accent 2" w:uiPriority="62"/>							'
		+	'						<w:lsdException w:name="Medium Shading 1 Accent 2" w:uiPriority="63"/>							'
		+	'						<w:lsdException w:name="Medium Shading 2 Accent 2" w:uiPriority="64"/>							'
		+	'						<w:lsdException w:name="Medium List 1 Accent 2" w:uiPriority="65"/>							'
		+	'						<w:lsdException w:name="Medium List 2 Accent 2" w:uiPriority="66"/>							'
		+	'						<w:lsdException w:name="Medium Grid 1 Accent 2" w:uiPriority="67"/>							'
		+	'						<w:lsdException w:name="Medium Grid 2 Accent 2" w:uiPriority="68"/>							'
		+	'						<w:lsdException w:name="Medium Grid 3 Accent 2" w:uiPriority="69"/>							'
		+	'						<w:lsdException w:name="Dark List Accent 2" w:uiPriority="70"/>							'
		+	'						<w:lsdException w:name="Colorful Shading Accent 2" w:uiPriority="71"/>							'
		+	'						<w:lsdException w:name="Colorful List Accent 2" w:uiPriority="72"/>							'
		+	'						<w:lsdException w:name="Colorful Grid Accent 2" w:uiPriority="73"/>							'
		+	'						<w:lsdException w:name="Light Shading Accent 3" w:uiPriority="60"/>							'
		+	'						<w:lsdException w:name="Light List Accent 3" w:uiPriority="61"/>							'
		+	'						<w:lsdException w:name="Light Grid Accent 3" w:uiPriority="62"/>							'
		+	'						<w:lsdException w:name="Medium Shading 1 Accent 3" w:uiPriority="63"/>							'
		+	'						<w:lsdException w:name="Medium Shading 2 Accent 3" w:uiPriority="64"/>							'
		+	'						<w:lsdException w:name="Medium List 1 Accent 3" w:uiPriority="65"/>							'
		+	'						<w:lsdException w:name="Medium List 2 Accent 3" w:uiPriority="66"/>							'
		+	'						<w:lsdException w:name="Medium Grid 1 Accent 3" w:uiPriority="67"/>							'
		+	'						<w:lsdException w:name="Medium Grid 2 Accent 3" w:uiPriority="68"/>							'
		+	'						<w:lsdException w:name="Medium Grid 3 Accent 3" w:uiPriority="69"/>							'
		+	'						<w:lsdException w:name="Dark List Accent 3" w:uiPriority="70"/>							'
		+	'						<w:lsdException w:name="Colorful Shading Accent 3" w:uiPriority="71"/>							'
		+	'						<w:lsdException w:name="Colorful List Accent 3" w:uiPriority="72"/>							'
		+	'						<w:lsdException w:name="Colorful Grid Accent 3" w:uiPriority="73"/>							'
		+	'						<w:lsdException w:name="Light Shading Accent 4" w:uiPriority="60"/>							'
		+	'						<w:lsdException w:name="Light List Accent 4" w:uiPriority="61"/>							'
		+	'						<w:lsdException w:name="Light Grid Accent 4" w:uiPriority="62"/>							'
		+	'						<w:lsdException w:name="Medium Shading 1 Accent 4" w:uiPriority="63"/>							'
		+	'						<w:lsdException w:name="Medium Shading 2 Accent 4" w:uiPriority="64"/>							'
		+	'						<w:lsdException w:name="Medium List 1 Accent 4" w:uiPriority="65"/>							'
		+	'						<w:lsdException w:name="Medium List 2 Accent 4" w:uiPriority="66"/>							'
		+	'						<w:lsdException w:name="Medium Grid 1 Accent 4" w:uiPriority="67"/>							'
		+	'						<w:lsdException w:name="Medium Grid 2 Accent 4" w:uiPriority="68"/>							'
		+	'						<w:lsdException w:name="Medium Grid 3 Accent 4" w:uiPriority="69"/>							'
		+	'						<w:lsdException w:name="Dark List Accent 4" w:uiPriority="70"/>							'
		+	'						<w:lsdException w:name="Colorful Shading Accent 4" w:uiPriority="71"/>							'
		+	'						<w:lsdException w:name="Colorful List Accent 4" w:uiPriority="72"/>							'
		+	'						<w:lsdException w:name="Colorful Grid Accent 4" w:uiPriority="73"/>							'
		+	'						<w:lsdException w:name="Light Shading Accent 5" w:uiPriority="60"/>							'
		+	'						<w:lsdException w:name="Light List Accent 5" w:uiPriority="61"/>							'
		+	'						<w:lsdException w:name="Light Grid Accent 5" w:uiPriority="62"/>							'
		+	'						<w:lsdException w:name="Medium Shading 1 Accent 5" w:uiPriority="63"/>							'
		+	'						<w:lsdException w:name="Medium Shading 2 Accent 5" w:uiPriority="64"/>							'
		+	'						<w:lsdException w:name="Medium List 1 Accent 5" w:uiPriority="65"/>							'
		+	'						<w:lsdException w:name="Medium List 2 Accent 5" w:uiPriority="66"/>							'
		+	'						<w:lsdException w:name="Medium Grid 1 Accent 5" w:uiPriority="67"/>							'
		+	'						<w:lsdException w:name="Medium Grid 2 Accent 5" w:uiPriority="68"/>							'
		+	'						<w:lsdException w:name="Medium Grid 3 Accent 5" w:uiPriority="69"/>							'
		+	'						<w:lsdException w:name="Dark List Accent 5" w:uiPriority="70"/>							'
		+	'						<w:lsdException w:name="Colorful Shading Accent 5" w:uiPriority="71"/>							'
		+	'						<w:lsdException w:name="Colorful List Accent 5" w:uiPriority="72"/>							'
		+	'						<w:lsdException w:name="Colorful Grid Accent 5" w:uiPriority="73"/>							'
		+	'						<w:lsdException w:name="Light Shading Accent 6" w:uiPriority="60"/>							'
		+	'						<w:lsdException w:name="Light List Accent 6" w:uiPriority="61"/>							'
		+	'						<w:lsdException w:name="Light Grid Accent 6" w:uiPriority="62"/>							'
		+	'						<w:lsdException w:name="Medium Shading 1 Accent 6" w:uiPriority="63"/>							'
		+	'						<w:lsdException w:name="Medium Shading 2 Accent 6" w:uiPriority="64"/>							'
		+	'						<w:lsdException w:name="Medium List 1 Accent 6" w:uiPriority="65"/>							'
		+	'						<w:lsdException w:name="Medium List 2 Accent 6" w:uiPriority="66"/>							'
		+	'						<w:lsdException w:name="Medium Grid 1 Accent 6" w:uiPriority="67"/>							'
		+	'						<w:lsdException w:name="Medium Grid 2 Accent 6" w:uiPriority="68"/>							'
		+	'						<w:lsdException w:name="Medium Grid 3 Accent 6" w:uiPriority="69"/>							'
		+	'						<w:lsdException w:name="Dark List Accent 6" w:uiPriority="70"/>							'
		+	'						<w:lsdException w:name="Colorful Shading Accent 6" w:uiPriority="71"/>							'
		+	'						<w:lsdException w:name="Colorful List Accent 6" w:uiPriority="72"/>							'
		+	'						<w:lsdException w:name="Colorful Grid Accent 6" w:uiPriority="73"/>							'
		+	'						<w:lsdException w:name="Subtle Emphasis" w:uiPriority="19" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Intense Emphasis" w:uiPriority="21" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Subtle Reference" w:uiPriority="31" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Intense Reference" w:uiPriority="32" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Book Title" w:uiPriority="33" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Bibliography" w:semiHidden="1" w:uiPriority="37" w:unhideWhenUsed="1"/>							'
		+	'						<w:lsdException w:name="TOC Heading" w:semiHidden="1" w:uiPriority="39" w:unhideWhenUsed="1" w:qFormat="1"/>							'
		+	'						<w:lsdException w:name="Plain Table 1" w:uiPriority="41"/>							'
		+	'						<w:lsdException w:name="Plain Table 2" w:uiPriority="42"/>							'
		+	'						<w:lsdException w:name="Plain Table 3" w:uiPriority="43"/>							'
		+	'						<w:lsdException w:name="Plain Table 4" w:uiPriority="44"/>							'
		+	'						<w:lsdException w:name="Plain Table 5" w:uiPriority="45"/>							'
		+	'						<w:lsdException w:name="Grid Table Light" w:uiPriority="40"/>							'
		+	'						<w:lsdException w:name="Grid Table 1 Light" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="Grid Table 2" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="Grid Table 3" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="Grid Table 4" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="Grid Table 5 Dark" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="Grid Table 6 Colorful" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="Grid Table 7 Colorful" w:uiPriority="52"/>							'
		+	'						<w:lsdException w:name="Grid Table 1 Light Accent 1" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="Grid Table 2 Accent 1" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="Grid Table 3 Accent 1" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="Grid Table 4 Accent 1" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="Grid Table 5 Dark Accent 1" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="Grid Table 6 Colorful Accent 1" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="Grid Table 7 Colorful Accent 1" w:uiPriority="52"/>							'
		+	'						<w:lsdException w:name="Grid Table 1 Light Accent 2" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="Grid Table 2 Accent 2" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="Grid Table 3 Accent 2" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="Grid Table 4 Accent 2" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="Grid Table 5 Dark Accent 2" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="Grid Table 6 Colorful Accent 2" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="Grid Table 7 Colorful Accent 2" w:uiPriority="52"/>							'
		+	'						<w:lsdException w:name="Grid Table 1 Light Accent 3" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="Grid Table 2 Accent 3" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="Grid Table 3 Accent 3" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="Grid Table 4 Accent 3" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="Grid Table 5 Dark Accent 3" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="Grid Table 6 Colorful Accent 3" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="Grid Table 7 Colorful Accent 3" w:uiPriority="52"/>							'
		+	'						<w:lsdException w:name="Grid Table 1 Light Accent 4" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="Grid Table 2 Accent 4" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="Grid Table 3 Accent 4" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="Grid Table 4 Accent 4" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="Grid Table 5 Dark Accent 4" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="Grid Table 6 Colorful Accent 4" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="Grid Table 7 Colorful Accent 4" w:uiPriority="52"/>							'
		+	'						<w:lsdException w:name="Grid Table 1 Light Accent 5" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="Grid Table 2 Accent 5" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="Grid Table 3 Accent 5" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="Grid Table 4 Accent 5" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="Grid Table 5 Dark Accent 5" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="Grid Table 6 Colorful Accent 5" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="Grid Table 7 Colorful Accent 5" w:uiPriority="52"/>							'
		+	'						<w:lsdException w:name="Grid Table 1 Light Accent 6" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="Grid Table 2 Accent 6" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="Grid Table 3 Accent 6" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="Grid Table 4 Accent 6" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="Grid Table 5 Dark Accent 6" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="Grid Table 6 Colorful Accent 6" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="Grid Table 7 Colorful Accent 6" w:uiPriority="52"/>							'
		+	'						<w:lsdException w:name="List Table 1 Light" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="List Table 2" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="List Table 3" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="List Table 4" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="List Table 5 Dark" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="List Table 6 Colorful" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="List Table 7 Colorful" w:uiPriority="52"/>							'
		+	'						<w:lsdException w:name="List Table 1 Light Accent 1" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="List Table 2 Accent 1" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="List Table 3 Accent 1" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="List Table 4 Accent 1" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="List Table 5 Dark Accent 1" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="List Table 6 Colorful Accent 1" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="List Table 7 Colorful Accent 1" w:uiPriority="52"/>							'
		+	'						<w:lsdException w:name="List Table 1 Light Accent 2" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="List Table 2 Accent 2" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="List Table 3 Accent 2" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="List Table 4 Accent 2" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="List Table 5 Dark Accent 2" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="List Table 6 Colorful Accent 2" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="List Table 7 Colorful Accent 2" w:uiPriority="52"/>							'
		+	'						<w:lsdException w:name="List Table 1 Light Accent 3" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="List Table 2 Accent 3" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="List Table 3 Accent 3" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="List Table 4 Accent 3" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="List Table 5 Dark Accent 3" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="List Table 6 Colorful Accent 3" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="List Table 7 Colorful Accent 3" w:uiPriority="52"/>							'
		+	'						<w:lsdException w:name="List Table 1 Light Accent 4" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="List Table 2 Accent 4" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="List Table 3 Accent 4" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="List Table 4 Accent 4" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="List Table 5 Dark Accent 4" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="List Table 6 Colorful Accent 4" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="List Table 7 Colorful Accent 4" w:uiPriority="52"/>							'
		+	'						<w:lsdException w:name="List Table 1 Light Accent 5" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="List Table 2 Accent 5" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="List Table 3 Accent 5" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="List Table 4 Accent 5" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="List Table 5 Dark Accent 5" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="List Table 6 Colorful Accent 5" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="List Table 7 Colorful Accent 5" w:uiPriority="52"/>							'
		+	'						<w:lsdException w:name="List Table 1 Light Accent 6" w:uiPriority="46"/>							'
		+	'						<w:lsdException w:name="List Table 2 Accent 6" w:uiPriority="47"/>							'
		+	'						<w:lsdException w:name="List Table 3 Accent 6" w:uiPriority="48"/>							'
		+	'						<w:lsdException w:name="List Table 4 Accent 6" w:uiPriority="49"/>							'
		+	'						<w:lsdException w:name="List Table 5 Dark Accent 6" w:uiPriority="50"/>							'
		+	'						<w:lsdException w:name="List Table 6 Colorful Accent 6" w:uiPriority="51"/>							'
		+	'						<w:lsdException w:name="List Table 7 Colorful Accent 6" w:uiPriority="52"/>							'
		+	'					</w:latentStyles>								'
		+	'					<w:style w:type="paragraph" w:default="1" w:styleId="Standard">								'
		+	'						<w:name w:val="Normal"/>							'
		+	'						<w:qFormat/>							'
		+	'					</w:style>								'
		+	'					<w:style w:type="paragraph" w:styleId="heading1">								'
		+	'						<w:name w:val="heading 1"/>							'
		+	'						<w:basedOn w:val="Standard"/>							'
		+	'						<w:next w:val="Standard"/>							'
		+	'						<w:link w:val="heading1Zchn"/>							'
		+	'						<w:uiPriority w:val="9"/>							'
		+	'						<w:qFormat/>							'
		+	'						<w:rsid w:val="002D0214"/>							'
		+	'						<w:pPr>							'
		+	'							<w:keepNext/>						'
		+	'							<w:keepLines/>						'
		+	'							<w:spacing w:before="240" w:after="0"/>						'
		+	'							<w:outlineLvl w:val="0"/>						'
		+	'						</w:pPr>							'
		+	'						<w:rPr>							'
		+	'							<w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi"/>						'
		+	'							<w:color w:val="2E74B5" w:themeColor="accent1" w:themeShade="BF"/>						'
		+	'							<w:sz w:val="40"/>						'
		+	'							<w:szCs w:val="40"/>						'
		+	'						</w:rPr>							'
		+	'					</w:style>								'
		+	'					<w:style w:type="paragraph" w:styleId="heading2">								'
		+	'						<w:name w:val="heading 2"/>							'
		+	'						<w:basedOn w:val="Standard"/>							'
		+	'						<w:next w:val="Standard"/>							'
		+	'						<w:link w:val="heading2Zchn"/>							'
		+	'						<w:uiPriority w:val="9"/>							'
		+	'						<w:unhideWhenUsed/>							'
		+	'						<w:qFormat/>							'
		+	'						<w:rsid w:val="002D0214"/>							'
		+	'						<w:pPr>							'
		+	'							<w:keepNext/>						'
		+	'							<w:keepLines/>						'
		+	'							<w:spacing w:before="200" w:after="0"/>						'
		+	'							<w:outlineLvl w:val="1"/>						'
		+	'						</w:pPr>							'
		+	'						<w:rPr>							'
		+	'							<w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi"/>						'
		+	'							<w:color w:val="2E74B5" w:themeColor="accent1" w:themeShade="BF"/>						'
		+	'							<w:sz w:val="36"/>						'
		+	'							<w:szCs w:val="36"/>						'
		+	'						</w:rPr>							'
		+	'					</w:style>								'
		+	'					<w:style w:type="paragraph" w:styleId="heading3">								'
		+	'						<w:name w:val="heading 3"/>							'
		+	'						<w:basedOn w:val="Standard"/>							'
		+	'						<w:next w:val="Standard"/>							'
		+	'						<w:uiPriority w:val="9"/>							'
		+	'						<w:unhideWhenUsed/>							'
		+	'						<w:qFormat/>							'
		+	'						<w:rsid w:val="00ED3CEC"/>							'
		+	'						<w:pPr>							'
		+	'							<w:keepNext/>						'
		+	'							<w:keepLines/>						'
		+	'							<w:spacing w:before="160" w:after="0"/>						'
		+	'							<w:outlineLvl w:val="2"/>						'
		+	'						</w:pPr>							'
		+	'						<w:rPr>							'
		+	'							<w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi"/>						'
		+	'							<w:color w:val="1F4D78" w:themeColor="accent1" w:themeShade="7F"/>						'
		+	'							<w:sz w:val="32"/>						'
		+	'							<w:szCs w:val="32"/>						'
		+	'						</w:rPr>							'
		+	'					</w:style>								'
		+	'					<w:style w:type="paragraph" w:styleId="heading4">								'
		+	'						<w:name w:val="heading 4"/>							'
		+	'						<w:basedOn w:val="Standard"/>							'
		+	'						<w:next w:val="Standard"/>							'
		+	'						<w:uiPriority w:val="9"/>							'
		+	'						<w:unhideWhenUsed/>							'
		+	'						<w:qFormat/>							'
		+	'						<w:rsid w:val="00ED3CEC"/>							'
		+	'						<w:pPr>							'
		+	'							<w:keepNext/>						'
		+	'							<w:keepLines/>						'
		+	'							<w:spacing w:before="120" w:after="0"/>						'
		+	'							<w:outlineLvl w:val="3"/>						'
		+	'						</w:pPr>							'
		+	'						<w:rPr>							'
		+	'							<w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi"/>						'
		+	'							<w:color w:val="1F4D78" w:themeColor="accent1" w:themeShade="7F"/>						'
		+	'							<w:sz w:val="28"/>						'
		+	'							<w:szCs w:val="28"/>						'
		+	'						</w:rPr>							'
		+	'					</w:style>								'
		+	'					<w:style w:type="character" w:default="1" w:styleId="Absatz-Standardschriftart">								'
		+	'						<w:name w:val="Default Paragraph Font"/>							'
		+	'						<w:uiPriority w:val="1"/>							'
		+	'						<w:semiHidden/>							'
		+	'						<w:unhideWhenUsed/>							'
		+	'					</w:style>								'
		+	'					<w:style w:type="table" w:default="1" w:styleId="NormaleTabelle">								'
		+	'						<w:name w:val="Normal Table"/>							'
		+	'						<w:uiPriority w:val="99"/>							'
		+	'						<w:semiHidden/>							'
		+	'						<w:unhideWhenUsed/>							'
		+	'						<w:tblPr>							'
		+	'							<w:tblInd w:w="0" w:type="dxa"/>						'
		+	'							<w:tblCellMar>						'
		+	'								<w:top w:w="0" w:type="dxa"/>					'
		+	'								<w:left w:w="108" w:type="dxa"/>					'
		+	'								<w:bottom w:w="0" w:type="dxa"/>					'
		+	'								<w:right w:w="108" w:type="dxa"/>					'
		+	'							</w:tblCellMar>						'
		+	'						</w:tblPr>							'
		+	'					</w:style>								'
		+	'					<w:style w:type="numbering" w:default="1" w:styleId="KeineListe">								'
		+	'						<w:name w:val="No List"/>							'
		+	'						<w:uiPriority w:val="99"/>							'
		+	'						<w:semiHidden/>							'
		+	'						<w:unhideWhenUsed/>							'
		+	'					</w:style>								'
		+	'					<w:style w:type="character" w:customStyle="1" w:styleId="heading1Zchn">								'
		+	'						<w:name w:val="heading 1 Zchn"/>							'
		+	'						<w:basedOn w:val="Absatz-Standardschriftart"/>							'
		+	'						<w:link w:val="heading1"/>							'
		+	'						<w:uiPriority w:val="9"/>							'
		+	'						<w:rsid w:val="002D0214"/>							'
		+	'						<w:rPr>							'
		+	'							<w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi"/>						'
		+	'							<w:color w:val="2E74B5" w:themeColor="accent1" w:themeShade="BF"/>						'
		+	'							<w:sz w:val="32"/>						'
		+	'							<w:szCs w:val="32"/>						'
		+	'						</w:rPr>							'
		+	'					</w:style>								'
		+	'					<w:style w:type="character" w:customStyle="1" w:styleId="heading2Zchn">								'
		+	'						<w:name w:val="heading 2 Zchn"/>							'
		+	'						<w:basedOn w:val="Absatz-Standardschriftart"/>							'
		+	'						<w:link w:val="heading2"/>							'
		+	'						<w:uiPriority w:val="9"/>							'
		+	'						<w:rsid w:val="002D0214"/>							'
		+	'						<w:rPr>							'
		+	'							<w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi"/>						'
		+	'							<w:color w:val="2E74B5" w:themeColor="accent1" w:themeShade="BF"/>						'
		+	'							<w:sz w:val="26"/>						'
		+	'							<w:szCs w:val="26"/>						'
		+	'						</w:rPr>							'
		+	'					</w:style>								'
		+	'					<w:style w:type="character" w:styleId="Hyperlink">								'
		+	'						<w:name w:val="Hyperlink"/>							'
		+	'						<w:basedOn w:val="Absatz-Standardschriftart"/>							'
		+	'						<w:uiPriority w:val="99"/>							'
		+	'						<w:unhideWhenUsed/>							'
		+	'						<w:rsid w:val="004B20E8"/>							'
		+	'						<w:rPr>							'
		+	'							<w:color w:val="0563C1" w:themeColor="hyperlink"/>						'
		+	'							<w:u w:val="single"/>						'
		+	'						</w:rPr>							'
		+	'					</w:style>								'
		+	'					<w:style w:type="character" w:styleId="BesuchterHyperlink">								'
		+	'						<w:name w:val="FollowedHyperlink"/>							'
		+	'						<w:basedOn w:val="Absatz-Standardschriftart"/>							'
		+	'						<w:uiPriority w:val="99"/>							'
		+	'						<w:semiHidden/>							'
		+	'						<w:unhideWhenUsed/>							'
		+	'						<w:rsid w:val="003667EB"/>							'
		+	'						<w:rPr>							'
		+	'							<w:color w:val="954F72" w:themeColor="followedHyperlink"/>						'
		+	'							<w:u w:val="single"/>						'
		+	'						</w:rPr>							'
		+	'					</w:style>								'
		+	'					<w:style w:type="paragraph" w:styleId="Listenabsatz">								'
		+	'						<w:name w:val="List Paragraph"/>							'
		+	'						<w:basedOn w:val="Standard"/>							'
		+	'						<w:uiPriority w:val="34"/>							'
		+	'						<w:qFormat/>							'
		+	'						<w:rsid w:val="00592862"/>							'
		+	'						<w:pPr>							'
		+	'							<w:ind w:left="720"/>						'
		+	'							<w:contextualSpacing/>						'
		+	'						</w:pPr>							'
		+	'					</w:style>								'
		+	'				</w:styles>									'
		+	'			</pkg:xmlData>										'
		+	'		</pkg:part>											'
		+	'		<pkg:part pkg:name="/docProps/core.xml" pkg:contentType="application/vnd.openxmlformats-package.core-properties+xml" pkg:padding="256">											'
		+	'			<pkg:xmlData>										'
		+	'				<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">									'
		+	'					<dc:title/>								'
		+	'					<dc:subject/>								'
		+	'					<dc:creator>Schulz, Philip Uwe</dc:creator>								'
		+	'					<cp:keywords/>								'
		+	'					<dc:description/>								'
		+	'					<cp:lastModifiedBy>Schulz, Philip Uwe</cp:lastModifiedBy>								'
		+	'					<cp:revision>5</cp:revision>								'
		+	'					<dcterms:created xsi:type="dcterms:W3CDTF">2018-05-09T06:31:00Z</dcterms:created>								'
		+	'					<dcterms:modified xsi:type="dcterms:W3CDTF">2018-08-30T14:26:00Z</dcterms:modified>								'
		+	'				</cp:coreProperties>									'
		+	'			</pkg:xmlData>										'
		+	'		</pkg:part>											'
		+	'		<pkg:part pkg:name="/word/numbering.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml">											'
		+	'			<pkg:xmlData>										'
		+	'				<w:numbering mc:Ignorable="w14 w15 wp14" xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">									'
		+	'					<w:abstractNum w:abstractNumId="0" w15:restartNumberingAfterBreak="0">								'
		+	'						<w:nsid w:val="5BFB07E1"/>							'
		+	'						<w:multiLevelType w:val="multilevel"/>							'
		+	'						<w:tmpl w:val="8F2E77AE"/>							'
		+	'						<w:lvl w:ilvl="0">							'
		+	'							<w:start w:val="1"/>						'
		+	'							<w:numFmt w:val="bullet"/>						'
		+	'							<w:lvlText w:val=""/>						'
		+	'							<w:lvlJc w:val="left"/>						'
		+	'							<w:pPr>						'
		+	'								<w:tabs>					'
		+	'									<w:tab w:val="num" w:pos="720"/>				'
		+	'								</w:tabs>					'
		+	'								<w:ind w:left="720" w:hanging="720"/>					'
		+	'							</w:pPr>						'
		+	'							<w:rPr>						'
		+	'								<w:rFonts w:ascii="Symbol" w:hAnsi="Symbol" w:hint="default"/>					'
		+	'							</w:rPr>						'
		+	'						</w:lvl>							'
		+	'						<w:lvl w:ilvl="1">							'
		+	'							<w:start w:val="1"/>						'
		+	'							<w:numFmt w:val="decimal"/>						'
		+	'							<w:lvlText w:val="%2."/>						'
		+	'							<w:lvlJc w:val="left"/>						'
		+	'							<w:pPr>						'
		+	'								<w:tabs>					'
		+	'									<w:tab w:val="num" w:pos="1440"/>				'
		+	'								</w:tabs>					'
		+	'								<w:ind w:left="1440" w:hanging="720"/>					'
		+	'							</w:pPr>						'
		+	'						</w:lvl>							'
		+	'						<w:lvl w:ilvl="2">							'
		+	'							<w:start w:val="1"/>						'
		+	'							<w:numFmt w:val="decimal"/>						'
		+	'							<w:lvlText w:val="%3."/>						'
		+	'							<w:lvlJc w:val="left"/>						'
		+	'							<w:pPr>						'
		+	'								<w:tabs>					'
		+	'									<w:tab w:val="num" w:pos="2160"/>				'
		+	'								</w:tabs>					'
		+	'								<w:ind w:left="2160" w:hanging="720"/>					'
		+	'							</w:pPr>						'
		+	'						</w:lvl>							'
		+	'						<w:lvl w:ilvl="3">							'
		+	'							<w:start w:val="1"/>						'
		+	'							<w:numFmt w:val="decimal"/>						'
		+	'							<w:lvlText w:val="%4."/>						'
		+	'							<w:lvlJc w:val="left"/>						'
		+	'							<w:pPr>						'
		+	'								<w:tabs>					'
		+	'									<w:tab w:val="num" w:pos="2880"/>				'
		+	'								</w:tabs>					'
		+	'								<w:ind w:left="2880" w:hanging="720"/>					'
		+	'							</w:pPr>						'
		+	'						</w:lvl>							'
		+	'						<w:lvl w:ilvl="4">							'
		+	'							<w:start w:val="1"/>						'
		+	'							<w:numFmt w:val="decimal"/>						'
		+	'							<w:lvlText w:val="%5."/>						'
		+	'							<w:lvlJc w:val="left"/>						'
		+	'							<w:pPr>						'
		+	'								<w:tabs>					'
		+	'									<w:tab w:val="num" w:pos="3600"/>				'
		+	'								</w:tabs>					'
		+	'								<w:ind w:left="3600" w:hanging="720"/>					'
		+	'							</w:pPr>						'
		+	'						</w:lvl>							'
		+	'						<w:lvl w:ilvl="5">							'
		+	'							<w:start w:val="1"/>						'
		+	'							<w:numFmt w:val="decimal"/>						'
		+	'							<w:lvlText w:val="%6."/>						'
		+	'							<w:lvlJc w:val="left"/>						'
		+	'							<w:pPr>						'
		+	'								<w:tabs>					'
		+	'									<w:tab w:val="num" w:pos="4320"/>				'
		+	'								</w:tabs>					'
		+	'								<w:ind w:left="4320" w:hanging="720"/>					'
		+	'							</w:pPr>						'
		+	'						</w:lvl>							'
		+	'						<w:lvl w:ilvl="6">							'
		+	'							<w:start w:val="1"/>						'
		+	'							<w:numFmt w:val="decimal"/>						'
		+	'							<w:lvlText w:val="%7."/>						'
		+	'							<w:lvlJc w:val="left"/>						'
		+	'							<w:pPr>						'
		+	'								<w:tabs>					'
		+	'									<w:tab w:val="num" w:pos="5040"/>				'
		+	'								</w:tabs>					'
		+	'								<w:ind w:left="5040" w:hanging="720"/>					'
		+	'							</w:pPr>						'
		+	'						</w:lvl>							'
		+	'						<w:lvl w:ilvl="7">							'
		+	'							<w:start w:val="1"/>						'
		+	'							<w:numFmt w:val="decimal"/>						'
		+	'							<w:lvlText w:val="%8."/>						'
		+	'							<w:lvlJc w:val="left"/>						'
		+	'							<w:pPr>						'
		+	'								<w:tabs>					'
		+	'									<w:tab w:val="num" w:pos="5760"/>				'
		+	'								</w:tabs>					'
		+	'								<w:ind w:left="5760" w:hanging="720"/>					'
		+	'							</w:pPr>						'
		+	'						</w:lvl>							'
		+	'						<w:lvl w:ilvl="8">							'
		+	'							<w:start w:val="1"/>						'
		+	'							<w:numFmt w:val="decimal"/>						'
		+	'							<w:lvlText w:val="%9."/>						'
		+	'							<w:lvlJc w:val="left"/>						'
		+	'							<w:pPr>						'
		+	'								<w:tabs>					'
		+	'									<w:tab w:val="num" w:pos="6480"/>				'
		+	'								</w:tabs>					'
		+	'								<w:ind w:left="6480" w:hanging="720"/>					'
		+	'							</w:pPr>						'
		+	'						</w:lvl>							'
		+	'					</w:abstractNum>								'
		+	'					<w:num w:numId="1">								'
		+	'						<w:abstractNumId w:val="0"/>							'
		+	'					</w:num>								'
		+	'				</w:numbering>									'
		+	'			</pkg:xmlData>										'
		+	'		</pkg:part>											'
		+	'		<pkg:part pkg:name="/word/fontTable.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml">											'
		+	'			<pkg:xmlData>										'
		+	'				<w:fonts mc:Ignorable="w14 w15" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml">									'
		+	'					<w:font w:name="Symbol">								'
		+	'						<w:panose1 w:val="05050102010706020507"/>							'
		+	'						<w:charset w:val="02"/>							'
		+	'						<w:family w:val="roman"/>							'
		+	'						<w:pitch w:val="variable"/>							'
		+	'						<w:sig w:usb0="00000000" w:usb1="10000000" w:usb2="00000000" w:usb3="00000000" w:csb0="80000000" w:csb1="00000000"/>							'
		+	'					</w:font>								'
		+	'					<w:font w:name="Times New Roman">								'
		+	'						<w:panose1 w:val="02020603050405020304"/>							'
		+	'						<w:charset w:val="00"/>							'
		+	'						<w:family w:val="roman"/>							'
		+	'						<w:pitch w:val="variable"/>							'
		+	'						<w:sig w:usb0="E0002EFF" w:usb1="C000785B" w:usb2="00000009" w:usb3="00000000" w:csb0="000001FF" w:csb1="00000000"/>							'
		+	'					</w:font>								'
		+	'					<w:font w:name="Calibri">								'
		+	'						<w:panose1 w:val="020F0502020204030204"/>							'
		+	'						<w:charset w:val="00"/>							'
		+	'						<w:family w:val="swiss"/>							'
		+	'						<w:pitch w:val="variable"/>							'
		+	'						<w:sig w:usb0="E0002AFF" w:usb1="C000247B" w:usb2="00000009" w:usb3="00000000" w:csb0="000001FF" w:csb1="00000000"/>							'
		+	'					</w:font>								'
		+	'					<w:font w:name="Calibri Light">								'
		+	'						<w:panose1 w:val="020F0302020204030204"/>							'
		+	'						<w:charset w:val="00"/>							'
		+	'						<w:family w:val="swiss"/>							'
		+	'						<w:pitch w:val="variable"/>							'
		+	'						<w:sig w:usb0="E0002AFF" w:usb1="C000247B" w:usb2="00000009" w:usb3="00000000" w:csb0="000001FF" w:csb1="00000000"/>							'
		+	'					</w:font>								'
		+	'				</w:fonts>									'
		+	'			</pkg:xmlData>										'
		+	'		</pkg:part>											'
		+	'		<pkg:part pkg:name="/docProps/app.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.extended-properties+xml" pkg:padding="256">											'
		+	'			<pkg:xmlData>										'
		+	'				<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">									'
		+	'					<Template>Normal.dotm</Template>								'
		+	'					<TotalTime>0</TotalTime>								'
		+	'					<Pages>1</Pages>								'
		+	'					<Words>14911</Words>								'
		+	'					<Characters>93942</Characters>								'
		+	'					<Application>Microsoft Office Word</Application>								'
		+	'					<DocSecurity>0</DocSecurity>								'
		+	'					<Lines>782</Lines>								'
		+	'					<Paragraphs>217</Paragraphs>								'
		+	'					<ScaleCrop>false</ScaleCrop>								'
		+	'					<HeadingPairs>								'
		+	'						<vt:vector size="2" baseType="variant">							'
		+	'							<vt:variant>						'
		+	'								<vt:lpstr>Titel</vt:lpstr>					'
		+	'							</vt:variant>						'
		+	'							<vt:variant>						'
		+	'								<vt:i4>1</vt:i4>					'
		+	'							</vt:variant>						'
		+	'						</vt:vector>							'
		+	'					</HeadingPairs>								'
		+	'					<TitlesOfParts>								'
		+	'						<vt:vector size="1" baseType="lpstr">							'
		+	'							<vt:lpstr/>						'
		+	'						</vt:vector>							'
		+	'					</TitlesOfParts>								'
		+	'					<Company>adesso AG</Company>								'
		+	'					<LinksUpToDate>false</LinksUpToDate>								'
		+	'					<CharactersWithSpaces>108636</CharactersWithSpaces>								'
		+	'					<SharedDoc>false</SharedDoc>								'
		+	'					<HyperlinksChanged>false</HyperlinksChanged>								'
		+	'					<AppVersion>15.0000</AppVersion>								'
		+	'				</Properties>									'
		+	'			</pkg:xmlData>										'
		+	'		</pkg:part>											'
		+	'	</pkg:package>												';
		return ct
	}

	function store( f ) {
		let blob = new Blob([f.content],{type: "text/plain; charset=utf-8"});
		saveAs(blob, f.name+".xml");
		if( typeof(opts.done)=="function" ) opts.done()
	}
	function cloneOf( o ) { 
		// "deep" clone;
		// does only work, if none of the property values are references or functions:
			function clonePr(p) {
				return ( typeof(p) == 'object' )? clone(p) : p
			}
		var n={};
		for( var p in o ) {
			if( Array.isArray(o[p]) ) {
				n[p] = [];
				for( var i=0, I=o[p].length;i<I;i++ )
					n[p].push( clonePr(o[p][i]) );
				continue
			};
			// else
			n[p] = clonePr(o[p])
		};
		return n
	}
	function itemById(L,id) {
		// given the ID of an element in a list, return the element itself:
//		id = id.trim();
		for( var i=L.length-1;i>-1;i-- )
			if( L[i].id === id ) return L[i];   // return list item
		return null
	}
	function indexById(L,id) {
		// given an ID of an element in a list, return it's index:
//		id = id.trim();
		for( var i=L.length-1;i>-1;i-- )
			if( L[i].id === id ) return i;   // return list index 
		return -1
	}
	function indexBy( L, p, s ) {
		// Return the index of an element in list 'L' whose property 'p' equals searchterm 's':
		// hand in property and searchTerm as string !
		for( var i=L.length-1;i>-1;i-- )
			if(L[i][p] === s) return i;
		return -1
	}
	function extOf( str ) {
		// get the file extension without the '.':
		return str.substring( str.lastIndexOf('.')+1 )
	}
	// Make a very simple hash code from a string:
	// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
	function hashCode(s) {for(var r=0,i=0;i<s.length;i++)r=(r<<5)-r+s.charCodeAt(i),r&=r;return r}
}
