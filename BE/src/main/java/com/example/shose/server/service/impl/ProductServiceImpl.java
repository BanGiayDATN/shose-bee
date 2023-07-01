package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.product.CreateProductRequest;
import com.example.shose.server.dto.request.product.FindProductRequest;
import com.example.shose.server.dto.request.product.UpdateProductRequest;
import com.example.shose.server.dto.response.ProductResponse;
import com.example.shose.server.entity.Product;
import com.example.shose.server.infrastructure.common.PageableObject;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.ProductRepository;
import com.example.shose.server.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Nguyễn Vinh
 */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public PageableObject<ProductResponse> findAll(FindProductRequest req) {
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize());
        Page<ProductResponse> list = productRepository.getAll(pageable, req);
        return new PageableObject<>(list);
    }

    @Override
    public Product create(CreateProductRequest req) {
        Product checkCode = productRepository.getOneByCode(req.getCode());
        if (checkCode != null) {
            throw new RestApiException(Message.CODE_EXISTS);
        }
        Product add = Product.builder().code(req.getCode()).name(req.getName()).status(Status.DANG_SU_DUNG).build();
        return productRepository.save(add);
    }

    @Override
    public Product update(UpdateProductRequest req) {
        Optional<Product> optional = productRepository.findById(req.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        Product checkCode = productRepository.getOneByCode(req.getCode());
        if (checkCode != null) {
            throw new RestApiException(Message.CODE_EXISTS);
        }
        Product update = optional.get();
        update.setCode(req.getCode());
        update.setName(req.getName());
        update.setStatus(req.getStatus() == 0 ? Status.DANG_SU_DUNG : Status.KHONG_SU_DUNG);
        return productRepository.save(update);
    }

    @Override
    public Boolean delete(String id) {
        Optional<Product> optional = productRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        productRepository.delete(optional.get());
        return true;
    }

    @Override
    public Product getOneById(String id) {
        Optional<Product> optional = productRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return optional.get();
    }
}
