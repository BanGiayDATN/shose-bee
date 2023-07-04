package com.example.shose.server.controller;


import com.example.shose.server.dto.request.employee.CreateEmployeeRequest;
import com.example.shose.server.dto.request.employee.FindEmployeeRequest;
import com.example.shose.server.dto.request.employee.UpdateEmployeeRequest;
import com.example.shose.server.service.EmployeeService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Phuong Oanh
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/admin/user")
public class EmployeeRestController {
    @Autowired
    private EmployeeService userService;

    @GetMapping("/index")
    public ResponseObject getAll (){
        return new ResponseObject(userService.getAll());
    }

    @GetMapping()
    public ResponseObject view(final FindEmployeeRequest req) {
        return new ResponseObject(userService.findAll(req));
    }
    @GetMapping("/search")
    public ResponseObject search(final FindEmployeeRequest rep) {
        return new ResponseObject(userService.search(rep));
    }
    @PostMapping
    public ResponseObject add(@RequestBody CreateEmployeeRequest req) {
        return new ResponseObject(userService.create(req));
    }
    @PutMapping("/{id}")
    public ResponseObject update (@PathVariable("id") String id ,
                                  @RequestBody UpdateEmployeeRequest req){
        req.setId(id);
        return new ResponseObject(userService.update(req));
    }
    @DeleteMapping("/{id}")
    public ResponseObject delete(@PathVariable("id") String id) {
        return new ResponseObject(userService.delete(id));
    }
}
