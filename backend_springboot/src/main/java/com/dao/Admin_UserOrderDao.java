package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.UserOrder;

@Repository("admin_UserOrderDao")
@Mapper
public interface Admin_UserOrderDao {

	public List<UserOrder> getUserOrder();

	public int updateUserOrder(UserOrder userOrder);

	public int deleteUserOrder(UserOrder userOrder);


}
