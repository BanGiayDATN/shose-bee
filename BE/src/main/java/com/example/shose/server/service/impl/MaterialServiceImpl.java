package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.material.CreateMaterialRequest;
import com.example.shose.server.dto.request.material.FindMaterialRequest;
import com.example.shose.server.dto.request.material.UpdateMaterialRequest;
import com.example.shose.server.dto.response.MaterialResponse;
import com.example.shose.server.entity.Material;
import com.example.shose.server.infrastructure.common.PageableObject;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.MaterialRepository;
import com.example.shose.server.service.MaterialService;
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
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    @Override
    public List<Material> getList() {
        return materialRepository.findAll();
    }

    @Override
    public PageableObject<MaterialResponse> findAll(FindMaterialRequest req) {
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize());
        Page<MaterialResponse> listPage = materialRepository.getAll(pageable, req);
        return new PageableObject<>(listPage);
    }

    @Override
    public Material create(CreateMaterialRequest req) {
        Material checkName = materialRepository.getOneByName(req.getName());
        if (checkName != null) {
            throw new RestApiException(Message.NAME_EXISTS);
        }
        Material add = Material.builder().name(req.getName()).status(req.getStatus() == 0 ? Status.DANG_SU_DUNG : Status.KHONG_SU_DUNG).build();
        return materialRepository.save(add);
    }

    @Override
    public Material update(UpdateMaterialRequest req) {
        Optional<Material> optional = materialRepository.findById(req.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        Material update = optional.get();
        update.setName(req.getName());
        update.setStatus(req.getStatus() == 0 ? Status.DANG_SU_DUNG : Status.KHONG_SU_DUNG);
        return materialRepository.save(update);
    }

    @Override
    public Boolean delete(String id) {
        Optional<Material> optional = materialRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        materialRepository.delete(optional.get());
        return true;
    }

    @Override
    public Material getOneById(String id) {
        Optional<Material> optional = materialRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return optional.get();
    }
}
