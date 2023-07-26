package com.example.shose.server.dto.request.promotion;

import lombok.Getter;
import lombok.Setter;

/*
 *  @author diemdz
 */
@Getter
@Setter
public class UpdatePromotionRequest extends BasePromotionRequest {
    private String id;
}
