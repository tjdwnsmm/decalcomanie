package com.eightlow.decalcomanie.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

public class JwtUtils {
    public static String getUserName(String token, String secretKey) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                .getBody().get("userName", String.class);
    }

    public static String createJwt(String userName, String userId, String secretKey, int expiredMs) {
        Claims claims = Jwts.claims();
        claims.put("userName", userName);
        claims.put("uuid", userId);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs*1000L))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}
