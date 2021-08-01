package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import com.dao.UserDao;
import com.pojo.JaneAddress;

@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserDao userDao;
	
	@RequestMapping("/address/all")
	@ResponseBody
	public Map<String,Object> list(@RequestBody User json) {
		
		int uid=json.getUid();
		List<JaneAddress> address = userDao.getAllAddress(uid);

		Map<String,Object> map = new HashMap<>();
		map.put("code", 200);
		map.put("data", address);
		
		return map;
	}
}
