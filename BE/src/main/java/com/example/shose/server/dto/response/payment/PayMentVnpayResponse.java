package com.example.shose.server.dto.response.payment;

import lombok.Getter;
import lombok.Setter;

/**
 * @author thangdt
 */
@Getter
@Setter
public class PayMentVnpayResponse {
    private String vnp_Amount;
    private String vnp_ResponseCode;
}
