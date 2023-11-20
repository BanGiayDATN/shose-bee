package com.example.shose.server.controller.admin;

import com.example.shose.server.dto.request.bill.BillRequest;
import com.example.shose.server.dto.request.bill.ChangAllStatusBillByIdsRequest;
import com.example.shose.server.dto.request.bill.ChangStatusBillRequest;
import com.example.shose.server.dto.request.bill.ChangeAllEmployeeRequest;
import com.example.shose.server.dto.request.bill.ChangeEmployeeRequest;
import com.example.shose.server.dto.request.bill.CreateBillOfflineRequest;
import com.example.shose.server.dto.request.bill.FindNewBillCreateAtCounterRequest;
import com.example.shose.server.dto.request.bill.UpdateBillRequest;
import com.example.shose.server.dto.request.billgiveback.UpdateBillDetailGiveBack;
import com.example.shose.server.dto.request.billgiveback.UpdateBillGiveBack;
import com.example.shose.server.dto.request.productdetail.CreateProductDetailRequest;
import com.example.shose.server.infrastructure.session.ShoseSession;
import com.example.shose.server.service.BillService;
import com.example.shose.server.util.ResponseObject;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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


    @Autowired
    private ShoseSession shoseSession;


    @GetMapping
    public ResponseObject getAll(BillRequest request){
        return  new ResponseObject(billService.getAll(shoseSession.getEmployee().getId(),request));
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
    public ResponseObject save(@RequestBody CreateBillOfflineRequest request){
        return  new ResponseObject(billService.save(shoseSession.getEmployee().getId(), request));
    }

    @PutMapping("/change-status/{id}")
    public ResponseObject changStatusBill(@PathVariable("id") String id, ChangStatusBillRequest request){
        return  new ResponseObject(billService.changedStatusbill(id, shoseSession.getEmployee().getId(), request));
    }

    @PutMapping("/cancel-status/{id}")
    public ResponseObject cancelStatusBill(@PathVariable("id") String id, ChangStatusBillRequest request){
        return  new ResponseObject(billService.cancelBill(id, shoseSession.getEmployee().getId(), request));
    }

    @GetMapping("/details-invoices-counter")
    public ResponseObject findAllBillAtCounterAndStatusNewBill(FindNewBillCreateAtCounterRequest request) {
        return  new ResponseObject(billService.findAllBillAtCounterAndStatusNewBill(shoseSession.getEmployee().getId(), request));
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
    public ResponseObject changeStatusAllBillByIds(@RequestBody ChangAllStatusBillByIdsRequest request) {
        return  new ResponseObject(billService.changeStatusAllBillByIds(request, shoseSession.getEmployee().getId()));
    }

    @GetMapping("/code-bill")
    public ResponseObject CreateCodeBill() {
        return  new ResponseObject(billService.CreateCodeBill(shoseSession.getEmployee().getId()));
    }

    @PutMapping("/update-bill-wait")
    public ResponseObject updateBillWait(@RequestBody CreateBillOfflineRequest request) {
        return  new ResponseObject(billService.updateBillWait(request));
    }


    @GetMapping("/invoice/{id}")
    public ResponseObject getInvoice(@PathVariable("id") String id)  {
        return new ResponseObject(billService.createFilePdf(id));
    }


    @PutMapping("/change-all-employee")
    public ResponseObject ChangeAllEmployeeInBill(@RequestBody ChangeAllEmployeeRequest request) {
        return  new ResponseObject(billService.ChangeAllEmployee(shoseSession.getEmployee().getId(), request));
    }

    @PutMapping("/change-employee")
    public ResponseObject ChangeEmployeeInBill(@RequestBody ChangeEmployeeRequest request) {
        return  new ResponseObject(billService.ChangeEmployee(shoseSession.getEmployee().getId(), request));
    }

    @GetMapping("/give-back-information")
    public ResponseObject BillGiveBackInformation (@RequestParam("codeBill") String codeBill){
        return new ResponseObject(billService.getBillGiveBackInformation(codeBill));
    }

    @GetMapping("/give-back")
    public ResponseObject BillGiveBack (@RequestParam("idBill") String ibBill){
        return new ResponseObject(billService.getBillGiveBack(ibBill));
    }

    @PostMapping("/give-back")
    public ResponseObject UpdateBillGiveBack (@RequestParam("updateBill") String updateBill,
                                              @RequestParam("data") String data){

        Gson gson = new Gson();
        UpdateBillGiveBack updateBillGiveBack = gson.fromJson(updateBill, UpdateBillGiveBack.class);

        JsonArray jsonData = JsonParser.parseString(data).getAsJsonArray();
        List<UpdateBillDetailGiveBack> listDataBillDetail =  new ArrayList<>();
        for (JsonElement dataBillDetail : jsonData) {
            UpdateBillDetailGiveBack detail = gson.fromJson(dataBillDetail, UpdateBillDetailGiveBack.class);
            listDataBillDetail.add(detail);
        }
        System.out.println(listDataBillDetail);
        return new ResponseObject(billService.UpdateBillGiveBack(updateBillGiveBack, listDataBillDetail));
//        return null;
    }

}
