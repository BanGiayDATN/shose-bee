package com.example.shose.server.service;


import com.example.shose.server.dto.request.bill.ChangStatusBillRequest;
import com.example.shose.server.infrastructure.common.PageableObject;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.dto.request.bill.BillRequest;
import com.example.shose.server.dto.request.bill.CreateBillRequest;
import com.example.shose.server.dto.response.bill.BillResponse;
import com.example.shose.server.dto.response.bill.UserBillResponse;


import java.util.List;

/**
 * @author thangdt
 */
public interface BillService {

    PageableObject<BillResponse> getAll(BillRequest request);

    List<UserBillResponse> getAllUserInBill();

    Bill  saveONLINE(CreateBillRequest request);

    Bill  saveOFFLINE(String idEmployee);

    Bill update(String id, Bill bill);

    Bill detail(String id);

    Bill changedStatusbill(String id, ChangStatusBillRequest request);

    Bill cancelBill(String id, ChangStatusBillRequest request);
}
