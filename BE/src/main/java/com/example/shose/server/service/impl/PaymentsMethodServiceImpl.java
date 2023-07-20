package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.paymentsmethod.CreatePaymentsMethodRequest;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.BillHistory;
import com.example.shose.server.entity.PaymentsMethod;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.StatusBill;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.BillHistoryRepository;
import com.example.shose.server.repository.BillRepository;
import com.example.shose.server.repository.PaymentsMethodRepository;
import com.example.shose.server.service.PaymentsMethodService;
import com.example.shose.server.util.FormUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author thangdt
 */
@Service
@Transactional
public class PaymentsMethodServiceImpl implements PaymentsMethodService {

    @Autowired
    private PaymentsMethodRepository paymentsMethodRepository;

    @Autowired
    private BillHistoryRepository billHistoryRepository;

    @Autowired
    private BillRepository billRepository;

    private FormUtils formUtils = new FormUtils();

    @Override
    public List<PaymentsMethod> findByAllIdBill(String idBill) {
        Optional<Bill> bill = billRepository.findById(idBill);
        if (!bill.isPresent()) {
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        return paymentsMethodRepository.findAllByBill(bill.get());
    }

    @Override
    public PaymentsMethod create(CreatePaymentsMethodRequest request) {
        Optional<Bill> bill = billRepository.findById(request.getIdBill());
        if (!bill.isPresent()) {
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        bill.get().setStatusBill(StatusBill.DA_THANH_TOAN);
        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill.get());
        billHistory.setStatusBill(bill.get().getStatusBill());
        billHistory.setActionDescription("");

        billHistoryRepository.save(billHistory);
        billRepository.save(bill.get());

        PaymentsMethod paymentsMethod = formUtils.convertToObject(PaymentsMethod.class, request);
        paymentsMethod.setBill(bill.get());
        return paymentsMethodRepository.save(paymentsMethod);
    }
}
