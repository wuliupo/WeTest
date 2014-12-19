<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" name="viewport" />
<title>微信公众平台功能测试盒</title>
<style type="text/css">
.messageBox{width:100%;height:400px;border:2px dashed #e2e2e2;overflow-y:scroll;overflow-x:hidden;padding:10px; font-size: 12px;}
.left{float: left;width: 100%;text-align: left; margin-top: 20px; padding-top: 20px; border-top: 1px dashed #AAA;}
.left:first-child{border-top:none; padding-top:0; margin-top:0;}
.right{float: right;width: 100%;text-align: right;}
pre{float: right; width: 80%; word-wrap: break-word;word-break: break-all;border: 1px dashed #888; text-align: left; padding: 5px 10px; background-color: #EEE;user-select: none;-webkit-user-select: none;-moz-user-select: none;}
.wrapper{width:80%;margin:0 auto;}
.wrapper > div {margin: 10px 0;}
.large {width: 400px;}
input {padding: 3px 6px;}
.btn {padding: 5px 20px;margin-right: 20px; cursor: pointer;}
footer{margin-top:20px;border-top:1px solid #999;}
</style>
</head>
<body>
<div class="wrapper">
<h2>微信公众平台功能在线测试</h2>
<div>API 地址: <input class="large url" type="text" value="http://localhost/pigcms/weixin.php?token=zmdpln1403188557" placeholder="请输入API地址"></div>
<div class="messageBox"></div>
<div class="text">输入内容： <input type="text" class="large keyword" value="我是志愿者" placeholder="请在此输入内容"></div>
<div class="position">请输入地址： x=<input type="text" class="xposition" placeholder="X坐标" />, y=<input type="text" class="Yposition" placeholder="Y坐标" /></div>
<div>发送者openID： <input type="text" class="sendname" value="xred"></div>
<div>接收者openID： <input type="text" class="receivename" value="wechat" value="wuliupo"></div>
<div><input type="button" class="send btn" value="发送" /> <input type="button" class="btn" value="清空" onclick="$('.messageBox').empty()" /></div>
<footer><p> By <a href="http://pauli.cn" target="_blank">@Pauli</a></p></footer>
</div>
<script src="jquery.js"></script>
<script src="weixin.js"></script>
</body>
</html>
