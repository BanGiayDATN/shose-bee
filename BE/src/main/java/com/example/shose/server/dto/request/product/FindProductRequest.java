package com.example.shose.server.dto.request.product;

import com.example.shose.server.infrastructure.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Nguyễn Vinh
 */
@Setter
@Getter
public class FindProductRequest extends PageableRequest {

    private String code;

    private String name;
}
