# 前言
开发这个测试工具，在本地部署后可在本地对开发的微信功能做测试。
原项目：<https://github.com/xred/WeTest>

# 需求
* PHP以及cURL
* jQuery

# 使用方法
1. 将文件放到可以执行PHP的目录并通过浏览器访问即可，可在线上或者本地部署。
2. 输入地址（test.php）以及关键字，可根据需求改变发送方以及接收方openID（非必须，可选）
3. 点击发送即可模拟在微信中发消息给服务器的请求.
4. 得到服务器返回的请求，结果经解析后显示在当前页面，无需刷新。

# 文件说明
1. test.php 为实际测试的页面，所有的测试功能由此操作
2. testpost.php 为数据发送模块，向服务器请求数据并返回给test.php
3. jQuery.js 前台ajax需用到

# 其他
1. 目前仅支持文字\地理位置 模拟发送，之后会更新图片和语音发送。
2. 目前支持可以接收并解析文字、音乐、图文消息
3. 返回的所有XML被打印到console当中，方便调试
4. 微信官网测试地址： <http://mp.weixin.qq.com/debug>
