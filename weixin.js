function loadXML(xmlString){
	var xmlDoc=null;
	//判断浏览器的类型
	//支持IE浏览器
	if(!window.DOMParser && window.ActiveXObject){   //window.DOMParser 判断是否是非ie浏览器
		var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
		for(var i=0;i<xmlDomVersions.length;i++){
			try{
				xmlDoc = new ActiveXObject(xmlDomVersions[i]);
				xmlDoc.async = false;
				xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
				break;
			}catch(e){
				console.error(e);
			}
		}
	//支持Mozilla浏览器
	}else if(window.DOMParser && document.implementation && document.implementation.createDocument){
		try{
			/* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
			 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
			 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
			 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
			 */
			xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml');
		}catch(e){
			console.error(e);
		}
	}

	return xmlDoc;
}
function displayText(data){
	$(".messageBox").html($(".messageBox").html() + "<span class='right'>回复：<br/><pre>文本消息："+data+"</pre></span>");
}
function displayNews (title,url,description,isFirst) {
	var html = $(".messageBox").html();
	if (isFirst == 1) {
		 html += "<span class='right'>回复：<br/><pre>图文消息：<a href='"+url+"' target='_blank' >"+title+"</a></pre></span><br/>";
	}else{
		 html += "<span class='right'><pre>图文消息：<a href='"+url+"' target='_blank' >"+title+"</a></pre></span><br/>";
	}
	$(".messageBox").html(html);
}
function displayMusic(title,url,description) {
	var messageBoxContent = $(".messageBox").html();
	var html = messageBoxContent + "<span class='right'>回复：<br/><pre>音乐消息：<a href='"+url+"' target='_blank' >"+title+"</a></pre></span><br/>";
	$(".messageBox").html(html);
}
function responseParse(data){
	console.log(data);
	//data=data.replace(/\r\n|\r|\n|/g, '');
	data=data.substring(data.indexOf('<xml>'));
	var xmldoc = loadXML(data);
	//console.log(xmldoc.documentElement.innerHTML);
	var content = xmldoc.getElementsByTagName("Content");
	var msgtype = xmldoc.getElementsByTagName("MsgType");
	if(!msgtype || msgtype.length < 1){
		displayText(data);
		return;
	}
	msgtype = msgtype[0].firstChild.nodeValue;
	if (msgtype == "text") {
		for (var i = 0; i < content.length; i++) {
			displayText(content[i].firstChild.nodeValue);
		}
	}
	if (msgtype == "news") {
		var items = xmldoc.getElementsByTagName("item");
		for (var i = 0; i < items.length; i++) {
			var title = items[i].getElementsByTagName("Title")[0].firstChild.nodeValue;
			var url = items[i].getElementsByTagName("Url")[0].firstChild.nodeValue;
			var description = items[i].getElementsByTagName("Description")[0].firstChild.nodeValue;
			if (i === 0) {
				displayNews(title,url,description,1);
			}else{
				displayNews(title,url,description,0);
			}
		};
	}
	if (msgtype == "music") {
		var title = xmldoc.getElementsByTagName("Title")[0].firstChild.nodeValue;
		var url = xmldoc.getElementsByTagName("MusicUrl")[0].firstChild.nodeValue;
		var description = xmldoc.getElementsByTagName("Description")[0].firstChild.nodeValue;
		displayMusic(title,url,description);
	}
}

function html_encode(str){
	if (str.length == 0) return "";
	//str = str.replace(/&/g, "&gt;");
	str = str.replace(/</g, "&lt;");
	str = str.replace(/>/g, "&gt;");
	str = str.replace(/ /g, "&nbsp;");
	str = str.replace(/\'/g, "&#39;");
	str = str.replace(/\"/g, "&quot;");
	str = str.replace(/\n/g, "<br>");
	return str;
}

$(document).ready(function(){
	var url = "";
	var data;

	$(".setUrl").click(function(){
		console.log("set url");
		url = $(".url")[0].value;
	});
	
	$('.messageBox').on('dblclick', '.right pre', function(){
		var thi=$(this);
		if(thi.hasClass('encode')){
			thi.html(thi.attr('data-old')).removeClass('encode');
		} else {
			thi.attr('data-old', thi.html()).html(html_encode(thi.html())).addClass('encode');
		}
	});

	$(".send").click(function(e){
		e.preventDefault();
		var tousername,fromusername,msgtype,content,funcflag;
		var url = $(".url").val();
		var keyword = $(".keyword").val();
		var data = "<xml><Url><![CDATA[{url}]]></Url><ToUserName><![CDATA[{tousername}]]></ToUserName><FromUserName><![CDATA[{fromusername}]]></FromUserName><CreateTime>123</CreateTime><MsgType><![CDATA[{msgtype}]]></MsgType><Content><![CDATA[{content}]]></Content><FuncFlag>{funcflag}</FuncFlag></xml>";
		if (!keyword) {
			alert("请输入内容");
			return;
		}
		content = $(".keyword").val();
		tousername = $(".sendname").val();
		fromusername = $(".receivename").val();
		funcflag = 0;
		msgtype = "text";
		data = data.replace("{tousername}",tousername);
		data = data.replace("{fromusername}",fromusername);
		data = data.replace("{msgtype}",msgtype);
		data = data.replace("{content}",content);
		data = data.replace("{funcflag}",funcflag);
		data = data.replace("{url}",url);
		//$(".keyword").val('');
		var messageBoxContent = $(".messageBox").html();
		var html = messageBoxContent + "<span class='left'>你说："+keyword+"</span>";
		$(".messageBox").html(html);

		var isCrosseDomain = url.indexOf(location.host);
		$.ajax({
			type:"POST",
			url:(isCrosseDomain == 6 || isCrosseDomain == 7) ? url : 'testpost.php',
			processData:false,
			data:data,
			contentType:"text/xml",
			//dataType: 'xml',
			success:function(data){
				responseParse(data);
			},
			error:function (XMLHttpRequest, textStatus, errorThrown) {
				//alert(errorThrown);
				console.log("error");
				console.log(XMLHttpRequest.responseText);
			}
		})
	})
});