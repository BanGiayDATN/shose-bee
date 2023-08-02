package com.example.shose.server.service.impl;

import com.example.shose.server.dto.ProductDetailDTO;
import com.example.shose.server.dto.request.productdetail.CreateProductDetailRequest;
import com.example.shose.server.dto.request.productdetail.CreateSizeData;
import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.dto.request.productdetail.UpdateProductDetailRequest;
import com.example.shose.server.dto.response.ProductDetailReponse;
import com.example.shose.server.dto.response.productdetail.GetProductDetailByProduct;
import com.example.shose.server.entity.Color;
import com.example.shose.server.entity.Image;
import com.example.shose.server.entity.Product;
import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.entity.Size;
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
import com.example.shose.server.repository.SizeRepository;
import com.example.shose.server.repository.SoleRepository;
import com.example.shose.server.service.ProductDetailService;
import com.example.shose.server.util.RandomNumberGenerator;
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
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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
                                   List<Boolean> listStatusImage,
                                   List<String> listColor) throws IOException, ExecutionException, InterruptedException {
        Product product = productRepository.getOneByName(req.getProductId());
        if (product == null) {
            product = new Product();
            product.setCode(new RandomNumberGenerator().randomToString("SP", 1500000000));
            product.setName(req.getProductId());
            product.setStatus(Status.DANG_SU_DUNG);
            productRepository.save(product);
        }

        List<String> imageUrls = imageToCloudinary.uploadImages(multipartFiles);
        ProductDetail add = new ProductDetail();
        add.setBrand(brandRepository.getById(req.getBrandId()));
        add.setCategory(categoryRepository.getById(req.getCategoryId()));
        add.setMaterial(materialRepository.getById(req.getMaterialId()));
        add.setSole(soleRepository.getById(req.getSoleId()));
        add.setProduct(product);
        add.setDescription(req.getDescription());
        add.setGender(getGenderProductDetail(req.getGender()));
        add.setPrice(new BigDecimal(req.getPrice()));
        add.setStatus(getStatus(req.getStatus()));
        productDetailRepository.save(add);

        // Process images for each size
        List<Image> imagesToAdd = IntStream.range(0, imageUrls.size())
                .parallel()
                .mapToObj(i -> {
                    Image image = new Image();
                    String imageUrl = imageUrls.get(i);
                    boolean isStarred = listStatusImage.get(i);
                    image.setName(imageUrl);
                    image.setStatus(isStarred);
                    image.setProductDetail(add);
                    return image;
                })
                .collect(Collectors.toList());
        imageRepository.saveAll(imagesToAdd);

        ProductDetailDTO detailDTO = new ProductDetailDTO(add);
        return detailDTO;
    }

    @Override
    public ProductDetailDTO update(UpdateProductDetailRequest req,
                                   List<MultipartFile> multipartFiles,
                                   List<CreateSizeData> listSize,
                                   List<Boolean> listStatusImage,
                                   List<String> listColor) throws IOException, ExecutionException, InterruptedException {
        Optional<ProductDetail> optional = productDetailRepository.findById(req.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        Product product = productRepository.getOneByName(req.getProductId());
        if (product == null) {
            product = new Product();
            product.setCode(new RandomNumberGenerator().randomToString("SP", 1500000000));
            product.setName(req.getProductId());
            product.setStatus(Status.DANG_SU_DUNG);
            productRepository.save(product);
        }
        ProductDetail update = optional.get();
        update.setBrand(brandRepository.getById(req.getBrandId()));
        update.setCategory(categoryRepository.getById(req.getCategoryId()));
        update.setMaterial(materialRepository.getById(req.getMaterialId()));
        update.setSole(soleRepository.getById(req.getSoleId()));
        update.setProduct(product);
        update.setDescription(req.getDescription());
        update.setGender(getGenderProductDetail(req.getGender()));
        update.setPrice(new BigDecimal(req.getPrice()));
        update.setStatus(getStatus(req.getStatus()));
        productDetailRepository.save(update);


        List<Image> existingImagesDetail = imageRepository.getAllByIdProductDetail(req.getId());
        imageRepository.deleteAll(existingImagesDetail);

        // Process images for each size
        List<String> imageUrls = imageToCloudinary.uploadImages(multipartFiles);
        List<Image> imagesToAdd = IntStream.range(0, imageUrls.size())
                .parallel()
                .mapToObj(i -> {
                    Image image = new Image();
                    String imageUrl = imageUrls.get(i);
                    boolean isStarred = listStatusImage.get(i);
                    image.setName(imageUrl);
                    image.setStatus(isStarred);
                    image.setProductDetail(update);
                    return image;
                })
                .collect(Collectors.toList());
        imageRepository.saveAll(imagesToAdd);

        ProductDetailDTO detailDTO = new ProductDetailDTO(update);
        return detailDTO;
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

    private GenderProductDetail getGenderProductDetail(String gender) {
        switch (gender) {
            case "NAM":
                return GenderProductDetail.NAM;
            case "NU":
                return GenderProductDetail.NU;
            default:
                return GenderProductDetail.NAM_VA_NU;
        }
    }

    private Status getStatus(String status) {
        return "DANG_SU_DUNG".equals(status) ? Status.DANG_SU_DUNG : Status.KHONG_SU_DUNG;
    }
}
