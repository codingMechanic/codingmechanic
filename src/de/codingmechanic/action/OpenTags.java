package de.codingmechanic.action;


import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

public class OpenTags extends ActionSupport  {

	HttpServletRequest request = ServletActionContext.getRequest();
	HttpSession session = request.getSession();

	private static final long serialVersionUID = 1L;
//	private List<testBean> testBeans = new ArrayList<testBean>();
	
	public OpenTags() {
	}

	public String execute() throws Exception {
    	
//    	testBeans.clear();
//    	testBeans.add(new testBean("<h1>funzt1</h1>"));
//    	testBeans.add(new testBean("funzt2"));
//    	testBeans.add(new testBean(request.getQueryString()));

		return SUCCESS;
	}
    
//    public List<testBean> getTestBeans() {
//        return testBeans;
//    }
	

}
