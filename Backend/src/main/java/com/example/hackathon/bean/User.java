package com.example.hackathon.bean;

import java.io.Serializable;

import jakarta.persistence.*;
import lombok.*;
    
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;  // ADMIN, DOCTOR, PATIENT

    // public enum Role {
    //     ADMIN, DOCTOR, PATIENT
    // }
    //  public void setPassword(String rawPassword) {
    //     PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    //     this.password = passwordEncoder.encode(rawPassword);
    // }

}