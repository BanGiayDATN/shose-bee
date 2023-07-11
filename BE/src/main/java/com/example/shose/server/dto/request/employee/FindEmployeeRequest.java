package com.example.shose.server.dto.request.employee;

import com.example.shose.server.infrastructure.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Phuong Oanh
 */
@Setter
@Getter
public class FindEmployeeRequest extends PageableRequest {
    private String fullName;

    private String email;

    private Long startTime;

    private Long endTime;
}
