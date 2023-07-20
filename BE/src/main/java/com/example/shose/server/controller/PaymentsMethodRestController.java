package com.example.shose.server.controller;

import com.example.shose.server.dto.request.paymentsmethod.CreatePaymentsMethodRequest;
import com.example.shose.server.repository.PaymentsMethodRepository;
import com.example.shose.server.service.PaymentsMethodService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author thangdt
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/admin/payment")
public class PaymentsMethodRestController {

    @Autowired
    private PaymentsMethodService paymentsMethodService;

    @GetMapping("/bill/{id}")
    public ResponseObject findByIdBill(@PathVariable("id") String id){
        return  new ResponseObject(paymentsMethodService.findByAllIdBill(id));
    }

    @PostMapping("/bill/{id}")
    public ResponseObject create(@PathVariable("id") String id, @RequestBody CreatePaymentsMethodRequest request){
        return  new ResponseObject(paymentsMethodService.create(id, request));
    }

}
