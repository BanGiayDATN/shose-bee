package com.example.shose.server.service;

import com.example.shose.server.dto.request.employee.CreateEmployeeRequest;
import com.example.shose.server.dto.request.employee.FindEmployeeRequest;
import com.example.shose.server.dto.request.employee.UpdateEmployeeRequest;
import com.example.shose.server.dto.response.EmployeeResponse;
import com.example.shose.server.entity.User;
import com.example.shose.server.infrastructure.common.PageableObject;

import java.util.List;

/**
 * @author Phuong Oanh
 */
public interface EmployeeService {
    List<User> getAll();

    PageableObject<EmployeeResponse> findAll(final FindEmployeeRequest req);

    PageableObject<EmployeeResponse> search(final FindEmployeeRequest req);

    PageableObject<EmployeeResponse> searchDate(final FindEmployeeRequest req);

    User create(final CreateEmployeeRequest req);

    User update(final UpdateEmployeeRequest req);

    Boolean delete(String id);

    User getOneById(String id);
}
