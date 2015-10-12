<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
<head>
<tiles:importAttribute name="caption" />
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63856602-1', 'auto');
  ga('send', 'pageview');

</script>
</head>
<body>
	<h2 class="pageCaption">
		<s:text name="getText(#attr['caption'])" />
	</h2>
	<tiles:insertAttribute name="row1" />
	<tiles:insertAttribute name="row2" />
	<tiles:insertAttribute name="row3" />
</body>
</html>