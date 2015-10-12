<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML>
<html>
<head>
<%@ include file="head.jspf" %>
<tiles:importAttribute name="title" />
<title>
	<s:text name="getText(#attr['title'])" />
</title>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63856602-1', 'auto');
  ga('send', 'pageview');

</script>
</head>
<body id="<tiles:insertAttribute name="pageId" ignore="true" />" class="<s:text name="getText(#session.WW_TRANS_I18N_LOCALE)" />">
	<div id="header" class="navbar header">
		<tiles:insertAttribute name="header" />
	</div>
	<div class="container-fluid" >
		<div class="content">
			<tiles:insertAttribute name="body" />
		</div>
		<div id="footer" class="row-fluid">
			<tiles:insertAttribute name="footer" />
		</div>
	</div>
	<%@ include file="scripts.jspf" %>
</body>
</html>