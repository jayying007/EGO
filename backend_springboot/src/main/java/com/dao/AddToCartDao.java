package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.ProductCart;

@Repository
@Mapper
public interface AddToCartDao {
	public int addToCart(ProductCart productCart);
	public List<ProductCart> selectCart(ProductCart productCart);
	public int updateCart(ProductCart productCart);
}
