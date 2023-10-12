package com.example.shose.server.infrastructure.sercurity.logindto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ResponseToken {

    private String accessToken;

    private String refreshToken;
}
