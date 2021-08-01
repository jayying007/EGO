package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.User;

@Repository("admin_UserDao")
@Mapper
public interface Admin_UserDao {

	public List<User> getUser();

	public int updateUser(User user);

	public int deleteUser(User user);


}
