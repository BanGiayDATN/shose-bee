package com.example.shose.server.infrastructure.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Configuration
public class UploadImageToCloudinary {

    @Autowired
    private Cloudinary cloudinary;

    public List<String> uploadImages(List<MultipartFile> files) throws  InterruptedException, ExecutionException {
        List<String> urls = new ArrayList<>();

        // Tạo một ThreadPool với số luồng tải lên tùy ý (ở đây mình chọn là 5)
        int threadPoolSize = 10;
        ExecutorService executorService = Executors.newFixedThreadPool(threadPoolSize);

        // Tạo danh sách Future để chứa kết quả từ các luồng tải lên
        List<Future<String>> futures = new ArrayList<>();

        for (MultipartFile file : files) {
            // Sử dụng Callable để tải lên và lấy URL của từng ảnh
            Callable<String> uploadTask = () -> {
                String publicId = UUID.randomUUID().toString();
                Map<String, String> imageUploadData = new HashMap<>();
                imageUploadData.put("public_id", publicId);

                Map<String, Object> result = cloudinary.uploader().upload(file.getBytes(), imageUploadData);
                return extractUrlFromResult(result);
            };

            // Gửi Callable vào ThreadPool và nhận Future cho mỗi tác vụ tải lên
            Future<String> future = executorService.submit(uploadTask);
            futures.add(future);
        }

        // Đợi tất cả các tác vụ tải lên hoàn thành và thu thập kết quả
        for (Future<String> future : futures) {
            urls.add(future.get());
        }

        // Đóng ThreadPool khi không cần nữa
        executorService.shutdown();

        return urls;
    }

    private String extractUrlFromResult(Map<String, Object> result) {
        return (String) result.get("url");
    }

    public String uploadImage(MultipartFile file) {
        try {
            // Upload file lên Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return (String) uploadResult.get("url");
        } catch (Exception e) {
            e.printStackTrace();
            return "Upload failed";
        }
    }

}
