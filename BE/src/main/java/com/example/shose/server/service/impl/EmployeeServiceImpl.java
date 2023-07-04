package com.example.shose.server.service.impl;


import com.example.shose.server.dto.request.employee.CreateEmployeeRequest;
import com.example.shose.server.dto.request.employee.FindEmployeeRequest;
import com.example.shose.server.dto.request.employee.UpdateEmployeeRequest;
import com.example.shose.server.dto.response.EmployeeResponse;
import com.example.shose.server.entity.User;
import com.example.shose.server.infrastructure.common.base.PageableObject;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
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
    public  PageableObject<EmployeeResponse> search(FindEmployeeRequest req) {
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize());
        Page<EmployeeResponse> list = userReposiory.findByName(pageable, req);
        return new PageableObject<>(list);
    }

    @Override
    public User create(CreateEmployeeRequest req) {
        User user = User.builder()
                .fullName(req.getFullName())
                .dateOfBirth(new ConvertDateToLong().dateToLong(req.getDateOfBirth()))
                .phoneNumber(req.getPhoneNumber())
                .email(req.getEmail())
                .avata(req.getAvata())
                .status(Status.DANG_SU_DUNG)
                .gender(req.getGender())
                .build();
        return userReposiory.save(user);
    }

    @Override
    public User update(UpdateEmployeeRequest req) {
        Optional<User> optional = userReposiory.findById(req.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        User update = optional.get();
        update.setFullName(req.getFullName());
        update.setDateOfBirth(new ConvertDateToLong().dateToLong(req.getDateOfBirth()));
        update.setPhoneNumber(req.getPhoneNumber());
        update.setEmail(req.getEmail());
        update.setAvata(req.getAvata());
        update.setGender(req.getGender());
        update.setStatus(req.getStatus() == 0 ? Status.DANG_SU_DUNG : Status.KHONG_SU_DUNG);
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
}
