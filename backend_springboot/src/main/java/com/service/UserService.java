package com.service;

import java.util.List;

import com.pojo.JaneAddress;

public interface UserService {
	public List<JaneAddress> getAllAddress(int uid);
}
