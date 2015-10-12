<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<tiles:useAttribute id="bodies" name="bodies" />
<s:iterator var="bodies" value="bodies">
	<div class="row-fluid">
		<div class="span12">
			<s:property/>
		</div>
	</div>
</s:iterator>
</body>
</html>