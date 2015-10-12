<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
<head>
<tiles:importAttribute name="caption" />
</head>
<body>
	<h2 class="pageCaption">
		<s:text name="getText(#attr['caption'])" />
	</h2>
	<tiles:insertAttribute name="row1" />
	<tiles:insertAttribute name="row2" />
	<tiles:insertAttribute name="row3" />
	<tiles:insertAttribute name="row4" />
</body>
</html>