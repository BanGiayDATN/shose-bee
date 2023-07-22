package com.example.shose.server.dto.request.bill;

import com.example.shose.server.infrastructure.constant.StatusMethod;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * @author thangdt
 */
@Getter
@Setter
public class ChangStatusBillRequest {

    private String actionDescription;

    private StatusMethod method;

    private String totalMoney;
}