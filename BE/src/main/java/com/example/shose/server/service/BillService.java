package com.example.shose.server.service;

import com.example.shose.server.infrastructure.common.PageableObject;
import com.example.shose.server.request.bill.BillRequest;
import com.example.shose.server.response.bill.BillResponse;
import com.example.shose.server.response.bill.UserBillResponse;

import java.util.List;

/**
 * @author thangdt
 */
public interface BillService {

    PageableObject<BillResponse> getAll(BillRequest request);

    List<UserBillResponse> getAllUserInBill();
}
