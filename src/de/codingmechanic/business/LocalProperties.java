package de.codingmechanic.business;

import java.io.IOException;
import java.util.Properties;

import com.opensymphony.xwork2.ActionContext;

/**
 * Klasse zum sprachabhaengigen Bereitstellen der jeweiligen content-Property
 * @author Henning Richter
 */
public class LocalProperties {

	public Properties getLocalProperties() {
		String currentLocale = ActionContext.getContext().getLocale().toString();
	
		Properties prop = new Properties();
		try {
		    //lade die properties-Datei
			prop.load(TagTargetViewPreparer.class.getClassLoader().getResourceAsStream("content_"+currentLocale+".properties"));
		} catch (IOException ex) {
			ex.printStackTrace();
		}
		return prop;
	}
}
