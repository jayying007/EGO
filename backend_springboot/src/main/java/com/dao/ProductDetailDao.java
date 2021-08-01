package com.dao;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.pojo.ProductDetail;
import com.pojo.ProductFamily;

@Repository
@Mapper
public interface ProductDetailDao {
	public List<ProductDetail> getProductDetails(int fid);
	public List<ProductFamily> getProductFamilies(int fid);	
}