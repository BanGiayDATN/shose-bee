package com.example.shose.server.dto.response.address;
/*
 *  @author diemdz
 */

import org.springframework.beans.factory.annotation.Value;

public interface AddressAccountResponse {
    @Value("#{target.id}")
    String getId();
    @Value("#{target.line}")
    String getLine();

    @Value("#{target.district}")
    String getDistrict();

    @Value("#{target.province}")
    String getProvince();

    @Value("#{target.ward}")
    String getWard();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.fullName}")
    String getFullname();

    @Value("#{target.phoneNumber}")
    String getPhoneNumber();

}