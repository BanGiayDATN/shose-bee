package com.example.shose.server.service.impl;

import com.cloudinary.Cloudinary;
import com.example.shose.server.infrastructure.cloudinary.UploadImageToCloudinary;
import com.example.shose.server.service.ImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImagesServiceImpl implements ImagesService {

    @Autowired
    private  UploadImageToCloudinary imageToCloudinary;


    @Override
    public List<String> uploadImage(List<MultipartFile> multipartFiles) throws IOException {
        List<String> urls = new ArrayList<>();
        for (MultipartFile file : multipartFiles) {
            String url = imageToCloudinary.uploadImage(file);
            urls.add(url);
        }
        return urls;
    }
}
