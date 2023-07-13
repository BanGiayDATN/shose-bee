package com.example.shose.server.dto.request.brand;

import com.example.shose.server.infrastructure.constant.Status;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Nguyễn Vinh
 */
@Setter
@Getter
public abstract class BaseBrandRequest {

    private String name;

    private Status status;
}
