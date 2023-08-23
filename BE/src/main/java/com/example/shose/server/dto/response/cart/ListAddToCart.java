package com.example.shose.server.dto.response.cart;
/*
 *  @author diemdz
 */

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ListAddToCart {
    String idAccount;
    private String idProductDetail;
    private Integer quantity;
    private BigDecimal price;
}
