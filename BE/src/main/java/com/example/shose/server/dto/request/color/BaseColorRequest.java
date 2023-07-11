package com.example.shose.server.dto.request.color;

import com.example.shose.server.infrastructure.constant.Status;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Nguyễn Vinh
 */
@Setter
@Getter
public abstract class BaseColorRequest {

    private String code;

    private String name;

    private Status status;
}
