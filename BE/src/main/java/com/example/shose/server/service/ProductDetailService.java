package com.example.shose.server.service;

import com.example.shose.server.dto.request.productdetail.CreateProductDetailRequest;
import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.dto.response.ProductDetailReponse;
import com.example.shose.server.dto.response.productdetail.GetProductDetailByProduct;
import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.infrastructure.common.PageableObject;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
public interface ProductDetailService {

    List<ProductDetailReponse> getAll(FindProductDetailRequest findProductDetailRequest);

    ProductDetail create(final CreateProductDetailRequest req);

    ProductDetail update(final CreateProductDetailRequest req);

    Boolean delete(String id);

    ProductDetail getOneById(String id);
    List<GetProductDetailByProduct> getByIdProduct(String id);


}
