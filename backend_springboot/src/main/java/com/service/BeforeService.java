package com.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.pojo.Index;
import com.pojo.MProduct;

public interface BeforeService {
	public Index index(Model model, HttpServletRequest request);
	public List<MProduct> products(Model model, HttpServletRequest request);
	public List<MProduct> search(Model model, HttpServletRequest request);
}
