package com.service;

import java.util.List;

import com.pojo.lyjAddress;

public interface lyjAddressService {
	public List<lyjAddress> showAddress01(lyjAddress address);
	public Integer showAddress02(lyjAddress address);
	public int addAddress(lyjAddress address);
	public lyjAddress showeditAddress(lyjAddress address);
	public void editAddress(lyjAddress address);
	public void deleteAddress(lyjAddress address);
	public void setDefaultAddress01(lyjAddress address);
	public void setDefaultAddress02(lyjAddress address);
	public List<lyjAddress> setDefaultAddress03(lyjAddress address);
}
