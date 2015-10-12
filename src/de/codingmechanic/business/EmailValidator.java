package de.codingmechanic.business;

import java.util.regex.*;
 
/**
 * Klasse zur Pruefung der Plausibilitaet von eMail-Formulareingaben
 * @author Henning Richter
 */
public class EmailValidator {

	private static final String regEx = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
	private Pattern pattern;
	private Matcher matcher;
 
	public EmailValidator() {
		pattern = Pattern.compile(regEx);
	}
	
	public boolean validate(final String value) {
		matcher = pattern.matcher(value);
		return matcher.matches();
	}
}