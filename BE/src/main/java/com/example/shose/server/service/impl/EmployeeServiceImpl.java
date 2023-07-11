package com.example.shose.server.service.impl;


import com.example.shose.server.dto.request.employee.CreateEmployeeRequest;
import com.example.shose.server.dto.request.employee.FindEmployeeRequest;
import com.example.shose.server.dto.request.employee.UpdateEmployeeRequest;
import com.example.shose.server.dto.response.EmployeeResponse;
import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.User;
import com.example.shose.server.infrastructure.common.PageableObject;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Roles;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.repository.UserReposiory;
import com.example.shose.server.service.EmployeeService;
import com.example.shose.server.util.ConvertDateToLong;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public List<User> getAll() {
        return userReposiory.findAll();
    }

    @Override
    public PageableObject<EmployeeResponse> findAll(FindEmployeeRequest req) {
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize());
        Page<EmployeeResponse> list = userReposiory.getAll(pageable, req);
        return new PageableObject<>(list);
    }

    @Override
    public PageableObject<EmployeeResponse> search(FindEmployeeRequest req) {
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize());
        Page<EmployeeResponse> list = userReposiory.findByName(pageable, req);
        return new PageableObject<>(list);
    }

    @Override
    public PageableObject<EmployeeResponse> searchDate(FindEmployeeRequest req) {
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize());
        Page<EmployeeResponse> list = userReposiory.findByDate(pageable, req);
        return new PageableObject<>(list);
    }

    @Override
    public User create(CreateEmployeeRequest req) {
        Account account = new Account();
        account.setEmail(req.getEmail());
        account.setPassword("123");
        account.setRoles(Roles.NHAN_VIEN);
        User user = User.builder()
                .fullName(req.getFullName())
                .phoneNumber(req.getPhoneNumber())
                .email(req.getEmail())
                .status(Status.DANG_SU_DUNG)
                .gender(req.getGender())
                .build();
        user = userReposiory.save(user);
        account.setUser(user);
        account = accountRepository.save(account);

        return user;
    }

    @Override
    public User update(UpdateEmployeeRequest req) {
        Optional<User> optional = userReposiory.findById(req.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        User update = optional.get();
        update.setFullName(req.getFullName());
        update.setPhoneNumber(req.getPhoneNumber());
        update.setEmail(req.getEmail());
        update.setStatus(req.getStatus());
        return userReposiory.save(update);
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
    public User getOneById(String id) {
        Optional<User> optional = userReposiory.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return optional.get();
    }

}
