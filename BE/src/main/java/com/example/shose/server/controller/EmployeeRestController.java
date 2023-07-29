package com.example.shose.server.controller;


import com.example.shose.server.dto.request.employee.CreateEmployeeRequest;
import com.example.shose.server.dto.request.employee.FindEmployeeRequest;
import com.example.shose.server.dto.request.employee.UpdateEmployeeRequest;
import com.example.shose.server.infrastructure.cloudinary.UploadImageToCloudinary;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.service.EmployeeService;
import com.example.shose.server.util.ResponseObject;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import jakarta.mail.MessagingException;
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
@RequestMapping("/admin/employee")
public class EmployeeRestController {
    @Autowired
    private EmployeeService userService;


    @GetMapping()
    public ResponseObject view(final FindEmployeeRequest req) {
        return new ResponseObject(userService.findAll(req));
    }

    @GetMapping("/search-date")
    public ResponseObject searchDate(final FindEmployeeRequest rep) {
        return new ResponseObject(userService.searchDate(rep));
    }

    @PostMapping
    public ResponseObject add(@RequestBody CreateEmployeeRequest req) throws MessagingException {
        return new ResponseObject(userService.create(req));
    }

    @GetMapping("/{id}")
    public ResponseObject getOneById(@PathVariable("id") String id) {
        return new ResponseObject(userService.getOneById(id));
    }

    @PutMapping("/{id}")
    public ResponseObject update(@PathVariable("id") String id,
                                 @RequestBody UpdateEmployeeRequest req) {
        req.setId(id);
        return new ResponseObject(userService.update(req));
    }

    @DeleteMapping("/{id}")
    public ResponseObject delete(@PathVariable("id") String id) {
        return new ResponseObject(userService.delete(id));
    }
}
