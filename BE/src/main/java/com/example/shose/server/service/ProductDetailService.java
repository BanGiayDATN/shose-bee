package com.example.shose.server.service;

import com.example.shose.server.entity.ProductDetail;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
public interface ProductDetailService {

    Page<ProductDetail> getAll (Integer pageNo ,Integer pageSize);

}
