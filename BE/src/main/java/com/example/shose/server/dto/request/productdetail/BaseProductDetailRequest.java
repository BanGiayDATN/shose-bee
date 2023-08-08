package com.example.shose.server.dto.request.productdetail;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
@Setter
@Getter
@ToString
public abstract class BaseProductDetailRequest {

    private String description;

    private String gender;

    private String price;

    private String status;

    private String categoryId;

    private String productId;

    private String color;

    private int size;

    private String materialId;

    private String soleId;

    private String brandId;

    private int quantity;

}
