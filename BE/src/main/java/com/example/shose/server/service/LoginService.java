package com.example.shose.server.service;

import com.example.shose.server.entity.Account;
import com.example.shose.server.dto.logindto.LoginRequest;
import com.example.shose.server.dto.logindto.ResetPassword;
import com.example.shose.server.dto.response.LoginResponse;

public interface LoginService {

    LoginResponse getOneByEmailAndPass(LoginRequest request);

    LoginResponse resetPassword (ResetPassword resetPassword);

    boolean add(Account  account);
}
