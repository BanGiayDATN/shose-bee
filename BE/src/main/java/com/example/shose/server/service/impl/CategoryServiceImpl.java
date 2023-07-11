package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.category.CreateCategoryRequest;
import com.example.shose.server.dto.request.category.FindCategoryRequest;
import com.example.shose.server.dto.request.category.UpdateCategoryRequest;
import com.example.shose.server.dto.response.CategoryResponse;
import com.example.shose.server.entity.Category;
import com.example.shose.server.infrastructure.common.PageableObject;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.CategoryRepository;
import com.example.shose.server.service.CategoryService;
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
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getList() {
        return categoryRepository.findAll();
    }

    @Override
    public PageableObject<CategoryResponse> findAll(FindCategoryRequest req) {
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize());
        Page<CategoryResponse> listPage = categoryRepository.getAll(pageable, req);
        return new PageableObject<>(listPage);
    }

    @Override
    public Category create(CreateCategoryRequest req) {
        Category checkName = categoryRepository.getOneByName(req.getName());
        if (checkName != null) {
            throw new RestApiException(Message.NAME_EXISTS);
        }
        Category add = Category.builder().name(req.getName()).status(req.getStatus()).build();
        return categoryRepository.save(add);
    }

    @Override
    public Category update(UpdateCategoryRequest req) {
        Optional<Category> optional = categoryRepository.findById(req.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        Category update = optional.get();
        update.setName(req.getName());
        update.setStatus(req.getStatus());
        return categoryRepository.save(update);
    }

    @Override
    public Boolean delete(String id) {
        Optional<Category> optional = categoryRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        categoryRepository.delete(optional.get());
        return true;
    }

    @Override
    public Category getOneById(String id) {
        Optional<Category> optional = categoryRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return optional.get();
    }
}