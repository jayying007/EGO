package com.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pojo.Index;
import com.pojo.MProduct;
import com.service.BeforeService;


@Controller
@RequestMapping("/before")
public class BeforeController {

	@Autowired
	public BeforeService beforeService;
	
	@RequestMapping("/index")
	@ResponseBody
	public Index index(Model model,HttpServletRequest request) {
		return beforeService.index(model,request);
	}
	
	@RequestMapping("/products")
	@ResponseBody
	public List<MProduct> products(Model model,HttpServletRequest request) {
		return beforeService.products(model,request);
	}
	
	@RequestMapping("/search")
	@ResponseBody
	public List<MProduct> search(Model model,HttpServletRequest request) {
		return beforeService.search(model,request);
	}
}
