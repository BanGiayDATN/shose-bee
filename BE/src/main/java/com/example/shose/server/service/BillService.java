package com.example.shose.server.service;


import com.example.shose.server.dto.request.bill.*;
import com.example.shose.server.dto.response.bill.CustomDetalBillResponse;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.dto.response.bill.BillResponse;
import com.example.shose.server.dto.response.bill.UserBillResponse;

import java.util.List;

/**
 * @author thangdt
 */
public interface BillService {

    List<BillResponse> getAll(BillRequest request);

    List<UserBillResponse> getAllUserInBill();

    List<CustomDetalBillResponse> findAllBillAtCounterAndStatusNewBill(FindNewBillCreateAtCounterRequest request);

    Bill  saveOnline(CreateBillRequest request);

    Bill  saveOffline(String idEmployee);

    Bill updateBillOffline(String id, UpdateBillRequest bill);

    Bill detail(String id);

    Bill changedStatusbill(String id, ChangStatusBillRequest request);

    Bill cancelBill(String id, ChangStatusBillRequest request);
}
