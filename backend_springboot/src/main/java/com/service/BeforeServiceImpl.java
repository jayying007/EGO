package com.service;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;

import com.dao.BeforeDao;
import com.pojo.Index;
import com.pojo.MProduct;

@Service
@Transactional
public class BeforeServiceImpl implements BeforeService {

	@Autowired
	public BeforeDao beforeDao;
	@Override
	public Index index(Model model, HttpServletRequest request) {
		// TODO Auto-generated method stub
		Index myIndex = new Index();
		myIndex.setCarouselItems(beforeDao.getF1());
		myIndex.setTopSaleItems(beforeDao.getF2());
		myIndex.setJianshenfuzhuang(beforeDao.getF3());
		myIndex.setJianshenhuju(beforeDao.getF4());
		myIndex.setJianshenqicai(beforeDao.getF5());
		myIndex.setJianshenshipin(beforeDao.getF6());
		myIndex.setYundongxie(beforeDao.getF7());
		return myIndex;
	}

	@Override
	public List<MProduct> products(Model model, HttpServletRequest request) {
		// TODO Auto-generated method stub
		String name = request.getParameter("aspect");
		int aspectid = beforeDao.getAspectid(name);
		return beforeDao.getProdByAspectid(aspectid);
	}

	@Override
	public List<MProduct> search(Model model, HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			request.setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		String keyword = request.getParameter("keyword");
		if ("".equals(keyword)||keyword==null) {
			return beforeDao.getAllProd();
		}
		else {
			return beforeDao.getProdByKeyword(keyword);
		}
	}

}
