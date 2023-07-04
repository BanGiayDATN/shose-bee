package com.example.shose.server.dto.request.material;

import lombok.Getter;
import lombok.Setter;

/**
 * @author Nguyễn Vinh
 */
@Setter
@Getter
public abstract class BaseMaterialRequest {

    private String name;

    private Integer status;
}
