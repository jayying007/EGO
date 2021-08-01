package com.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pojo.lyjAddress;
import com.service.lyjAddressService;

@Controller
public class lyjAddressController {
	@Autowired
	private lyjAddressService addressService;
	
	@RequestMapping("/showAddress")
	@ResponseBody
	public Map<String, Object> showAddress(@RequestBody lyjAddress address) {
		Map<String, Object> data = new HashMap<String, Object>();
		List<lyjAddress> result01 = new ArrayList<lyjAddress>();
		result01 = addressService.showAddress01(address);
		Integer result02 = addressService.showAddress02(address);
		if(result01.size()>0) {
			if(result02 != null) {
				data.put("code","200");
				data.put("defaultaid",result02);
				data.put("allAddress",result01);
			}else {
				data.put("code","201");
				data.put("allAddress",result01);
			}
		}else {
			data.put("code","202");
		}	
		return data;
	}
	
	@RequestMapping("/addAddress")
	@ResponseBody
	public Map<String, Object> addAddress(@RequestBody lyjAddress address) {
		Map<String, Object> data = new HashMap<String, Object>();
		int aid = addressService.addAddress(address);
		data.put("code","200");
		data.put("aid", aid);
		return data;
	}
	
	@RequestMapping("/editAddress")
	@ResponseBody
	public Map<String, Object> editAddress(@RequestBody lyjAddress address) {
		Map<String, Object> data = new HashMap<String, Object>();
		addressService.editAddress(address);
		data.put("code","200");
		return data;
	}
	
	@RequestMapping("/showeditAddress")
	@ResponseBody
	public Map<String, Object> showeditAddress(@RequestBody lyjAddress address) {
		Map<String, Object> data = new HashMap<String, Object>();
		lyjAddress result = addressService.showeditAddress(address);
		data.put("code","200");
		data.put("result",result);
		return data;
	}
	
	@RequestMapping("/deleteAddress")
	@ResponseBody
	public Map<String, Object> deleteAddress(@RequestBody lyjAddress address) {
		Map<String, Object> data = new HashMap<String, Object>();
		addressService.deleteAddress(address);
		data.put("code","200");
		return data;
	}
	
	@RequestMapping("/setDefaultAddress")
	@ResponseBody
	public Map<String, Object> setDefaultAddress(@RequestBody lyjAddress address) {
		Map<String, Object> data = new HashMap<String, Object>();
		addressService.setDefaultAddress01(address);
		addressService.setDefaultAddress02(address);
		List<lyjAddress> Notdefaultaid = addressService.setDefaultAddress03(address);
		data.put("code","200");
		data.put("NotDefaultaid",Notdefaultaid);
		return data;
	}
}
