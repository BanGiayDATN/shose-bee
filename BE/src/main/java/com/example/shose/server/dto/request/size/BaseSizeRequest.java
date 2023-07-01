package com.example.shose.server.dto.request.size;

import lombok.Getter;
import lombok.Setter;

/**
 * @author Nguyễn Vinh
 */
@Setter
@Getter
public abstract class BaseSizeRequest {

    private String name;

    private Integer status;
}
