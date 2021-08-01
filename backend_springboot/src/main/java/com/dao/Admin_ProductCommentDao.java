package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.ProductComment;

@Repository("admin_ProductCommentDao")
@Mapper
public interface Admin_ProductCommentDao {
	public List<ProductComment> getProductComment();
	public int updateProductComment(ProductComment productComment);
	public int deleteProductComment(ProductComment productComment);
}
