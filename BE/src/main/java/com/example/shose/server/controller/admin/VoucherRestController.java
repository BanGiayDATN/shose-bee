package com.example.shose.server.controller.admin;

import com.example.shose.server.dto.request.voucher.CreateVoucherRequest;
import com.example.shose.server.dto.request.voucher.FindVoucherRequest;
import com.example.shose.server.dto.request.voucher.UpdateVoucherRequest;
import com.example.shose.server.dto.response.voucher.VoucherRespone;
import com.example.shose.server.entity.Voucher;
import com.example.shose.server.infrastructure.common.PageableObject;
import com.example.shose.server.service.VoucherService;
import com.example.shose.server.util.ResponseObject;
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

import java.util.List;

/*
 *  @author diemdz
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/admin/voucher")
public class VoucherRestController {
    @Autowired
    private VoucherService voucherService;

    @GetMapping()
    public ResponseObject getAll(@ModelAttribute final FindVoucherRequest findVoucherRequest) {
        return new ResponseObject(voucherService.getAll(findVoucherRequest));
    }

    @GetMapping("/{id}")
    public ResponseObject getById(@PathVariable("id") String id) {
        return new ResponseObject(voucherService.getById(id));
    }

    @PostMapping
    public ResponseObject add(@RequestBody CreateVoucherRequest request) {
        return new ResponseObject(voucherService.add(request));
    }

    @PutMapping("/{id}")
    public ResponseObject update(@PathVariable("id") String id, @RequestBody UpdateVoucherRequest request) {
        request.setId(id);
        return new ResponseObject(voucherService.update(request));
    }

    @DeleteMapping("/{id}")
    public ResponseObject delete(@PathVariable("id") String id) {
        return new ResponseObject(voucherService.delete(id));
    }

}
