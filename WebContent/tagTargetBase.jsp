<% //PRIO-done: redundaten Code in base tagTargetBase vermeiden: gemeinsamen content in jspf-Dateien platziert %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@taglib prefix="jstl" uri="http://java.sun.com/jsp/jstl/core"%>
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
		<div class="content"  id="<tiles:insertAttribute name="tagQuery" />">
			<div class="row-fluid tagCaption">
				<div class="span12">
					<h4>
						<tiles:insertAttribute name="tagTargetHeader" />
					</h4>
					<div class="tagCaption-body">
						<tiles:insertAttribute name="caption" />
					</div>
				</div>
			</div>
			<tiles:useAttribute id="list" name="bodies" />
			<jstl:forEach var="item" items="${list}">
				<tiles:insertAttribute value="${item}" flush="true" />
			</jstl:forEach>
		</div>

		<div id="footer" class="row-fluid">
			<tiles:insertAttribute name="footer" />
		</div>
	</div>
	
	<%@ include file="scripts.jspf" %>
	
	<script type="text/javascript">
	
		$(function() {
			//hole Tag-String von id des Seiteninhalt-Containers
			var tag = document.getElementsByClassName('content')[0].getAttribute('id');
			highlight(document.getElementById(tag));
			
			//rekursives Durchsuchen aller text-Nodes nach tag-String
			function highlight(element) {
				if (element.childNodes.length > 0)
					for ( var i = 0; i < element.childNodes.length; i++)
						highlight(element.childNodes[i]);

				if (element.nodeType == Node.TEXT_NODE) {
					var strSrc = element.nodeValue;
					var strSearch = tag;
					var regex = new RegExp(strSearch+"[\\s-,.:\\)]","i");
					var pos = strSrc.search(regex);

					if (pos >= 0) {
						var fragment = document.createDocumentFragment();

						if (pos > 0)
							fragment.appendChild(document.createTextNode(strSrc.substr(0, pos)));

						fragment.appendChild(makeSpan(strSrc.substr(pos, strSearch.length)));

						if ((pos + strSearch.length + 1) < strSrc.length)
							fragment.appendChild(document.createTextNode(strSrc.substr(pos + strSearch.length)));

			 			//tausche Textnode gegen documentfragment aus (Workaround, da DOM3-replaceChild() von IE nicht unterstützt wird)
						element.parentNode.insertBefore(fragment, element);
						element.parentNode.removeChild(element);
					}
				}

			}
			
			//Erzeugen von span-Element um gefundenen Tag-String zum Zuweisen der highlight-Klasse
			function makeSpan(str) {
				var span = document.createElement("span");
				span.className = "highlighted-tag";
				span.appendChild(document.createTextNode(str));
				return span;
			}
			
		});
	</script>
</body>
</html>
