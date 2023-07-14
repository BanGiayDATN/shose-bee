package com.example.shose.server.controller;

import com.example.shose.server.dto.request.voucher.CreateVoucherRequest;
import com.example.shose.server.dto.request.voucher.FindVoucherRequest;
import com.example.shose.server.dto.request.voucher.UpdateVoucherRequest;
import com.example.shose.server.dto.response.voucher.VoucherRespone;
import com.example.shose.server.entity.Voucher;
import com.example.shose.server.infrastructure.common.PageableObject;
import com.example.shose.server.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/admin/voucher/")
public class VoucherRestController {
    @Autowired
    private VoucherService voucherService;

    @GetMapping("list")
    public PageableObject<VoucherRespone> getAll(@ModelAttribute final FindVoucherRequest findVoucherRequest) {
        return voucherService.getAll(findVoucherRequest);
    }

    @GetMapping("{id}")
    public Voucher getById(@PathVariable("id") String id) {
        return voucherService.getById(id);
    }

    @PostMapping("add")
    public Voucher add(@RequestBody CreateVoucherRequest request) {
        return voucherService.add(request);
    }

    @PutMapping("update/{id}")
    public Voucher update(@PathVariable("id") String id, @RequestBody UpdateVoucherRequest request) {
        request.setId(id);
        return voucherService.update(request);
    }

    @DeleteMapping("delete/{id}")
    public Boolean delete(@PathVariable("id") String id) {

        return voucherService.delete(id);
    }
}
