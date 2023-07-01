package com.example.shose.server.request.bill;

import com.example.shose.server.infrastructure.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

/**
 * @author thangdt
 */
@Getter
@Setter
public class BillRequest extends PageableRequest {

    private long startTime;
    private long endTime;
    private int[] status = new int[]{};
    private long endDeliveryDate;
    private long startDeliveryDate;
    private String converStatus;
    private String code;
    private String employees;
    private String user;
    private String phoneNumber;
    private int type = -1;
}
