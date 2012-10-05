<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>DEMO</title>
	<style type="text/css">
			#loading{
		        position:absolute;
		        left:40%;
		        top:40%;
		        padding:2px;
		        z-index:20001;
		        height:auto;
		    }
		    #loading a {
		        color:#225588;
		    }
		    #loading .loading-indicator{
		        background:white;
		        color:#444;
		        font:bold 13px tahoma,arial,helvetica;
		        padding:10px;
		        margin:0;
		        height:auto;
		    }
		    #loading-msg {
		        font: normal 10px arial,tahoma,sans-serif;
		    }
		</style>
  </head>
  
  <body>
     <div id="loading">
			<div class="loading-indicator">
				<img src="<%=basePath %>images/loading32.gif" width="31" height="31" style="margin-right:8px;float:left;vertical-align:top;" />
				DEMO
				<br />
				<span id="loading-msg">加载样式和图片...</span>
			</div>
		</div>
		<div id="bd">
			<link rel="stylesheet" type="text/css" media="all" href="resources/css/ext-all.css" />
			<link rel="stylesheet" type="text/css" media="all" href="css/index.css" />
			<script type="text/javascript">document.getElementById('loading-msg').innerHTML = '加载核心...';</script>
			<script type="text/javascript" src="<%=basePath %>adapter/ext/ext-base.js"></script>
			<script type="text/javascript">document.getElementById('loading-msg').innerHTML = '加载UI组件...';</script>
			<script type="text/javascript" src="<%=basePath %>js/ext-all.js"></script>
			<script type="text/javascript">document.getElementById('loading-msg').innerHTML = '模块初始化...';</script>
			<script type="text/javascript">
				mxBasePath = './';
				var AREA_ID = 
			</script>
			<script type="text/javascript" src="<%=basePath %>js/mxClient.js"></script>
			<script type="text/javascript" src="<%=basePath %>js/Ext.ux.ztesoft.JGraphPanel.js"></script>
			<script type="text/javascript" src="<%=basePath %>js/constant.js"></script>
			<script type="text/javascript" src="<%=basePath %>js/main.js"></script>
		</div>
		<div id="header">
			<h1>
				DEMO
			</h1>
		</div>
  </body>
</html>
