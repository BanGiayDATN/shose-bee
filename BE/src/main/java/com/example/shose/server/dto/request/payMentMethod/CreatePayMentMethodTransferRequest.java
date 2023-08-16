package com.example.shose.server.dto.request.payMentMethod;

import lombok.Getter;
import lombok.Setter;

/**
 * @author thangdt
 */

@Getter
@Setter
public class CreatePayMentMethodTransferRequest {

    public Long vnp_Ammount ;
    public String vnp_OrderInfo = "Thanh toán hóa đơn";
    public String vnp_OrderType = "200000";
    public String vnp_TxnRef;

}
