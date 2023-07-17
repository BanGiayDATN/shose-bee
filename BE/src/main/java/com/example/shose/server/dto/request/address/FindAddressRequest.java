package com.example.shose.server.dto.request.address;

import com.example.shose.server.infrastructure.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Hào Ngô
 */
@Getter
@Setter
public class FindAddressRequest extends PageableRequest {

    private String line;

    private String city;

    private String province;

    private String country;

    private String id_user;

}
