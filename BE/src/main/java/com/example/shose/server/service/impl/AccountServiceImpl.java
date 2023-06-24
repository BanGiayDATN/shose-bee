package com.example.shose.server.service.impl;

import com.example.shose.server.entity.Account;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public List<Account> findAll() {
        int check = 0;
        if (check == 0) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return accountRepository.findAll();
    }
}
