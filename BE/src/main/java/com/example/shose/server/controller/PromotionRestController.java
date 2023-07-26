package com.example.shose.server.controller;

import com.example.shose.server.dto.request.promotion.CreatePromotionRequest;
import com.example.shose.server.dto.request.promotion.FindPromotionRequest;
import com.example.shose.server.dto.request.promotion.UpdatePromotionRequest;
import com.example.shose.server.service.PromotionService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 *  @author diemdz
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/admin/promotion")
public class PromotionRestController {
    @Autowired
    private PromotionService promotionService;

    @GetMapping()
    public ResponseObject getAll(@ModelAttribute final FindPromotionRequest findPromotionRequest) {
        return new ResponseObject(promotionService.getAll(findPromotionRequest));
    }

    @GetMapping("/{id}")
    public ResponseObject getById(@PathVariable("id") String id) {
        return new ResponseObject(promotionService.getById(id));
    }

    @PostMapping
    public ResponseObject add(@RequestBody CreatePromotionRequest request) {
        return new ResponseObject(promotionService.add(request));
    }

    @PutMapping("/{id}")
    public ResponseObject update(@PathVariable("id") String id, @RequestBody UpdatePromotionRequest request) {
        request.setId(id);
        return new ResponseObject(promotionService.update(request));
    }
}
