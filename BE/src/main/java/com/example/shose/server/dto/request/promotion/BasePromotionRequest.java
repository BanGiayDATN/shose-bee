package com.example.shose.server.dto.request.promotion;
/*
 *  @author diemdz
 */

import com.example.shose.server.infrastructure.constant.Status;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Getter
@Setter
public abstract class BasePromotionRequest {
    private String code;

    private String name;

    private BigDecimal value;

    private Long startDate;

    private Long endDate;

    private Status status;
}
