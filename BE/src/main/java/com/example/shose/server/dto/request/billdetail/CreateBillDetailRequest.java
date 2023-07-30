package com.example.shose.server.dto.request.billdetail;

import lombok.Getter;
import lombok.Setter;

/**
 * @author thangdt
 */
@Getter
@Setter
public class CreateBillDetailRequest {

    private String idBill;

    private String idProduct;

    private Integer size;

    private int quantity;

    private String price;
}
