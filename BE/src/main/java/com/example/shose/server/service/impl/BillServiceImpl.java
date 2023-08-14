package com.example.shose.server.service.impl;


import com.example.shose.server.dto.request.bill.*;
import com.example.shose.server.dto.response.bill.BillResponseAtCounter;
import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.BillDetail;
import com.example.shose.server.entity.BillHistory;
import com.example.shose.server.entity.PaymentsMethod;
import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.entity.Size;
import com.example.shose.server.entity.Voucher;
import com.example.shose.server.entity.VoucherDetail;
import com.example.shose.server.infrastructure.constant.*;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.repository.BillDetailRepository;
import com.example.shose.server.repository.BillHistoryRepository;
import com.example.shose.server.repository.BillRepository;
import com.example.shose.server.dto.response.bill.BillResponse;
import com.example.shose.server.dto.response.bill.UserBillResponse;
import com.example.shose.server.repository.PaymentsMethodRepository;
import com.example.shose.server.repository.ProductDetailRepository;
import com.example.shose.server.repository.SizeRepository;
import com.example.shose.server.repository.VoucherDetailRepository;
import com.example.shose.server.repository.VoucherRepository;
import com.example.shose.server.service.BillService;
import com.example.shose.server.util.ConvertDateToLong;
import com.example.shose.server.util.FormUtils;
import jakarta.transaction.Transaction;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


/**
 * @author thangdt
 */

@Service
@Transactional
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BillHistoryRepository billHistoryRepository;

    @Autowired
    private BillDetailRepository billDetailRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private PaymentsMethodRepository paymentsMethodRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private VoucherDetailRepository voucherDetailRepository;

    @Autowired
    private SizeRepository sizeRepository;


    private FormUtils formUtils = new FormUtils();

    @Override
    public List<BillResponse> getAll(BillRequest request) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        request.setConverStatus(Arrays.toString(request.getStatus()));
        try {
            if (!request.getStartTimeString().isEmpty()) {
                request.setStartTime(simpleDateFormat.parse(request.getStartTimeString()).getTime());
            }
            if (!request.getEndTimeString().isEmpty()) {
                request.setEndTime(simpleDateFormat.parse(request.getEndTimeString()).getTime());
            }
            if (!request.getStartDeliveryDateString().isEmpty()) {
                request.setStartDeliveryDate(simpleDateFormat.parse(request.getStartDeliveryDateString()).getTime());
            }
            if (!request.getEndDeliveryDateString().isEmpty()) {
                request.setEndDeliveryDate(simpleDateFormat.parse(request.getEndDeliveryDateString()).getTime());
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return billRepository.getAll(request);
    }

    @Override
    public List<UserBillResponse> getAllUserInBill() {

        Map<String, UserBillResponse > list = new HashMap<>();
        billRepository.getAllUserInBill().forEach(item ->{
            list.put(item.getUserName(), item);
        });
        List<UserBillResponse> users = new ArrayList<>(list.values());
        return users;
    }

    @Override
    public List<BillResponseAtCounter> findAllBillAtCounterAndStatusNewBill(FindNewBillCreateAtCounterRequest request) {
        return billRepository.findAllBillAtCounterAndStatusNewBill(request);
    }

    @Override
    public Bill save(String id, CreateBillOfflineRequest request) {
        Optional<Account> account = accountRepository.findById(id);
//        if (account.get().getRoles() == Roles.USER) {
//        }
        Bill bill = Bill.builder()
                .employees(account.get())
                .typeBill(TypeBill.valueOf(request.getTypeBill()))
                .code(request.getCode())
                .note(request.getNote())
                .userName(request.getUserName())
                .address(request.getAddress())
                .phoneNumber(request.getPhoneNumber())
                .itemDiscount(new BigDecimal(request.getItemDiscount()))
                .totalMoney(new BigDecimal(request.getTotalMoney()))
                .moneyShip(new BigDecimal(request.getMoneyShip())).build();
        if(request.getIdUser() != null){
            Optional<Account> user  = accountRepository.findById(request.getIdUser());
            if (user.isPresent()) {
                bill.setAccount(user.get());
            }
        }
        if(!request.getDeliveryDate().isEmpty()){
            bill.setDeliveryDate(new ConvertDateToLong().dateToLong(request.getDeliveryDate()));
        }
        if(TypeBill.valueOf(request.getTypeBill()) == TypeBill.OFFLINE){
            bill.setStatusBill(StatusBill.KHONG_TRA_HANG);
            billRepository.save(bill);
            billHistoryRepository.save(BillHistory.builder().statusBill(bill.getStatusBill()).bill(bill).employees(account.get()).build());
        }else{
            bill.setStatusBill(StatusBill.TAO_HOA_DON);
            billRepository.save(bill);
            billHistoryRepository.save(BillHistory.builder().statusBill(bill.getStatusBill()).bill(bill).employees(account.get()).build());

        }

        request.getPaymentsMethodRequests().forEach(item -> {
            PaymentsMethod paymentsMethod = PaymentsMethod.builder()
                    .method(item.getMethod())
                    .status(StatusPayMents.valueOf(request.getStatusPayMents()))
                    .employees(account.get())
                    .totalMoney(item.getTotalMoney())
                    .description(item.getActionDescription())
                    .bill(bill)
                    .build();
            paymentsMethodRepository.save(paymentsMethod);
        });

        request.getBillDetailRequests().forEach(billDetailRequest -> {
            Optional<ProductDetail> productDetail = productDetailRepository.findById(billDetailRequest.getIdProduct());
            if (!productDetail.isPresent()) {
                throw new RestApiException(Message.NOT_EXISTS);
            }
            if (productDetail.get().getQuantity() < billDetailRequest.getQuantity()) {
                throw new RestApiException(Message.ERROR_QUANTITY);
            }
            BillDetail billDetail = BillDetail.builder().statusBill(StatusBill.TAO_HOA_DON).bill(bill).productDetail(productDetail.get()).price(new BigDecimal(billDetailRequest.getPrice())).quantity(billDetailRequest.getQuantity()).build();
            billDetailRepository.save(billDetail);
            productDetail.get().setQuantity( productDetail.get().getQuantity() - billDetailRequest.getQuantity());
            productDetailRepository.save(productDetail.get());
        });
        request.getVouchers().forEach(voucher -> {
            Optional<Voucher> optional = voucherRepository.findById(voucher.getIdVoucher());
            if (!optional.isPresent()) {
                throw new RestApiException(Message.NOT_EXISTS);
            }
            if (optional.get().getQuantity() <= 0 && optional.get().getEndDate() < Calendar.getInstance().getTimeInMillis()) {
                throw new RestApiException(Message.VOUCHER_NOT_USE);
            }
            optional.get().setQuantity(optional.get().getQuantity() - 1);
            voucherRepository.save(optional.get());

            VoucherDetail voucherDetail = VoucherDetail.builder().voucher(optional.get()).bill(bill).afterPrice(new BigDecimal(voucher.getAfterPrice())).beforPrice(new BigDecimal(voucher.getBeforPrice())).discountPrice(new BigDecimal(voucher.getDiscountPrice())).build();
            voucherDetailRepository.save(voucherDetail);
        });

        return bill;
    }

    @Override
    public Bill saveOnline(CreateBillRequest request) {
        Optional<Account> account = accountRepository.findById(request.getIdUser());
        if (!account.isPresent()) {
            throw new RestApiException(Message.ACCOUNT_NOT_EXIT);
        }
        Bill bill = billRepository.save(Bill.builder().account(account.get()).userName(request.getName()).address(request.getAddress()).phoneNumber(request.getPhoneNumber()).statusBill(StatusBill.TAO_HOA_DON).typeBill(TypeBill.OFFLINE).code("HD" + RandomStringUtils.randomNumeric(6)).build());
        billHistoryRepository.save(BillHistory.builder().statusBill(bill.getStatusBill()).bill(bill).build());
        return bill;
    }

    @Override
    public String CreateCodeBill() {
        return "HD" + RandomStringUtils.randomNumeric(6);
    }

    @Override
    public Bill updateBillOffline(String id, UpdateBillRequest request) {
        Optional<Bill> updateBill = billRepository.findById(id);
        if (!updateBill.isPresent()) {
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        updateBill.get().setMoneyShip(new BigDecimal(request.getMoneyShip()));
        updateBill.get().setAddress(request.getAddress());
        updateBill.get().setUserName(request.getName());
        updateBill.get().setPhoneNumber(request.getPhoneNumber());
        updateBill.get().setNote(request.getNote());
        return billRepository.save(updateBill.get());
    }

    @Override
    public Bill detail(String id) {
        Optional<Bill> bill = billRepository.findById(id);
        if (!bill.isPresent()) {
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        return bill.get();
    }

    @Override
    public Bill changedStatusbill(String id,  String idEmployees, ChangStatusBillRequest request) {
        Optional<Bill> bill = billRepository.findById(id);
        Optional<Account> account = accountRepository.findById(idEmployees);
        if (!bill.isPresent()) {
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        if (!account.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        StatusBill statusBill[] = StatusBill.values();
        int nextIndex = (bill.get().getStatusBill().ordinal() + 1) % statusBill.length;
        bill.get().setStatusBill(StatusBill.valueOf(statusBill[nextIndex].name()));
        if (nextIndex > 5) {
            throw new RestApiException(Message.CHANGED_STATUS_ERROR);
        }
//        if (StatusBill.valueOf(statusBill[nextIndex].name()) ==  StatusBill.DA_THANH_TOAN && ) {
//            throw new RestApiException(Message.CHANGED_STATUS_ERROR);
//        }
        if (bill.get().getStatusBill() == StatusBill.CHO_XAC_NHAN) {
            bill.get().setConfirmationDate(Calendar.getInstance().getTimeInMillis());
        } else if (bill.get().getStatusBill() == StatusBill.VAN_CHUYEN) {
            bill.get().setDeliveryDate(Calendar.getInstance().getTimeInMillis());
        } else if (bill.get().getStatusBill() == StatusBill.DA_THANH_TOAN) {
            bill.get().setReceiveDate(Calendar.getInstance().getTimeInMillis());
//            if(bill.get().getTotalMoney().compareTo(new BigDecimal(request.getTotalMoney())) > 0){
//                throw new RestApiException(Message.ERROR_TOTALMONEY);
//            }
            PaymentsMethod paymentsMethod = PaymentsMethod.builder().method(request.getMethod()).employees(account.get()).bill(bill.get()).description(request.getActionDescription()).totalMoney(new BigDecimal(request.getTotalMoney())).build();
            paymentsMethodRepository.save(paymentsMethod);
        } else if (bill.get().getStatusBill() == StatusBill.KHONG_TRA_HANG) {
            bill.get().setCompletionDate(Calendar.getInstance().getTimeInMillis());
        }

        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill.get());
        billHistory.setStatusBill(StatusBill.valueOf(statusBill[nextIndex].name()));
        billHistory.setActionDescription(request.getActionDescription());
        billHistory.setEmployees(account.get());
        billHistoryRepository.save(billHistory);

        if (bill.get().getStatusBill() == StatusBill.VAN_CHUYEN && paymentsMethodRepository.countPayMentPostpaidByIdBill(id) == 0) {
            bill.get().setStatusBill(StatusBill.DA_THANH_TOAN);
            BillHistory billHistoryPayMent = new BillHistory();
            billHistoryPayMent.setBill(bill.get());
            billHistoryPayMent.setStatusBill(StatusBill.DA_THANH_TOAN);
            billHistoryPayMent.setActionDescription(request.getActionDescription());
            billHistoryPayMent.setEmployees(account.get());
            billHistoryRepository.save(billHistoryPayMent);
        }
        return billRepository.save(bill.get());
    }

    @Override
    public boolean changeStatusAllBillByIds(ChangAllStatusBillByIdsRequest request, String idEmployees) {
        request.getIds().forEach(id ->{
            Optional<Bill> bill = billRepository.findById(id);
            Optional<Account> account = accountRepository.findById(idEmployees);
            if (!bill.isPresent()) {
                throw new RestApiException(Message.BILL_NOT_EXIT);
            }
            if (!account.isPresent()) {
                throw new RestApiException(Message.NOT_EXISTS);
            }

            BillHistory billHistory = new BillHistory();
            billHistory.setBill(bill.get());
            billHistory.setStatusBill(StatusBill.valueOf(request.getStatus()));
//            billHistoryPayMent.setActionDescription(request.getActionDescription());
            billHistory.setEmployees(account.get());
            billHistoryRepository.save(billHistory);

            bill.get().setStatusBill(StatusBill.valueOf(request.getStatus()));
            if (bill.get().getStatusBill() == StatusBill.VAN_CHUYEN && paymentsMethodRepository.countPayMentPostpaidByIdBill(id) == 0) {
                bill.get().setStatusBill(StatusBill.DA_THANH_TOAN);
                BillHistory billHistoryPayMent = new BillHistory();
                billHistoryPayMent.setBill(bill.get());
                billHistoryPayMent.setStatusBill(StatusBill.DA_THANH_TOAN);
//                billHistoryPayMent.setActionDescription(request.getActionDescription());
                billHistoryPayMent.setEmployees(account.get());
                billHistoryRepository.save(billHistoryPayMent);
            }
            billRepository.save(bill.get());
        });
        return true;
    }

    @Override
    public Bill cancelBill(String id, String idEmployees, ChangStatusBillRequest request) {
        Optional<Bill> bill = billRepository.findById(id);
        Optional<Account> account = accountRepository.findById(idEmployees);
        if (!bill.isPresent()) {
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        if (!account.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        bill.get().setStatusBill(StatusBill.DA_HUY);
        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill.get());
        billHistory.setStatusBill(bill.get().getStatusBill());
        billHistory.setActionDescription(request.getActionDescription());
        billHistory.setEmployees(account.get());
        billHistoryRepository.save(billHistory);
        return billRepository.save(bill.get());
    }

}
