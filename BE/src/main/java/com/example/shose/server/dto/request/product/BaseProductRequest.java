package com.example.shose.server.dto.request.product;

import com.example.shose.server.infrastructure.constant.Status;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Nguyễn Vinh
 */

@Setter
@Getter
public abstract class BaseProductRequest {

    private String code;

    private String name;

    private Status status;
}
