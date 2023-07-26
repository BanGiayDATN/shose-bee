package com.example.shose.server.dto.response;

import com.example.shose.server.entity.SizeProductDetail;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {SizeProductDetail.class})
public interface SizeProductDetailReponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.nameSize}")
    Integer getNameSize();

    @Value("#{target.quantity}")
    Integer getQuantity();

    @Value("#{target.status}")
    String getStatus();

}
