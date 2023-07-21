package com.example.shose.server.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImagesService {

    List<String> uploadImage(List<MultipartFile> multipartFiles) throws IOException;
}
