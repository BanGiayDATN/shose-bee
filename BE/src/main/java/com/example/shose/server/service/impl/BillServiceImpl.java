package com.example.shose.server.service.impl;

import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.BillHistory;
import com.example.shose.server.infrastructure.common.base.PageableObject;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Roles;
import com.example.shose.server.infrastructure.constant.StatusBill;
import com.example.shose.server.infrastructure.constant.TypeBill;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.repository.BillHistoryRepository;
import com.example.shose.server.repository.BillRepository;
import com.example.shose.server.dto.request.bill.BillRequest;
import com.example.shose.server.dto.request.bill.CreateBillRequest;
import com.example.shose.server.dto.response.bill.BillResponse;
import com.example.shose.server.dto.response.bill.UserBillResponse;
import com.example.shose.server.service.BillService;
import com.example.shose.server.util.FormUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * @author thangdt
 */

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BillHistoryRepository billHistoryRepository;


    private FormUtils formUtils = new FormUtils();

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

    @Override
    public Bill  saveOFFLINE(String idEmployee) {
        Optional<Account> account = accountRepository.findById(idEmployee);
        if(!account.isPresent()){
            throw new RestApiException(Message.ACCOUNT_NOT_EXIT);
        }
        if(account.get().getRoles() == Roles.USER){
            throw new RestApiException(Message.ACCOUNT_NOT_PERMISSION );
        }
        Bill bill = billRepository.save(Bill.builder().employees(account.get()).statusBill(StatusBill.TAO_HOA_DON).typeBill(TypeBill.OFFLINE).code("HD"+ RandomStringUtils.randomNumeric(6)).build());
        billHistoryRepository.save(BillHistory.builder().statusBill(bill.getStatusBill()).bill(bill).build());
        return bill;
    }

    @Override
    public Bill  saveONLINE(CreateBillRequest request) {
        Optional<Account> account = accountRepository.findById(request.getIdUser());
        if(!account.isPresent()){
            throw new RestApiException(Message.ACCOUNT_NOT_EXIT);
        }
        Bill bill = billRepository.save(Bill.builder().account(account.get()).userName(request.getName()).address(request.getAddress()).phoneNumber(request.getPhoneNumber()).statusBill(StatusBill.TAO_HOA_DON).typeBill(TypeBill.OFFLINE).code("HD"+ RandomStringUtils.randomNumeric(6)).build());
        billHistoryRepository.save(BillHistory.builder().statusBill(bill.getStatusBill()).bill(bill).build());
        return bill;
    }

    @Override
    public Bill update(String id, Bill request) {
        Optional<Bill> updateBill = billRepository.findById(id);
        if(!updateBill.isPresent()){
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        Bill bill = formUtils.convertToObject(Bill.class, request);
        return billRepository.save(bill);
    }

    @Override
    public Bill detail(String id) {
        Optional<Bill> bill = billRepository.findById(id);
        if(!bill.isPresent()){
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        return bill.get();
    }
}
