package de.codingmechanic.action;

import java.io.File;
import java.util.Properties;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import de.codingmechanic.business.EmailValidator;
import de.codingmechanic.business.LocalProperties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.http.HttpServletRequest;

import net.tanesha.recaptcha.ReCaptchaImpl;
import net.tanesha.recaptcha.ReCaptchaResponse;

public class DispatchEmail extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private String from;
	private String subject;
	private String body;
	private File attachment;

	static Properties properties = new Properties();
	static {
		properties.put("mail.smtp.host", "web20.ip-projects.de");
		// properties.put("mail.smtp.socketFactory.port", "465");
		// properties.put("mail.smtp.socketFactory.class",
		// "javax.net.ssl.SSLSocketFactory");
		properties.put("mail.smtp.auth", "true");
		// properties.put("mail.smtp.port", "25");
		properties.put("mail.smtp.user", "");
		properties.put("mail.password", "");
	}
	javax.mail.Authenticator authentication = new javax.mail.Authenticator() {
		@Override
		public PasswordAuthentication getPasswordAuthentication() {
			return new PasswordAuthentication("info@codingmechanic.de",
					"67?Palawer");
		}
	};

	/**
	 * Klasse zur Verarbeitung von eMail-Formulareingaben
	 * 
	 * @author Henning Richter
	 */
	public DispatchEmail() {
	}

	public String execute() {

		String ret = SUCCESS;
		String fileAttachment = "C:\\filename.pdf";

		try {
			Session session = Session.getDefaultInstance(properties,
					authentication);
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(from));
			message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse("info@codingmechanic.de"));
			message.setSubject(subject);

			if (attachment != null) {
				MimeBodyPart messageBodyPart = new MimeBodyPart();
				// fuege Textkoerper hinzu
				messageBodyPart.setText(body);
				Multipart multipart = new MimeMultipart();
				multipart.addBodyPart(messageBodyPart);
				// fuege Anhang hinzu
				messageBodyPart = new MimeBodyPart();
				DataSource source = new FileDataSource(attachment);
				messageBodyPart.setDataHandler(new DataHandler(source));
				messageBodyPart.setFileName("Anhang");
				multipart.addBodyPart(messageBodyPart);
				message.setContent(multipart);
			} else
				message.setText(body);
			message.saveChanges();
			Transport.send(message);
		} catch (Exception e) {
			ret = ERROR;
			e.printStackTrace();
		}

		return ret;
	}

	public void validate() {
		Properties prop = new LocalProperties().getLocalProperties();
		EmailValidator emailValidator = new EmailValidator();

		if (getFrom().length() == 0)
			addFieldError("from", prop.getProperty("email.noEmail"));
		else if (!emailValidator.validate(getFrom()))
			addFieldError("from", prop.getProperty("email.invalid"));

		if (getBody().length() == 0)
			addFieldError("body", prop.getProperty("email.noBody"));

		HttpServletRequest request = (HttpServletRequest) ActionContext
				.getContext()
				.get(org.apache.struts2.StrutsStatics.HTTP_REQUEST);
		String remoteAddr = request.getRemoteAddr();
		ReCaptchaImpl reCaptcha = new ReCaptchaImpl();
		reCaptcha.setPrivateKey("6Les3ucSAAAAAPwIuv2opQ4lRJWhw99U0acD8aVG");

		String challenge = request.getParameter("recaptcha_challenge_field");
		String uresponse = request.getParameter("recaptcha_response_field");
		ReCaptchaResponse reCaptchaResponse = reCaptcha.checkAnswer(remoteAddr,
				challenge, uresponse);

		if (!reCaptchaResponse.isValid()) {
			addFieldError("submit", prop.getProperty("email.wrongCaptcha"));
		}

	}

	// public String doSendEmail() throws IOException, AddressException,
	// MessagingException {
	// File saveFile = null;
	// String tempPath = System.getProperty("java.io.tmpdir");
	// saveFile = new File(tempPath + File.separator + fileUploadFileName);
	// FileUtils.copyFile(fileUpload, saveFile);
	// System.out.println("file"+fileUpload);
	// EmailUtility.sendEmail(host, port, userName1, password1, recipient,
	// subject, message, saveFile);
	// System.out.println("save file"+saveFile);
	// if (saveFile != null) {
	// saveFile.delete();
	// }
	// return "success";
	// }

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public File getAttachment() {
		return attachment;
	}

	public void setAttachment(File attachment) {
		this.attachment = attachment;
	}

}