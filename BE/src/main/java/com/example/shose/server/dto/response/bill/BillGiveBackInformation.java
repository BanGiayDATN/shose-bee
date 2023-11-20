package com.example.shose.server.dto.response.bill;

import org.springframework.beans.factory.annotation.Value;

public interface BillGiveBackInformation {

    @Value("#{target.idBill}")
    String getIdBill();

    @Value("#{target.codeBill}")
    String getCodeBill();

    @Value("#{target.nameCustomer}")
    String getNameCustomer();


    @Value("#{target.phoneNumber}")
    String getPhoneNumber();


    @Value("#{target.statusBill}")
    String getStatusBill();

    @Value("#{target.typeBill}")
    String getTypeBill();

    @Value("#{target.address}")
    String getAddress();

    @Value("#{target.note}")
    String getNote();

    @Value("#{target.completionDate}")
    Long getCompletionDate();

    @Value("#{target.deliveryDate}")
    Long getDeliveryDate();
}