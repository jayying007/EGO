package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.AddToCartDao;
import com.pojo.ProductCart;

@Service("addToCartService")
@Transactional
public class AddToCartServiceImpl implements AddToCartService{
	@Autowired
	public AddToCartDao addToCartDao;
	@Override
	public boolean addToCart(ProductCart productCart) {
		// TODO Auto-generated method stub
//		int uid = Integer.parseInt(request.getParameter("uid"));
//		int pid = Integer.parseInt(request.getParameter("pid"));
//		int num = Integer.parseInt(request.getParameter("num"));
		System.out.println("11111111");
		List<ProductCart> cartResult= addToCartDao.selectCart(productCart);
		System.out.println("cartResult");
		System.out.println(cartResult);
		if(cartResult.isEmpty())
		{
			System.out.println("2222222");
			int string1=addToCartDao.addToCart(productCart);
			System.out.println("String1"+string1);
		}
		else {
			System.out.println("3333333");
			int string2=addToCartDao.updateCart(productCart);
			System.out.println("String2"+string2);
		}
		return true;
	}


}
