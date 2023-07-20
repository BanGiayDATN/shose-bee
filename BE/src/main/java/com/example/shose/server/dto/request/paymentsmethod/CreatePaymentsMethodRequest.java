package com.example.shose.server.dto.request.paymentsmethod;

import com.example.shose.server.entity.Bill;
import com.example.shose.server.infrastructure.constant.StatusMethod;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * @author thangdt
 */
@Getter
@Setter
public class CreatePaymentsMethodRequest {

    private String description;

    private BigDecimal totalMoney;

    private StatusMethod status;

    private String idBill;
}
