package com.example.shose.server.dto.request.category;

import lombok.Getter;
import lombok.Setter;

/**
 * @author Nguyễn Vinh
 */
@Setter
@Getter
public abstract class BaseCategoryRequest {

    private String name;

    private Integer status;
}
