package com.example.shose.server.dto.request.sole;

import lombok.Getter;
import lombok.Setter;

/**
 * @author Nguyễn Vinh
 */
@Setter
@Getter
public abstract class BaseSoleRequest {

    private String name;

    private Integer status;

}
