package com.example.shose.server.dto.response.productdetail;
/*
 *  @author diemdz
 */

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.util.List;

public interface GetDetailProductOfClient {
    @Value("#{target.idProduct}")
    String getIdProduct();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.nameProduct}")
    String getNameProduct();

    @Value("#{target.price}")
    BigDecimal getPrice();

    @Value("#{target.quantity}")
    Integer getQuantity();
    @Value("#{target.listCodeColor}")
    String getListCodeColor();
    @Value("#{target.codeColor}")
    String getCodeColor();

    @Value("#{target.listNameSize}")
    String getListNameSize();

}
