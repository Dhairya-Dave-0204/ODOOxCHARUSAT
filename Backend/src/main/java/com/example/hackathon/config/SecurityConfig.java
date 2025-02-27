package com.example.hackathon.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
            .cors().and() // Enable CORS
            .csrf().disable() // Disable CSRF for testing (DO NOT disable in production)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll() // Allow register & login without authentication
                .requestMatchers("/admin/**").hasAuthority("ADMIN")   // Only Admins can access
                .requestMatchers("/doctor/**").hasAuthority("DOCTOR") // Only Doctors can access
                .requestMatchers("/").hasAuthority("PATIENT") // Only Patients can access
                .anyRequest().authenticated() // Secure all other endpoints
                // .anyRequest().permitAll() 
            )
            .formLogin().disable()  // 🚀 Disables Spring's default login form
            .httpBasic().disable(); // Optional: Disables Basic Aut

        return http.build();
    }
}
