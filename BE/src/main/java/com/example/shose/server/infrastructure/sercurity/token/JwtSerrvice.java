package com.example.shose.server.infrastructure.sercurity.token;

import com.example.shose.server.entity.Account;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.net.HttpCookie;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.function.Function;

@Service
public class JwtSerrvice {

    public static final String SECRET = "QHMBQfsViR66wU3Yx/MOdkKcHdmJeRy4JdbDbrjmZdfu35Q7yzH6b3vJCrQcNgoOEFfsGyhOeF5Pby7R+YzG0w==";

    public String genetateToken(Account account) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", account.getId());
        claims.put("email", account.getUsername());
        claims.put("role", account.getRoles());
        claims.put("fullName", account.getUser().getFullName());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(account.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSiginKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String genetateRefreshToken(Map<String, Object> extractClaims,Account account) {
        extractClaims.put("id", account.getId());
        extractClaims.put("email", account.getUsername());
        extractClaims.put("role", account.getRoles());
        extractClaims.put("fullName", account.getUser().getFullName());
        return Jwts.builder()
                .setClaims(extractClaims)
                .setSubject(account.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 604800000))
                .signWith(getSiginKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // todo xác nhận quyền sở hữu
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSiginKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSiginKey() {
        byte[] key = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(key);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // todo kiểm tra hết hạn
    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }


    public Object decodeTheToken (String token , HttpServletRequest request){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET)
                .build()
                .parseClaimsJws(token)
                .getBody();

        String userName = claims.get("fullName", String.class);
        String email = claims.get("email", String.class);
        String id = claims.get("id", String.class);
        String role = claims.get("role",String.class);

        HttpSession session = request.getSession();
        session.setAttribute("fullName", claims.get("fullName", String.class));
        session.setAttribute("email", claims.get("email", String.class));
        session.setAttribute("id", claims.get("id", String.class));
        session.setAttribute("role", role);
        return session;
    }


}
