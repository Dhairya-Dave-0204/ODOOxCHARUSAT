package com.example.hackathon.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @SuppressWarnings("removal")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET, "/fetch/**").permitAll()  // ✅ Allow GET requests under `/fetch/`
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/api/**").permitAll()
                .requestMatchers("/api/reports/create").permitAll()

                .requestMatchers("/admin/**").hasAuthority("ADMIN")
                .requestMatchers("/doctor/**").hasAuthority("DOCTOR")
                .requestMatchers("/").hasAuthority("PATIENT")
                .requestMatchers(HttpMethod.POST,"/api/reports/**").permitAll()
                .anyRequest().permitAll()
            )
            .formLogin().disable()
            .httpBasic().disable();

        return http.build();
    }

}
