package com.service;

import java.util.List;

import com.pojo.JaneCart;

public interface CartService {
	public List<JaneCart> selectCarts(int uid);
	public int deleteCart(JaneCart janeCart);
}
