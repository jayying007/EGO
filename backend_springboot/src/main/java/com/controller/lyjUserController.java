package com.controller;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pojo.lyjUser;
import com.service.lyjUserService;

@Controller
public class lyjUserController {
	@Autowired
	private lyjUserService userService;

	@RequestMapping("/login")
	@ResponseBody
	public Map<String, Object> login(@RequestBody lyjUser user) {
		Map<String, Object> data = new HashMap<String, Object>();
		lyjUser result = userService.selectUserBynickname(user);
		if (result != null) {
			if(!result.getNickname().equals("root")) {
				data.put("result", result);
				data.put("code", "200");				
			}else {
				data.put("code", "506");
			}
		} else {
			data.put("code", "506");
		}
		return data;
	}

	@RequestMapping("/root")
	@ResponseBody
	public Map<String, Object> root(@RequestBody lyjUser user) {
		Map<String, Object> data = new HashMap<String, Object>();
		lyjUser result = userService.selectUserBynickname(user);
		if (result != null) {
			if(result.getNickname().equals("root")) {
				data.put("code", "200");				
			}else {
				data.put("code", "506");
			}
		} else {
			data.put("code", "506");
		}
		return data;
	}

	@RequestMapping("/nickname")
	@ResponseBody
	public Map<String, Object> nickname(@RequestBody lyjUser user) {
		Map<String, Object> data = new HashMap<String, Object>();
		//System.out.println(user.getNickname());
		lyjUser result = userService.selectnicknameExist(user);
		//System.out.println(result);
		if (result == null) {
			data.put("code", "200");
		} else {
			data.put("code", "201");
		}
		return data;
	}

	@RequestMapping("/email")
	@ResponseBody
	public Map<String, Object> email(@RequestBody lyjUser user) {
		Map<String, Object> data = new HashMap<String, Object>();
		lyjUser result = userService.selectemailExist(user);
		//System.out.println(result);
		if (result == null) {
			data.put("code", "200");
		} else {
			data.put("code", "201");
		}
		return data;
	}

	@RequestMapping("/phone")
	@ResponseBody
	public Map<String, Object> phone(@RequestBody lyjUser user) {
		Map<String, Object> data = new HashMap<String, Object>();
		lyjUser result = userService.selectphoneExist(user);
		if (result == null) {
			data.put("code", "200");
		} else {
			data.put("code", "201");
		}
		return data;
	}
	
	@RequestMapping("/register")
	@ResponseBody
	public Map<String, Object> register(@RequestBody lyjUser user,HttpSession se) {
		Map<String, Object> data = new HashMap<String, Object>();
		lyjUser result = userService.selectregistermsgExist(user);
		String realYZM = (String) se.getAttribute("myyzm");
		//System.out.println(realYZM);
		if(realYZM.equals(user.getMyyzm())) {
			if(result == null) {
				userService.addUser(user);
				data.put("code","200");
			}else {
				data.put("code","506");
			}
		}else {
			data.put("code","505");
		}
		return data;
	}
	
	@RequestMapping("/show_personal")
	@ResponseBody
	public Map<String, Object> show_personal(@RequestBody lyjUser user) {
		Map<String, Object> data = new HashMap<String, Object>();
		lyjUser result = userService.showPersonal(user);
		data.put("code","200");
		data.put("allData", result);
		return data;
	}
	
	@RequestMapping("/save_personal")
	@ResponseBody
	public Map<String, Object> save_personal(@RequestBody lyjUser user) {
		Map<String, Object> data = new HashMap<String, Object>();
		userService.savePersonal(user);
		data.put("code","200");
		return data;
	}
	
}
