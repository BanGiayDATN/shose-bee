package com.example.shose.server.service.impl;

import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.User;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.infrastructure.sercurity.auth.JwtAuhenticationResponse;
import com.example.shose.server.infrastructure.sercurity.auth.RefreshTokenRequets;
import com.example.shose.server.infrastructure.sercurity.auth.SignUpRequets;
import com.example.shose.server.infrastructure.sercurity.auth.SigninRequest;
import com.example.shose.server.infrastructure.sercurity.token.JwtSerrvice;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.repository.UserReposiory;
import com.example.shose.server.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AccountRepository accountRepository;

    private final UserReposiory userReposiory;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtSerrvice jwtSerrvice;

    @Override
    public String signUp(SignUpRequets signUpRequets) {
        User user = new User();
        userReposiory.save(user);

        Account account = new Account();
        account.setEmail(signUpRequets.getEmail());
        account.setRoles(signUpRequets.getRoles());
        account.setUser(user);
        account.setStatus(Status.DANG_SU_DUNG);
        account.setPassword(passwordEncoder.encode(signUpRequets.getPassword()));
        accountRepository.save(account);
        return "Người dùng đã được thêm vào hệ thống";
    }

    @Override
    public JwtAuhenticationResponse singIn(SigninRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),request.getPassword()
        ));
        var account = accountRepository.findByEmail(request.getEmail())
                .orElseThrow(()->new RestApiException("Email hoặc mật khẩu không hợp lệ."));
        var jwt = jwtSerrvice.genetateToken(account);
        var refreshToken = jwtSerrvice.genetateRefreshToken(new HashMap<>(), account);

        return JwtAuhenticationResponse.builder()
                .refreshToken(refreshToken)
                .token(jwt)
                .build();
    }

    @Override
    public JwtAuhenticationResponse refreshToken(RefreshTokenRequets refresh) {
        String userEmail = jwtSerrvice.extractUserName(refresh.getToken());
        Account account = accountRepository.findByEmail(userEmail).orElseThrow();
        if(jwtSerrvice.isTokenValid(refresh.getToken(), account)){
            var  jwt = jwtSerrvice.genetateToken(account);
            return JwtAuhenticationResponse.builder()
                    .refreshToken(refresh.getToken())
                    .token(jwt)
                    .build();
        }
        return null;
    }
}
