package com.example.shose.server.service;

import com.example.shose.server.dto.ProductDetailDTO;
import com.example.shose.server.dto.request.productdetail.CreateProductDetailRequest;
import com.example.shose.server.dto.request.productdetail.CreateSizeData;
import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.dto.response.ProductDetailReponse;
import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.infrastructure.common.PageableObject;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * @author Nguyễn Vinh
 */
public interface ProductDetailService {

    List<ProductDetailReponse> getAll(FindProductDetailRequest findProductDetailRequest);

    ProductDetailDTO create(final CreateProductDetailRequest req , List<MultipartFile> multipartFiles , List<CreateSizeData> listSize, List<Boolean> listStatusImage) throws IOException, ExecutionException, InterruptedException;

    ProductDetail update(final CreateProductDetailRequest req);

    Boolean delete(String id);

    ProductDetailDTO getOneById(String id);


}
