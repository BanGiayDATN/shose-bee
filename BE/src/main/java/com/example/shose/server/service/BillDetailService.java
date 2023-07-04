package com.example.shose.server.service;

import com.example.shose.server.dto.response.billdetail.BillDetailResponse;

import java.util.List;

/**
 * @author thangdt
 */
public interface BillDetailService {

    List<BillDetailResponse> findAllByIdBill(String idBill);

}
