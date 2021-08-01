package com.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.lyjAddressDao;
import com.pojo.lyjAddress;

@Service
public class lyjAddressServiceImpl implements lyjAddressService{
	
	@Autowired
	private lyjAddressDao addressDao;
	@Override
	public List<lyjAddress> showAddress01(lyjAddress address) {
		List<lyjAddress> result = new ArrayList<lyjAddress>();
		result = addressDao.showAddress01(address);
		return result;
	}

	public Integer showAddress02(lyjAddress address) {
		Integer result = addressDao.showAddress02(address);
		return result;
	}
	
	@Override
	public int addAddress(lyjAddress address) {
		int aid = addressDao.addAddress(address);
		return aid;
	}

	@Override
	public void editAddress(lyjAddress address) {
		addressDao.editAddress(address);
	}

	@Override
	public void deleteAddress(lyjAddress address) {
		addressDao.deleteAddress(address);
	}

	@Override
	public lyjAddress showeditAddress(lyjAddress address) {
		lyjAddress result = addressDao.showeditAddress(address);
		return result;
	}

	@Override
	public void setDefaultAddress01(lyjAddress address) {
		addressDao.setDefaultAddress01(address);
	}

	@Override
	public void setDefaultAddress02(lyjAddress address) {
		addressDao.setDefaultAddress02(address);
	}

	@Override
	public List<lyjAddress> setDefaultAddress03(lyjAddress address) {
		List<lyjAddress> notdefaultaid = new ArrayList<lyjAddress>();
		notdefaultaid = addressDao.setDefaultAddress03(address);
		return notdefaultaid;
	}
	
}
