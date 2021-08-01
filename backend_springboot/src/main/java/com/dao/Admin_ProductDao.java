package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.Product;

@Repository("admin_ProductDao")
@Mapper
public interface Admin_ProductDao {

	public List<Product> getProducts();

	public int updateProduct(Product product);

	public int addProduct(Product product);

	public int deleteProduct(Product product);
	
	

}
