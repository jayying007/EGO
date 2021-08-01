package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.UserAddress;

@Repository("admin_UserAddressDao")
@Mapper
public interface Admin_UserAddressDao {

	public List<UserAddress> getUserAddress();

	public int updateUserAddress(UserAddress userAddress);

	public int deleteUserAddress(UserAddress userAddress);

}
