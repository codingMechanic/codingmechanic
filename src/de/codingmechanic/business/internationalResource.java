package de.codingmechanic.business;

import java.util.*;

public class internationalResource {
	public static void main(String[] args) {
		String baseName = "content_de";

		try {
			ResourceBundle bundle = ResourceBundle.getBundle(baseName);
			System.out.println(bundle.getString("cvCaption"));
		} catch (MissingResourceException e) {
			System.err.println(e);
		}
	}
}