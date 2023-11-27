package com.example.shose.server.service.impl;


import com.example.shose.server.dto.request.bill.BillRequest;
import com.example.shose.server.dto.request.bill.ChangAllStatusBillByIdsRequest;
import com.example.shose.server.dto.request.bill.ChangStatusBillRequest;
import com.example.shose.server.dto.request.bill.ChangeAllEmployeeRequest;
import com.example.shose.server.dto.request.bill.ChangeEmployeeRequest;
import com.example.shose.server.dto.request.bill.CreateBillOfflineRequest;
import com.example.shose.server.dto.request.bill.CreateBillRequest;
import com.example.shose.server.dto.request.bill.FindNewBillCreateAtCounterRequest;
import com.example.shose.server.dto.request.bill.StatusRequest;
import com.example.shose.server.dto.request.bill.UpdateBillRequest;
import com.example.shose.server.dto.request.bill.billaccount.CreateBillAccountOnlineRequest;
import com.example.shose.server.dto.request.bill.billcustomer.BillDetailOnline;
import com.example.shose.server.dto.request.bill.billcustomer.CreateBillCustomerOnlineRequest;
import com.example.shose.server.dto.response.bill.BillAccountResponse;
import com.example.shose.server.dto.request.billdetail.BillDetailRequest;
import com.example.shose.server.dto.request.billgiveback.UpdateBillDetailGiveBack;
import com.example.shose.server.dto.request.billgiveback.UpdateBillGiveBack;
import com.example.shose.server.dto.response.bill.BillGiveBack;
import com.example.shose.server.dto.response.bill.BillGiveBackInformation;
import com.example.shose.server.dto.response.bill.BillResponse;
import com.example.shose.server.dto.response.bill.BillResponseAtCounter;
import com.example.shose.server.dto.response.bill.InvoiceResponse;
import com.example.shose.server.dto.response.bill.UserBillResponse;
import com.example.shose.server.dto.response.billdetail.BillDetailResponse;
import com.example.shose.server.entity.Notification;
import com.example.shose.server.infrastructure.cloudinary.QRCodeAndCloudinary;
import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.BillDetail;
import com.example.shose.server.entity.BillHistory;
import com.example.shose.server.entity.Cart;
import com.example.shose.server.entity.CartDetail;
import com.example.shose.server.entity.PaymentsMethod;
import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.entity.ProductDetailGiveBack;
import com.example.shose.server.entity.User;
import com.example.shose.server.entity.Voucher;
import com.example.shose.server.entity.VoucherDetail;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Roles;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.constant.StatusBill;
import com.example.shose.server.infrastructure.constant.StatusMethod;
import com.example.shose.server.infrastructure.constant.StatusPayMents;
import com.example.shose.server.infrastructure.constant.TypeBill;
import com.example.shose.server.infrastructure.email.SendEmailService;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.infrastructure.exportPdf.ExportFilePdfFormHtml;
import com.example.shose.server.infrastructure.session.ShoseSession;
import com.example.shose.server.infrastructure.poin.ConfigPoin;
import com.example.shose.server.infrastructure.poin.Poin;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.repository.BillDetailRepository;
import com.example.shose.server.repository.BillHistoryRepository;
import com.example.shose.server.repository.BillRepository;
import com.example.shose.server.repository.CartDetailRepository;
import com.example.shose.server.repository.CartRepository;
import com.example.shose.server.repository.NotificationRepository;
import com.example.shose.server.repository.PaymentsMethodRepository;
import com.example.shose.server.repository.ProductDetailGiveBackRepository;
import com.example.shose.server.repository.ProductDetailRepository;
import com.example.shose.server.repository.UserReposiory;
import com.example.shose.server.repository.VoucherDetailRepository;
import com.example.shose.server.repository.VoucherRepository;
import com.example.shose.server.service.BillService;
import com.example.shose.server.service.PaymentsMethodService;
import com.example.shose.server.util.ConvertDateToLong;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;


/**
 * @author thangdt
 */

@Service
@Transactional
public class BillServiceImpl implements BillService {

    @Autowired
    private ConfigPoin configPoin;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private SendEmailService sendEmailService;

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
    private UserReposiory userReposiory;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Autowired
    private SpringTemplateEngine springTemplateEngine;

    @Autowired
    private ExportFilePdfFormHtml exportFilePdfFormHtml;

    @Autowired
    private PaymentsMethodService paymentsMethodService;
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private ShoseSession shoseSession;

    @Autowired
    private ProductDetailGiveBackRepository productDetailGiveBackRepository;

    @Autowired
    private QRCodeAndCloudinary qrCodeAndCloudinary;


    @Override
    public List<BillResponse> getAll(String id, BillRequest request) {
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
        Optional<Account> user = accountRepository.findById(id);
        return billRepository.getAll(id, user.get().getRoles().name(), request);
    }

    @Override
    public List<BillAccountResponse> getAllBillAccount(StatusRequest request) {
        return billRepository.getBillAccount(request);

    }

    @Override
    public List<UserBillResponse> getAllUserInBill() {

        Map<String, UserBillResponse> list = new HashMap<>();
        billRepository.getAllUserInBill().forEach(item -> {
            list.put(item.getUserName(), item);
        });
        List<UserBillResponse> users = new ArrayList<>(list.values());
        return users;
    }

    @Override
    public List<BillResponseAtCounter> findAllBillAtCounterAndStatusNewBill(String id, FindNewBillCreateAtCounterRequest request) {
        return billRepository.findAllBillAtCounterAndStatusNewBill(id, request);
    }

    @Override
    public Bill save(String id, CreateBillOfflineRequest request) {
        Optional<Bill> optional = billRepository.findByCode(request.getCode());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        optional.get().setNote(request.getNote());
        optional.get().setUserName(request.getUserName());
        optional.get().setAddress(request.getAddress());
        optional.get().setPhoneNumber(request.getPhoneNumber());
        optional.get().setEmail(request.getEmail());
        optional.get().setItemDiscount(new BigDecimal(request.getItemDiscount()));
        optional.get().setTotalMoney(new BigDecimal(request.getTotalMoney()));
        optional.get().setMoneyShip(new BigDecimal(request.getMoneyShip()));
        optional.get().setLastModifiedDate(Calendar.getInstance().getTimeInMillis());
        optional.get().setPoinUse(request.getPoin());

        List<BillDetailResponse> billDetailResponse = billDetailRepository.findAllByIdBill(new BillDetailRequest(optional.get().getId(), "THANH_CONG"));
        billDetailResponse.forEach(item -> {
            Optional<ProductDetail> productDetail = productDetailRepository.findById(item.getIdProduct());
            if (!productDetail.isPresent()) {
                throw new RestApiException(Message.NOT_EXISTS);
            }

            productDetail.get().setQuantity(item.getQuantity() + productDetail.get().getQuantity());
            if (productDetail.get().getStatus() == Status.HET_SAN_PHAM) {
                productDetail.get().setStatus(Status.DANG_SU_DUNG);
            }
            productDetailRepository.save(productDetail.get());
        });
        voucherDetailRepository.findAllByBill(optional.get()).forEach(item -> {
            Optional<Voucher> voucher = voucherRepository.findById(item.getVoucher().getId());
            voucher.get().setQuantity(voucher.get().getQuantity() + 1);
            voucherRepository.save(voucher.get());
        });
        billHistoryRepository.deleteAllByIdBill(optional.get().getId());
        billDetailRepository.deleteAllByIdBill(optional.get().getId());
        paymentsMethodRepository.deleteAllByIdBill(optional.get().getId());
        voucherDetailRepository.deleteAllByIdBill(optional.get().getId());


        if (!request.getDeliveryDate().isEmpty()) {
            optional.get().setDeliveryDate(new ConvertDateToLong().dateToLong(request.getDeliveryDate()));
        }
        if (TypeBill.valueOf(request.getTypeBill()) != TypeBill.OFFLINE || !request.isOpenDelivery()) {
            if (request.getIdUser() != null) {
                Optional<Account> account = accountRepository.findById(request.getIdUser());
                if (account.isPresent()) {
                    optional.get().setAccount(account.get());
                    User user = account.get().getUser();
                    Poin poin = configPoin.readJsonFile();
                    if (request.getPoin() > 0) {
                        int Pointotal = user.getPoints() - request.getPoin() + poin.ConvertMoneyToPoints(new BigDecimal(request.getTotalMoney()));
                        user.setPoints(Pointotal);
                    } else {
                        user.setPoints(user.getPoints() + poin.ConvertMoneyToPoints(new BigDecimal(request.getTotalMoney())));
                    }
                    userReposiory.save(user);
                }
            }
            optional.get().setStatusBill(StatusBill.THANH_CONG);
            optional.get().setCompletionDate(Calendar.getInstance().getTimeInMillis());
            billRepository.save(optional.get());
            billHistoryRepository.save(BillHistory.builder().statusBill(optional.get().getStatusBill()).bill(optional.get()).employees(optional.get().getEmployees()).build());
        } else {
            if (request.getIdUser() != null) {
                Optional<Account> account = accountRepository.findById(request.getIdUser());
                if (account.isPresent()) {
                    optional.get().setAccount(account.get());
                    User user = account.get().getUser();
                    Poin poin = configPoin.readJsonFile();
                    if (request.getPoin() > 0) {
                        int Pointotal = user.getPoints() - request.getPoin();
                        user.setPoints(Pointotal);
                    }
                    userReposiory.save(user);
                }
            }
            optional.get().setStatusBill(StatusBill.XAC_NHAN);
            optional.get().setCompletionDate(Calendar.getInstance().getTimeInMillis());
            billRepository.save(optional.get());
            billHistoryRepository.save(BillHistory.builder().statusBill(StatusBill.XAC_NHAN).bill(optional.get()).employees(optional.get().getEmployees()).build());
            }

        request.getPaymentsMethodRequests().forEach(item -> {
            if (item.getMethod() != StatusMethod.CHUYEN_KHOAN && item.getTotalMoney() != null) {
                if (item.getTotalMoney().signum() != 0) {
                    PaymentsMethod paymentsMethod = PaymentsMethod.builder()
                            .method(item.getMethod())
                            .status(StatusPayMents.valueOf(request.getStatusPayMents()))
                            .employees(optional.get().getEmployees())
                            .totalMoney(item.getTotalMoney())
                            .description(item.getActionDescription())
                            .bill(optional.get())
                            .build();
                    paymentsMethodRepository.save(paymentsMethod);
                }
            }
        });

        request.getBillDetailRequests().forEach(billDetailRequest -> {
            Optional<ProductDetail> productDetail = productDetailRepository.findById(billDetailRequest.getIdProduct());
            if (!productDetail.isPresent()) {
                throw new RestApiException(Message.NOT_EXISTS);
            }
            if (productDetail.get().getQuantity() < billDetailRequest.getQuantity()) {
                throw new RestApiException(Message.ERROR_QUANTITY);
            }
            if (productDetail.get().getStatus() != Status.DANG_SU_DUNG) {
                throw new RestApiException(Message.NOT_PAYMENT_PRODUCT);
            }
            BillDetail billDetail = BillDetail.builder().statusBill(StatusBill.THANH_CONG).bill(optional.get()).productDetail(productDetail.get()).price(new BigDecimal(billDetailRequest.getPrice())).quantity(billDetailRequest.getQuantity()).build();
            if (billDetailRequest.getPromotion() != null) {
                billDetail.setPromotion(new BigDecimal(billDetailRequest.getPromotion()));
            }
            billDetailRepository.save(billDetail);
            productDetail.get().setQuantity(productDetail.get().getQuantity() - billDetailRequest.getQuantity());
            if (productDetail.get().getQuantity() == 0) {
                productDetail.get().setStatus(Status.HET_SAN_PHAM);
            }
            productDetailRepository.save(productDetail.get());
        });
        request.getVouchers().forEach(voucher -> {
            Optional<Voucher> Voucher = voucherRepository.findById(voucher.getIdVoucher());
            if (!Voucher.isPresent()) {
                throw new RestApiException(Message.NOT_EXISTS);
            }
            if (Voucher.get().getQuantity() <= 0 && Voucher.get().getEndDate() < Calendar.getInstance().getTimeInMillis()) {
                throw new RestApiException(Message.VOUCHER_NOT_USE);
            }
            Voucher.get().setQuantity(Voucher.get().getQuantity() - 1);
            voucherRepository.save(Voucher.get());

            VoucherDetail voucherDetail = VoucherDetail.builder().voucher(Voucher.get()).bill(optional.get()).afterPrice(new BigDecimal(voucher.getAfterPrice())).beforPrice(new BigDecimal(voucher.getBeforPrice())).discountPrice(new BigDecimal(voucher.getDiscountPrice())).build();
            voucherDetailRepository.save(voucherDetail);
        });
        CompletableFuture.runAsync(() -> createFilePdfAtCounter(optional.get().getId()), Executors.newCachedThreadPool());
        return optional.get();
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
    public Bill CreateCodeBill(String idEmployees) {
        Optional<Account> account = accountRepository.findById(idEmployees);
        String codeBill = "HD" + RandomStringUtils.randomNumeric(6);
        Bill bill = Bill.builder()
                .employees(account.get())
                .typeBill(TypeBill.OFFLINE)
                .statusBill(StatusBill.TAO_HOA_DON)
                .userName("")
                .note("")
                .address("")
                .phoneNumber("")
                .email("")
                .code(codeBill)
                .itemDiscount(new BigDecimal("0"))
                .totalMoney(new BigDecimal("0"))
                .moneyShip(new BigDecimal("0")).build();
        billRepository.save(bill);
        billHistoryRepository.save(BillHistory.builder().statusBill(bill.getStatusBill()).bill(bill).employees(bill.getEmployees()).build());
        return bill;
    }

    @Override
    public boolean updateBillWait(CreateBillOfflineRequest request) {
        try {
            Optional<Bill> optional = billRepository.findByCode(request.getCode());
            if (!optional.isPresent()) {
                throw new RestApiException(Message.NOT_EXISTS);
            }
            optional.get().setNote(request.getNote());
            optional.get().setUserName(request.getUserName());
            optional.get().setAddress(request.getAddress());
            optional.get().setPhoneNumber(request.getPhoneNumber());
            optional.get().setEmail(request.getEmail());
            optional.get().setItemDiscount(new BigDecimal(request.getItemDiscount()));
            optional.get().setTotalMoney(new BigDecimal(request.getTotalMoney()));
            optional.get().setMoneyShip(new BigDecimal(request.getMoneyShip()));
            optional.get().setLastModifiedDate(Calendar.getInstance().getTimeInMillis());
            optional.get().setPoinUse(request.getPoin());
            billRepository.save(optional.get());

            List<BillDetailResponse> billDetailResponse = billDetailRepository.findAllByIdBill(new BillDetailRequest(optional.get().getId(), "THANH_CONG"));
            billDetailResponse.forEach(item -> {
                Optional<ProductDetail> productDetail = productDetailRepository.findById(item.getIdProduct());
                if (!productDetail.isPresent()) {
                    throw new RestApiException(Message.NOT_EXISTS);
                }
                productDetail.get().setQuantity(item.getQuantity() + productDetail.get().getQuantity());
                if (productDetail.get().getStatus() == Status.HET_SAN_PHAM) {
                    productDetail.get().setStatus(Status.DANG_SU_DUNG);
                }
                productDetailRepository.save(productDetail.get());
            });
            voucherDetailRepository.findAllByBill(optional.get()).forEach(item -> {
                Optional<Voucher> voucher = voucherRepository.findById(item.getVoucher().getId());
                voucher.get().setQuantity(voucher.get().getQuantity() + 1);
                voucherRepository.save(voucher.get());
            });
            billHistoryRepository.deleteAllByIdBill(optional.get().getId());
            billDetailRepository.deleteAllByIdBill(optional.get().getId());
            paymentsMethodRepository.deleteAllByIdBill(optional.get().getId());
            voucherDetailRepository.deleteAllByIdBill(optional.get().getId());


            if (request.getIdUser() != null) {
                Optional<Account> user = accountRepository.findById(request.getIdUser());

                if (user.isPresent()) {
                    optional.get().setAccount(user.get());
                }
            }
            if (!request.getDeliveryDate().isEmpty()) {
                optional.get().setDeliveryDate(new ConvertDateToLong().dateToLong(request.getDeliveryDate()));
            }
            if (TypeBill.valueOf(request.getTypeBill()) != TypeBill.OFFLINE || !request.isOpenDelivery()) {
                billHistoryRepository.save(BillHistory.builder().statusBill(StatusBill.THANH_CONG).bill(optional.get()).employees(optional.get().getEmployees()).build());
            } else {
                billHistoryRepository.save(BillHistory.builder().statusBill(StatusBill.XAC_NHAN).bill(optional.get()).employees(optional.get().getEmployees()).build());
                billHistoryRepository.save(BillHistory.builder().statusBill(StatusBill.CHO_VAN_CHUYEN).bill(optional.get()).employees(optional.get().getEmployees()).build());
            }
            optional.get().setStatusBill(StatusBill.TAO_HOA_DON);
            billRepository.save(optional.get());

            request.getBillDetailRequests().forEach(billDetailRequest -> {
                Optional<ProductDetail> productDetail = productDetailRepository.findById(billDetailRequest.getIdProduct());
                if (!productDetail.isPresent()) {
                    throw new RestApiException(Message.NOT_EXISTS);
                }
                if (productDetail.get().getQuantity() < billDetailRequest.getQuantity()) {
                    throw new RestApiException(Message.ERROR_QUANTITY);
                }
                if (productDetail.get().getStatus() != Status.DANG_SU_DUNG) {
                    throw new RestApiException(Message.NOT_PAYMENT_PRODUCT);
                }
                BillDetail billDetail = BillDetail.builder().statusBill(StatusBill.THANH_CONG).bill(optional.get()).productDetail(productDetail.get()).price(new BigDecimal(billDetailRequest.getPrice())).quantity(billDetailRequest.getQuantity()).build();
                if (billDetailRequest.getPromotion() != null) {
                    billDetail.setPromotion(new BigDecimal(billDetailRequest.getPromotion()));
                }
                billDetailRepository.save(billDetail);
                productDetail.get().setQuantity(productDetail.get().getQuantity() - billDetailRequest.getQuantity());
                if (productDetail.get().getQuantity() == 0) {
                    productDetail.get().setStatus(Status.HET_SAN_PHAM);
                }
                productDetailRepository.save(productDetail.get());
            });
            request.getVouchers().forEach(voucher -> {
                Optional<Voucher> Voucher = voucherRepository.findById(voucher.getIdVoucher());
                if (!Voucher.isPresent()) {
                    throw new RestApiException(Message.NOT_EXISTS);
                }
                if (Voucher.get().getQuantity() <= 0 && Voucher.get().getEndDate() < Calendar.getInstance().getTimeInMillis()) {
                    throw new RestApiException(Message.VOUCHER_NOT_USE);
                }
                Voucher.get().setQuantity(Voucher.get().getQuantity() - 1);
                voucherRepository.save(Voucher.get());

                VoucherDetail voucherDetail = VoucherDetail.builder().voucher(Voucher.get()).bill(optional.get()).afterPrice(new BigDecimal(voucher.getAfterPrice())).beforPrice(new BigDecimal(voucher.getBeforPrice())).discountPrice(new BigDecimal(voucher.getDiscountPrice())).build();
                voucherDetailRepository.save(voucherDetail);
            });

            request.getPaymentsMethodRequests().forEach(item -> {
                if (item.getMethod() != StatusMethod.CHUYEN_KHOAN && item.getTotalMoney() != null) {
                    if (item.getTotalMoney().signum() != 0) {
                        PaymentsMethod paymentsMethod = PaymentsMethod.builder()
                                .method(item.getMethod())
                                .status(StatusPayMents.valueOf(request.getStatusPayMents()))
                                .employees(optional.get().getEmployees())
                                .totalMoney(item.getTotalMoney())
                                .description(item.getActionDescription())
                                .bill(optional.get())
                                .build();
                        paymentsMethodRepository.save(paymentsMethod);
                    }
                }
            });
        } catch (Exception e) {
            throw new RestApiException(Message.ERROR_SQL);
        }

        return true;
    }

    @Override
    public Bill updateBillOffline(String id, UpdateBillRequest request) {
        Optional<Bill> updateBill = billRepository.findById(id);
        if (!updateBill.isPresent()) {
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        updateBill.get().setMoneyShip(new BigDecimal(request.getMoneyShip()));
        updateBill.get().setAddress(request.getAddress().trim());
        updateBill.get().setUserName(request.getName().trim());
        updateBill.get().setPhoneNumber(request.getPhoneNumber().trim());
        updateBill.get().setNote(request.getNote().trim());
        updateBill.get().setLastModifiedDate(Calendar.getInstance().getTimeInMillis());
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
    public Bill changedStatusbill(String id, String idEmployees, ChangStatusBillRequest request) {
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
        if (nextIndex > 6) {
            throw new RestApiException(Message.CHANGED_STATUS_ERROR);
        }
        if (bill.get().getStatusBill() == StatusBill.CHO_XAC_NHAN) {
            bill.get().setConfirmationDate(Calendar.getInstance().getTimeInMillis());
        } else if (bill.get().getStatusBill() == StatusBill.CHO_VAN_CHUYEN) {
            createFilePdf(bill.get().getId());
        } else if (bill.get().getStatusBill() == StatusBill.VAN_CHUYEN) {
            bill.get().setDeliveryDate(Calendar.getInstance().getTimeInMillis());
        } else if (bill.get().getStatusBill() == StatusBill.DA_THANH_TOAN) {
            bill.get().setReceiveDate(Calendar.getInstance().getTimeInMillis());
        } else if (bill.get().getStatusBill() == StatusBill.THANH_CONG) {
            paymentsMethodRepository.updateAllByIdBill(id);
            bill.get().setCompletionDate(Calendar.getInstance().getTimeInMillis());
            if (bill.get().getAccount() != null) {
                User user = bill.get().getAccount().getUser();
                Poin poin = configPoin.readJsonFile();
                user.setPoints(user.getPoints() + poin.ConvertMoneyToPoints(bill.get().getTotalMoney()));
                userReposiory.save(user);
            }
        }
        bill.get().setLastModifiedDate(Calendar.getInstance().getTimeInMillis());
        bill.get().setEmployees(account.get());
        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill.get());
        billHistory.setStatusBill(StatusBill.valueOf(statusBill[nextIndex].name()));
        billHistory.setActionDescription(request.getActionDescription());
        billHistory.setEmployees(account.get());
        billHistoryRepository.save(billHistory);

        return billRepository.save(bill.get());
    }

    @Override
    public int countPayMentPostpaidByIdBill(String id) {
        return paymentsMethodRepository.countPayMentPostpaidByIdBill(id);
    }

    @Override
    public boolean changeStatusAllBillByIds(ChangAllStatusBillByIdsRequest request, String idEmployees) {
        request.getIds().forEach(id -> {
            Optional<Bill> bill = billRepository.findById(id);
            Optional<Account> account = accountRepository.findById(idEmployees);
            if (!bill.isPresent()) {
                throw new RestApiException(Message.BILL_NOT_EXIT);
            }
            if (!account.isPresent()) {
                throw new RestApiException(Message.NOT_EXISTS);
            }
            bill.get().setStatusBill(StatusBill.valueOf(request.getStatus()));
            if (bill.get().getStatusBill() == StatusBill.XAC_NHAN) {
                bill.get().setConfirmationDate(Calendar.getInstance().getTimeInMillis());
                createFilePdf(id);
            } else if (bill.get().getStatusBill() == StatusBill.VAN_CHUYEN) {
                createFilePdf(id);
                bill.get().setDeliveryDate(Calendar.getInstance().getTimeInMillis());
            } else if (bill.get().getStatusBill() == StatusBill.DA_THANH_TOAN) {
                bill.get().setReceiveDate(Calendar.getInstance().getTimeInMillis());
            } else if (bill.get().getStatusBill() == StatusBill.THANH_CONG) {
                paymentsMethodRepository.updateAllByIdBill(id);
                bill.get().setCompletionDate(Calendar.getInstance().getTimeInMillis());
                if (bill.get().getAccount() != null) {
                    User user = bill.get().getAccount().getUser();
                    Poin poin = configPoin.readJsonFile();
                    user.setPoints(user.getPoints() + poin.ConvertMoneyToPoints(bill.get().getTotalMoney()));
                    userReposiory.save(user);
                }
            }
            bill.get().setLastModifiedDate(Calendar.getInstance().getTimeInMillis());
            bill.get().setEmployees(account.get());
            BillHistory billHistory = new BillHistory();
            billHistory.setBill(bill.get());
            billHistory.setStatusBill(StatusBill.valueOf(request.getStatus()));
            billHistory.setEmployees(account.get());
            billHistoryRepository.save(billHistory);
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
            throw new RestApiException(Message.ACCOUNT_IS_EXIT);
        }
        if (account.get().getRoles() != Roles.ROLE_ADMIN && !bill.get().getEmployees().getId().equals(idEmployees)) {
            throw new RestApiException(Message.ACCOUNT_NOT_ROLE_CANCEL_BILL);
        }
        if (bill.get().getStatusBill() == StatusBill.VAN_CHUYEN && account.get().getRoles() != Roles.ROLE_ADMIN) {
            throw new RestApiException(Message.ACCOUNT_NOT_ROLE_CANCEL_BILL);
        }
        bill.get().setLastModifiedDate(Calendar.getInstance().getTimeInMillis());
        bill.get().setStatusBill(StatusBill.DA_HUY);
        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill.get());
        billHistory.setStatusBill(bill.get().getStatusBill());
        billHistory.setActionDescription(request.getActionDescription());
        billHistory.setEmployees(account.get());
        billHistoryRepository.save(billHistory);
        List<BillDetailResponse> billDetailResponse = billDetailRepository.findAllByIdBill(new BillDetailRequest(bill.get().getId(), "THANH_CONG"));
        billDetailResponse.forEach(item -> {
            Optional<ProductDetail> productDetail = productDetailRepository.findById(item.getIdProduct());
            if (!productDetail.isPresent()) {
                throw new RestApiException(Message.NOT_EXISTS);
            }
            productDetail.get().setQuantity(item.getQuantity() + productDetail.get().getQuantity());
            if (productDetail.get().getStatus() == Status.HET_SAN_PHAM) {
                productDetail.get().setStatus(Status.DANG_SU_DUNG);
            }
            productDetailRepository.save(productDetail.get());
        });
        Account checkAccount = bill.get().getAccount();
        if (checkAccount != null) {
            if (bill.get().getPoinUse() > 0) {
                User user = checkAccount.getUser();
                user.setPoints(user.getPoints() + bill.get().getPoinUse());
                userReposiory.save(user);
            }
        }

        return billRepository.save(bill.get());
    }

    @Override

    public Bill createBillCustomerOnlineRequest(CreateBillCustomerOnlineRequest request) {
        if (request.getPaymentMethod().equals("paymentReceive")) {
            for (BillDetailOnline x : request.getBillDetail()) {
                Optional<ProductDetail> optional = productDetailRepository.findById(x.getIdProductDetail());
                if (!optional.isPresent()) {
                    throw new RestApiException("Sản phẩm không tồn tại");
                }

                ProductDetail productDetail = optional.get();
                if (productDetail.getQuantity() < x.getQuantity()) {
                    throw new RestApiException(Message.ERROR_QUANTITY);
                }
                if (productDetail.getStatus() != Status.DANG_SU_DUNG) {
                    throw new RestApiException(Message.NOT_PAYMENT_PRODUCT);
                }
                productDetail.setQuantity(productDetail.getQuantity() - x.getQuantity());
                if (productDetail.getQuantity() == 0) {
                    productDetail.setStatus(Status.HET_SAN_PHAM);
                }
                productDetailRepository.save(productDetail);

            }
        }
        String codeBill = "HD" + RandomStringUtils.randomNumeric(6);
        Bill bill = Bill.builder()
                .code(codeBill)
                .shippingTime(request.getShippingTime())
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress() + ',' + request.getWard() + '-' + request.getDistrict() + '-' + request.getProvince())
                .userName(request.getUserName())
                .moneyShip(request.getMoneyShip())
                .itemDiscount(request.getItemDiscount())
                .totalMoney(request.getTotalMoney())
                .typeBill(TypeBill.ONLINE)
                .email(request.getEmail())
                .statusBill(StatusBill.CHO_XAC_NHAN).build();
        if (!request.getPaymentMethod().equals("paymentReceive")) {
            bill.setCode(request.getResponsePayment().getVnp_TxnRef().split("-")[0]);
        }
        billRepository.save(bill);
        BillHistory billHistory = BillHistory.builder()
                .bill(bill)
                .statusBill(request.getPaymentMethod().equals("paymentReceive") ? StatusBill.CHO_XAC_NHAN : StatusBill.DA_THANH_TOAN)
                .actionDescription(request.getPaymentMethod().equals("paymentReceive") ? "Chưa thanh toán" : "Đã thanh toán").build();
        billHistoryRepository.save(billHistory);
        for (BillDetailOnline x : request.getBillDetail()) {
            Optional<ProductDetail> optional = productDetailRepository.findById(x.getIdProductDetail());
            if (!optional.isPresent()) {
                throw new RestApiException("Sản phẩm không tồn tại");
            }

            ProductDetail productDetail = optional.get();
            BillDetail billDetail = BillDetail.builder()
                    .statusBill(StatusBill.THANH_CONG)
                    .productDetail(productDetail)
                    .price(x.getPrice())
                    .quantity(x.getQuantity())
                    .promotion(x.getValuePromotion())
                    .bill(bill).build();
            billDetailRepository.save(billDetail);

        }
        PaymentsMethod paymentsMethod = PaymentsMethod.builder()
                .method(request.getPaymentMethod().equals("paymentReceive") ? StatusMethod.TIEN_MAT : StatusMethod.CHUYEN_KHOAN)
                .bill(bill)
                .totalMoney(request.getTotalMoney().add(request.getMoneyShip()).subtract(request.getItemDiscount()))
                .status(request.getPaymentMethod().equals("paymentReceive") ? StatusPayMents.TRA_SAU : StatusPayMents.DA_THANH_TOAN).build();

        if (!request.getPaymentMethod().equals("paymentReceive")) {
            paymentsMethod.setVnp_TransactionNo(request.getResponsePayment().getVnp_TransactionNo());
            paymentsMethod.setCreateAt(Long.parseLong(request.getResponsePayment().getVnp_TxnRef().split("-")[1]));
            paymentsMethod.setTransactionDate(Long.parseLong(request.getResponsePayment().getVnp_PayDate()));
            paymentsMethod.setStatus(StatusPayMents.THANH_TOAN);
        }
        paymentsMethodRepository.save(paymentsMethod);

        if (!request.getIdVoucher().isEmpty()) {
            Optional<Voucher> optional = voucherRepository.findById(request.getIdVoucher());
            if (!optional.isPresent()) {
                throw new RestApiException("Khuyến mãi không tồn tại");
            }
            Voucher voucher = optional.get();
            VoucherDetail voucherDetail = VoucherDetail.builder()
                    .voucher(voucher)
                    .bill(bill)
                    .beforPrice(request.getTotalMoney())
                    .afterPrice(request.getAfterPrice())
                    .discountPrice(request.getItemDiscount())
                    .build();
            voucherDetailRepository.save(voucherDetail);
        }

        CompletableFuture.runAsync(() -> sendMailOnline(bill.getId()), Executors.newCachedThreadPool());
        Notification notification = Notification.builder()
                .receiver("admin")
                .notifyContent("Vừa mua đơn hàng")
                .status(Status.CHUA_DOC)
                .bill(bill).build();
        notificationRepository.save(notification);
        return bill;
    }

    @Override

    public Bill createBillAccountOnlineRequest(CreateBillAccountOnlineRequest request) {
        if (request.getPaymentMethod().equals("paymentReceive")) {
            for (BillDetailOnline x : request.getBillDetail()) {
                Optional<ProductDetail> optional = productDetailRepository.findById(x.getIdProductDetail());
                if (!optional.isPresent()) {
                    throw new RestApiException("Sản phẩm không tồn tại");
                }

                ProductDetail productDetail = optional.get();
                if (productDetail.getStatus() != Status.DANG_SU_DUNG) {
                    throw new RestApiException(Message.NOT_PAYMENT_PRODUCT);
                }
                if (productDetail.getQuantity() < x.getQuantity()) {
                    throw new RestApiException(Message.ERROR_QUANTITY);
                }
                productDetail.setQuantity(productDetail.getQuantity() - x.getQuantity());
                if (productDetail.getQuantity() == 0) {
                    productDetail.setStatus(Status.HET_SAN_PHAM);
                }
                productDetailRepository.save(productDetail);

            }
        }

        Account account = accountRepository.findById(request.getIdAccount()).get();
        if (request.getPoin() > 0) {
            User user = account.getUser();
            user.setPoints(user.getPoints() - request.getPoin());
            userReposiory.save(user);
        }
        String codeBill = "HD" + RandomStringUtils.randomNumeric(6);
        Bill bill = Bill.builder()
                .code(codeBill)
                .phoneNumber(request.getPhoneNumber())
                .shippingTime(request.getShippingTime())
                .address(request.getAddress())
                .userName(request.getUserName())
                .moneyShip(request.getMoneyShip())
                .itemDiscount(request.getItemDiscount())
                .totalMoney(request.getTotalMoney())
                .typeBill(TypeBill.ONLINE)
                .email(account.getEmail())
                .statusBill(StatusBill.CHO_XAC_NHAN)
                .poinUse(request.getPoin())
                .account(account).build();
        if (!request.getPaymentMethod().equals("paymentReceive")) {
            bill.setCode(request.getResponsePayment().getVnp_TxnRef().split("-")[0]);
        }
        billRepository.save(bill);
        BillHistory billHistory = BillHistory.builder()
                .bill(bill)
                .statusBill(request.getPaymentMethod().equals("paymentReceive") ? StatusBill.CHO_XAC_NHAN : StatusBill.DA_THANH_TOAN)
                .actionDescription(request.getPaymentMethod().equals("paymentReceive") ? "Chưa thanh toán" : "Đã thanh toán").build();
        billHistoryRepository.save(billHistory);

        for (BillDetailOnline x : request.getBillDetail()) {
            Optional<ProductDetail> optional = productDetailRepository.findById(x.getIdProductDetail());
            if (!optional.isPresent()) {
                throw new RestApiException("Sản phẩm không tồn tại");
            }

            ProductDetail productDetail = optional.get();
            BillDetail billDetail = BillDetail.builder()
                    .statusBill(StatusBill.THANH_CONG)
                    .productDetail(productDetail)
                    .price(x.getPrice())
                    .quantity(x.getQuantity())
                    .promotion(x.getValuePromotion())
                    .bill(bill).build();
            billDetailRepository.save(billDetail);

        }
        PaymentsMethod paymentsMethod = PaymentsMethod.builder()
                .method(request.getPaymentMethod().equals("paymentReceive") ? StatusMethod.TIEN_MAT : StatusMethod.CHUYEN_KHOAN)
                .bill(bill)
                .totalMoney(request.getTotalMoney().add(request.getMoneyShip()).subtract(request.getItemDiscount()))
                .status(request.getPaymentMethod().equals("paymentReceive") ? StatusPayMents.TRA_SAU : StatusPayMents.DA_THANH_TOAN).build();
        if (!request.getPaymentMethod().equals("paymentReceive")) {
            paymentsMethod.setVnp_TransactionNo(request.getResponsePayment().getVnp_TransactionNo());
            paymentsMethod.setCreateAt(Long.parseLong(request.getResponsePayment().getVnp_TxnRef().split("-")[1]));
            paymentsMethod.setTransactionDate(Long.parseLong(request.getResponsePayment().getVnp_PayDate()));
            paymentsMethod.setStatus(StatusPayMents.THANH_TOAN);
        }
        paymentsMethodRepository.save(paymentsMethod);

        if (!request.getIdVoucher().isEmpty()) {
            Optional<Voucher> optional = voucherRepository.findById(request.getIdVoucher());
            if (!optional.isPresent()) {
                throw new RestApiException("Khuyến mãi không tồn tại");
            }
            Voucher voucher = optional.get();

            VoucherDetail voucherDetail = VoucherDetail.builder()
                    .voucher(voucher)
                    .bill(bill)
                    .beforPrice(request.getTotalMoney())
                    .afterPrice(request.getAfterPrice())
                    .discountPrice(request.getItemDiscount())
                    .build();
            voucherDetailRepository.save(voucherDetail);
        }

        Cart cart = cartRepository.getCartByAccount_Id(request.getIdAccount());
        for (BillDetailOnline x : request.getBillDetail()) {
            List<CartDetail> cartDetail = cartDetailRepository.getCartDetailByCart_IdAndProductDetail_Id(cart.getId(), x.getIdProductDetail());
            cartDetail.forEach(detail -> cartDetailRepository.deleteById(detail.getId()));
        }
        CompletableFuture.runAsync(() -> sendMailOnline(bill.getId()), Executors.newCachedThreadPool());
        Notification notification = Notification.builder()
                .receiver("admin")
                .notifyContent("Vừa mua đơn hàng")
                .status(Status.CHUA_DOC)
                .account(account)
                .bill(bill).build();
        notificationRepository.save(notification);
        return bill;
    }

    @Override
    public boolean createFilePdf(String idBill) {
        String finalHtml = null;
        Optional<Bill> optional = billRepository.findById(idBill);
        InvoiceResponse invoice = exportFilePdfFormHtml.getInvoiceResponse(optional.get());
        if (optional.get().getStatusBill() != StatusBill.THANH_CONG) {
            invoice.setTypeBill(true);
            invoice.setCheckShip(true);
        }
        Context dataContext = exportFilePdfFormHtml.setData(invoice);
        finalHtml = springTemplateEngine.process("templateBill", dataContext);
        exportFilePdfFormHtml.htmlToPdf(finalHtml, optional.get().getCode());
        return true;
    }

    @Override
    public Bill findByCode(String code, String phoneNumber) {
        Optional<Bill> bill = billRepository.findByCodeAndPhoneNumber(code, phoneNumber);
        if (!bill.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return bill.get();
    }

    @Override
    public boolean ChangeAllEmployee(String id, ChangeAllEmployeeRequest request) {
        Optional<Account> checkAccount = accountRepository.findById(id);
        if (checkAccount.get().getRoles() != Roles.ROLE_ADMIN) {
            throw new RestApiException(Message.ACCOUNT_NOT_ROLE);
        }
        request.getIds().forEach(idBill -> {
            Optional<Bill> bill = billRepository.findById(idBill);
            Optional<User> user = userReposiory.findById(request.getIdEmployee());
            Optional<Account> account = accountRepository.findByUser(user.get());
            if (!bill.isPresent()) {
                throw new RestApiException(Message.BILL_NOT_EXIT);
            }
            if (!account.isPresent()) {
                throw new RestApiException(Message.NOT_EXISTS);
            }
            bill.get().setEmployees(account.get());
            billRepository.save(bill.get());
        });
        return true;
    }

    @Override
    public boolean ChangeEmployee(String id, ChangeEmployeeRequest request) {
        Optional<Account> checkAccount = accountRepository.findById(id);
        if (checkAccount.get().getRoles() != Roles.ROLE_ADMIN) {
            throw new RestApiException(Message.ACCOUNT_NOT_ROLE);
        }
        Optional<Bill> bill = billRepository.findById(request.getId());
        Optional<User> user = userReposiory.findById(request.getIdEmployee());
        Optional<Account> account = accountRepository.findByUser(user.get());
        if (!bill.isPresent()) {
            throw new RestApiException(Message.BILL_NOT_EXIT);
        }
        if (!account.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        bill.get().setEmployees(account.get());
        billRepository.save(bill.get());
        return true;
    }

    public boolean createFilePdfAtCounter(String idBill) {
        //     begin   create file pdf
        String finalHtml = null;
        Optional<Bill> optional = billRepository.findById(idBill);
        InvoiceResponse invoice = exportFilePdfFormHtml.getInvoiceResponse(optional.get());
        Bill bill = optional.get();
        String email = bill.getEmail();
        if(email == null){
            Context dataContext = exportFilePdfFormHtml.setData(invoice);
            finalHtml = springTemplateEngine.process("templateBill", dataContext);
            exportFilePdfFormHtml.htmlToPdf(finalHtml,  bill.getCode());
            return true;
        }
        if (bill.getStatusBill() != StatusBill.THANH_CONG &&  !email.isEmpty()) {
            invoice.setCheckShip(true);
              CompletableFuture.runAsync(() -> sendMail(invoice, "http://localhost:3000/bill/" + bill.getCode() + "/" + bill.getPhoneNumber(), bill.getEmail()), Executors.newCachedThreadPool());
        }
        Context dataContext = exportFilePdfFormHtml.setData(invoice);
        finalHtml = springTemplateEngine.process("templateBill", dataContext);
        exportFilePdfFormHtml.htmlToPdf(finalHtml, bill.getCode());
//     end   create file pdf
        return true;
    }

    public void sendMailOnline(String idBill) {
        String finalHtml = null;
        Optional<Bill> optional = billRepository.findById(idBill);
        InvoiceResponse invoice = exportFilePdfFormHtml.getInvoiceResponse(optional.get());
        invoice.setCheckShip(true);
        if ((optional.get().getEmail() != null)) {
            sendMail(invoice, "http://localhost:3000/bill/" + optional.get().getCode() + "/" + optional.get().getPhoneNumber(), optional.get().getEmail());
        }
    }

    public void sendMail(InvoiceResponse invoice, String url, String email) {
        if (email.matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
            String finalHtmlSendMail = null;
            Context dataContextSendMail = exportFilePdfFormHtml.setDataSendMail(invoice, url);
            finalHtmlSendMail = springTemplateEngine.process("templateBillSendMail", dataContextSendMail);
            String subject = "Biên lai thanh toán ";
            sendEmailService.sendBill(email, subject, finalHtmlSendMail);
        }
    }

    @Override
    public BillGiveBackInformation getBillGiveBackInformation(String codeBill) {
        Optional<Bill> optional = billRepository.findByCode(codeBill);
        if (!optional.isPresent()) {
            throw new RestApiException("Không tìm thấy mã  hóa đơn " + codeBill);
        }
        if (optional.get().getStatusBill().equals(StatusBill.TRA_HANG)) {
            throw new RestApiException("Hóa đơn " + codeBill + " đã có sản phẩm trả hàng.");
        }

        if (optional.get().getStatusBill().equals(StatusBill.DA_HUY)) {
            throw new RestApiException("Hóa đơn " + codeBill + " đã bị hủy.");
        }
        

        if(optional.get().getStatusBill().equals(StatusBill.THANH_CONG)){
            long currentSeconds = System.currentTimeMillis();
            long givenBackCheck = optional.get().getCompletionDate() + 2 * 24 * 60 * 60 * 1000;
            if (currentSeconds > givenBackCheck) {
                throw new RestApiException("Đơn hàng đã hết hạn hoàn đổi.");
            }
        }

        return billRepository.getBillGiveBackInformation(codeBill);
    }

    @Override
    public List<BillGiveBack> getBillGiveBack(String idBill) {
        return billRepository.getBillGiveBack(idBill);
    }

    @Override
    public Bill UpdateBillGiveBack(UpdateBillGiveBack updateBillGiveBack, List<UpdateBillDetailGiveBack> updateBillDetailGiveBacks) {
        Account account = accountRepository.findById(shoseSession.getEmployee().getId()).get();
        Bill bill = billRepository.findById(updateBillGiveBack.getIdBill()).get();
        if (bill == null) {
            throw new RestApiException("Không tìm thấy mã hóa đơn.");
        }

        // todo: update points user by totalBillGiveBack
        BigDecimal totalBill = totalBillToProductDetail(getBillGiveBack(bill.getId()));
        String idAccount = updateBillGiveBack.getIdAccount();
        BigDecimal totalBillGive = totalBillGivenBack(updateBillDetailGiveBacks);
        int checkTotal = totalBill.compareTo(totalBillGive);

        Poin poin = configPoin.readJsonFile();
        int pointGiveBack = poin.ConvertMoneyToPoints(bill.getTotalMoney().subtract(totalBillGive));
        if (idAccount != null ) {
            User customer = accountRepository.findById(idAccount).get().getUser();
            if(checkTotal == 0) {
                customer.setPoints(customer.getPoints() + bill.getPoinUse() - pointGiveBack);
            }else {
                customer.setPoints(customer.getPoints() - pointGiveBack);
            }
            userReposiory.save(customer);
        }


        // todo update stattus bill
        bill.setStatusBill(StatusBill.TRA_HANG);
        bill.setTotalMoney(totalBill.subtract(totalBillGive));
        billRepository.save(bill);

        BillHistory billHistory = BillHistory.builder()
                .bill(bill).actionDescription(updateBillGiveBack.getNote())
                .employees(account)
                .statusBill(StatusBill.TRA_HANG)
                .build();
        billHistoryRepository.save(billHistory);

        List<BillDetail> listUpdateBillDetail = updateBillDetailGiveBacks.stream().map((data) -> {
            BillDetail billDetail = billDetailRepository.findById(data.getIdBillDetail())
                    .orElseThrow(() -> new RuntimeException("Chi tiết hóa đơn không tồn tại."));
            billDetail.setStatusBill(StatusBill.THANH_CONG);
            billDetail.setQuantity(billDetail.getQuantity() - data.getQuantity());
            return billDetail;
        }).collect(Collectors.toList());

        List<ProductDetailGiveBack> productDetailGiveBackList = new ArrayList<>();
        List<BillDetail> listUpdateBillDetailGiveBack = updateBillDetailGiveBacks.stream().map((data) -> {
            ProductDetail productDetail = productDetailRepository.findById(data.getIdProduct()).get();
            BillDetail billDetail = new BillDetail();
            billDetail.setStatusBill(StatusBill.TRA_HANG);
            billDetail.setQuantity(data.getQuantity());
            billDetail.setBill(bill);
            billDetail.setProductDetail(productDetail);
            billDetail.setPrice(new BigDecimal(data.getPrice()));
            billDetail.setPromotion(data.getPromotion() == null ? null : new BigDecimal(data.getPromotion()));

            // todo: create product detail give back
            ProductDetailGiveBack giveBack = new ProductDetailGiveBack();
            giveBack.setIdProductDetail(productDetail.getId());
            giveBack.setStatusBill(StatusBill.TRA_HANG);
            giveBack.setQuantity(data.getQuantity());
            productDetailGiveBackList.add(giveBack);
            return billDetail;
        }).collect(Collectors.toList());

        // todo: create product detail give back
        List<ProductDetailGiveBack> addProductDetailGiveBacks = productDetailGiveBackList.stream().map(data -> {
            ProductDetailGiveBack productDetailGiveBack = productDetailGiveBackRepository.getOneByIdProductDetail(data.getIdProductDetail());
            if (productDetailGiveBack != null) {
                productDetailGiveBack.setQuantity(productDetailGiveBack.getQuantity() + data.getQuantity());
                return productDetailGiveBack;
            }
            return data;
        }).collect(Collectors.toList());

        billDetailRepository.saveAll(listUpdateBillDetail);
        billDetailRepository.saveAll(listUpdateBillDetailGiveBack);
        productDetailGiveBackRepository.saveAll(addProductDetailGiveBacks);
        return bill;
    }

    private BigDecimal totalBillGivenBack(List<UpdateBillDetailGiveBack> list) {
        BigDecimal totalBillGive = list.stream()
                .map(UpdateBillDetailGiveBack::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add); // Tính tổng
        return totalBillGive;
    }

    private BigDecimal totalBillToProductDetail(List<BillGiveBack> list) {
        BigDecimal total = list.stream()
                .map(data -> {
                    BigDecimal price = data.getPrice();
                    Integer promotion = data.getPromotion();
                    Integer quantity = data.getQuantity();

                    return promotion == null
                            ? price.multiply(new BigDecimal(quantity))
                            : new BigDecimal(quantity).multiply(new BigDecimal(100 - promotion).multiply(price));
                })
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add); // Tính tổng
        return total;
    }

}
