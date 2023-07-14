package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.productdetail.CreateProductDetailRequest;
import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.dto.response.ProductDetailReponse;
import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.ProductDetailRepository;
import com.example.shose.server.service.ProductDetailService;
import com.example.shose.server.util.FormUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Nguyễn Vinh
 */
@Service
public class ProductDetailServiceImpl implements ProductDetailService {

    @Autowired
    private ProductDetailRepository productDetailRepository;

    private FormUtils formUtils = new FormUtils();

    @Override
    public List<ProductDetailReponse> getAll(FindProductDetailRequest findProductDetailRequest) {
        return productDetailRepository.getAll(findProductDetailRequest);
    }

    @Override
    public ProductDetail create(CreateProductDetailRequest req) {
        return null;
    }

    @Override
    public ProductDetail update(CreateProductDetailRequest req) {
        return null;
    }

    @Override
    public Boolean delete(String id) {
        Optional<ProductDetail> optional = productDetailRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        productDetailRepository.delete(optional.get());
        return true;
    }

    @Override
    public ProductDetail getOneById(String id) {
        Optional<ProductDetail> optional = productDetailRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return optional.get();
    }
}
