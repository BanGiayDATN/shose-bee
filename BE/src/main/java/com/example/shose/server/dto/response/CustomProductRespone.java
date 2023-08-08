package com.example.shose.server.dto.response;

import com.example.shose.server.entity.ProductDetail;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

/**
 * @author thangdt
 */
@Projection(types = {ProductDetail.class})
public interface CustomProductRespone {

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

    @Value("#{target.created_date}")
    Long getCreateDate();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.quantity}")
    Integer getQuantity();

    @Value("#{target.color}")
    String getColor();

    @Value("#{target.nameSize}")
    String getNameSize();

    @Value("#{target.nameCategory}")
    String getNameCategory();

    @Value("#{target.nameBrand}")
    String getNameBrand();

    @Value("#{target.size}")
    String getSize();

    @Value("#{target.promotion}")
    String getPromotion();

    @Value("#{target.min}")
    String getMin();

    @Value("#{target.max}")
    String getMax();
}
