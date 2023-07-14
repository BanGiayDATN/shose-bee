package com.example.shose.server.service;

import com.example.shose.server.dto.request.color.CreateColorRequest;
import com.example.shose.server.dto.request.color.FindColorRequest;
import com.example.shose.server.dto.request.color.UpdateColorRequest;
import com.example.shose.server.dto.response.ColorResponse;
import com.example.shose.server.entity.Color;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
public interface ColorService {

    List<ColorResponse> findAll(final FindColorRequest req);

    Color create(final CreateColorRequest req);

    Color update(final UpdateColorRequest req);

    Boolean delete(String id);

    Color getOneById(String id);
}
