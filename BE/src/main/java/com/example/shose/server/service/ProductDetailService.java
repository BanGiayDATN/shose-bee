package com.example.shose.server.service;

import com.example.shose.server.dto.request.FindProductRequest;
import com.example.shose.server.dto.response.ProductDetailReponse;
import com.example.shose.server.infrastructure.common.base.PageableObject;

/**
 * @author Nguyễn Vinh
 */
public interface ProductDetailService {

    PageableObject<ProductDetailReponse> getAllProduct (FindProductRequest findProductRequest);

}
