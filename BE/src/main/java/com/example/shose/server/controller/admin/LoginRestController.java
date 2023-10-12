package com.example.shose.server.controller.admin;

import com.example.shose.server.entity.Account;
import com.example.shose.server.infrastructure.sercurity.logindto.LoginRequest;
import com.example.shose.server.infrastructure.sercurity.logindto.ResetPassword;
import com.example.shose.server.infrastructure.sercurity.token.TokenService;
import com.example.shose.server.service.LoginService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/login")
public class LoginRestController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping()
    public ResponseObject authentication (LoginRequest request){
        return new ResponseObject(loginService.getOneByEmailAndPass(request));
    }

    @GetMapping("/rest-password")
    public ResponseObject restPassword (ResetPassword resetPassword){
        return new ResponseObject(loginService.resetPassword(resetPassword));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody Account account) {
        if (loginService.add(account)) {
            return ResponseEntity.ok().body(true);
        }
        return ResponseEntity.badRequest().body(false);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequest loginRequest) {
        try {
            // Xác thực thông tin đăng nhập
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return ResponseEntity.ok().body(tokenService.generateTokens(authentication));
        } catch (AuthenticationException ex) {
            ex.printStackTrace();
            return ResponseEntity.badRequest().body(ex);
        }
    }
}
