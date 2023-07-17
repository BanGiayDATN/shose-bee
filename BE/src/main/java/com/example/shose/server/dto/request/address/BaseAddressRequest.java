package com.example.shose.server.dto.request.address;

import lombok.Getter;
import lombok.Setter;

/**
 * @author Hào Ngô
 */

@Getter
@Setter
public abstract class BaseAddressRequest {

    private String id;

    private String line;

    private String city;

    private String province;

    private String country;

    private String userId;
}
