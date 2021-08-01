package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.CarouselItems;
import com.pojo.MProduct;
import com.pojo.TopSaleItems;

@Repository
@Mapper
public interface BeforeDao {
	public List<CarouselItems> getF1();
	public List<TopSaleItems> getF2();
	public List<MProduct> getF3();
	public List<MProduct> getF4();
	public List<MProduct> getF5();
	public List<MProduct> getF6();
	public List<MProduct> getF7();
	public int getAspectid(String name);
	public List<MProduct> getProdByAspectid(int aspectid);
	public List<MProduct> getAllProd();
	public List<MProduct> getProdByKeyword(String keyword);
}
