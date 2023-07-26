package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.billdetail.CreateBillDetailRequest;
import com.example.shose.server.dto.request.billdetail.RefundProductRequest;
import com.example.shose.server.dto.response.billdetail.BillDetailResponse;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.BillDetail;
import com.example.shose.server.entity.BillHistory;
import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.StatusBill;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.BillDetailRepository;
import com.example.shose.server.repository.BillHistoryRepository;
import com.example.shose.server.repository.BillRepository;
import com.example.shose.server.repository.ProductDetailRepository;
import com.example.shose.server.service.BillDetailService;
import com.example.shose.server.util.FormUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * @author thangdt
 */
@Service
public class BillDetailServiceImpl implements BillDetailService {

    @Autowired
    private BillDetailRepository billDetailRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private BillHistoryRepository billHistoryRepository;

    private FormUtils formUtils = new FormUtils();

    @Override
    public List<BillDetailResponse> findAllByIdBill(String idBill) {
        return billDetailRepository.findAllByIdBill(idBill);
    }

    @Override
    public BillDetailResponse findBillById(String id) {
        return billDetailRepository.findBillById(id);
    }

    @Override
    public BillDetail refundProduct(RefundProductRequest request) {
        Optional<BillDetail> billDetail = billDetailRepository.findById(request.getId());
        Optional<ProductDetail> productDetail = productDetailRepository.findById(request.getId());
        Optional<Bill> bill = billRepository.findById(request.getId());

        if(bill.get().getStatusBill() != StatusBill.DA_THANH_TOAN || bill.get().getStatusBill() != StatusBill.DA_HUY){
            throw new RestApiException(Message.BILL_NOT_REFUND);
        }

        billDetail.get().setStatusBill(StatusBill.TRA_HANG);
        billDetail.get().setQuantity(billDetail.get().getQuantity() - request.getQuantity());

        bill.get().setStatusBill(StatusBill.TRA_HANG);
        billRepository.save(bill.get());

        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill.get());
        billHistory.setStatusBill(StatusBill.TRA_HANG);
        billHistory.setActionDescription(request.getNote());
        billHistoryRepository.save(billHistory);

//        productDetail.get().setQuantity(productDetail.get().getQuantity() + request.getQuantity());
        productDetailRepository.save(productDetail.get());

        return billDetailRepository.save(billDetail.get());
    }

    @Override
    public BillDetail create(CreateBillDetailRequest request) {
        Optional<Bill> bill = billRepository.findById(request.getIdBill());
        Optional<ProductDetail> product = productDetailRepository.findById(request.getIdBill());

        if(!bill.isPresent()){
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        if (!product.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        BillDetail billDetail = formUtils.convertToObject(BillDetail.class, request);
        billDetail.setPrice(new BigDecimal(request.getPrice()));
        billDetail.setProductDetail(product.get());
        billDetail.setBill(bill.get());
        return billDetailRepository.save(billDetail);
    }
}
