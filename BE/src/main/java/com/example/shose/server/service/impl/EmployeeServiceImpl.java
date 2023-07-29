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
import com.example.shose.server.util.PasswordGenerator;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Autowired
    private PasswordGenerator passwordEncoder;

//    @Autowired
//    private SendEmail mail;

    @Override
    public List<EmployeeResponse> findAll(FindEmployeeRequest req) {
        return userReposiory.getAll(req);
    }

    @Override
    public List<EmployeeResponse> searchDate(FindEmployeeRequest req) {
        return userReposiory.findByDate(req);
    }

    @Override
    public User create(CreateEmployeeRequest req) throws MessagingException {
        String randomPassword = passwordEncoder.generatePassword();
//        String email = req.getEmail();
//        mail.testMail(email, randomPassword);
        Account employeeAccount = new Account();
        employeeAccount.setEmail(req.getEmail());
        employeeAccount.setRoles(Roles.NHAN_VIEN);
        employeeAccount.setPassword(randomPassword);

        User user = User.builder()
                .fullName(req.getFullName())
                .phoneNumber(req.getPhoneNumber())
                .email(req.getEmail())
                .status(Status.DANG_SU_DUNG)
                .dateOfBirth(req.getDateOfBirth())
                .avata(null)
                .gender(req.getGender())
                .build();
        user = userReposiory.save(user);
        employeeAccount.setUser(user);
        employeeAccount = accountRepository.save(employeeAccount);
        return user;
    }
    @Override
    @Transactional
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
        user.setGender(req.getGender());
        user.setAvata(null);
        user.setStatus(req.getStatus());

        if (req.getPassword() != null) {
            accountRepository.updatePasswordByUserId(user.getId(), req.getPassword());
        }
        if (req.getEmail() != null) {
            accountRepository.updateEmailByUserId(user.getId(), req.getEmail());
        }
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
