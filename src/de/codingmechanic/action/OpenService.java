package de.codingmechanic.action;

import org.softwareforge.struts2.breadcrumb.BreadCrumb;

import com.opensymphony.xwork2.ActionSupport;

public class OpenService extends ActionSupport  {

	private static final long serialVersionUID = 1L;
	
	public OpenService() {
	}

	public String execute() {
		return SUCCESS;
	}

}