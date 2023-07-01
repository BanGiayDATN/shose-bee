package com.example.shose.server.controller;

import com.example.shose.server.request.bill.BillRequest;
import com.example.shose.server.service.BillService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author thangdt
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/admin/bill")
public class BillRestController {

    @Autowired
    private BillService billService;

    @GetMapping
    public ResponseObject getAll(BillRequest request){
        return  new ResponseObject(billService.getAll(request));
    }

    @GetMapping("/user-bill")
    public ResponseObject getAllUserInBill(){
        return  new ResponseObject(billService.getAllUserInBill());
    }
}
