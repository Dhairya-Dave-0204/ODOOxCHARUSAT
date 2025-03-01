package com.example.hackathon.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private int experience;

    @Column(nullable = false)
    private String qualification;

    @Column(nullable = false, unique = true)
    private String contactNumber;

    @Column(nullable = false)
    private String languagesSpoken; // Store languages as comma-separated values (CSV)

}
