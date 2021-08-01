package com.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.lyjUserDao;
import com.pojo.lyjUser;

@Service
public class lyjUserServiceImpl implements lyjUserService {
	@Autowired
	private lyjUserDao userDao;

	@Override
	public lyjUser selectUserBynickname(lyjUser user) {
		lyjUser userExist = userDao.selectUserBynickname(user);
		return userExist;
	}

	@Override
	public lyjUser selectnicknameExist(lyjUser user) {
		lyjUser nicknameExist = userDao.selectnicknameExist(user);
		return nicknameExist;
	}

	@Override
	public lyjUser selectemailExist(lyjUser user) {
		lyjUser emailExistUser = userDao.selectemailExist(user);
		return emailExistUser;
	}

	@Override
	public lyjUser selectphoneExist(lyjUser user) {
		lyjUser phoneExistUser = userDao.selectphoneExist(user);
		return phoneExistUser;
	}

	@Override
	public lyjUser selectregistermsgExist(lyjUser user) {
		lyjUser registerExist = userDao.selectregistermsgExist(user);
		return registerExist;
	}

	@Override
	public int addUser(lyjUser user) {
		int insertresult = userDao.addUser(user);
		return insertresult;
	}

	@Override
	public lyjUser showPersonal(lyjUser user) {
		lyjUser showPersonal = userDao.showPersonal(user);
		return showPersonal;
	}

	@Override
	public void savePersonal(lyjUser user) {
		userDao.savePersonal(user);
	}
	
}
