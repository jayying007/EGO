package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.CartDao;
import com.pojo.JaneCart;

@Service("cartService")
@Transactional
public class CartServiceImpl implements CartService{
	@Autowired
	private CartDao cartDao;
	@Override
	public List<JaneCart> selectCarts(int uid){
		return cartDao.selectCarts(uid);
	}
	@Override
	public int deleteCart(JaneCart janeCart) {
		return cartDao.deleteCart(janeCart);
	}
}
