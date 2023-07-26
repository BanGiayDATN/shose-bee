package com.example.shose.server.service.impl;
/*
 *  @author diemdz
 */

import com.example.shose.server.dto.request.productdetail.IdProductDetail;
import com.example.shose.server.dto.request.promotion.CreatePromotionRequest;
import com.example.shose.server.dto.request.promotion.FindPromotionRequest;
import com.example.shose.server.dto.request.promotion.UpdatePromotionRequest;
import com.example.shose.server.dto.response.promotion.PromotionRespone;
import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.entity.Promotion;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.ProductDetailRepository;
import com.example.shose.server.repository.PromotionRepository;
import com.example.shose.server.service.PromotionService;
import com.example.shose.server.util.RandomNumberGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PromotionServiceImpl implements PromotionService {
    @Autowired
    private PromotionRepository promotionRepository;
    @Autowired
    private ProductDetailRepository productDetailRepository;

    public static void main(String[] args) {
        System.out.println(System.currentTimeMillis());

    }

    @Override
    public List<PromotionRespone> getAll(FindPromotionRequest findPromotionRequest) {
        return promotionRepository.getAllPromotion(findPromotionRequest);
    }

    @Override
    public Promotion add(CreatePromotionRequest request) {


        request.setCode(new RandomNumberGenerator().randomToString("PR"));
      Promotion promotion = Promotion.builder()
                .code(request.getCode())
                .name(request.getName())
                .value(request.getValue())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(Status.DANG_SU_DUNG).build();

        promotionRepository.save(promotion);
        for (IdProductDetail x: request.getIdProductDetails()) {
            ProductDetail productDetail  = productDetailRepository.findById(x.getId()).get();
            productDetail.setPromotion(promotionRepository.getById(promotion.getId()));
            productDetailRepository.save(productDetail);

        }
        return promotion;
    }

    @Override
    public Promotion update(UpdatePromotionRequest request) {
        Optional<Promotion> optional = promotionRepository.findById(request.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }

        Promotion promotion = optional.get();
        promotion.setCode(request.getCode());
        promotion.setName(request.getName());
        promotion.setValue(request.getValue());
        promotion.setStartDate(request.getStartDate());
        promotion.setEndDate(request.getEndDate());
        promotion.setStatus(request.getStatus());
        return promotionRepository.save(promotion);
    }


    @Override
    public Promotion getById(String id) {
        Promotion promotion = promotionRepository.findById(id).get();
        return promotion;
    }

    @Override
    public List<Promotion> expiredVoucher() {
        List<Promotion> expiredPromotions = promotionRepository.findExpiredPromotions(System.currentTimeMillis());

        for (Promotion promotion : expiredPromotions) {
            promotion.setStatus(Status.KHONG_SU_DUNG);
            promotionRepository.save(promotion);
        }
        return expiredPromotions;
    }

    @Override
    public List<Promotion> startVoucher() {
        List<Promotion> startPromotions = promotionRepository.findStartPromotions(System.currentTimeMillis());
        for (Promotion promotion : startPromotions) {
            promotion.setStatus(Status.DANG_SU_DUNG);
            promotionRepository.save(promotion);
        }
        return startPromotions;
    }
}
