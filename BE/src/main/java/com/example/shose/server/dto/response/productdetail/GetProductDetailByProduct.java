package com.example.shose.server.dto.response.productdetail;
/*
 *  @author diemdz
 */

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.util.List;

public interface GetProductDetailByProduct {
    @Value("#{target.id}")
    String getId();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.codeProduct}")
    String getCodeProduct();
    @Value("#{target.nameProduct}")
    String getNameProduct();

    @Value("#{target.price}")
    BigDecimal getPrice();

    @Value("#{target.created_date}")
    Long getCreateDate();


    @Value("#{target.gender}")
    String getGender();

    @Value("#{target.status}")
    String getStatus();
    @Value("#{target.valuePromotion}")
    String getValuePromotion();


}
