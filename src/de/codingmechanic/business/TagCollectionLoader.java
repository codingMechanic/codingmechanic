package de.codingmechanic.business;

import java.io.File;
import java.util.ArrayList;
import java.util.Map;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

/**
 * Klasse zum Bereitstellen der Tag-Zuordnungen
 * @author Henning Richter
 */
public class TagCollectionLoader {
	
	XStream xstream = new XStream(new DomDriver());
	private String xml = "";
	
	public TagCollectionLoader() {
	}

	public Map<String,ArrayList<String>> loadAllObjects(File file) {
		//deserialisiere die Map, die die Tags mit den zugeordneten JSPs enthaelt
		Map<String,ArrayList<String>> tagMap = (Map<String,ArrayList<String>>)xstream.fromXML(file);
		return tagMap;
	}

}
