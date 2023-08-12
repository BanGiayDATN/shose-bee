package com.example.shose.server.service;

import com.example.shose.server.dto.ProductDetailDTO;
import com.example.shose.server.dto.request.image.ImageColorFilerequestDTO;
import com.example.shose.server.dto.request.productdetail.CreateProductDetailRequest;
import com.example.shose.server.dto.request.productdetail.CreateSizeData;
import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.dto.request.productdetail.UpdateProductDetailRequest;
import com.example.shose.server.dto.response.ProductDetailReponse;
import com.example.shose.server.dto.response.productdetail.GetDetailProductOfClient;
import com.example.shose.server.dto.response.productdetail.GetProductDetailByCategory;
import com.example.shose.server.dto.response.productdetail.GetProductDetailByProduct;
import com.example.shose.server.dto.response.productdetail.ProductDetailResponse;
import com.example.shose.server.entity.ProductDetail;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * @author Nguyễn Vinh
 */
public interface ProductDetailService {

    List<ProductDetailReponse> getAll(FindProductDetailRequest findProductDetailRequest);

    List<ProductDetailDTO> create(List<CreateProductDetailRequest> listData,
                            List<ImageColorFilerequestDTO> listFileImage) throws IOException, ExecutionException, InterruptedException;

    ProductDetailDTO update(final UpdateProductDetailRequest req,
                            List<MultipartFile> multipartFiles,
                            List<CreateSizeData> listSize,
                            List<Boolean> listStatusImage,
                            List<String> listColor) throws IOException, ExecutionException, InterruptedException;

    Boolean delete(String id);

    ProductDetailReponse getOneById(String id);

    List<GetProductDetailByProduct> getByIdProduct(String id);

    //    ProductDetailResponse findByIdProductDetail(String id);
    List<GetProductDetailByCategory> GetProductDetailByCategory(String id);

    List<ProductDetailReponse> findAllByIdProduct(String id);

//    List<ProductDetailReponse> getAllProductDetail(FindProductDetailRequest req);

    GetDetailProductOfClient  getDetailProductOfClient(String id,String codeColor);
//    ProductDetail getProductDetailInCart(String idProuct,String codeColor,String nameSize);

}
