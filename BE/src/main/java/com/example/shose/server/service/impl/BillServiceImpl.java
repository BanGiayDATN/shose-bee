package com.example.shose.server.service.impl;


import com.example.shose.server.dto.request.bill.ChangStatusBillRequest;
import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.BillHistory;
import com.example.shose.server.infrastructure.common.PageableObject;
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

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
    public List<BillResponse> getAll(BillRequest request)  {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");
        request.setConverStatus(Arrays.toString(request.getStatus()));
        try {
          if(!request.getStartTimeString().isEmpty()){
              request.setStartTime(simpleDateFormat.parse(request.getStartTimeString()).getTime());
          }
          if(!request.getEndTimeString().isEmpty()){
              request.setEndTime(simpleDateFormat.parse(request.getEndTimeString()).getTime());
          }
          if(!request.getStartDeliveryDateString().isEmpty()){
              request.setStartDeliveryDate(simpleDateFormat.parse(request.getStartDeliveryDateString()).getTime());
          }
          if(!request.getEndDeliveryDateString().isEmpty()){
              request.setEndDeliveryDate(simpleDateFormat.parse(request.getEndDeliveryDateString()).getTime());
          }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return billRepository.getAll(request);
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

    @Override
    public Bill changedStatusbill(String id, ChangStatusBillRequest request) {
        Optional<Bill> bill = billRepository.findById(id);
        if(!bill.isPresent()){
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        StatusBill statusBill[] = StatusBill.values();
        int nextIndex = (bill.get().getStatusBill().ordinal() + 1) % statusBill.length;
        if(nextIndex >= 4){
            throw new RestApiException(Message.CHANGED_STATUS_ERROR);
        }
        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill.get());
        billHistory.setStatusBill(StatusBill.valueOf(statusBill[nextIndex].name()));
        billHistory.setActionDescription(request.getActionDescription());
        billHistoryRepository.save(billHistory);
        return billRepository.save(bill.get());
    }

    @Override
    public Bill cancelBill(String id, ChangStatusBillRequest request) {
        Optional<Bill> bill = billRepository.findById(id);
        if(!bill.isPresent()){
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        bill.get().setStatusBill(StatusBill.DA_HUY);
        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill.get());
        billHistory.setStatusBill(bill.get().getStatusBill());
        billHistory.setActionDescription(request.getActionDescription());
        return billRepository.save(bill.get());
    }
}
