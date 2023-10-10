package com.example.shose.server.dto.request.payMentMethod;

import com.example.shose.server.dto.request.bill.billcustomer.BillDetailOnline;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * @author thangdt
 */

@Getter
@Setter
public class CreatePayMentMethodTransferRequest {

    public String vnp_Ammount ;
    public String vnp_OrderInfo = "Thanh toán hóa đơn";
    public String vnp_OrderType = "Thanh toán hóa đơn";
    public String vnp_TxnRef;
    private List<BillDetailOnline> billDetail;

}
