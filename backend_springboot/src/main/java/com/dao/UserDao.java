package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.JaneAddress;

@Repository("userDao")
@Mapper
public interface UserDao {
	public List<JaneAddress> getAllAddress(int uid);
}
