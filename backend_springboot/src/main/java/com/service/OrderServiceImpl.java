package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.OrderDao;
import com.pojo.JaneOrder;
import com.pojo.JaneOrder2;
import com.pojo.JaneOrder3;
import com.pojo.JaneProduct;

@Service("orderService")
@Transactional
public class OrderServiceImpl implements OrderService{
	@Autowired
	private OrderDao orderDao;
	@Override
	public List<JaneProduct> getPreOrder(String[] pids){
		return orderDao.getPreOrder(pids);
	}
	@Override
	public int addOrder(JaneOrder janeOrder) {
		return orderDao.addOrder(janeOrder);
	}
	@Override
	public int addOrderDetail(JaneOrder janeOrder) {
		return orderDao.addOrderDetail(janeOrder);
	}
	@Override
	public List<JaneOrder2> getOrders(JaneOrder janeOrder) {
		return orderDao.getOrders(janeOrder);
	}
	@Override
	public List<JaneOrder3> getOrderDetail(int oid) {
		return orderDao.getOrderDetail(oid);
	}
	@Override
	public int updateOrder(int oid) {
		return orderDao.updateOrder(oid);
	}
	@Override
	public int deleteOrder(int oid) {
		return orderDao.deleteOrder(oid);
	}
	@Override
	public int deleteOrderDetail(int oid) {
		return orderDao.deleteOrderDetail(oid);
	}
}
