package com.example.shose.server.service.impl;

import com.example.shose.server.infrastructure.common.base.PageableObject;
import com.example.shose.server.repository.BillRepository;
import com.example.shose.server.request.bill.BillRequest;
import com.example.shose.server.response.bill.BillResponse;
import com.example.shose.server.response.bill.UserBillResponse;
import com.example.shose.server.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.List;

/**
 * @author thangdt
 */

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepository billRepository;

    @Override
    public PageableObject<BillResponse> getAll(BillRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        request.setConverStatus(Arrays.toString(request.getStatus()));
        return new PageableObject<>(billRepository.getAll(pageable, request));
    }

    @Override
    public List<UserBillResponse> getAllUserInBill() {
        return billRepository.getAllUserInBill();
    }
}
