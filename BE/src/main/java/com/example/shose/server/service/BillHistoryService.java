package com.example.shose.server.service;

import com.example.shose.server.dto.response.billhistory.BillHistoryResponse;

import java.util.List;

/**
 * @author thangdt
 */

public interface BillHistoryService {

    List<BillHistoryResponse> findAllByIdBill(String idBill);

}
