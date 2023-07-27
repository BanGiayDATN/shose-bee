package com.example.shose.server.service;

import com.example.shose.server.dto.request.paymentsmethod.CreatePaymentsMethodRequest;
import com.example.shose.server.entity.PaymentsMethod;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author thangdt
 */
public interface PaymentsMethodService {

    List<PaymentsMethod> findByAllIdBill(String idBill);

    PaymentsMethod create(String idBill, String idEmployees, CreatePaymentsMethodRequest request);

    BigDecimal sumTotalMoneyByIdBill(String idBill);
}
