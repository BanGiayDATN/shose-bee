package com.example.shose.server.controller;


import com.example.shose.server.dto.request.address.CreateAddressRequest;
import com.example.shose.server.dto.request.customer.CreateCustomerRequest;
import com.example.shose.server.dto.request.customer.FindCustomerRequest;
import com.example.shose.server.dto.request.employee.CreateEmployeeRequest;
import com.example.shose.server.dto.request.employee.FindEmployeeRequest;
import com.example.shose.server.dto.request.employee.UpdateEmployeeRequest;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.service.CustomerService;
import com.example.shose.server.service.EmployeeService;
import com.example.shose.server.util.ResponseObject;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author Phuong Oanh
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/admin/customer")
public class CustomerRestController {

    @Autowired
    private CustomerService customerService;

    @GetMapping()
    public ResponseObject view(final FindEmployeeRequest req) {
        return new ResponseObject(customerService.findAll(req));
    }

    @GetMapping("/search-date")
    public ResponseObject searchDate(final FindEmployeeRequest rep) {
        return new ResponseObject(customerService.searchDate(rep));
    }

    @PostMapping
    public ResponseObject add(@RequestParam("request") String req,
                              @RequestParam("multipartFile") MultipartFile file) {

        JsonObject jsonObject = JsonParser.parseString(req).getAsJsonObject();

        // add khách hàng
        CreateCustomerRequest customerRequest = new CreateCustomerRequest();
        customerRequest.setFullName(jsonObject.get("fullName").getAsString());
        customerRequest.setPhoneNumber(jsonObject.get("phoneNumber").getAsString());
        customerRequest.setEmail(jsonObject.get("email").getAsString());
        customerRequest.setGender(Boolean.valueOf(jsonObject.get("gender").getAsString()));
        customerRequest.setStatus(Status.valueOf(jsonObject.get("status").getAsString()));
        customerRequest.setDateOfBirth(Long.valueOf(jsonObject.get("dateOfBirth").getAsString()));

        // add địa chỉ
        CreateAddressRequest addressRequest = new CreateAddressRequest();
        addressRequest.setLine(jsonObject.get("line").getAsString());
        addressRequest.setProvince(jsonObject.get("province").getAsString());
        addressRequest.setDistrict(jsonObject.get("district").getAsString());
        addressRequest.setWerd(jsonObject.get("werd").getAsString());

        return new ResponseObject(customerService.create(customerRequest,addressRequest,file));
    }
    @GetMapping("/{id}")
    public ResponseObject getOneById(@PathVariable("id") String id) {
        return new ResponseObject(customerService.getOneById(id));
    }
    @PutMapping("/{id}")
    public ResponseObject update(@PathVariable("id") String id,
                                 @RequestBody UpdateEmployeeRequest req) {
        req.setId(id);
        return new ResponseObject(customerService.update(req));
    }

}
