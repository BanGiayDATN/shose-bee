package com.example.shose.server.service;

import com.example.shose.server.dto.response.billdetail.BillDetailResponse;
import com.example.shose.server.entity.BillHistory;

import java.util.List;

/**
 * @author thangdt
 */
public interface BillDetailService {

    List<BillHistory> findAllByIdBill(String idBill);
}
