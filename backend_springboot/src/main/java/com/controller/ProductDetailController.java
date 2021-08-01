package com.controller;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pojo.ProductCart;
import com.pojo.ProductTot;
import com.service.AddToCartService;
import com.service.ProductDetailService;

@Controller
@RequestMapping("/product_detail")
public class ProductDetailController {

	@Autowired
	public ProductDetailService productDetailService;
	
	@RequestMapping("/product_details")
	@ResponseBody
	public ProductTot productTot(Model model,HttpServletRequest request)
	{
		return productDetailService.productTot(model, request);
	}
	
	@Autowired
	public AddToCartService addToCartService;
	
	@RequestMapping("/addToCart")
	@ResponseBody
	public boolean addToCart(@RequestBody ProductCart productCart)
	{
		System.out.println("000000000");
//		return true;
		return addToCartService.addToCart(productCart);
	}
	
}

