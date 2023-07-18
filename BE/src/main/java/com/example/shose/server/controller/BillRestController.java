package com.example.shose.server.controller;

import com.example.shose.server.dto.request.bill.BillRequest;
import com.example.shose.server.dto.request.bill.ChangStatusBillRequest;
import com.example.shose.server.dto.request.bill.FindNewBillCreateAtCounterRequest;
import com.example.shose.server.dto.request.bill.UpdateBillRequest;
import com.example.shose.server.service.BillService;
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
@RequestMapping("/admin/bill")
public class BillRestController {

    @Autowired
    private BillService billService;

    @Value("${user}")
    private String userId;


    @GetMapping
    public ResponseObject getAll(BillRequest request){
        return  new ResponseObject(billService.getAll(request));
    }

    @GetMapping("/detail/{id}")
    public ResponseObject detail(@PathVariable("id") String id){
        return  new ResponseObject(billService.detail(id));
    }

    @GetMapping("/user-bill")
    public ResponseObject getAllUserInBill(){
        return  new ResponseObject(billService.getAllUserInBill());
    }

    @PostMapping("/offline")
    public ResponseObject saveOffline(){
        return  new ResponseObject(billService.saveOffline(userId));
    }

    @PutMapping("/change-status/{id}")
    public ResponseObject changStatusBill(@PathVariable("id") String id, ChangStatusBillRequest request){
        return  new ResponseObject(billService.changedStatusbill(id, request));
    }

    @PutMapping("/cancel-status/{id}")
    public ResponseObject cancelStatusBill(@PathVariable("id") String id, ChangStatusBillRequest request){
        return  new ResponseObject(billService.cancelBill(id, request));
    }

    @GetMapping("/details-invoices-counter")
    public ResponseObject findAllBillAtCounterAndStatusNewBill(FindNewBillCreateAtCounterRequest request) {
        return  new ResponseObject(billService.findAllBillAtCounterAndStatusNewBill(request));
    }

    @PutMapping("/update-offline/{id}")
    public ResponseObject updateBillOffline(@PathVariable("id") String id, @RequestBody UpdateBillRequest request) {
        return  new ResponseObject(billService.updateBillOffline(id, request));
    }

}
