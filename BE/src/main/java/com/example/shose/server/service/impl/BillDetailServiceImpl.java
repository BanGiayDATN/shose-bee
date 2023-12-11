package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.billdetail.BillDetailRequest;
import com.example.shose.server.dto.request.billdetail.CreateBillDetailRequest;
import com.example.shose.server.dto.request.billdetail.RefundProductRequest;
import com.example.shose.server.dto.response.billdetail.BillDetailResponse;
import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.BillDetail;
import com.example.shose.server.entity.BillHistory;
import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.entity.Size;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.StatusBill;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.repository.BillDetailRepository;
import com.example.shose.server.repository.BillHistoryRepository;
import com.example.shose.server.repository.BillRepository;
import com.example.shose.server.repository.ProductDetailRepository;
import com.example.shose.server.repository.SizeRepository;
import com.example.shose.server.service.BillDetailService;
import com.example.shose.server.util.FormUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * @author thangdt
 */
@Service
@Transactional
public class BillDetailServiceImpl implements BillDetailService {

    @Autowired
    private BillDetailRepository billDetailRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private BillHistoryRepository billHistoryRepository;

    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private PaymentsMethodRepository paymentsMethodRepository;

    private FormUtils formUtils = new FormUtils();

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public List<BillDetailResponse> findAllByIdBill(BillDetailRequest request) {
        return billDetailRepository.findAllByIdBill(request);
    }

    @Override
    public List<BillDetailResponse> findAllByIdBill(String id) {
        return billDetailRepository.findByIdBill(id);
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
        Optional<Size> size = sizeRepository.findByName(request.getSize());
        if (!size.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }

        if (billDetail.get().getQuantity() < request.getQuantity()) {
            throw new RestApiException(Message.ERROR_QUANTITY);
        }
        if(bill.get().getStatusBill() != StatusBill.DA_THANH_TOAN ||
                bill.get().getStatusBill() != StatusBill.THANH_CONG ||
                bill.get().getStatusBill() != StatusBill.TRA_HANG )
        {
            throw new RestApiException(Message.BILL_NOT_REFUND);
        }

        productDetail.get().setQuantity( productDetail.get().getQuantity() + request.getQuantity());

        billDetail.get().setStatusBill(StatusBill.TRA_HANG);
        billDetail.get().setQuantity(billDetail.get().getQuantity() - request.getQuantity());

        bill.get().setStatusBill(StatusBill.TRA_HANG);
        bill.get().setTotalMoney(new BigDecimal(request.getTotalMoney()));
        billRepository.save(bill.get());

        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill.get());
        billHistory.setStatusBill(StatusBill.TRA_HANG);
        billHistory.setActionDescription(request.getNote());
        billHistoryRepository.save(billHistory);

        productDetailRepository.save(productDetail.get());

        return billDetailRepository.save(billDetail.get());
    }

    @Override
    public String create(CreateBillDetailRequest request) {
        Optional<Bill> bill = billRepository.findById(request.getIdBill());
        Optional<ProductDetail> productDetail = productDetailRepository.findById(request.getIdProduct());
        if(!bill.isPresent()){
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        if (!productDetail.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        if (productDetail.get().getQuantity() < request.getQuantity()) {
            throw new RestApiException(Message.ERROR_QUANTITY);
        }
        productDetail.get().setQuantity( productDetail.get().getQuantity() - request.getQuantity());
        productDetailRepository.save(productDetail.get());


        BillDetail billDetail = new BillDetail();
        billDetail.setStatusBill(StatusBill.THANH_CONG);
        billDetail.setQuantity(request.getQuantity());
        billDetail.setPrice(productDetail.get().getPrice());
        billDetail.setProductDetail(productDetail.get());
        if(request.getPromotion() != null){
            billDetail.setPromotion(new BigDecimal(request.getPromotion()));
        }
        billDetail.setBill(bill.get());
        billDetailRepository.save(billDetail);
        List<BillDetailResponse> billDetailResponses = billDetailRepository.findAllByIdBill(new BillDetailRequest(request.getIdBill(), "THANH_CONG"));
        bill.get().setTotalMoney(
                billDetailResponses.stream()
                        .map(billDetailRequest -> {
                            return (billDetailRequest.getPromotion() == null)
                                    ? billDetailRequest.getPrice().multiply(new BigDecimal(billDetailRequest.getQuantity()))
                                    : new BigDecimal(billDetailRequest.getQuantity())
                                    .multiply(new BigDecimal(100 - billDetailRequest.getPromotion())
                                            .multiply(billDetailRequest.getPrice())
                                            .divide(new BigDecimal(100)));
                        })
                        .reduce(BigDecimal.ZERO, BigDecimal::add)
        );
        billRepository.save(bill.get());
        return billDetail.getId();
    }
    @Override
    public String update(String id, String idEmployees, CreateBillDetailRequest request) {
        Optional<Bill> bill = billRepository.findById(request.getIdBill());
        Optional<ProductDetail> productDetail = productDetailRepository.findById(request.getIdProduct());
        Optional<BillDetail> billDetail = billDetailRepository.findById(id);

        if(!bill.isPresent()){
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        if (!productDetail.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }

        if ((productDetail.get().getQuantity() + billDetail.get().getQuantity()) < request.getQuantity()) {
            throw new RestApiException(Message.ERROR_QUANTITY);
        }
        productDetail.get().setQuantity( (productDetail.get().getQuantity() + billDetail.get().getQuantity() ) - request.getQuantity());
        productDetailRepository.save(productDetail.get());

        billDetail.get().setPrice(productDetail.get().getPrice());
        billDetail.get().setQuantity(request.getQuantity());
        billDetail.get().setStatusBill(StatusBill.THANH_CONG);
        billDetailRepository.save(billDetail.get());
        List<BillDetailResponse> billDetailResponses = billDetailRepository.findAllByIdBill(new BillDetailRequest(request.getIdBill(), "THANH_CONG"));
        BigDecimal total =  billDetailResponses.stream()
                .map(billDetailRequest -> {
                    return (billDetailRequest.getPromotion() == null)
                            ? billDetailRequest.getPrice().multiply(new BigDecimal(billDetailRequest.getQuantity()))
                            : new BigDecimal(billDetailRequest.getQuantity())
                            .multiply(new BigDecimal(100 - billDetailRequest.getPromotion())
                                    .multiply(billDetailRequest.getPrice())
                                    .divide(new BigDecimal(100)));
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        bill.get().setTotalMoney(total);
        if(!request.getNote().isEmpty()){
            Optional<Account> account = accountRepository.findById(idEmployees);
            billHistoryRepository.save(BillHistory.builder().bill(bill.get()).actionDescription(request.getNote())
                    .employees(account.get()).build());
        }
        bill.get().setTotalMoney(total);
        billRepository.save(bill.get());
        List<String> findAllPaymentByIdBillAndMethod = paymentsMethodRepository.findAllPayMentByIdBillAndMethod(bill.get().getId());
        if(!findAllPaymentByIdBillAndMethod.isEmpty()){
            findAllPaymentByIdBillAndMethod.stream().forEach(item -> {
                Optional<PaymentsMethod> paymentsMethod = paymentsMethodRepository.findById(item);
                paymentsMethod.get().setTotalMoney(total.add(bill.get().getMoneyShip()).multiply(bill.get().getItemDiscount()));
                paymentsMethodRepository.save(paymentsMethod.get());
            });
        }
        
        billRepository.save(bill.get());
        return billDetail.get().getId();
    }

    @Override
    public boolean delete(String id, String productDetail, String note, String idEmployees) {
        Optional<BillDetail> billDetail = billDetailRepository.findById(id);
        if (!billDetail.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        Optional<ProductDetail> optional = productDetailRepository.findById(productDetail);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        Bill bill = billDetail.get().getBill();
        bill.setTotalMoney(bill.getTotalMoney().subtract(billDetail.get().getPrice()));
        billRepository.save(bill);

        optional.get().setQuantity(billDetail.get().getQuantity() + optional.get().getQuantity());
        productDetailRepository.save(optional.get());
        billDetailRepository.deleteById(id);
        List<BillDetailResponse> billDetailResponses = billDetailRepository.findAllByIdBill(new BillDetailRequest(billDetail.get().getBill().getId(), "THANH_CONG"));
        BigDecimal total =  billDetailResponses.stream()
                .map(billDetailRequest -> {
                    return (billDetailRequest.getPromotion() == null)
                            ? billDetailRequest.getPrice().multiply(new BigDecimal(billDetailRequest.getQuantity()))
                            : new BigDecimal(billDetailRequest.getQuantity())
                            .multiply(new BigDecimal(100 - billDetailRequest.getPromotion())
                                    .multiply(billDetailRequest.getPrice())
                                    .divide(new BigDecimal(100)));
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        bill.get().setTotalMoney(total);
        billRepository.save(bill.get());
        List<String> findAllPaymentByIdBillAndMethod = paymentsMethodRepository.findAllPayMentByIdBillAndMethod(bill.get().getId());
        if(!findAllPaymentByIdBillAndMethod.isEmpty()){
            findAllPaymentByIdBillAndMethod.stream().forEach(item -> {
                Optional<PaymentsMethod> paymentsMethod = paymentsMethodRepository.findById(item);
                paymentsMethod.get().setTotalMoney(total.add(bill.get().getMoneyShip()).multiply(bill.get().getItemDiscount()));
                paymentsMethodRepository.save(paymentsMethod.get());
            });
        }
        if(!note.isEmpty()){
            Optional<Account> account = accountRepository.findById(idEmployees);
            billHistoryRepository.save(BillHistory.builder().bill(bill).actionDescription(note)
                    .employees(account.get()).build());
        }
        billRepository.save(bill);
        return true;
    }

}
