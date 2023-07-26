package com.example.shose.server.service.impl;

import com.example.shose.server.dto.response.SizeProductDetailReponse;
import com.example.shose.server.repository.SizeProductDetailRepository;
import com.example.shose.server.service.SizeProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeProductDetailServiceImpl implements SizeProductDetailService {

    @Autowired
    private SizeProductDetailRepository sizeProductDetailRepository;

    @Override
    public List<SizeProductDetailReponse> findAllSizeProductDetail(String id) {
        return sizeProductDetailRepository.findAllByIdProductDetail(id);
    }
}
