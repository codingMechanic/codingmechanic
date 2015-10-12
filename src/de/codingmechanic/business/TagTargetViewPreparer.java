package de.codingmechanic.business;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.swing.DefaultListModel;

import org.apache.struts2.ServletActionContext;
import org.apache.tiles.preparer.PreparerException;
import org.apache.tiles.preparer.ViewPreparer;
import org.apache.tiles.context.TilesRequestContext;
import org.apache.tiles.AttributeContext;
import org.apache.tiles.Attribute;
import org.apache.tiles.ListAttribute;

import com.opensymphony.xwork2.ActionContext;

/**
 * Tiles Preparer-Klasse zur Zusammenstellung des tagTargetBody.jsp-Inhalts in Abhaengigkeit vom Request-Parameter
 * @author Henning Richter
 */
public class TagTargetViewPreparer implements ViewPreparer {

	
    public void execute(TilesRequestContext tilesContext, AttributeContext attributeContext) throws PreparerException {

    	ArrayList<String> content = new ArrayList<String>();
    	HttpServletRequest request = ServletActionContext.getRequest();
    	
    	String currentLocale = ActionContext.getContext().getLocale().toString();
    	//bereinige die Lokale von den Laender-Postfixes
		int delimiterPos = currentLocale.indexOf("_");
    	if(delimiterPos>0)
    		currentLocale= currentLocale.substring(0, delimiterPos);
    	
    	String queryVal = "";
    	
    	//hole Wert des tag-Parameters vom Html-Request
    	String directQueryVal = request.getParameterValues("tag")[0];
    	
    	String[] whitelist = {"jsp", "java", "struts", "css", "ux", "webcard", "page-speed", "responsive", "seo", "photoShop", "illustrator", "tdd", "ria", "effects", "animations", "softwareDev", "webEng", "design", "ci", "cross-browser", "social", "oop", "i18n", "quality", "ajax", "jquery", "svg", "tag-cloud"};
    	
    	if(inArray(whitelist,directQueryVal)) queryVal = directQueryVal;
    	
    	TagCollectionLoader tagCollectionLoader = new TagCollectionLoader();
    	//referenziere die tag-Zuordnungsdatei durch Zugriff ueber den class-Code (unabhaengig vom Pfad, in dem die Datei liegt) 
    	Map<String,ArrayList<String>> tagMap = tagCollectionLoader.loadAllObjects(new File(TagTargetViewPreparer.class.getClassLoader().getResource("tags.xml").getFile()));
    
    	Properties prop = new Properties();
    	try {
            //lade die properties-Datei
    		prop.load(TagTargetViewPreparer.class.getClassLoader().getResourceAsStream("content_"+currentLocale+".properties"));
    	} catch (IOException ex) {
    		ex.printStackTrace();
        }
	    	
	    //hole Content aus properties-Dateien fuer Ueberschrift und Beschreibungstext als Einleitung fuer TagTarget-Seite
	    String tagTargetHeader = prop.getProperty("tagTarget.caption.header."+queryVal);
	    String caption =  prop.getProperty("tagTarget.caption.body."+queryVal);
	    	
	    //stelle die Attribute zusammen, die im body der Tag-Ergebnisseite angezeigt werden sollen
		ListAttribute tiles = new ListAttribute();
		tiles.setRenderer("template");
	
		try {
			content = tagMap.get(queryVal);
	        for(String fragment : content)
	    		tiles.add(new Attribute(fragment));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//schreibe die Attribute in den Kontext, um diese in der jsp / tile verfuegbar zu machen
		attributeContext.putAttribute("tagTargetHeader", new Attribute(tagTargetHeader));
		attributeContext.putAttribute("tagQuery", new Attribute(queryVal));
		attributeContext.putAttribute("caption", new Attribute(caption));
        attributeContext.putAttribute("bodies", tiles, true);
    }
    
    public static boolean inArray(String[] haystack, String needle) {
        for(int i=0;i<haystack.length;i++) {
            if(haystack[i].toString().equals(needle)) {
                return true;
            }
        }
        return false;
    }
}
//PRIO-c: in tuckey spezifische Seitennamen fuer Tag-Targets definieren