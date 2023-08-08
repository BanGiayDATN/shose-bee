package com.example.shose.server.service;

import com.example.shose.server.dto.request.category.CreateCategoryRequest;
import com.example.shose.server.dto.request.category.FindCategoryRequest;
import com.example.shose.server.dto.request.category.UpdateCategoryRequest;
import com.example.shose.server.dto.response.CategoryResponse;
import com.example.shose.server.entity.Category;
import com.example.shose.server.infrastructure.common.PageableObject;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
public interface CategoryService {
    List<Category> getAll();

    List<CategoryResponse> getList (FindCategoryRequest req);

    Category create (final CreateCategoryRequest req);

    Category update (final UpdateCategoryRequest req);

    Boolean delete (String id);

    Category getOneById (String id);
}
