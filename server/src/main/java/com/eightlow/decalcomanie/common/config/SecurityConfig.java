package com.eightlow.decalcomanie.common.config;

import com.eightlow.decalcomanie.auth.jwt.JwtExceptionFilter;
import com.eightlow.decalcomanie.auth.jwt.JwtFilter;
import com.eightlow.decalcomanie.auth.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final JwtService jwtService;
    private final JwtExceptionFilter jwtExceptionFilter;
    private final CorsConfig corsConfig;

    @Value("${jwt.secret}")
    private String secretKey;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .addFilter(corsConfig.corsFilter())
                .httpBasic().disable()
                .csrf().disable()
                .authorizeRequests()
<<<<<<< HEAD
<<<<<<< HEAD
//                .antMatchers("/**").permitAll()
                .antMatchers("/oauth/**").permitAll()
                .anyRequest().authenticated()
=======
                //.antMatchers("/oauth/**").permitAll()
                .antMatchers("/**").permitAll()
                //.anyRequest().authenticated()
>>>>>>> bd54f7e ([S09P12A708-307 #32] feat: recommand user perfume api test)
=======
                //.antMatchers("/oauth/**").permitAll()
                .antMatchers("/**").permitAll()
                //.anyRequest().authenticated()
=======
//                .antMatchers("/**").permitAll()
                .antMatchers("/oauth/**").permitAll()
                .anyRequest().authenticated()
>>>>>>> f301386c0bc624e63e9f6cd9d4a6a368bc40a534
>>>>>>> b159bdcb66d67cb0dc5d2205a08b47199d4d281b
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(new JwtFilter(jwtService, secretKey), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtExceptionFilter, JwtFilter.class)
                .build();
    }
}
