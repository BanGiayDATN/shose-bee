package com.example.shose.server.controller;

import com.example.shose.server.service.BillDetailService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author thangdt
 */

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/bill-detail")
public class BillDetailRestController {

    @Autowired
    private BillDetailService billDetailService;

    @GetMapping("/{id}")
    public ResponseObject findAllByIdBill(@PathVariable("id") String id){
        return  new ResponseObject(billDetailService.findAllByIdBill(id));
    }
}
