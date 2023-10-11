package com.example.shose.server.controller.admin;

//import com.example.shose.server.dto.response.bill.InvoiceItemResponse;
//import com.example.shose.server.dto.response.bill.InvoiceResponse;
import com.example.shose.server.dto.request.bill.BillRequest;
import com.example.shose.server.dto.request.bill.ChangAllStatusBillByIdsRequest;
import com.example.shose.server.dto.request.bill.ChangStatusBillRequest;
import com.example.shose.server.dto.request.bill.CreateBillOfflineRequest;
import com.example.shose.server.dto.request.bill.FindNewBillCreateAtCounterRequest;
import com.example.shose.server.dto.request.bill.UpdateBillRequest;
import com.example.shose.server.service.BillService;
import com.example.shose.server.util.ResponseObject;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping("")
    public ResponseObject save(@RequestBody CreateBillOfflineRequest request, HttpServletRequest requests){
        return  new ResponseObject(billService.save(userId,requests, request));
    }

    @PutMapping("/change-status/{id}")
    public ResponseObject changStatusBill(@PathVariable("id") String id, ChangStatusBillRequest request){
        return  new ResponseObject(billService.changedStatusbill(id, userId, request));
    }

    @PutMapping("/cancel-status/{id}")
    public ResponseObject cancelStatusBill(@PathVariable("id") String id, ChangStatusBillRequest request){
        return  new ResponseObject(billService.cancelBill(id, userId, request));
    }

    @GetMapping("/details-invoices-counter")
    public ResponseObject findAllBillAtCounterAndStatusNewBill(FindNewBillCreateAtCounterRequest request) {
        return  new ResponseObject(billService.findAllBillAtCounterAndStatusNewBill(request));
    }

    @GetMapping("/count-paymet-post-paid/{id}")
    public ResponseObject countPayMentPostpaidByIdBill(@PathVariable("id") String id) {
        return  new ResponseObject(billService.countPayMentPostpaidByIdBill(id));
    }

    @PutMapping("/update-offline/{id}")
    public ResponseObject updateBillOffline(@PathVariable("id") String id, @RequestBody UpdateBillRequest request) {
        return  new ResponseObject(billService.updateBillOffline(id, request));
    }

    @PutMapping("/change-status-bill")
    public ResponseObject changeStatusAllBillByIds(@RequestBody ChangAllStatusBillByIdsRequest request, HttpServletRequest requests) {
        return  new ResponseObject(billService.changeStatusAllBillByIds(request,requests, userId));
    }

    @GetMapping("/code-bill")
    public ResponseObject CreateCodeBill() {
        return  new ResponseObject(billService.CreateCodeBill(userId));
    }

    @PutMapping("/update-bill-wait")
    public ResponseObject updateBillWait(@RequestBody CreateBillOfflineRequest request) {
        return  new ResponseObject(billService.updateBillWait(request));
    }


    @GetMapping("/invoice/{id}")
    public ResponseObject getInvoice(@PathVariable("id") String id, HttpServletRequest requests)  {
        return new ResponseObject(billService.createFilePdf(id,requests));
    }
}
