package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.brand.CreateBrandRequest;
import com.example.shose.server.dto.request.brand.FindBrandRequest;
import com.example.shose.server.dto.request.brand.UpdateBrandRequest;
import com.example.shose.server.dto.response.BrandResponse;
import com.example.shose.server.entity.Brand;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.BrandRepository;
import com.example.shose.server.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Nguyễn Vinh
 */
@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<BrandResponse> findAll(FindBrandRequest req) {
        return brandRepository.getAll(req);
    }

    @Override
    public Brand create(CreateBrandRequest req) {
        Brand checkName = brandRepository.getOneByName(req.getName());
        if (checkName != null) {
            throw new RestApiException(Message.NAME_EXISTS);
        }
        Brand add = new Brand();
        add.setName(req.getName());
        add.setStatus(req.getStatus());
        return brandRepository.save(add);
    }

    @Override
    public Brand update(UpdateBrandRequest req) {
        Optional<Brand> optional = brandRepository.findById(req.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        Brand update = optional.get();
        update.setName(req.getName());
        update.setStatus(req.getStatus());
        return brandRepository.save(update);
    }

    @Override
    public Boolean delete(String id) {
        Optional<Brand> optional = brandRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        brandRepository.delete(optional.get());
        return true;
    }

    @Override
    public Brand getOneById(String id) {
        Optional<Brand> optional = brandRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return optional.get();
    }
}
