package com.example.shose.server.service;

import com.example.shose.server.dto.request.brand.CreateBrandRequest;
import com.example.shose.server.dto.request.brand.FindBrandRequest;
import com.example.shose.server.dto.request.brand.UpdateBrandRequest;
import com.example.shose.server.dto.response.BrandResponse;
import com.example.shose.server.entity.Brand;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
public interface BrandService {

    List<BrandResponse> findAll(final FindBrandRequest req);

    Brand create(final CreateBrandRequest req);

    Brand update(final UpdateBrandRequest req);

    Boolean delete(String id);

    Brand getOneById(String id);
}
