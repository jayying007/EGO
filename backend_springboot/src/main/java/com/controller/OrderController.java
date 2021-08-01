package com.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import com.dao.OrderDao;
import com.pojo.JaneOrder;
import com.pojo.JaneOrder2;
import com.pojo.JaneOrder3;
import com.pojo.JaneProduct;

@Controller
@RequestMapping("/order/item")
public class OrderController {
	@Autowired
	private OrderDao orderDao;
	
	@RequestMapping("/prepare")
	@ResponseBody
	public Map<String,Object> prepare(@RequestBody JaneOrder json) {
		
		String[] pids = json.getPids().split(",");
		List<JaneProduct> products = orderDao.getPreOrder(pids);

		Map<String,Object> map = new HashMap<>();
		map.put("code", 200);
		map.put("data", products);
		
		return map;
	}
	
	@RequestMapping("/create")
	@ResponseBody
	public Map<String,Object> create(@RequestBody JaneOrder json) {
		int uid = json.getUid();
		int aid = json.getAid();
		String[] pids = json.getPids().split(",");
		String[] counts = json.getCounts().split(",");
		//List<JaneProduct> products = orderDao.getPreOrder(pids);
		JaneOrder janeOrder = new JaneOrder();
		janeOrder.setOrder_time(new Date().getTime());
		janeOrder.setUid(uid);
		janeOrder.setAid(aid);
		orderDao.addOrder(janeOrder);
		for(int i=0;i<pids.length;i++) {
			janeOrder.setCount(Integer.parseInt(counts[i]));
			janeOrder.setPid(Integer.parseInt(pids[i]));
			orderDao.addOrderDetail(janeOrder);
		}
		Map<String,Object> map = new HashMap<>();
		map.put("code", 200);
		map.put("msg", "success");
		
		return map;
	}
	
	@RequestMapping("/list")
	@ResponseBody
	public Map<String,Object> list(@RequestBody JaneOrder json) {
		
		int uid = json.getUid();
		int status = json.getStatus();
		JaneOrder janeOrder = new JaneOrder();
		janeOrder.setUid(uid);
		janeOrder.setStatus(status);
		
		List<JaneOrder2> orders = orderDao.getOrders(janeOrder);

		Map<String,Object> map = new HashMap<>();
		map.put("code", 200);
		map.put("data", orders);
		
		return map;
	}
	
	@RequestMapping("/detail")
	@ResponseBody
	public Map<String,Object> detail(@RequestBody JaneOrder json) {
		
		int oid = json.getOid();
		
		List<JaneOrder3> orders = orderDao.getOrderDetail(oid);

		Map<String,Object> map = new HashMap<>();
		map.put("code", 200);
		map.put("data", orders);
		
		return map;
	}
	
	@RequestMapping("/update")
	@ResponseBody
	public Map<String,Object> update(@RequestBody JaneOrder json) {
		
		int oid=json.getOid();
		orderDao.updateOrder(oid);

		Map<String,Object> map = new HashMap<>();
		map.put("code", 200);
		map.put("msg", "delete succ");
		
		return map;
	}
	
	@RequestMapping("/delete")
	@ResponseBody
	public Map<String,Object> delete(@RequestBody JaneOrder json) {
		
		int oid=json.getOid();
		orderDao.deleteOrderDetail(oid);
		orderDao.deleteOrder(oid);

		Map<String,Object> map = new HashMap<>();
		map.put("code", 200);
		map.put("msg", "delete succ");
		
		return map;
	}
}
