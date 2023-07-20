package com.example.shose.server.dto.response;

import com.example.shose.server.entity.Address;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

/**
 * @author Hào Ngô
 */
@Projection(types = {Address.class})
public interface AddressResponse {
    @Value("#{target.stt}")
    Integer getSTT();

    @Value("#{target.id}")
    String getId();
    @Value("#{target.line}")
    String getLine();

    @Value("#{target.city}")
    String getCity();

    @Value("#{target.province}")
    String getProvince();

    @Value("#{target.country}")
    String getCountry();

    @Value("#{target.createdDate}")
    Long getCreatedDate();

    @Value("#{target.lastModifiedDate}")
    Long getLastModifiedDate();

    @Value("#{target.idUser}")
    String getIdUser();

}
