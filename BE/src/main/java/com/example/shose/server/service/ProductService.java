package com.example.shose.server.service;

import com.example.shose.server.dto.request.product.CreateProductRequest;
import com.example.shose.server.dto.request.product.FindProductRequest;
import com.example.shose.server.dto.request.product.UpdateProductRequest;
import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.dto.response.CustomProductRespone;
import com.example.shose.server.dto.response.ProductDetailReponse;
import com.example.shose.server.dto.response.ProductResponse;
import com.example.shose.server.entity.Product;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
public interface ProductService {

    List<ProductResponse> findAll(final FindProductRequest req);

    List<String> fillAllByName(String name);

    Product create(final CreateProductRequest req);

    Product update(final UpdateProductRequest req);

    Boolean delete(String id);

    Product getOneById(String id);

    List<Product> getProductUse();

    List<ProductDetailReponse> getAllProduct(FindProductDetailRequest req);
}
