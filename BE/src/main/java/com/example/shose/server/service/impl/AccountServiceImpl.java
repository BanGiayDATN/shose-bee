package com.example.shose.server.service.impl;

import com.example.shose.server.dto.response.account.AccountResponse;
import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.User;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.dto.response.employee.SimpleEmployeeResponse;
import com.example.shose.server.repository.UserReposiory;
import com.example.shose.server.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;


    @Autowired
    private UserReposiory userReposiory;

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public Account getOneByEmail(String email) {
        Account account = accountRepository.getOneByEmail(email);
        if (account == null) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return account;
    }

    @Override
    public AccountResponse getAccountUserByIdBill(String idBill) {
        return accountRepository.getAccountUserByIdBill(idBill);
    }

    @Override
    public List<SimpleEmployeeResponse> getAllSimpleEntityEmployess() {
        return accountRepository.getAllSimpleEntityEmployess();
    }


}
