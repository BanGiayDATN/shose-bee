package com.example.shose.server.controller;

import com.example.shose.server.dto.request.paymentsmethod.CreatePaymentsMethodRequest;
import com.example.shose.server.service.PaymentsMethodService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * @author thangdt
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/admin/payment")
public class PaymentsMethodRestController {

    @Value("${user}")
    private String userId;

    @Autowired
    private PaymentsMethodService paymentsMethodService;

    @GetMapping("/bill/{id}")
    public ResponseObject findByIdBill(@PathVariable("id") String id){
        return  new ResponseObject(paymentsMethodService.findByAllIdBill(id));
    }

    @PostMapping("/bill/{id}")
    public ResponseObject create(@PathVariable("id") String id, @RequestBody CreatePaymentsMethodRequest request){
        return  new ResponseObject(paymentsMethodService.create(id, userId, request));
    }

    @GetMapping("/total-money/{id}")
    public ResponseObject sumTotalMoneyByIdBill(@PathVariable("id")  String idBill){
        return  new ResponseObject(paymentsMethodService.sumTotalMoneyByIdBill(idBill));
    }

    @PutMapping("/update-status")
    public ResponseObject sumTotalMoneyByIdBill(@RequestBody() List<String> ids){
        return  new ResponseObject(paymentsMethodService.updatepayMent(ids));
    }

}
