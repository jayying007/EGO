package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.lyjAddress;

@Repository("lyjAddressDao")
@Mapper
public interface lyjAddressDao {
	public List<lyjAddress> showAddress01(lyjAddress address);
	public Integer showAddress02(lyjAddress address);
	public int addAddress(lyjAddress address);
	public lyjAddress showeditAddress(lyjAddress address);
	public void editAddress(lyjAddress address);
	public void deleteAddress(lyjAddress address);
	public int setDefaultAddress01(lyjAddress address);
	public int setDefaultAddress02(lyjAddress address);
	public List<lyjAddress> setDefaultAddress03(lyjAddress address);
}
