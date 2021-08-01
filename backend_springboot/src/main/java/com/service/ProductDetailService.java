package com.service;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.pojo.ProductTot;
public interface ProductDetailService {
	public ProductTot productTot(Model model, HttpServletRequest request);
}
