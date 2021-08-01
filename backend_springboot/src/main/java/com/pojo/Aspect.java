package com.pojo;

public class Aspect {
	private int aspectid;
	private String name;
	
	public int getAspectid() {
		return aspectid;
	}
	public void setAspectid(int aspectid) {
		this.aspectid = aspectid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "aspectid is "+aspectid+" name is "+name;
	}
}
