package com.example.shose.server.service.impl;


import com.example.shose.server.dto.request.employee.CreateEmployeeRequest;
import com.example.shose.server.dto.request.employee.FindEmployeeRequest;
import com.example.shose.server.dto.request.employee.UpdateEmployeeRequest;
import com.example.shose.server.dto.response.EmployeeResponse;
import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.User;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Roles;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.repository.UserReposiory;
import com.example.shose.server.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Phuong Oanh
 */
@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private UserReposiory userReposiory;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public List<EmployeeResponse> findAll(FindEmployeeRequest req) {
        return userReposiory.getAll(req);
    }

    @Override
    public List<EmployeeResponse> searchDate(FindEmployeeRequest req) {
        return userReposiory.findByDate(req);
    }

    @Override
    public User create(CreateEmployeeRequest req) {
        List<Account> accounts = accountRepository.findAll();
        Optional<Account> adminAccount = accounts.stream()
                .filter(account -> account.getRoles().equals(Roles.ADMIN))
                .findFirst();
        if (!adminAccount.isPresent()) {
            throw new RestApiException(Message.ACCOUNT_NOT_PERMISSION);
        }

        Account employeeAccount = new Account();
        employeeAccount.setEmail(req.getEmail());
        employeeAccount.setPassword("123");
        employeeAccount.setRoles(Roles.NHAN_VIEN);

        User user = User.builder()
                .fullName(req.getFullName())
                .phoneNumber(req.getPhoneNumber())
                .email(req.getEmail())
                .status(Status.DANG_SU_DUNG)
                .dateOfBirth(req.getDateOfBirth())
                .build();

        user = userReposiory.save(user);
        employeeAccount.setUser(user);
        employeeAccount = accountRepository.save(employeeAccount);
        return user;
    }

    @Override
    public User update(UpdateEmployeeRequest req) {
        Optional<User> optional = userReposiory.findById(req.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        User user = optional.get();
        user.setFullName(req.getFullName());
        user.setPhoneNumber(req.getPhoneNumber());
        user.setDateOfBirth(req.getDateOfBirth());
        user.setEmail(req.getEmail());
        user.setStatus(req.getStatus());
        return userReposiory.save(user);
    }

    @Override
    public Boolean delete(String id) {
        Optional<User> optional = userReposiory.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        userReposiory.delete(optional.get());
        return null;
    }

    @Override
    public EmployeeResponse getOneById(String id) {
        Optional<EmployeeResponse> optional = userReposiory.getOneWithPassword(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return optional.get();
    }

}
