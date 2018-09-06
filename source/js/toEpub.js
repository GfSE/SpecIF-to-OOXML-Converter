function toEpub( specifData, opts ) {
	"use strict";
	// Accepts data-sets according to SpecIF v0.10.4 or v0.11.2 and later.
	// ePub Tutorials: 
	// - https://www.ibm.com/developerworks/xml/tutorials/x-epubtut/index.html
	// - http://www.jedisaber.com/eBooks/formatsource.shtml
	// ToDo: Embed font with sufficient UTF-8 coverage: http://www.dpc-consulting.org/epub-praxis-fonts-einbinden-und-verwenden/
	// ToDo: Control pagination: http://www.dpc-consulting.org/epub-praxis-seitenumbruche-steuern-und-elemente-zusammenhalten/

	// Check for missing options:
	if ( !opts || !opts.filePath ) return null;
	opts.epubImgPath = '../Images/';
	if( !opts.metaFontSize ) opts.metaFontSize = '70%';	
	if( !opts.metaFontColor ) opts.metaFontColor = '#0071B9';	// adesso blue
	if( !opts.linkFontColor ) opts.linkFontColor = '#0071B9';
//	if( !opts.linkFontColor ) opts.linkFontColor = '#005A92';	// darker
	if( opts.linkNotUnderlined==undefined ) opts.linkNotUnderlined = false;
	if( opts.preferPng==undefined ) opts.preferPng = true;
	
	
	// get the list of available files:
	if( !specifData.files || specifData.files.length<1 )
		get( 
			opts.filePath+'.json', 
			'arraybuffer',
			function(xhr) { 
				// save the supplied files in specifData.files:
				specifData.files = [];
				let files = JSON.parse( buf2str(xhr.response) ).files;
				files.forEach( function(f) { 
								specifData.files.push({
									id: 		f.url,
									mimeType: 	f.mimeType
								}) 
							});
				createEpub()
			}, 
			function(xhr) { 
				// no files supplied:
				specifData.files = [];
				createEpub()
			}, 
		)
	else
		// files are already listed, so we can start right away:
		createEpub();

	return
	
	// -----------------------
	function createEpub() {
		// All required parameters are available, so we can begin.
		let i=null, I=null,
			ePub = toXhtml( specifData, opts );
		
		ePub.fileName = specifData.title;
		ePub.mimetype = 'application/epub+zip';
//		console.debug( 'files', specifData.files );

	//	ePub.cover = undefined;
		ePub.styles = 	
					'body { margin-top:2%; margin-right:2%; margin-bottom:2%; margin-left:2%; font-family:Arial,sans-serif; font-size:100%; font-weight: normal; } \n'
			+		'div, p { text-align: justify; margin: 0.6em 0em 0em 0em; } \n'
			+		'div.title { text-align: center; font-size:200%; margin-top:3.6em } \n'
			+		'.inline-label { font-size: 90%; font-style: italic; margin-top:0.9em; } \n'
			+		'p.metaTitle { color: '+opts.metaFontColor+'; font-size: 90%; font-style: italic; margin-top:0.9em; } \n'
			+		'a { color: '+opts.linkFontColor+'; '+(opts.linkNotUnderlined?'text-decoration: none; ':'')+'} \n'
			+		'table.propertyTable, table.statementTable { color: '+opts.metaFontColor+'; width:100%; border-top: 1px solid #DDDDDD; border-collapse:collapse; margin: 0.6em 0em 0em 0em; padding: 0;} \n'
			+		'table.propertyTable td, table.statementTable td { font-size: '+opts.metaFontSize+'; border-bottom:  1px solid #DDDDDD; border-collapse:collapse; margin: 0; padding: 0em 0.2em 0em 0.2em; } \n'
			+		'td.propertyTitle, td.statementTitle { font-style: italic; } \n'
			+		'table.stdInlineWithBorder, table.doors-table { width:100%; border: 1px solid #DDDDDD; border-collapse:collapse; vertical-align:top; margin: 0; padding: 0; } \n'
			+		'table.stdInlineWithBorder th, table.stdInlineWithBorder td, table.doors-table th, table.doors-table td { border: 1px solid  #DDDDDD; margin: 0; padding: 0 0.1em 0 0.1em; font-size: 90% } \n'
	//		+		'h5 { font-family:Arial,sans-serif; font-size:110%; font-weight: normal; margin: 0.6em 0em 0em 0em; } \n'
			+		'h4 { font-family:Arial,sans-serif; font-size:120%; font-weight: normal; margin: 0.6em 0em 0em 0em; page-break-after: avoid; } \n'
			+		'h3 { font-family:Arial,sans-serif; font-size:140%; font-weight: normal; margin: 0.9em 0em 0em 0em; page-break-after: avoid; } \n'
			+		'h2 { font-family:Arial,sans-serif; font-size:160%; font-weight: normal; margin: 1.2em 0em 0em 0em; page-break-after: avoid; } \n'
			+		'h1 { font-family:Arial,sans-serif; font-size:180%; font-weight: normal; margin: 1.8em 0em 0em 0em; page-break-after: avoid; } \n';
		ePub.container = 
					'<?xml version="1.0" encoding="UTF-8"?>'
			+		'<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">'
			+			'<rootfiles>'
			+				'<rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>'
			+			'</rootfiles>'
			+		'</container>';
		ePub.content = 
					'<?xml version="1.0" encoding="UTF-8"?>'
			+		'<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookID" version="2.0" >'
			+		'<metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">'
			+			'<dc:identifier id="BookID" opf:scheme="UUID">SpecIF-'+specifData.id+'</dc:identifier>'	
			+			'<dc:title>'+specifData.title+'</dc:title>'
			+			'<dc:creator opf:role="aut">'+specifData.createdBy.familyName+', '+specifData.createdBy.givenName+'</dc:creator>'
			+			'<dc:publisher>'+specifData.createdBy.org.organizationName+'</dc:publisher>'
			+			'<dc:language>en-US</dc:language>'
			+			'<dc:rights>'+specifData.rights.title+'</dc:rights>'
			+		'</metadata>'
			+		'<manifest>'
			+			'<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />'
			+			'<item id="styles" href="Styles/styles.css" media-type="text/css" />'
	//		+			'<item id="pagetemplate" href="page-template.xpgt" media-type="application/vnd.adobe-page-template+xml" />'
	//		+			'<item id="titlepage" href="Text/title.xhtml" media-type="application/xhtml+xml" />';
		for( i=0,I=ePub.sections.length; i<I; i++ ) {
			ePub.content += '<item id="sect'+i+'" href="Text/sect'+i+'.xhtml" media-type="application/xhtml+xml" />'
		};
		for( i=0,I=ePub.images.length; i<I; i++ ) {
			ePub.content += '<item id="img'+i+'" href="Images/'+ePub.images[i].title+'" media-type="'+ePub.images[i].mimeType+'"/>'
			console.debug ('ePub.content',ePub.content);
		};

		ePub.content += '</manifest>'
			+		'<spine toc="ncx">'
	//		+			'<itemref idref="titlepage" />'
		for( i=0,I=ePub.sections.length; i<I; i++ ) {
			ePub.content += '<itemref idref="sect'+i+'" />'
		};
		ePub.content += '</spine>'
			+		'</package>';

		ePub.toc = 	
					'<?xml version="1.0" encoding="UTF-8"?>'
			+		'<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">'
			+		'<head>'
			+			'<meta name="dtb:uid" content="SpecIF-'+specifData.id+'"/>'	
			+			'<meta name="dtb:depth" content="1"/>'				// Verschachtelungstiefe
			+			'<meta name="dtb:totalPageCount" content="0"/>'
			+			'<meta name="dtb:maxPageNumber" content="0"/>'
			+		'</head>'
			+		'<docTitle>'
			+			'<text>'+specifData.title+'</text>'
			+		'</docTitle>'
		// http://epubsecrets.com/nesting-your-toc-in-the-ncx-file-and-the-nookkindle-workaround.php
			+		'<navMap>'
	/*		+			'<navPoint id="tocTitlepage" playOrder="1">'
			+				'<navLabel><text>Title Page</text></navLabel>'
			+				'<content src="Text/title.xhtml"/>'
			+			'</navPoint>'
	*/
		for( i=0,I=ePub.headings.length; i<I; i++ ) {
			// Build a table of content;
			// not all reader support nested ncx, so we provide a flat list.
			// Some tutorials have proposed to indent the title instead, but this does not work, as leading whitespace seems to be ignored.
			ePub.toc += 	'<navPoint id="tocHd'+i+'" playOrder="'+(i+1)+'">'
				+				'<navLabel><text>'+ePub.headings[i].title+'</text></navLabel>'
				+				'<content src="Text/sect'+ePub.headings[i].section+'.xhtml#'+ePub.headings[i].id+'"/>'
				+			'</navPoint>'
		};
		ePub.toc +=	'</navMap>'
			+		'</ncx>';
			
	//	console.debug('ePub',ePub);
		storeEpub(ePub)
	}
	function storeEpub( ePub ) {
		let zip = new JSZip(),
			i=null, I=null;
		zip.file( "mimetype", ePub.mimetype );
		zip.file( "META-INF/container.xml", ePub.container );
		zip.file( "OEBPS/content.opf", ePub.content );

		// Add the table of contents:
		zip.file( "OEBPS/toc.ncx", ePub.toc );
		
		// Add the styles:
		if( ePub.styles ) 
			zip.file( "OEBPS/Styles/styles.css", ePub.styles );
		
//		zip.file( "OEBPS/Text/title.xhtml", ePub.title );
		// Add the hierarchies:
		for( i=0,I=ePub.sections.length; i<I; i++ ) {
			zip.file( "OEBPS/Text/sect"+i+".xhtml", ePub.sections[i] )
		};

		// Add the images:
		i=ePub.images.length;
		next();
		return

		// ---------------
		function addFilePath( u ) {
			if( /^https?:\/\/|^mailto:/i.test( u ) ) {
				// don't change an external link starting with 'http://', 'https://' or 'mailto:'
				console.debug('addFilePath no change',u);
				return u  		
			};
			// else, add path:
			return opts.filePath+'/'+u.replace( '\\', '/' )
		}
		function next() {
			if( i>0 ) {
				// download next image:				
				get( addFilePath(ePub.images[--i].id), 'blob', save, next )
			} else {
				// done, store the specifz:
				zip.generateAsync({
						type: "blob"
					})
					.then(function(blob) {
						saveAs(blob, ePub.fileName+".epub")
					})
			};
			console.debug('blob', blob);
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
	// Convert arrayBuffer to string:
	function buf2str(buf) {
		// UTF-8 character table: http://www.i18nqa.com/debug/utf8-debug.html
		// or: https://bueltge.de/wp-content/download/wk/utf-8_kodierungen.pdf
		try {
			// see https://developers.google.com/web/updates/2014/08/Easier-ArrayBuffer-String-conversion-with-the-Encoding-API
			// DataView is a wrapper on top of the ArrayBuffer.
			var dataView = new DataView(buf);
			// The TextDecoder interface is documented at http://encoding.spec.whatwg.org/#interface-textdecoder
			var decoder = new TextDecoder('utf-8');
			return decoder.decode(dataView)
		} catch (e) {
			// see https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
			// for vintage browsers such as IE
			// Known problem: Special chars like umlaut are not properly converted.
			return String.fromCharCode.apply(null, new Uint8Array(buf))
		}
	}
	function get(url,rspT,sFn,nFn) {
		// https://blog.garstasio.com/you-dont-need-jquery/
		// https://www.sitepoint.com/guide-vanilla-ajax-without-jquery/
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.withCredentials = "true";
		// https://stackoverflow.com/a/42916772/2214
		xhr.responseType = rspT;
		xhr.onreadystatechange = function () {
	//		console.debug('xhr',this.readyState,this)
			if (this.readyState<4 ) return;
			if (this.readyState==4 && this.status==200) {
				if( typeof sFn=="function" ) sFn(this)
			};
			// continue in case of success and error:
			if( typeof nFn=="function" ) nFn()	
		};
		xhr.send(null)
	}
}
