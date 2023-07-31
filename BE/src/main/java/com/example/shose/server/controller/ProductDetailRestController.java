package com.example.shose.server.controller;

import com.example.shose.server.dto.request.productdetail.CreateProductDetailRequest;
import com.example.shose.server.dto.request.productdetail.CreateSizeData;
import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.dto.request.productdetail.UpdateProductDetailRequest;
import com.example.shose.server.dto.response.ImageResponse;
import com.example.shose.server.dto.response.productdetail.GetProductDetailByProduct;
import com.example.shose.server.service.ProductDetailService;
import com.example.shose.server.util.FormUtils;
import com.example.shose.server.util.ResponseObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * @author Nguyễn Vinh
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/admin/product-detail")
public class ProductDetailRestController {

    @Autowired
    private ProductDetailService productDetailService;

    private FormUtils formUtils = new FormUtils();

    @GetMapping()
    public ResponseObject view(final FindProductDetailRequest request) {
        return new ResponseObject(productDetailService.getAll(request));
    }

    @GetMapping("/{id}")
    public ResponseObject getOneById(@PathVariable("id") String id) {
        return new ResponseObject(productDetailService.getOneById(id));
    }

    @PostMapping("")
    public ResponseObject add(@RequestParam("multipartFiles") List<MultipartFile> multipartFiles,
                              @RequestParam("data") String requestData,
                              @RequestParam("status") List<Boolean> listStatusImage,
                              @RequestParam("listSize") String dataSize) throws IOException, ExecutionException, InterruptedException {

        CreateProductDetailRequest request = new CreateProductDetailRequest();
        JsonObject jsonObject = JsonParser.parseString(requestData).getAsJsonObject();
        request.setDescription(jsonObject.get("description").getAsString());
        request.setGender(jsonObject.get("gender").getAsString());
        request.setPrice(jsonObject.get("price").getAsString());
        request.setStatus(jsonObject.get("status").getAsString());
        request.setCategoryId(jsonObject.get("categoryId").getAsString());
        request.setProductId(jsonObject.get("productId").getAsString());
        request.setColorId(jsonObject.get("colorId").getAsString());
        request.setMaterialId(jsonObject.get("materialId").getAsString());
        request.setSoleId(jsonObject.get("soleId").getAsString());
        request.setBrandId(jsonObject.get("brandId").getAsString());

        JsonArray jsonListSize = JsonParser.parseString(dataSize).getAsJsonArray();
        System.out.println(jsonListSize);
        List<CreateSizeData> listSize = new ArrayList<>();
        for (int i = 0; i < jsonListSize.size(); i++) {
            JsonObject sizeDataObject = jsonListSize.get(i).getAsJsonObject();
            CreateSizeData sizeData = formUtils.convertToObject(CreateSizeData.class, sizeDataObject);
            listSize.add(sizeData);
        }
        listSize.stream().forEach(a-> System.out.println(a.getNameSize()));
        return new ResponseObject(productDetailService.create(request, multipartFiles, listSize, listStatusImage));
    }


    @PutMapping("/{id}")
    public ResponseObject update(@PathVariable("id") String id,
                                 @RequestParam("multipartFiles") List<MultipartFile> multipartFiles,
                                 @RequestParam("data") String requestData,
                                 @RequestParam("status") List<Boolean> listStatusImage,
                                 @RequestParam("listSize") String dataSize) throws IOException, ExecutionException, InterruptedException {

        UpdateProductDetailRequest request = new UpdateProductDetailRequest();
        request.setId(id);
        JsonObject jsonObject = JsonParser.parseString(requestData).getAsJsonObject();
        request.setDescription(jsonObject.get("description").getAsString());
        request.setGender(jsonObject.get("gender").getAsString());
        request.setPrice(jsonObject.get("price").getAsString());
        request.setStatus(jsonObject.get("status").getAsString());
        request.setCategoryId(jsonObject.get("categoryId").getAsString());
        request.setProductId(jsonObject.get("productId").getAsString());
        request.setColorId(jsonObject.get("colorId").getAsString());
        request.setMaterialId(jsonObject.get("materialId").getAsString());
        request.setSoleId(jsonObject.get("soleId").getAsString());
        request.setBrandId(jsonObject.get("brandId").getAsString());

        JsonArray jsonListSize = JsonParser.parseString(dataSize).getAsJsonArray();
        List<CreateSizeData> listSize = new ArrayList<>();
        for (int i = 0; i < jsonListSize.size(); i++) {
            JsonObject sizeDataObject = jsonListSize.get(i).getAsJsonObject();
            CreateSizeData sizeData = formUtils.convertToObject(CreateSizeData.class, sizeDataObject);
            listSize.add(sizeData);
        }
        multipartFiles.stream().forEach(s-> System.out.println());
        listSize.forEach(s-> System.out.println(s.getStatus()));
        return new ResponseObject(productDetailService.update(request,multipartFiles,listSize,listStatusImage));
    }

    @GetMapping("/byProduct/{id}")
    public ResponseObject getByIdProduct(@PathVariable("id") String id) {
        return new ResponseObject(productDetailService.getByIdProduct(id));
    }

    @GetMapping("/custom-product/{id}")
    public ResponseObject findByIdProductDetail(@PathVariable("id") String id){
        return new ResponseObject(productDetailService.findByIdProductDetail(id));
    }
}
