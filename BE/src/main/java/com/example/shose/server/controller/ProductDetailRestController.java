package com.example.shose.server.controller;

import com.example.shose.server.service.ProductDetailService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Nguyễn Vinh
 */
@RestController
@RequestMapping("/admin/product-detail")
public class ProductDetailRestController {

    @Autowired
    private ProductDetailService productDetailService;
    
    @GetMapping("")
    public ResponseObject view (@RequestParam( name = "pageNo" ,defaultValue = "0") Integer pageNo ){
        return new ResponseObject(productDetailService.getAll(pageNo,3).getContent());
    }
}
