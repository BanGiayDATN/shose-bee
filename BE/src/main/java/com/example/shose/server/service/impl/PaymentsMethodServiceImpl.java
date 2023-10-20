package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.bill.billcustomer.BillDetailOnline;
import com.example.shose.server.dto.request.payMentMethod.CreatePayMentMethodTransferRequest;
import com.example.shose.server.dto.request.paymentsmethod.CreatePaymentsMethodRequest;
import com.example.shose.server.dto.request.paymentsmethod.QuantityProductPaymentRequest;
import com.example.shose.server.dto.response.payment.PayMentVnpayResponse;
import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.BillHistory;
import com.example.shose.server.entity.PaymentsMethod;
import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.infrastructure.constant.*;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.repository.BillDetailRepository;
import com.example.shose.server.repository.BillHistoryRepository;
import com.example.shose.server.repository.BillRepository;
import com.example.shose.server.repository.PaymentsMethodRepository;
import com.example.shose.server.repository.ProductDetailRepository;
import com.example.shose.server.service.PaymentsMethodService;
import com.example.shose.server.util.FormUtils;
import com.example.shose.server.util.payMent.Config;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TimeZone;
import java.util.UUID;

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
    private BillDetailRepository billDetailRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private AccountRepository accountRepository;

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
    public PaymentsMethod create(String idBill, String idEmployees, CreatePaymentsMethodRequest request) {
        Optional<Bill> bill = billRepository.findById(idBill);
        Optional<Account> account = accountRepository.findById(idEmployees);
        if (!bill.isPresent()) {
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        if (!account.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        if(bill.get().getStatusBill() == StatusBill.DA_HUY ){
            throw new RestApiException(Message.NOT_PAYMENT);
        }
        BigDecimal payment = paymentsMethodRepository.sumTotalMoneyByIdBill(idBill);
        if((bill.get().getStatusBill() != StatusBill.DA_THANH_TOAN || bill.get().getStatusBill() != StatusBill.THANH_CONG || bill.get().getStatusBill() != StatusBill.TRA_HANG)  && bill.get().getTotalMoney().compareTo(payment) >= 0){

            bill.get().setStatusBill(StatusBill.DA_THANH_TOAN);
            BillHistory billHistory = new BillHistory();
            billHistory.setBill(bill.get());
            billHistory.setStatusBill(StatusBill.DA_THANH_TOAN);
            billHistory.setActionDescription("Thanh toán hóa đơn");
            billHistory.setEmployees(account.get());
            billHistoryRepository.save(billHistory);
            billRepository.save(bill.get());
        }
        PaymentsMethod paymentsMethod = formUtils.convertToObject(PaymentsMethod.class, request);
        paymentsMethod.setBill(bill.get());
        paymentsMethod.setDescription(request.getActionDescription());
        paymentsMethod.setEmployees(account.get());
        return paymentsMethodRepository.save(paymentsMethod);
    }

    @Override
    public BigDecimal sumTotalMoneyByIdBill(String idBill) {
        return paymentsMethodRepository.sumTotalMoneyByIdBill(idBill);
    }

    @Override
    public String payWithVNPAY(CreatePayMentMethodTransferRequest payModel, HttpServletRequest request) throws UnsupportedEncodingException {
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());

        cld.add(Calendar.MINUTE,15);

        String vnp_ExpireDate = formatter.format(cld.getTime());

        Map<String,String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VnPayConstant.vnp_Version);
        vnp_Params.put("vnp_Command",VnPayConstant.vnp_Command);
        vnp_Params.put("vnp_TmnCode",VnPayConstant.vnp_TmnCode);
        vnp_Params.put("vnp_Amount",payModel.vnp_Ammount+"00");
        vnp_Params.put("vnp_BankCode", VnPayConstant.vnp_BankCode);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_CurrCode",VnPayConstant.vnp_CurrCode);
        vnp_Params.put("vnp_IpAddr", Config.getIpAddress(request));
        vnp_Params.put("vnp_Locale",VnPayConstant.vnp_Locale);
        vnp_Params.put("vnp_OrderInfo",payModel.vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType",payModel.vnp_OrderType);
        vnp_Params.put("vnp_ReturnUrl", VnPayConstant.vnp_ReturnUrl);
        vnp_Params.put("vnp_TxnRef", String.valueOf(payModel.vnp_TxnRef));
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldList = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldList);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        Iterator itr =  fieldList.iterator();
        while (itr.hasNext()){
            String fieldName = (String) itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if(fieldValue!=null && (fieldValue.length()>0)){
                hashData.append(fieldName);
                hashData.append("=");
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append("=");
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                if(itr.hasNext()){
                    query.append("&");
                    hashData.append("&");
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = Config.hmacSHA512(VnPayConstant.vnp_HashSecret,hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VnPayConstant.vnp_Url + "?" + queryUrl;
        return paymentUrl;
    }

    @Override
    public boolean paymentSuccess( String idEmployees,PayMentVnpayResponse response) {
        Optional<Account> account = accountRepository.findById(idEmployees);
        if (!account.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        if(response.getVnp_ResponseCode().equals("00")){
            List<String> findAllByVnpTransactionNo = paymentsMethodRepository.findAllByVnpTransactionNo(response.getVnp_TransactionNo());
            if(findAllByVnpTransactionNo.size() > 0){
                return false;
            }
            Optional<Bill> bill = billRepository.findByCode(response.getVnp_TxnRef());
            PaymentsMethod paymentsMethod = new PaymentsMethod();
            paymentsMethod.setBill(bill.get());
            paymentsMethod.setDescription(response.getVnp_OrderInfo());
            paymentsMethod.setTotalMoney(new BigDecimal(response.getVnp_Amount().substring(0, response.getVnp_Amount().length() - 2)));
            paymentsMethod.setStatus(StatusPayMents.THANH_TOAN);
            paymentsMethod.setMethod(StatusMethod.CHUYEN_KHOAN);
            paymentsMethod.setEmployees(account.get());
            paymentsMethod.setVnp_TransactionNo(response.getVnp_TransactionNo());
            paymentsMethodRepository.save(paymentsMethod);

            List<BillHistory> findAllByBill = billHistoryRepository.findAllByBill(bill.get());
            boolean checkBill = findAllByBill.stream().anyMatch(billHistory -> billHistory.getStatusBill() == StatusBill.THANH_CONG);
            if (checkBill) {
                bill.get().setStatusBill(StatusBill.THANH_CONG);
                bill.get().setCompletionDate(Calendar.getInstance().getTimeInMillis());
                billRepository.save(bill.get());
            } else {
                bill.get().setStatusBill(StatusBill.CHO_VAN_CHUYEN);
//                bill.get().setCompletionDate(Calendar.getInstance().getTimeInMillis());
                billRepository.save(bill.get());
            }
            billRepository.save(bill.get());
            return true;
        }
        return false;
    }

    @Override
    public boolean changeQuantityProduct(QuantityProductPaymentRequest request) {
        for (BillDetailOnline x : request.getBillDetail()) {
            ProductDetail productDetail = productDetailRepository.findById(x.getIdProductDetail()).get();
            productDetail.setQuantity(productDetail.getQuantity() + x.getQuantity());
            productDetailRepository.save(productDetail);
        }
        return true;
    }

    @Override
    public boolean updatepayMent(String idBill,String idEmployees, List<String> ids) {
        Optional<Bill> bill = billRepository.findById(idBill);
        Optional<Account> account = accountRepository.findById(idEmployees);
        if (!bill.isPresent()) {
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        if (!account.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        ids.forEach(id -> {
            Optional<PaymentsMethod> paymentsMethod = paymentsMethodRepository.findById(id);
            paymentsMethod.get().setStatus(StatusPayMents.THANH_TOAN);
            paymentsMethodRepository.save(paymentsMethod.get());
        });
        bill.get().setStatusBill(StatusBill.DA_THANH_TOAN);
        billRepository.save(bill.get());
        BillHistory billHistoryPayMent = new BillHistory();
        billHistoryPayMent.setBill(bill.get());
        billHistoryPayMent.setStatusBill(StatusBill.DA_THANH_TOAN);
//        billHistoryPayMent.setActionDescription(request.getActionDescription());
        billHistoryPayMent.setEmployees(account.get());
        billHistoryRepository.save(billHistoryPayMent);
        return true;
    }

    @Override
    public String payWithVNPAYOnline(CreatePayMentMethodTransferRequest payModel, HttpServletRequest request) throws UnsupportedEncodingException {
        payModel.getBillDetail().forEach(item -> {
            ProductDetail productDetail = productDetailRepository.findById(item.getIdProductDetail()).get();
            if (productDetail.getQuantity() < item.getQuantity()) {
                throw new RestApiException(Message.ERROR_QUANTITY);
            }
            if (productDetail.getStatus() != Status.DANG_SU_DUNG) {
                throw new RestApiException(Message.NOT_PAYMENT_PRODUCT);
            }
            productDetail.setQuantity(productDetail.getQuantity() - item.getQuantity());
            productDetailRepository.save(productDetail);
        });
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());

        cld.add(Calendar.MINUTE,15);

        String vnp_ExpireDate = formatter.format(cld.getTime());

        Map<String,String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VnPayConstant.vnp_Version);
        vnp_Params.put("vnp_Command",VnPayConstant.vnp_Command);
        vnp_Params.put("vnp_TmnCode",VnPayConstant.vnp_TmnCode);
        vnp_Params.put("vnp_Amount",String.valueOf(payModel.vnp_Ammount + "00"));
        vnp_Params.put("vnp_BankCode", VnPayConstant.vnp_BankCode);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_CurrCode",VnPayConstant.vnp_CurrCode);
        vnp_Params.put("vnp_IpAddr", Config.getIpAddress(request));
        vnp_Params.put("vnp_Locale",VnPayConstant.vnp_Locale);
        vnp_Params.put("vnp_OrderInfo",payModel.vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType",payModel.vnp_OrderType);
        vnp_Params.put("vnp_ReturnUrl", VnPayConstant.vnp_ReturnUrlBuyOnline);
        vnp_Params.put("vnp_TxnRef", String.valueOf(UUID.randomUUID()));
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldList = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldList);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        Iterator itr =  fieldList.iterator();
        while (itr.hasNext()){
            String fieldName = (String) itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if(fieldValue!=null && (fieldValue.length()>0)){
                hashData.append(fieldName);
                hashData.append("=");
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append("=");
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                if(itr.hasNext()){
                    query.append("&");
                    hashData.append("&");
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = Config.hmacSHA512(VnPayConstant.vnp_HashSecret,hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VnPayConstant.vnp_Url + "?" + queryUrl;
        return paymentUrl;
    }
}
