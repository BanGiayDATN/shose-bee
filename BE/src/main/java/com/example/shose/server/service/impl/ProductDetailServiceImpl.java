package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.FindProductRequest;
import com.example.shose.server.dto.response.ProductDetailReponse;
import com.example.shose.server.infrastructure.common.base.PageableObject;
import com.example.shose.server.repository.ProductDetailRepository;
import com.example.shose.server.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * @author Nguyễn Vinh
 */
@Service
public class ProductDetailServiceImpl implements ProductDetailService {

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Override
    public PageableObject<ProductDetailReponse> getAllProduct(FindProductRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(),request.getSize());
        Page<ProductDetailReponse> list = productDetailRepository.getAllProductDetail(pageable,request);
        return new PageableObject<>(list);
    }
}
