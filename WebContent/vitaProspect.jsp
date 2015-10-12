<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
	<div id="vitaProspect" class="row-fluid vitaProspect">
		<div class="span11 offset1">
			<h3>
				<span class="prospectCaption"><s:text name="resume.caption" /></span>
				<a class="uplink" href="CurriculumVitae">
					<span class="uplink-caption"><s:text name="uplink.caption" /></span>
					<img class="uplink-img" src="img/uplink.png"/>
				</a>
			</h3>
			<table id="timeline">
				<tr class="activity">
					<td><s:text name="resume.tr1td1" /></td>
					<td><s:text name="resume.tr1td2" /></td>
					<td><s:text name="resume.tr1td3" /></td>
					<td><s:text name="resume.tr1td4" /></td>
					<td><s:text name="resume.tr1td5" /></td>
				</tr>
				<tr class="timeline">
					<td>2004</td>
					<td>2009</td>
					<td>2010</td>
					<td>2013</td>
					<td class="terminal"></td>
				</tr>
			</table>
			<a class="infoLink" href="Vita">> Info</a>
		</div>
	</div>
</body>