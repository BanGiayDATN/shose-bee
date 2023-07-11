package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.color.CreateColorRequest;
import com.example.shose.server.dto.request.color.FindColorRequest;
import com.example.shose.server.dto.request.color.UpdateColorRequest;
import com.example.shose.server.dto.response.ColorResponse;
import com.example.shose.server.entity.Color;
import com.example.shose.server.infrastructure.common.PageableObject;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.ColorRepository;
import com.example.shose.server.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Nguyễn Vinh
 */
@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private ColorRepository colorRepository;

    @Override
    public List<Color> getList() {
        return colorRepository.findAll();
    }

    @Override
    public PageableObject<ColorResponse> findAll(FindColorRequest req) {
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize());
        Page<ColorResponse> listPage = colorRepository.getAll(pageable, req);
        return new PageableObject<>(listPage);
    }

    @Override
    public Color create(CreateColorRequest req) {
        Color checkName = colorRepository.getOneByCode(req.getName());
        if (checkName != null) {
            throw new RestApiException(Message.NAME_EXISTS);
        }
        Color add = Color.builder().code(req.getCode()).name(req.getName()).status(req.getStatus()).build();
        return colorRepository.save(add);
    }

    @Override
    public Color update(UpdateColorRequest req) {
        Optional<Color> optional = colorRepository.findById(req.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        Color update = optional.get();
        update.setCode(req.getCode());
        update.setName(req.getName());
        update.setStatus(req.getStatus());
        return colorRepository.save(update);
    }

    @Override
    public Boolean delete(String id) {
        Optional<Color> optional = colorRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        colorRepository.delete(optional.get());
        return true;
    }

    @Override
    public Color getOneById(String id) {
        Optional<Color> optional = colorRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return optional.get();
    }
}
