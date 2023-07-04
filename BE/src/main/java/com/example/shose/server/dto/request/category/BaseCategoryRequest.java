package com.example.shose.server.dto.request.category;

import com.example.shose.server.infrastructure.constant.Status;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Nguyễn Vinh
 */
@Setter
@Getter
public abstract class BaseCategoryRequest {

    private String name;

    private Status status;
}
