package com.example.shose.server.service;


import com.example.shose.server.dto.request.bill.BillRequest;
import com.example.shose.server.dto.request.bill.ChangStatusBillRequest;
import com.example.shose.server.dto.request.bill.CreateBillOfflineRequest;
import com.example.shose.server.dto.request.bill.CreateBillRequest;
import com.example.shose.server.dto.request.bill.FindNewBillCreateAtCounterRequest;
import com.example.shose.server.dto.request.bill.UpdateBillRequest;
import com.example.shose.server.dto.response.bill.BillResponseAtCounter;
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

    List<BillResponseAtCounter> findAllBillAtCounterAndStatusNewBill(FindNewBillCreateAtCounterRequest request);

    Bill  saveOnline(CreateBillRequest request);

    Bill  save(String id,  CreateBillOfflineRequest request);

    Bill updateBillOffline(String id, UpdateBillRequest bill);

    Bill detail(String id);

    Bill changedStatusbill(String id, String idEmployees, ChangStatusBillRequest request);

    Bill cancelBill(String id,  String idEmployees,ChangStatusBillRequest request);
}
