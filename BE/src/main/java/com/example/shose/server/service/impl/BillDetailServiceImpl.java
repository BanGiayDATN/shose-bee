package com.example.shose.server.service.impl;

import com.example.shose.server.dto.response.billdetail.BillDetailResponse;
import com.example.shose.server.repository.BillDetailRepository;
import com.example.shose.server.service.BillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author thangdt
 */
@Service
public class BillDetailServiceImpl implements BillDetailService {

    @Autowired
    private BillDetailRepository billDetailRepository;


    @Override
    public List<BillDetailResponse> findAllByIdBill(String idBill) {
        return billDetailRepository.findAllByIdBill(idBill);
    }
}
