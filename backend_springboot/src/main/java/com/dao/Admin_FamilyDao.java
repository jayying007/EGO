package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.Family;
import com.pojo.Product;

@Repository("admin_FamilyDao")
@Mapper
public interface Admin_FamilyDao {
	public List<Family> getFamilys();
	
	public int updateFamilys(Family family);

	public int deleteFamily(Family family);

	public int deleteFamily1(Family family);

	public int deleteFamily2(Family family);

	public int addFamily(Family family);

	public int addProduct(Product product);

	
}
