package com.example.shose.server.dto.request.customer;

import com.example.shose.server.infrastructure.constant.Status;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Phuong Oanh
 */
@Getter
@Setter
public abstract class BaseCustomerRequest {
    private String fullName;

    private Long dateOfBirth;

    private String phoneNumber;

    private String email;

    private Boolean gender;

    private String avata;

    private Status status;

    private Long startTime;

    private Long endTime;

    private String id;

    private String password;

    private Integer points;

}
