package com.example.shose.server.controller.client;

import com.example.shose.server.service.ProductDetailService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 *  @author diemdz
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/client/product-detail")
public class ProductDetailClientRestController {
    @Autowired
    private ProductDetailService productDetailService;
    @GetMapping("/byCategory/{id}")
    public ResponseObject getByIdCategory(@PathVariable("id") String id) {
        return new ResponseObject(productDetailService.GetProductDetailByCategory(id));
    }
}
