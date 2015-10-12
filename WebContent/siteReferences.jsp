<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
	<h3>
	<span class="prospectCaption"><s:text name="siteReferences.caption" /></span>
	<a class="uplink" href="Referenzen">
	<span class="uplink-caption"><s:text name="uplink.caption" /></span>
	<img class="uplink-img" src="img/uplink.png"/>
	</a>
	</h3>
	<div class="row-fluid row0 siteReferencesHome">
		<div class="span4">
			<a href="http://www.volkstheater-rostock.de" target="blank"><img src="img/volkstheater-rostock-280px.jpg" alt="volkstheater-rostock.de" title="volkstheater-rostock.de" /></a>
			<div class="caption"><s:text name="siteReferences.sample6.caption"></s:text></div>		
			<div><s:text name="siteReferences.sample6.description"></s:text></div>	
		</div>
		<div class="span4">
			<a href="http://www.industriekultur-nrw.de" target="blank"><img src="img/industriekultur-nrw-280px.jpg" alt="industriekultur-nrw.de" title="industriekultur-nrw.de" /></a>
			<div class="caption"><s:text name="siteReferences.sample7.caption"></s:text></div>	
			<div><s:text name="siteReferences.sample7.description"></s:text></div>	
		</div>
		<div class="span4">
			<a href="https://reg.culturebase.org" target="blank"><img src="img/culturebase-280px.jpg" alt="culturebase.org" title="culturebase.org" /></a>
			<div class="caption"><s:text name="siteReferences.sample8.caption"></s:text></div>	
			<div><s:text name="siteReferences.sample8.description"></s:text></div>	
		</div>
	</div> 
	<div class="row-fluid row1 siteReferencesHome">
		<div class="span4">
			<a href="http://www.segelflug-northeim.de/start.html" target="blank"><img src="img/segelflug-northeim-280px.jpg" alt="segelflug-northeim.de" title="segelflug-northeim.de" /></a>
			<div class="caption"><s:text name="siteReferences.sample1.caption"></s:text></div>		
			<div><s:text name="siteReferences.sample1.description"></s:text></div>	
		</div>
		<div class="span4">
			<a href="http://www.dotnetbb.de" target="blank"><img src="img/dotnetbb-280px.jpg" alt="dotnetbb.de" title="dotnetbb.de" /></a>
			<div class="caption"><s:text name="siteReferences.sample2.caption"></s:text></div>	
			<div><s:text name="siteReferences.sample2.description"></s:text></div>	
		</div>
		<div class="span4">
			<a href="http://www.la-coffeina.de/start.html" target="blank"><img src="img/la-coffeina-280px.jpg" alt="la-coffeina.de" title="la-coffeina.de" /></a>
			<div class="caption"><s:text name="siteReferences.sample3.caption"></s:text></div>		
			<div><s:text name="siteReferences.sample3.description"></s:text></div>	
		</div>
	</div>
	<div class="row-fluid row2 siteReferencesHome">
		<div class="span4 offset2">
			<a href="http://www.muettergenesungswerk.de" target="blank"><img src="img/muettergenesungswerk-mobil-280px.jpg" alt="muettergenesungswerk.de/mobil" title="muettergenesungswerk.de/mobil" /></a>
			<div class="caption"><s:text name="siteReferences.sample4.caption"></s:text></div>		
			<div><s:text name="siteReferences.sample4.description"></s:text></div>	
		</div>
		<div class="span4">
			<a href="http://www.axtraxx.com/RichterHP/Start.html" target="blank"><img src="img/richter-northeim-280px.jpg" alt="richter-northeim.de" title="richter-northeim.de" /></a>
			<div class="caption"><s:text name="siteReferences.sample5.caption"></s:text></div>	
			<div><s:text name="siteReferences.sample5.description"></s:text></div>			
		</div>
		<div class="span4"></div>
	</div>
	<div class="row-fluid row3 siteReferencesProspect" >
		<div class="span4 offset1">
			<div id="thumbnails">
				<img src="img/segelflug-northeim-280px.jpg" alt="segelflug-northeim.de" title="segelflug-northeim.de" />
				<img src="img/dotnetbb-280px.jpg" alt="dotnetbb.de" title="dotnetbb.de" />
				<img src="img/la-coffeina-280px.jpg" alt="la-coffeina.de" title="la-coffeina.de" />
				<img src="img/muettergenesungswerk-mobil-280px.jpg" alt="muettergenesungswerk.de/mobil" title="muettergenesungswerk.de/mobil" />
				<img src="img/richter-northeim-280px.jpg" alt="richter-northeim.de" title="richter-northeim.de" />
	  		</div>
			<div id="panel">
				<img id="screen" src="" />
			</div>
		</div>
		<div class="span7 description">
			<h2><a href='<s:url action="siteReferences" />'><s:text name="siteReferences.references.description.caption"></s:text></a></h2>
			<s:text name="siteReferences.references.description"></s:text>
			<a href="Webseitenreferenzen">> Info</a>
		</div>
	</div>
</body>