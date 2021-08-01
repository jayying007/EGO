package com.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import com.dao.ProductDetailDao;
import com.pojo.ProductTot;


@Service("productDetailService")
@Transactional
public class ProductDetailServiceImpl implements ProductDetailService {
	@Autowired
	public ProductDetailDao productDetailDao;
	public ProductTot productTot(Model model,HttpServletRequest request) {
		int fid = Integer.parseInt(request.getParameter("fid"));
		ProductTot myProductTot=new ProductTot();
		myProductTot.setProductFamilies(productDetailDao.getProductFamilies(fid));
		myProductTot.setProductDetails(productDetailDao.getProductDetails(fid));
		return myProductTot;
	}
}
//@Transactional