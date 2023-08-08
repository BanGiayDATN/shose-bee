package com.example.shose.server.dto.request.bill;

import com.example.shose.server.dto.request.billdetail.CreateBillDetailRequest;
import com.example.shose.server.dto.request.voucherdetail.CreateVoucherDetailRequest;
import com.example.shose.server.infrastructure.constant.StatusBill;
import com.example.shose.server.infrastructure.constant.TypeBill;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author thangdt
 */
@Getter
@Setter
public class CreateBillOfflineRequest {

    private String phoneNumber;

    private String idUser;

    private String address;

    private String userName;

    private String itemDiscount;

    private String totalMoney;

    private String transport;

    private String note;

    private String typeBill;

    private String moneyShip;

    private List<CreateBillDetailRequest> billDetailRequests;

    private List<CreateVoucherDetailRequest> vouchers;

}
