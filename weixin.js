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
	if(data.length > 10)data = '</span><pre>' + html_encode(data) + '</pre><span>';
	$(".messageBox").html($(".messageBox").html() + "<span class='right'>回复："+data+"</span>");
}
function displayNews (title,url,description,isFirst) {
	var html = $(".messageBox").html();
	if (isFirst == 1) {
		 html += "<span class='right'>回复：图文消息:<a href='"+url+"' target='_blank' >"+title+"</a></span><br/>";
	}else{
		 html += "<span class='right'>图文消息:<a href='"+url+"' target='_blank' >"+title+"</a></span><br/>";
	}
	$(".messageBox").html(html);
}
function displayMusic(title,url,description) {
	var messageBoxContent = $(".messageBox").html();
	var html = messageBoxContent + "<span class='right'>回复：音乐消息:<a href='"+url+"' target='_blank' >"+title+"</a></span><br/>";
	$(".messageBox").html(html);
}
function responseParse(data){
	console.log(data);
	var xmldoc = loadXML(data);
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
		for (var i = items.length - 1; i >= 0; i--) {
			var title = items[i].getElementsByTagName("Title")[0].firstChild.nodeValue;
			var url = items[i].getElementsByTagName("Url")[0].firstChild.nodeValue;
			var description = items[i].getElementsByTagName("Description")[0].firstChild.nodeValue;
			if (i == items.length) {
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
	var s = "";
	if (str.length == 0) return "";
	s = str.replace(/&/g, "&gt;");
	s = s.replace(/</g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	s = s.replace(/ /g, "&nbsp;");
	s = s.replace(/\'/g, "&#39;");
	s = s.replace(/\"/g, "&quot;");
	s = s.replace(/\n/g, "<br>");
	return s;
}

$(document).ready(function(){
	var url = "";
	var data;

	$(".setUrl").click(function(){
		console.log("set url");
		url = $(".url")[0].value;
	})

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

		$.ajax({
			type:"POST",
			url:"testpost.php",
			processData:false,
			data:data,
			contentType:"text/xml",
			success:function(data){
				responseParse(data);
			},
			error:function (XMLHttpRequest, textStatus, errorThrown) {
				//alert(errorThrown);
				console.log("error");
			}
		})
	})
});