package com.example.shose.server.service.impl;

import com.example.shose.server.repository.BillRepository;
import com.example.shose.server.request.bill.BillRequest;
import com.example.shose.server.response.BillResponse;
import com.example.shose.server.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * @author thangdt
 */

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepository billRepository;

    @Override
    public List<BillResponse> getAll(BillRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        return billRepository.getAll(pageable, request);
    }
}
