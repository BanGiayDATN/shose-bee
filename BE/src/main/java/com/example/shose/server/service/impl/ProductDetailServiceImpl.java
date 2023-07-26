package com.example.shose.server.service.impl;

import com.example.shose.server.dto.ProductDetailDTO;
import com.example.shose.server.dto.request.productdetail.CreateProductDetailRequest;
import com.example.shose.server.dto.request.productdetail.CreateSizeData;
import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.dto.response.ProductDetailReponse;
import com.example.shose.server.entity.Image;
import com.example.shose.server.dto.response.productdetail.GetProductDetailByProduct;
import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.entity.Size;
import com.example.shose.server.entity.SizeProductDetail;
import com.example.shose.server.infrastructure.cloudinary.UploadImageToCloudinary;
import com.example.shose.server.infrastructure.constant.GenderProductDetail;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.BrandRepository;
import com.example.shose.server.repository.CategoryRepository;
import com.example.shose.server.repository.ColorRepository;
import com.example.shose.server.repository.ImageRepository;
import com.example.shose.server.repository.MaterialRepository;
import com.example.shose.server.repository.ProductDetailRepository;
import com.example.shose.server.repository.ProductRepository;
import com.example.shose.server.repository.PromotionRepository;
import com.example.shose.server.repository.SizeProductDetailRepository;
import com.example.shose.server.repository.SizeRepository;
import com.example.shose.server.repository.SoleRepository;
import com.example.shose.server.service.ProductDetailService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

/**
 * @author Nguyễn Vinh
 */
@Service
public class ProductDetailServiceImpl implements ProductDetailService {

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private SoleRepository soleRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SizeProductDetailRepository sizeProductDetailRepository;

    @Autowired
    private UploadImageToCloudinary imageToCloudinary;
    @Autowired
    private PromotionRepository promotionRepository;

    @Override
    public List<ProductDetailReponse> getAll(FindProductDetailRequest findProductDetailRequest) {
        return productDetailRepository.getAll(findProductDetailRequest);
    }

    @Override
    @Transactional
    public ProductDetailDTO create(CreateProductDetailRequest req,
                                   List<MultipartFile> multipartFiles,
                                   List<CreateSizeData> listSize,
                                   List<Boolean> listStatusImage) throws IOException, ExecutionException, InterruptedException {
        List<Image> images = new ArrayList<>();
        List<String> imageUrls = imageToCloudinary.uploadImages(multipartFiles);
        ProductDetail add = new ProductDetail();
        add.setBrand(brandRepository.getById(req.getBrandId()));
        add.setCategory(categoryRepository.getById(req.getCategoryId()));
        add.setMaterial(materialRepository.getById(req.getMaterialId()));
        add.setSole(soleRepository.getById(req.getSoleId()));
        add.setProduct(productRepository.getOneByName(req.getProductId()));
        add.setColor(colorRepository.getOneByCode(req.getColorId()));
        add.setDescription(req.getDescription());
        add.setGender("NAM".equals(req.getGender()) ? GenderProductDetail.NAM :
                "NU".equals(req.getGender()) ? GenderProductDetail.NU : GenderProductDetail.NAM_VA_NU);
        add.setPrice(new BigDecimal(req.getPrice()));
        add.setStatus("DANG_SU_DUNG".equals(req.getStatus()) ? Status.DANG_SU_DUNG : Status.KHONG_SU_DUNG);
        productDetailRepository.save(add);

        List<SizeProductDetail> sizeProductDetails =  new ArrayList<>();
        for (CreateSizeData data : listSize) {
            SizeProductDetail sizeProductDetail = new SizeProductDetail();
            Size size = sizeRepository.getOneByName(data.getSize());
            if (size == null) {
                size = new Size();
                size.setName(data.getSize());
                size.setStatus(Status.DANG_SU_DUNG);
                sizeRepository.save(size);
            }
            sizeProductDetail.setQuantity(data.getQuantity());
            sizeProductDetail.setProductDetail(add);
            sizeProductDetail.setSize(size);
            sizeProductDetails.add(sizeProductDetail);

            // Process images for each size
            for (int i = 0; i < imageUrls.size(); i++) {
                Image image = new Image();
                String imageUrl = imageUrls.get(i);
                boolean isStarred = listStatusImage.get(i);
                image.setName(imageUrl);
                image.setStatus(isStarred);
                image.setProductDetail(add);
                images.add(image);
            }
        }

        sizeProductDetailRepository.saveAll(sizeProductDetails);
        imageRepository.saveAll(images);

        ProductDetailDTO detailDTO = new ProductDetailDTO(add); // Return the first item in the list as an example
        return detailDTO;
    }



    @Override
    public ProductDetail update(CreateProductDetailRequest req) {
        return null;
    }

    @Override
    public Boolean delete(String id) {
        Optional<ProductDetail> optional = productDetailRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        productDetailRepository.delete(optional.get());
        return true;
    }

    @Override
    public ProductDetailDTO getOneById(String id) {
        Optional<ProductDetail> optional = productDetailRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        ProductDetailDTO detailDTO = new ProductDetailDTO(optional.get());
        System.out.println(detailDTO);
        return detailDTO;
    }

    @Override
    public List<GetProductDetailByProduct> getByIdProduct(String id) {
        return productDetailRepository.getByIdProduct(id);
    }

}
