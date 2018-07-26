function toXhtml( specifData, opts ) {
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
	var xhtml = {
			headings: [],		// used to build the ePub table of contents
			sections: [],		// a xhtml file per SpecIF hierarchy
			images: []
		};
	
	// The first section is a xhtml-file with the title page:
	xhtml.sections.push(
		xhtmlOf( 
			specifData.title,
			null,
			null,
			'<div class="title">'+specifData.title+'</div>'
		)
	);
	
	// For each SpecIF hierarchy a xhtml-file is created and returned as subsequent sections:
	let firstHierarchySection = xhtml.sections.length;  // index of the next section number
	for( var h=0,H=specifData.hierarchies.length; h<H; h++ ) {
		pushHeading( specifData.hierarchies[h].title, {nodeId: specifData.hierarchies[h].id, level: 1} );
		xhtml.sections.push(
			xhtmlOf( 
				specifData.title,
				specifData.hierarchies[h].id,
				specifData.hierarchies[h].title,
				paragraphOf( specifData.hierarchies[h], 1 )
			)
		)
	};

//	console.debug('xhtml',xhtml);
	return xhtml
	
	// ---------------
	function pushHeading( t, pars ) {
		xhtml.headings.push({
				id: pars.nodeId,
				title: t,
				section: xhtml.sections.length,  // the index of the section in preparation (before it is pushed)
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
		let ti = titleValOf( r, rC, opts );
		if( !pars || pars.level<1 ) return (ti?ic+ti:'');
		if( rC.isHeading ) pushHeading( ti, pars );
		let h = rC.isHeading?2:3;
		return '<h'+h+' id="'+pars.nodeId+'">'+(ti?ic+ti:'')+'</h'+h+'>'
	}
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
/*			// 5 columns:
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
			if( nd.resource==res.id ) return 'sect'+(y+firstHierarchySection)+'.xhtml#'+nd.id;  // fully qualified anchor including filename
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
		// return the values of all resource's properties as xhtml:
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
			console.debug('hPi',hPi,rt,r.properties[a].value);
			if( opts.hideEmptyProperties && isEmpty(r.properties[a].value)
				|| hPi>-1 && ( opts.hiddenProperties[hPi].value==undefined || opts.hiddenProperties[hPi].value==r.properties[a].value )
				|| opts.headingProperties.indexOf(rt)>-1
				|| opts.titleProperties.indexOf(rt)>-1 
				|| opts.descriptionProperties.indexOf(rt)>-1 ) continue;
			c2 += '<tr><td class="propertyTitle">'+rt+'</td><td>'+valOf( r.properties[a] )+'</td></tr>'
		};
		if( !c2 ) return c1;
		return c1+'<p class="metaTitle">'+opts.propertiesLabel+'</p><table class="propertyTable"><tbody>'+c2+'</tbody></table>'

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
					if( indexBy( xhtml.images, 'id', u )<0 ) {
						xhtml.images.push({
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

/*					// $3 is the description between the tags <object></object>:
					let d = />([^<]*)<\/object>$/i.exec($2);    	// the description is in d[1]
					if( d && d[1].length ) d = withoutPath( d[1] )	// if there is a description, use it
					else d = withoutPath( u1 );						// use the target name, otherwise
*/					let d = withoutPath( $3 || u1 );
						
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
				case 'xhtml':
					return titleLinks( fileRef( pr.value, opts ), opts )
				case 'xs:string':
					return titleLinks( escapeHTML( pr.value ), opts )
				default:
					return escapeHTML( pr.value )
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
			r = itemById( specifData.resources,nd.nodes[i].resource );
			rC = itemById( specifData[rClasses], r[rClass] );
			params.nodeId = nd.nodes[i].id;
			ch += 	titleOf( r, rC, params, opts )
				+	propertiesOf( r, rC, opts )
				+	statementsOf( r, opts )
				+	paragraphOf( nd.nodes[i], lvl+1 )
		};
		return ch
	}
	function xhtmlOf( headTitle, sectId, sectTitle, body ) {
		// make a xhtml file from the content provided:
		return	'<?xml version="1.0" encoding="UTF-8"?>'
		+		'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">'
		+		'<html xmlns="http://www.w3.org/1999/xhtml">'
		+			'<head>'
		+				'<link rel="stylesheet" type="text/css" href="../Styles/styles.css" />'
		+				'<title>'+headTitle+'</title>'
		+			'</head>'
		+			'<body>'
		+	(sectTitle?	'<h1'+(sectId?' id="'+sectId+'"':'')+'>'+sectTitle+'</h1>' : '')
		+				body
		+			'</body>'
		+		'</html>'
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
}
