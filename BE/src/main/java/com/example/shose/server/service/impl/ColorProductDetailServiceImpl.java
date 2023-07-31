package com.example.shose.server.service.impl;

import com.example.shose.server.repository.ColorProductDetailRepositry;
import com.example.shose.server.service.ColorProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorProductDetailServiceImpl implements ColorProductDetailService {

    @Autowired
    private ColorProductDetailRepositry colorProductDetailRepositry;

    @Override
    public List<String> listColorByIdProductDetail(String idProdcutDetail) {
        return colorProductDetailRepositry.listColorByIdProductDetail(idProdcutDetail);
    }
}
