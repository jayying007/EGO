package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.JaneCart;

@Repository("cartDao")
@Mapper
public interface CartDao {
	public List<JaneCart> selectCarts(int uid);
	public int deleteCart(JaneCart janeCart);
}
