package com.example.shose.server.dto.response.billdetail;

import com.example.shose.server.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

/**
 * @author thangdt
 */
@Projection(types = {Bill.class, BillDetail.class, ProductDetail.class, Product.class, Size.class})
public interface BillDetailResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.product_name}")
    String getProductName();

    @Value("#{target.size_name}")
    String getSizeName();

    @Value("#{target.price}")
    String getPrice();

    @Value("#{target.quantity}")
    String getQuantity();

    @Value("#{target.quantity_product_detail}")
    String getQuantityProductDetail();
}
