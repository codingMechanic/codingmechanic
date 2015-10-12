package de.codingmechanic.action;

import java.util.Map;

import org.softwareforge.struts2.breadcrumb.BreadCrumb;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class OpenHome extends ActionSupport {

	private static final long serialVersionUID = 1L;
	Map <String, Object> session = ActionContext.getContext().getSession();
	
	public OpenHome() {
	}

	public String execute() {
		if (session.get("WW_TRANS_I18N_LOCALE") == null)
			session.put("WW_TRANS_I18N_LOCALE","de");
		return SUCCESS;
	}

}
