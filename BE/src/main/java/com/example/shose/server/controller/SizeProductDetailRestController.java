package com.example.shose.server.controller;

import com.example.shose.server.service.SizeProductDetailService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/size-product-detail")
public class SizeProductDetailRestController {

    @Autowired
    private SizeProductDetailService sizeProductDetailService;

    @GetMapping("/{idProductDetail}")
    public ResponseObject findAllSizeProductDetail(@PathVariable("idProductDetail") String idProductDetail) {
        return new ResponseObject(sizeProductDetailService.findAllSizeProductDetail(idProductDetail));
    }
}
