package com.example.shose.server.dto.request.size;

import com.example.shose.server.infrastructure.constant.Status;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Nguyễn Vinh
 */
@Setter
@Getter
public abstract class BaseSizeRequest {

    @NotBlank(message = "Vui lòng không để trống")
    private int name;

    private Status status;
}
