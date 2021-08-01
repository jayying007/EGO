package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dao.Admin_AspectDao;
import com.dao.Admin_FamilyDao;
import com.dao.Admin_ProductCommentDao;
import com.dao.Admin_ProductDao;
import com.dao.Admin_UserAddressDao;
import com.dao.Admin_UserDao;
import com.dao.Admin_UserOrderDao;
import com.dao.Admin_UserOrderDetailDao;
import com.dao.Admin_UserShoppingCartDao;
import com.pojo.Aspect;
import com.pojo.Family;
import com.pojo.Product;
import com.pojo.ProductComment;
import com.pojo.User;
import com.pojo.UserAddress;
import com.pojo.UserOrder;
import com.pojo.UserOrderDetail;
import com.pojo.UserShoppingCart;

@RequestMapping("/egoAdmin")
@Controller("adminController")
public class AdminController {
	@Autowired
	private Admin_AspectDao admin_AspectDao;
	@Autowired
	private Admin_FamilyDao admin_FamilyDao;
	@Autowired
	private Admin_ProductDao admin_ProductDao;
	@Autowired
	private Admin_ProductCommentDao admin_ProductCommentDao;
	@Autowired
	private Admin_UserDao admin_UserDao;
	@Autowired
	private Admin_UserAddressDao admin_UserAddressDao;
	@Autowired
	private Admin_UserShoppingCartDao admin_UserShoppingCartDao;
	@Autowired
	private Admin_UserOrderDao admin_UserOrderDao;
	@Autowired
	private Admin_UserOrderDetailDao admin_UserOrderDetailDao;
	
	/***************1.1.1 获取大类表数据*******************/
	@RequestMapping("/ego_aspect/getData")
	@ResponseBody
	public List<Aspect> getAspect() {
		System.out.println("Call getAspect()");
		List<Aspect> list = admin_AspectDao.getAspects();
		//返回JSON数据
		return list;
	}
	
	/****************1.1.2 修改大类表数据***********************************/
	@RequestMapping("/ego_aspect/updateData")
	@ResponseBody
	public Map<String, Object> updateAspect(@RequestBody Aspect aspect) {
		System.out.println("Call udpateAspect()");
		int affectedRows = admin_AspectDao.updateAspects(aspect);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "数据修改成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "数据修改失败！");
			return map;
		}
	}
	
	/****************1.1.3 添加大类表数据***********************************/
	@RequestMapping("/ego_aspect/addData")
	@ResponseBody
	public Map<String, Object> addAspect(@RequestBody Aspect aspect) {
		System.out.println("Call addAspect()");
		int affectedRows = admin_AspectDao.addAspects(aspect);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "数据插入成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "数据插入失败！");
			return map;
		}
	}
	
	/****************1.2.1 获取商品类别表数据***********************************/
	@RequestMapping("/ego_family/getData")
	@ResponseBody
	public List<Family> getFamily() {
		System.out.println("Call getFamily()");
		List<Family> list = admin_FamilyDao.getFamilys();
		//返回JSON数据
		return list;
	}
	
	/****************1.2.2 修改商品类别表数据***********************************/
	@RequestMapping("/ego_family/updateData")
	@ResponseBody
	public Map<String, Object> updateFamily(@RequestBody Family family) {

		System.out.println("Call udpateFamily()");
		int affectedRows = admin_FamilyDao.updateFamilys(family);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "数据修改成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "数据修改失败！");
			return map;
		}
	}
	
	/****************1.2.3 删除商品类别表数据***********************************/
	@RequestMapping("/ego_family/deleteData")
	@ResponseBody
	public Map<String, Object> deleteFamily(@RequestBody Family family) {
		System.out.println("Call deleteFamily()");
		int ego_product_comment_affectedRows = admin_FamilyDao.deleteFamily1(family);
		int ego_product_affectedRows = admin_FamilyDao.deleteFamily2(family);
		int ego_family_affectedRows = admin_FamilyDao.deleteFamily(family);
		System.out.println("ego_product_comment_affectedRows: "+ ego_product_comment_affectedRows);
		System.out.println("ego_product_affectedRows: "+ ego_product_affectedRows);
		System.out.println("ego_family_affectedRows:"+ ego_family_affectedRows);
		//返回JSON数据
		Map<String, Object> map = new HashMap<>();
		map.put("ego_product_comment_affectedRows", ego_product_comment_affectedRows);
		map.put("ego_product_affectedRows", ego_product_affectedRows);
		map.put("ego_family_affectedRows", ego_family_affectedRows);
		return map;
	}

	/****************1.2.4 新增商品类别表数据***********************************/
	@RequestMapping("/ego_family/addData")
	@ResponseBody
	public Map<String, Object> addFamily(@RequestBody Family family){
		System.out.println("Call addFamily()");
		int affectedRows = admin_FamilyDao.addFamily(family);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "数据插入成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "数据插入失败！");
			return map;
		}
	}
	
	/****************1.3.1 获取商品表数据***********************************/
	@RequestMapping("/ego_product/getData")
	@ResponseBody
	public List<Product> getProduct(){
		System.out.println("Call getProduct()");
		List<Product> list = admin_ProductDao.getProducts();
		return list;
	}
	
	/****************1.3.2 修改商品表数据***********************************/
	@RequestMapping("/ego_product/updateData")
	@ResponseBody
	public Map<String, Object> updateProduct(@RequestBody Product product) {
		System.out.println("Call udpateProduct()");
		int affectedRows = admin_ProductDao.updateProduct(product);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "数据更新成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "数据更新失败！");
			return map;
		}
	}
	
	/****************1.3.3 删除商品表数据***********************************/
	@RequestMapping("/ego_product/deleteData")
	@ResponseBody
	public Map<String, Object> deleteProduct(@RequestBody Product product) {
		System.out.println("Call udpateProduct()");
		int affectedRows = admin_ProductDao.deleteProduct(product);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "删除成功！");
			map.put("ego_product_affectedRows", affectedRows);
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "删除失败！要删除的数据项不存在");
			return map;
		}
	}
	
	/****************1.3.4 新增商品类别表数据******************************/
	@RequestMapping("/ego_product/addData")
	@ResponseBody
	public Map<String, Object> addProduct(@RequestBody Product product){
		System.out.println("Call addProduct()");
		int affectedRows = admin_ProductDao.addProduct(product);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "数据插入成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "数据插入失败！");
			return map;
		}
	}
	
	/****************1.4.1 获取商品评价表数据******************************/
	@RequestMapping("/ego_product_comment/getData")
	@ResponseBody
	public List<ProductComment> getProductComment(){
		System.out.println("Call getProductComment()");
		List<ProductComment> list = admin_ProductCommentDao.getProductComment();
		return list;
	}
	
	/****************1.4.2 修改商品评价表数据***********************************/
	@RequestMapping("/ego_product_comment/updateData")
	@ResponseBody
	public Map<String, Object> updateProductComment(@RequestBody ProductComment productComment) {
		System.out.println("Call udpateProductComment()");
		int affectedRows = admin_ProductCommentDao.updateProductComment(productComment);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "数据更新成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "数据更新失败！");
			return map;
		}
	}

	/****************1.4.3 删除商品评价表数据******************************/
	@RequestMapping("/ego_product_comment/deleteData")
	@ResponseBody
	public Map<String, Object> deleteProductComment(@RequestBody ProductComment productComment){
		System.out.println("Call deleteProductComment()");
		int affectedRows = admin_ProductCommentDao.deleteProductComment(productComment);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "删除成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "删除失败！要删除的数据项不存在");
			return map;
		}
	}

	
	/****************2.1.1 获取用户表数据******************************/
	@RequestMapping("/ego_user/getData")
	@ResponseBody
	public List<User> getUser(){
		System.out.println("Call getUser()");
		List<User> list = admin_UserDao.getUser();
		return list;
	}
	
	/****************2.1.2 修改用户表数据***********************************/
	@RequestMapping("/ego_user/updateData")
	@ResponseBody
	public Map<String, Object> updateUser(@RequestBody User user) {
		System.out.println("Call udpateUser()");
		int affectedRows = admin_UserDao.updateUser(user);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "数据更新成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "数据更新失败！");
			return map;
		}
	}
	
	/****************2.1.3 删除用户表数据******************************/
	@RequestMapping("/ego_user/deleteData")
	@ResponseBody
	public Map<String, Object> deleteUser(@RequestBody User user){
		System.out.println("Call deleteUser()");
		int affectedRows = admin_UserDao.deleteUser(user);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "删除成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "删除失败！要删除的数据项不存在");
			return map;
		}
	}
	
	/****************2.2.1 获取收货地址表数据******************************/
	@RequestMapping("/ego_user_address/getData")
	@ResponseBody
	public List<UserAddress> getUserAddress(){
		System.out.println("Call getUserAddress()");
		List<UserAddress> list = admin_UserAddressDao.getUserAddress();
		return list;
	}
	
	/****************2.2.2 修改收货地址表数据***********************************/
	@RequestMapping("/ego_user_address/updateData")
	@ResponseBody
	public Map<String, Object> updateUserAddress(@RequestBody UserAddress userAddress) {
		System.out.println("Call udpateUserAddress()");
		int affectedRows = admin_UserAddressDao.updateUserAddress(userAddress);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "数据更新成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "数据更新失败！");
			return map;
		}
	}
	
	/****************2.2.3 删除收货地址表数据******************************/
	@RequestMapping("/ego_user_address/deleteData")
	@ResponseBody
	public Map<String, Object> deleteUserAddress(@RequestBody UserAddress userAddress){
		System.out.println("Call deleteUserAddress()");
		int affectedRows = admin_UserAddressDao.deleteUserAddress(userAddress);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "删除成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "删除失败！要删除的数据项不存在");
			return map;
		}
	}
	
	/****************2.3.1 获取用户购物车表数据******************************/
	@RequestMapping("/ego_user_shopping_cart/getData")
	@ResponseBody
	public List<UserShoppingCart> getUserShoppingCart(){
		System.out.println("Call getUserAddress()");
		List<UserShoppingCart> list = admin_UserShoppingCartDao.getUserShoppingCart();
		return list;
	}
	
	/****************2.3.2 修改用户购物车表数据***********************************/
	@RequestMapping("/ego_user_shopping_cart/updateData")
	@ResponseBody
	public Map<String, Object> updateUserShoppingCart(@RequestBody UserShoppingCart userShoppingCart) {
		System.out.println("Call udpateUserShoppingCart()");
		int affectedRows = admin_UserShoppingCartDao.updateUserShoppingCart(userShoppingCart);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "数据更新成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "数据更新失败！");
			return map;
		}
	}
	
	/****************2.3.3 删除用户购物车表数据******************************/
	@RequestMapping("/ego_user_shopping_cart/deleteData")
	@ResponseBody
	public Map<String, Object> deleteUserShoppingCart(@RequestBody UserShoppingCart userShoppingCart){
		System.out.println("Call deleteUserShoppingCart()");
		int affectedRows = admin_UserShoppingCartDao.deleteUserShoppingCart(userShoppingCart);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "删除成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "删除失败！要删除的数据项不存在");
			return map;
		}
	}
	
	/****************2.4.1 获取用户订单表数据******************************/
	@RequestMapping("/ego_user_order/getData")
	@ResponseBody
	public List<UserOrder> getUserOrder(){
		System.out.println("Call getUserOrder()");
		List<UserOrder> list = admin_UserOrderDao.getUserOrder();
		return list;
	}
	
	/****************2.4.2 修改用户订单表数据***********************************/
	@RequestMapping("/ego_user_order/updateData")
	@ResponseBody
	public Map<String, Object> updateUserOrder(@RequestBody UserOrder userOrder) {
		System.out.println("Call udpateUserOrder()");
		int affectedRows = admin_UserOrderDao.updateUserOrder(userOrder);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "数据更新成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "数据更新失败！");
			return map;
		}
	}
	
	/****************2.4.3 删除用户订单表数据******************************/
	@RequestMapping("/ego_user_order/deleteData")
	@ResponseBody
	public Map<String, Object> deleteUserOrder(@RequestBody UserOrder userOrder){
		System.out.println("Call deleteUserOrder()");
		int affectedRows = admin_UserOrderDao.deleteUserOrder(userOrder);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "删除成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "删除失败！要删除的数据项不存在");
			return map;
		}
	}
	
	/****************2.5.1 获取用户订单详情表数据******************************/
	@RequestMapping("/ego_user_order_details/getData")
	@ResponseBody
	public List<UserOrderDetail> getUserOrderDetail(){
		System.out.println("Call getUserOrderDetail()");
		List<UserOrderDetail> list = admin_UserOrderDetailDao.getUserOrderDetail();
		return list;
	}
	
	/****************2.5.2 修改用户订单详情表数据***********************************/
	@RequestMapping("/ego_user_order_details/updateData")
	@ResponseBody
	public Map<String, Object> updateUserOrderDetail(@RequestBody UserOrderDetail userOrderDetail) {
		System.out.println("Call udpateUserOrderDetail()");
		int affectedRows = admin_UserOrderDetailDao.updateUserOrderDetail(userOrderDetail);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "数据更新成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "数据更新失败！");
			return map;
		}
	}
	
	/****************2.5.3 删除用户订单详情表数据******************************/
	@RequestMapping("/ego_user_order_details/deleteData")
	@ResponseBody
	public Map<String, Object> deleteUserOrderDetail(@RequestBody UserOrderDetail userOrderDetail){
		System.out.println("Call deleteUserOrderDetail()");
		int affectedRows = admin_UserOrderDetailDao.deleteUserOrderDetail(userOrderDetail);
		System.out.println("影响行数"+affectedRows);
		//返回JSON数据
		if(affectedRows>0) {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 200);
			map.put("msg", "删除成功！");
			return map;
		}
		else {
			Map<String, Object> map = new HashMap<>();
			map.put("code", 400);
			map.put("msg", "删除失败！要删除的数据项不存在");
			return map;
		}
	}
}
