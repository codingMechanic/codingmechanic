<%@ page import="net.tanesha.recaptcha.ReCaptcha"%>
<%@ page import="net.tanesha.recaptcha.ReCaptchaFactory"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
<head>
</head>
<body>

	<h3>
		<span class="prospectCaption"><s:text name="contact.caption" /></span> <a class="uplink" href="Start"> <span class="uplink-caption"><s:text
					name="startLink" /></span> <img class="uplink-img" src="img/uplink.png" />
		</a>
	</h3>
	<div class="row-fluid prospect clientProspect">
		<div class="span3 offset1">
			<div class="kontaktText">
				<div class="adressAngabe">
					<span>Henning Richter</span> <span>Gartenstr. 6</span> <span>10115 Berlin</span> <span>Deutschland</span>
				</div>
				<div class="kontaktAngabe">
					<span>mobil: 0152/28561598</span> <span>eMail: <a href="mailto:info@codingmechanic.de">info@codingmechanic.de</a></span>
				</div>
			</div>
		</div>
		<div class="span6 offset1">
			<div>
				<%-- <s:text name="email.caption" /> --%>
				<s:form action="dispatchEmail" method="post" enctype="multipart/form-data">
					<!-- transportiere mittels verstecktem secret-Feld den Status von einer view in die nächste -->
					<s:hidden name="secret" value="abracadabra" />
					<s:textfield key="email.from" name="from" />
					<s:textfield key="email.subject" name="subject" />
					<s:textarea rows="10" key="email.body" name="body" />
					<s:checkboxlist key="email.service" name="service" list="{'Frontend','Backend','Design'}" />
<%-- 					<s:label for="attachment" value="Anhang" /> --%>
					<s:file key="email.file" name="attachment" accept="text/html,text/plain" />
					<!-- erzeuge ein einmaliges unverwechselbares Token um festzustellen, ob der Formularinhalt schon abgeschickt wurde (z.B. bei doppeltem Absenden nach back one page-Aufruf in Browser) -->
					<s:token />
					<%-- captcha-Feld --%>
					<tr>
						<td colspan="2">
							<%
								ReCaptcha c = ReCaptchaFactory.newReCaptcha(
									"6Les3ucSAAAAAG_D9pq9pwMiQv5G50uT_n6CNHVE",
									"6Les3ucSAAAAAPwIuv2opQ4lRJWhw99U0acD8aVG", false);
								out.print(c.createRecaptchaHtml(null, null));
							%>
						</td>
					</tr>
					<s:submit name="submit" key="email.submit" />
				</s:form>
			</div>
		</div>
	</div>
</body>
</html>