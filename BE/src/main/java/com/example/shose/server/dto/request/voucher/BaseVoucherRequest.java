package com.example.shose.server.dto.request.voucher;
/*
 *  @author diemdz
 */

import com.example.shose.server.infrastructure.constant.Status;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;


@Getter
@Setter
public abstract class BaseVoucherRequest {
    private String code;

    private String name;

    private BigDecimal value;

    private Integer quantity;

    private Long startDate;

    private Long endDate;

    private Status status;
}
