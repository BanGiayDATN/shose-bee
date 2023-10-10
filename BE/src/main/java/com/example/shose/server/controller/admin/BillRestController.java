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
    public ResponseObject save(@RequestBody CreateBillOfflineRequest request){
        return  new ResponseObject(billService.save(userId, request));
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
    public ResponseObject changeStatusAllBillByIds(@RequestBody ChangAllStatusBillByIdsRequest request) {
        return  new ResponseObject(billService.changeStatusAllBillByIds(request, userId));
    }

    @GetMapping("/code-bill")
    public ResponseObject CreateCodeBill() {
        return  new ResponseObject(billService.CreateCodeBill(userId));
    }

    @PutMapping("/update-bill-wait")
    public ResponseObject updateBillWait(@RequestBody CreateBillOfflineRequest request) {
        return  new ResponseObject(billService.updateBillWait(request));
    }

//    @Autowired
//    private SpringTemplateEngine thymeleafTemplateEngine;
//
//    @GetMapping("/invoice")
//    public String getInvoice() throws IOException {
//        // Tạo hóa đơn PDF
//        String workingDir = System.getProperty("user.dir");
//
//        Context thymeleafContext = new Context();
//
//
//        InvoiceResponse invoice = new InvoiceResponse();
//        invoice.setCustomerName("Nguyễn Văn A");
//        invoice.setCustomerAddress("Số 100, Đường Nguyễn Thị Minh Khai, Quận 1, Thành phố Hồ Chí Minh");
//        invoice.setCustomerPhone("0987654321");
//        invoice.setCustomerEmail("nguyenvana@gmail.com");
//
//        List<InvoiceItemResponse> items = new ArrayList<>();
//        items.add(new InvoiceItemResponse("Máy tính", 1, new BigDecimal("20000000")));
//        items.add(new InvoiceItemResponse("Điện thoại", 2,  new BigDecimal("20000000")));
//        invoice.setItems(items);
//        Map<String, Object> model = new HashMap<>();
//        model.put("invoice", invoice);
//        thymeleafContext.setVariables(model);
//        String html =  thymeleafTemplateEngine.process(workingDir+"\\src\\main\\resources\\template\\static\\templateBill.html", thymeleafContext);
//
//        File htmlSource = new File(workingDir+"/src/main/resources/template/static/templateBill.html");
//        File pdfDest = new File("output.pdf");
//        // pdfHTML specific code
//        ConverterProperties converterProperties = new ConverterProperties();
//        HtmlConverter.convertToPdf(new FileInputStream(htmlSource),
//                new FileOutputStream(pdfDest), converterProperties);
//
//        // Trả về hóa đơn PDF
//        return "ok";
//    }
}
