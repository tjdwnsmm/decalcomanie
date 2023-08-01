package com.eightlow.decalcomanie.auth.jwt;

import com.eightlow.decalcomanie.auth.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final String secretKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

        logger.info("Authorization : " + authorization);

        if(authorization == null || !authorization.startsWith("Bearer ")) {
            logger.error("Authorization을 잘못 보냈습니다");
            filterChain.doFilter(request, response);
            return;
        }

        // Token 꺼내기
        String token = authorization.split(" ")[1];

//        // Token Expired 여부 검사
//        if(JwtUtils.isExpired(token, secretKey)) {
//            logger.error("토큰이 만료되었습니다");
//            filterChain.doFilter(request, response);
//            return;
//        }
        try {
            String userName = JwtUtils.getUserName(token, secretKey);
            logger.info("userName : " + userName);

            // 권한 부여
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userName, null, List.of(new SimpleGrantedAuthority("USER")));

            // 상세정보 추가
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);
        } catch (IllegalArgumentException e) {
            logger.error("an error occured during getting username from token", e);
            // JwtException (custom exception) 예외 발생시키기
            throw new JwtException("유효하지 않은 토큰");
        } catch (ExpiredJwtException e) {
            logger.warn("the token is expired and not valid anymore", e);
            throw new JwtException("토큰 기한 만료");
        } catch(SignatureException e){
            logger.error("Authentication Failed. Username or Password not valid.");
            throw new JwtException("사용자 인증 실패");
        }

    }
}
