package com.example.shose.server.service;

import com.example.shose.server.dto.request.employee.CreateEmployeeRequest;
import com.example.shose.server.dto.request.employee.FindEmployeeRequest;
import com.example.shose.server.dto.request.employee.UpdateEmployeeRequest;
import com.example.shose.server.dto.response.EmployeeResponse;
import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.User;
import com.example.shose.server.infrastructure.common.PageableObject;
import jakarta.mail.MessagingException;

import java.util.List;

/**
 * @author Phuong Oanh
 */
public interface EmployeeService {

    List<EmployeeResponse> findAll( FindEmployeeRequest req);

    List<EmployeeResponse> searchDate(final FindEmployeeRequest req);

    User create( CreateEmployeeRequest req) throws MessagingException;

    User update(final UpdateEmployeeRequest req);

    Boolean delete(String id);

    EmployeeResponse  getOneById(String id);
}
