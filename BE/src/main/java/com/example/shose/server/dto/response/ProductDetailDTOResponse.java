package com.example.shose.server.dto.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface ProductDetailDTOResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.stt}")
    Integer getSTT();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.nameProduct}")
    String getNameProduct();

    @Value("#{target.price}")
    BigDecimal getPrice();

    @Value("#{target.gender}")
    String getGender();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.quantity}")
    Integer getQuantity();

    @Value("#{target.sizeName}")
    String getSizeName();

    @Value("#{target.colorCode}")
    String getColorCode();
}
