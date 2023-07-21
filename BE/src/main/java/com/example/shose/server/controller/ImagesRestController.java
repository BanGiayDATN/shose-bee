package com.example.shose.server.controller;

import com.example.shose.server.dto.request.productdetail.CreateProductDetailRequest;
import com.example.shose.server.service.ImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/image")
public class ImagesRestController {

    @Autowired
    private ImagesService imagesService;

    @PostMapping("/upload")
    public List<String> uploadImage(@RequestParam List<MultipartFile> multipartFiles) throws IOException {
        if (multipartFiles == null) {
            System.out.println("multipartFiles is null");
        }
//        System.out.println(productDetail);
        return imagesService.uploadImage(multipartFiles);
    }
}
