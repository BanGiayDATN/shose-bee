package com.example.shose.server.dto.request.billgiveback;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UpdateBillDetailGiveBack {

    private String idBillDetail;

    private  String idProduct;

    private String price;

    private String promotion;

    private int quantity;
}
