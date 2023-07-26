package com.example.shose.server.service;

import com.example.shose.server.dto.response.SizeProductDetailReponse;

import java.util.List;

public interface SizeProductDetailService {

    List<SizeProductDetailReponse> findAllSizeProductDetail(String id);
}
