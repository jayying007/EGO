package com.pojo;

import java.util.List;

public class ProductTot {
	private List<ProductFamily> goods_family;
	private List<ProductDetail> product;
	public List<ProductFamily> getProductFamilies() {
		return goods_family;
	}
	public void setProductFamilies(List<ProductFamily> goods_family) {
		this.goods_family = goods_family;
	}
	public List<ProductDetail> getProductDetails() {
		return product;
	}
	public void setProductDetails(List<ProductDetail> product) {
		this.product = product;
	}
}