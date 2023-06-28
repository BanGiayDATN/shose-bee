package com.example.shose.server.controller;

import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.service.ProductDetailService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Nguyễn Vinh
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/admin/product-detail")
public class ProductDetailRestController {

    @Autowired
    private ProductDetailService productDetailService;

    @GetMapping("")
    public ResponseObject view ( final FindProductDetailRequest request){
        return new ResponseObject(productDetailService.getAllProduct(request));
    }
}
