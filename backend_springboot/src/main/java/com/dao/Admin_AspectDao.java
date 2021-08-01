package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.Aspect;

@Repository("admin_AspectDao")
@Mapper
public interface Admin_AspectDao {
	public List<Aspect> getAspects();
	
	public int updateAspects(Aspect aspect);
	
	public int addAspects(Aspect aspect);
}
