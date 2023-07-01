package com.example.shose.server.controller;

import com.example.shose.server.service.AccountService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author Nguyễn Vinh
 */
@RestController
@RequestMapping("/account")
@CrossOrigin()
public class AccountRestController {

    @Autowired
    private AccountService accountService;

    @GetMapping()
    public ResponseObject getList() {
        return new ResponseObject(accountService.findAll());
    }

    @GetMapping("/get-email")
    public ResponseObject getOneByEmail(@RequestParam("email") String email) {
        return new ResponseObject(accountService.getOneByEmail(email));
    }
    @GetMapping("/simple-employess")
    public ResponseObject getAllSimpleEntityEmployess() {
        return new ResponseObject(accountService.getAllSimpleEntityEmployess());
    }

}
