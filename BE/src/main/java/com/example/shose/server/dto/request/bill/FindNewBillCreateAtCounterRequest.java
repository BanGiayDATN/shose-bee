package com.example.shose.server.dto.request.bill;

import lombok.Getter;
import lombok.Setter;

import java.util.Calendar;

/**
 * @author thangdt
 */
@Getter
@Setter
public class FindNewBillCreateAtCounterRequest {

    private Long startCreateBill = Calendar.getInstance().getTimeInMillis();

    private Long endCreateBill = Calendar.getInstance().getTimeInMillis();

    private String nameUser;

    private String phoneNumber;

}
