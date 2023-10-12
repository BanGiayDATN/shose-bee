package com.example.shose.server.infrastructure.sercurity.config;

import com.example.shose.server.entity.Account;
import com.example.shose.server.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public class CustiomUserDetailService implements UserDetailsService {

    @Autowired
    private AccountRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> optional = repository.findByEmail(username);
        return optional.map(CustomUserDetail::new).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản"));
    }
}
