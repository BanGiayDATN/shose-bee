package com.example.shose.server.dto.response.billdetail;

import com.example.shose.server.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

/**
 * @author thangdt
 */
@Projection(types = {Bill.class, BillDetail.class, ProductDetail.class, Product.class, Size.class})
public interface BillDetailResponse {

    @Value("#{target.stt}")
    String getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code_product}")
    String getCodeProduct();

    @Value("#{target.product_name}")
    String getProductName();

    @Value("#{target.name_color}")
    String getNameColor();

    @Value("#{target.name_size}")
    String getNameSize();

    @Value("#{target.name_sole}")
    String getNameSole();

    @Value("#{target.name_material}")
    String getNameMaterial();

    @Value("#{target.name_category}")
    String getNameCategory();

    @Value("#{target.price}")
    String getPrice();

    @Value("#{target.quantity}")
    String getQuantity();

    @Value("#{target.quantity_product_detail}")
    String getQuantityProductDetail();
}
