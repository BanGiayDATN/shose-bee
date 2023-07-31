package com.example.shose.server.controller;

import com.example.shose.server.service.ColorProductDetailService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/color-product-detail")
public class ColorProductDetailRestController {

    @Autowired
    private ColorProductDetailService colorProductDetailService;

    @GetMapping("/{id}")
    public ResponseObject getListColorPD(@PathVariable("id") String id){
        return new ResponseObject(colorProductDetailService.listColorByIdProductDetail(id));
    }
}
