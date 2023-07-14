package com.example.shose.server.service;

import com.example.shose.server.dto.request.sole.CreateSoleRequest;
import com.example.shose.server.dto.request.sole.FindSoleRequest;
import com.example.shose.server.dto.request.sole.UpdateSoleRequest;
import com.example.shose.server.dto.response.SoleResponse;
import com.example.shose.server.entity.Sole;
import com.example.shose.server.infrastructure.common.PageableObject;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
public interface SoleService {

    List<SoleResponse> findAll (final FindSoleRequest req);

    Sole create (final CreateSoleRequest req);

    Sole update (final UpdateSoleRequest req);

    Boolean delete (String id);

    Sole getOneById (String id);

}
