package com.pojo;

import java.math.BigInteger;

public class ProductComment {
	private int uid;
	private int fid;
	private String comment;
	private BigInteger time;
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public int getFid() {
		return fid;
	}
	public void setFid(int fid) {
		this.fid = fid;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public BigInteger getTime() {
		return time;
	}
	public void setTime(BigInteger time) {
		this.time = time;
	}
	
}
