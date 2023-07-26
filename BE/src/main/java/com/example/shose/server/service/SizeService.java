package com.example.shose.server.service;

import com.example.shose.server.dto.request.size.CreateSizeRequest;
import com.example.shose.server.dto.request.size.FindSizeRequest;
import com.example.shose.server.dto.request.size.UpdateSizeRequest;
import com.example.shose.server.dto.response.SizeResponse;
import com.example.shose.server.entity.Size;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
public interface SizeService {

    List<SizeResponse> findAll(final FindSizeRequest req);

    List<Size> getAll();

    Size create(final CreateSizeRequest req);

    Size update(final UpdateSizeRequest req);

    Boolean delete(String id);

    Size getOneById(String id);

    Size getOneByName(int name);
}
