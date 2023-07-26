package com.example.shose.server.controller;

import com.example.shose.server.dto.request.paymentsmethod.CreatePaymentsMethodRequest;
import com.example.shose.server.service.PaymentsMethodService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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

    @GetMapping("/total-money/{id}")
    public ResponseObject sumTotalMoneyByIdBill(@PathVariable("id")  String idBill){
        return  new ResponseObject(paymentsMethodService.sumTotalMoneyByIdBill(idBill));
    }

}
