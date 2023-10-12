package com.example.shose.server.infrastructure.sercurity.token;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter  extends OncePerRequestFilter {

    private final TokenProvider jwtTokenProvider;

    @Autowired
    private TokenService tokenService;

    public JwtAuthenticationFilter(TokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = jwtTokenProvider.resolveToken(request);
//        String refreshToken = tokenService.getCachedValue();
//        if (refreshToken != null) {
        if (token != null && jwtTokenProvider.validateToken(token)) {
            Authentication authentica = jwtTokenProvider.getAuthentication(token);
            if (authentica != null) {
                SecurityContextHolder.getContext().setAuthentication(authentica);
            }
//            }
        }
        filterChain.doFilter(request, response);
    }

}
