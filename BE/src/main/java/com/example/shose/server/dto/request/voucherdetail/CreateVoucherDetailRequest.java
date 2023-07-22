package com.example.shose.server.dto.request.voucherdetail;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * @author thangdt
 */

@Getter
@Setter
public class CreateVoucherDetailRequest {

    private String idVoucher;

    private String beforPrice;

    private String afterPrice;

    private String discountPrice;


}
