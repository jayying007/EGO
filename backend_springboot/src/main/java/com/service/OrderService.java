package com.service;

import java.util.List;

import com.pojo.JaneOrder;
import com.pojo.JaneOrder2;
import com.pojo.JaneOrder3;
import com.pojo.JaneProduct;

public interface OrderService {
	public List<JaneProduct> getPreOrder(String[] pids);
	public int addOrder(JaneOrder janeOrder);
	public int addOrderDetail(JaneOrder janeOrder);
	public List<JaneOrder2> getOrders(JaneOrder janeOrder);
	public List<JaneOrder3> getOrderDetail(int oid);
	public int updateOrder(int oid);
	public int deleteOrder(int oid);
	public int deleteOrderDetail(int oid);
}
