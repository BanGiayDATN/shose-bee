package com.example.shose.server.dto.request.category;

import com.example.shose.server.infrastructure.constant.Status;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Nguyễn Vinh
 */
@Setter
@Getter
public abstract class BaseCategoryRequest {

    @NotBlank(message = "Vui lòng không để trống")
    private String name;

    private Status status;
}
