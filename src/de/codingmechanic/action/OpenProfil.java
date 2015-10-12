package de.codingmechanic.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;

public class OpenProfil extends ActionSupport  implements ServletResponseAware {

	private static final long serialVersionUID = 1L;
	private HttpServletResponse response;
	
	public OpenProfil() {
	}
	
	public String execute() {
		response.setContentType("application/xhtml+xml");
		return SUCCESS;
	}

	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}

}
