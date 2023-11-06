package com.example.shose.server.controller.client;

import com.example.shose.server.dto.request.bill.ChangStatusBillRequest;
import com.example.shose.server.dto.request.bill.billaccount.CreateBillAccountOnlineRequest;
import com.example.shose.server.dto.request.bill.billcustomer.CreateBillCustomerOnlineRequest;
import com.example.shose.server.service.BillService;
import com.example.shose.server.util.ResponseObject;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

/*
 *  @author diemdz
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/client/bill")
public class BillClientRestController {
    @Autowired
    private BillService billService;

    @PostMapping("")
    public ResponseObject create(@RequestBody CreateBillCustomerOnlineRequest request)  {
        return new ResponseObject(billService.createBillCustomerOnlineRequest(request));
    }
    @PostMapping("/account")
    public ResponseObject create(@RequestBody CreateBillAccountOnlineRequest request)  {
        return new ResponseObject(billService.createBillAccountOnlineRequest(request));
    }

    @GetMapping("/{code}/{phoneNumber}")
    public ResponseObject create(@PathVariable("code") String code, @PathVariable("phoneNumber") String phoneNumber)  {
        return new ResponseObject(billService.findByCode(code, phoneNumber));
    }
    @GetMapping("/detail/{id}")
    public ResponseObject detail(@PathVariable("id") String id){
        return  new ResponseObject(billService.detail(id));
    }

//    @PutMapping("/cancel-status/{id}")
//    public ResponseObject cancelStatusBill(@PathVariable("id") String id, ChangStatusBillRequest request, HttpServletRequest requests){
//        return  new ResponseObject(billService.cancelBill(id, userId, request, requests));
//    }
}
