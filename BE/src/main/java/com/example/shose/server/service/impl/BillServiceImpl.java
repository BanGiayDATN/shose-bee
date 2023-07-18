package com.example.shose.server.service.impl;


import com.example.shose.server.dto.request.bill.*;
import com.example.shose.server.dto.response.bill.ChildrenBillResponse;
import com.example.shose.server.dto.response.bill.CustomDetalBillResponse;
import com.example.shose.server.dto.response.billdetail.BillDetailResponse;
import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.BillHistory;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Roles;
import com.example.shose.server.infrastructure.constant.StatusBill;
import com.example.shose.server.infrastructure.constant.TypeBill;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.repository.BillDetailRepository;
import com.example.shose.server.repository.BillHistoryRepository;
import com.example.shose.server.repository.BillRepository;
import com.example.shose.server.dto.response.bill.BillResponse;
import com.example.shose.server.dto.response.bill.UserBillResponse;
import com.example.shose.server.service.BillService;
import com.example.shose.server.util.FormUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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

    @Autowired
    private BillDetailRepository billDetailRepository;

    private FormUtils formUtils = new FormUtils();

    @Override
    public List<BillResponse> getAll(BillRequest request)  {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
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
    public List<CustomDetalBillResponse> findAllBillAtCounterAndStatusNewBill(FindNewBillCreateAtCounterRequest request) {
        Map<String, CustomDetalBillResponse> list = new HashMap<>();
        List<BillDetailResponse> billDetailResponse = billDetailRepository.findAllBillAtCounterAndStatusNewBill(request);
        List<BillResponse> billResponses = billRepository.findAllBillAtCounterAndStatusNewBill(request);
        billResponses.forEach(bill -> {
            List<ChildrenBillResponse> children = new ArrayList<>();
            billDetailResponse.forEach( billDetail -> {
                if(billDetail.getIdBill().equals(bill.getId())){
                    children.add(new ChildrenBillResponse(billDetail));
                }
            });
            list.put(bill.getId(), new CustomDetalBillResponse(bill, children));
        });
        List<CustomDetalBillResponse> responses = new ArrayList<>(list.values());
        return responses;
    }

    @Override
    public Bill  saveOffline(String idEmployee) {
        Optional<Account> account = accountRepository.findById(idEmployee);
        if(!account.isPresent()){
            throw new RestApiException(Message.ACCOUNT_NOT_EXIT);
        }
        if(account.get().getRoles() == Roles.USER){
            throw new RestApiException(Message.ACCOUNT_NOT_PERMISSION );
        }
        Bill bill = billRepository.save(Bill.builder().employees(account.get()).statusBill(StatusBill.TAO_HOA_DON).typeBill(TypeBill.OFFLINE).code("HD"+ RandomStringUtils.randomNumeric(6)).itemDiscount(BigDecimal.valueOf(0)).totalMoney(BigDecimal.valueOf(0)).moneyShip(BigDecimal.valueOf(0)).build());
        billHistoryRepository.save(BillHistory.builder().statusBill(bill.getStatusBill()).bill(bill).build());
        return bill;
    }

    @Override
    public Bill  saveOnline(CreateBillRequest request) {
        Optional<Account> account = accountRepository.findById(request.getIdUser());
        if(!account.isPresent()){
            throw new RestApiException(Message.ACCOUNT_NOT_EXIT);
        }
        Bill bill = billRepository.save(Bill.builder().account(account.get()).userName(request.getName()).address(request.getAddress()).phoneNumber(request.getPhoneNumber()).statusBill(StatusBill.TAO_HOA_DON).typeBill(TypeBill.OFFLINE).code("HD"+ RandomStringUtils.randomNumeric(6)).build());
        billHistoryRepository.save(BillHistory.builder().statusBill(bill.getStatusBill()).bill(bill).build());
        return bill;
    }

    @Override
    public Bill updateBillOffline(String id, UpdateBillRequest request) {
        Optional<Bill> updateBill = billRepository.findById(id);
        if(!updateBill.isPresent()){
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        Bill bill = formUtils.convertToObject(Bill.class, request);
        bill.setItemDiscount(new BigDecimal(request.getItemDiscount()));
        bill.setMoneyShip(new BigDecimal(request.getMoneyShip()));
        bill.setStatusBill(StatusBill.DA_THANH_TOAN);
        bill.setCompletionDate(Calendar.getInstance().getTimeInMillis());
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
        bill.get().setStatusBill(StatusBill.valueOf(statusBill[nextIndex].name()));
        if(nextIndex > 4){
            throw new RestApiException(Message.CHANGED_STATUS_ERROR);
        }
        if(bill.get().getStatusBill() == StatusBill.CHO_XAC_NHAN){
            bill.get().setConfirmationDate(Calendar.getInstance().getTimeInMillis());
        }
        if(bill.get().getStatusBill() == StatusBill.VAN_CHUYEN){
            bill.get().setDeliveryDate(Calendar.getInstance().getTimeInMillis());
        }
        if(bill.get().getStatusBill() == StatusBill.DA_THANH_TOAN){
            bill.get().setReceiveDate(Calendar.getInstance().getTimeInMillis());
        }
        if(bill.get().getStatusBill() == StatusBill.KHONG_TRA_HANG){
            bill.get().setCompletionDate(Calendar.getInstance().getTimeInMillis());
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
        billHistoryRepository.save(billHistory);
        return billRepository.save(bill.get());
    }

}
