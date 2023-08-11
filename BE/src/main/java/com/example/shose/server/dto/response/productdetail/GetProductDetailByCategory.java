package com.example.shose.server.dto.response.productdetail;
/*
 *  @author diemdz
 */

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface GetProductDetailByCategory {
    @Value("#{target.idProduct}")
    String getIdProduct();
    @Value("#{target.idProductDetail}")
    String getIdProductDetail();

    @Value("#{target.idColor}")
    String getIdColor();
    @Value("#{target.image}")
    String getImage();

    @Value("#{target.nameProduct}")
    String getNameProduct();

    @Value("#{target.price}")
    BigDecimal getPrice();

    @Value("#{target.valuePromotion}")
    String getValuePromotion();
}
