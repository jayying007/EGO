package com.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pojo.lyjUser;

@Repository("lyjUserDao")
@Mapper
public interface lyjUserDao {
	public lyjUser selectUserBynickname(lyjUser user);
	public lyjUser selectnicknameExist(lyjUser user);
	public lyjUser selectemailExist(lyjUser user);
	public lyjUser selectphoneExist(lyjUser user);
	public lyjUser selectregistermsgExist(lyjUser user);
	public int addUser(lyjUser user);
	public lyjUser showPersonal(lyjUser user);
	public void savePersonal(lyjUser user);
}
