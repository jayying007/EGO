package com.pojo;

import java.math.BigInteger;

public class UserOrder {
	private int oid;
	private int uid;
	private int aid;
	private int status;
	private BigInteger order_time;
	private BigInteger pay_time;
	private BigInteger deliever_time;
	private BigInteger received_time;
	public int getOid() {
		return oid;
	}
	public void setOid(int oid) {
		this.oid = oid;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public int getAid() {
		return aid;
	}
	public void setAid(int aid) {
		this.aid = aid;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public BigInteger getOrder_time() {
		return order_time;
	}
	public void setOrder_time(BigInteger order_time) {
		this.order_time = order_time;
	}
	public BigInteger getPay_time() {
		return pay_time;
	}
	public void setPay_time(BigInteger pay_time) {
		this.pay_time = pay_time;
	}
	public BigInteger getDeliever_time() {
		return deliever_time;
	}
	public void setDeliever_time(BigInteger deliever_time) {
		this.deliever_time = deliever_time;
	}
	public BigInteger getReceived_time() {
		return received_time;
	}
	public void setReceived_time(BigInteger received_time) {
		this.received_time = received_time;
	}
	
}
