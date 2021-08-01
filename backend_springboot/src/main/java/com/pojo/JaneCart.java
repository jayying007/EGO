package com.pojo;

public class JaneCart {
	private int uid;
	private int cid;
	private int count;
	private int pid;
	private double price;
	private String product_pic;
	private String property;
	private String title;
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getProduct_pic() {
		return product_pic;
	}
	public void setProduct_pic(String product_pic) {
		this.product_pic = product_pic;
	}
	public String getProperty() {
		return property;
	}
	public void setProperty(String property) {
		this.property = property;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	@Override
	public String toString() {
		return "MyCart [uid=" + uid + ", cid=" + cid + ", count=" + count + ", pid=" + pid + ", price=" + price
				+ ", product_pic=" + product_pic + ", property=" + property + ", title=" + title + "]";
	}
	
	
}
