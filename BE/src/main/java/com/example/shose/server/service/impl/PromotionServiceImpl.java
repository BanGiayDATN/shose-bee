package com.example.shose.server.service.impl;
/*
 *  @author diemdz
 */

import com.example.shose.server.dto.request.productdetail.IdProductDetail;
import com.example.shose.server.dto.request.promotion.CreatePromotionRequest;
import com.example.shose.server.dto.request.promotion.FindPromotionRequest;
import com.example.shose.server.dto.request.promotion.UpdatePromotionRequest;
import com.example.shose.server.dto.response.promotion.PromotionByIdRespone;
import com.example.shose.server.dto.response.promotion.PromotionByProDuctDetail;
import com.example.shose.server.dto.response.promotion.PromotionRespone;
import com.example.shose.server.entity.Promotion;
import com.example.shose.server.entity.PromotionProductDetail;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.ProductDetailRepository;
import com.example.shose.server.repository.PromotionProductDetailRepository;
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
    @Autowired
    private PromotionProductDetailRepository promotionProductDetailRepository;

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
        for (IdProductDetail x : request.getIdProductDetails()) {
            PromotionProductDetail promotionProductDetail = new PromotionProductDetail();
            promotionProductDetail.setPromotion(promotion);
            promotionProductDetail.setProductDetail(productDetailRepository.findById(x.getId()).get());
            promotionProductDetail.setStatus(Status.DANG_SU_DUNG);
            promotionProductDetailRepository.save(promotionProductDetail);

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
        promotion.setName(request.getName());
        promotion.setValue(request.getValue());
        promotion.setStartDate(request.getStartDate());
        promotion.setEndDate(request.getEndDate());
        promotion.setStatus(request.getStatus());
        promotionRepository.save(promotion);

        PromotionByIdRespone promotionByIdRespone = promotionRepository.getByIdPromotion(request.getId());

        for (String idProductDetailOld : promotionByIdRespone.getProductDetailUpdate().split(",")) {
            boolean foundInNew = false;


            for (IdProductDetail idProductDetailNew : request.getIdProductDetails()) {
                if (idProductDetailNew.getId().contains(idProductDetailOld)) {
                    foundInNew = true;
                    break;
                }
            }

            if (!foundInNew) {
                PromotionProductDetail promotionProductDetail = promotionProductDetailRepository.getByProductDetailAndPromotion(idProductDetailOld, promotionByIdRespone.getId());
                promotionProductDetail.setStatus(Status.KHONG_SU_DUNG);
                promotionProductDetailRepository.save(promotionProductDetail);
            }else{
                PromotionProductDetail promotionProductDetail = promotionProductDetailRepository.getByProductDetailAndPromotion(idProductDetailOld, promotionByIdRespone.getId());
                promotionProductDetail.setStatus(Status.DANG_SU_DUNG);
                promotionProductDetailRepository.save(promotionProductDetail);
            }
        }

        for (IdProductDetail idProductDetailNew : request.getIdProductDetails()) {
            boolean foundInOld = false;

            for (String idProductDetailOld : promotionByIdRespone.getProductDetailUpdate().split(",")) {
                if (idProductDetailOld.contains(idProductDetailNew.getId())) {
                    foundInOld = true;
                    break;
                }
            }

            if (!foundInOld) {
                PromotionProductDetail promotionProductDetail = new PromotionProductDetail();
                promotionProductDetail.setPromotion(promotion);
                promotionProductDetail.setProductDetail(productDetailRepository.findById(idProductDetailNew.getId()).get());
                promotionProductDetail.setStatus(Status.DANG_SU_DUNG);
                promotionProductDetailRepository.save(promotionProductDetail);
            }
        }
        return promotion;
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

    @Override
    public PromotionByIdRespone getByIdPromotion(String id) {
        return promotionRepository.getByIdPromotion(id);
    }

    @Override
    public List<PromotionByProDuctDetail> getByIdProductDetail(String id) {
        return promotionRepository.getByIdProductDetail(id);
    }
}
