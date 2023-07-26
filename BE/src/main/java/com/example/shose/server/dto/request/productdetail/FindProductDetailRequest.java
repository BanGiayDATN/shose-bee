package com.example.shose.server.dto.request.productdetail;

import com.example.shose.server.infrastructure.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * @author Nguyễn Vinh
 */
@Setter
@Getter
public class FindProductDetailRequest extends PageableRequest {

    private String color;

    private String brand;

    private String material;

    private String product;

    private int sizeProduct;

    private String sole;

    private String category;

    private String status;

    private String gender;

    private BigDecimal minPrice;

    private  BigDecimal maxPrice;

}
