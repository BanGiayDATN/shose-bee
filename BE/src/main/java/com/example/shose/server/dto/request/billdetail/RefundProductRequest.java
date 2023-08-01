package com.example.shose.server.dto.request.billdetail;

import lombok.Getter;
import lombok.Setter;

/**
 * @author thangdt
 */
@Getter
@Setter
public class RefundProductRequest {

    private String id;

    private String idBill;

    private String idProduct;

    private Integer size;

    private Integer quantity;

    private String note;

}
