package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.UserOrderDetail;

@Repository("admin_UserOrderDetailDao")
@Mapper
public interface Admin_UserOrderDetailDao {

	public List<UserOrderDetail> getUserOrderDetail();

	public int updateUserOrderDetail(UserOrderDetail userOrderDetail);

	public int deleteUserOrderDetail(UserOrderDetail userOrderDetail);


}
