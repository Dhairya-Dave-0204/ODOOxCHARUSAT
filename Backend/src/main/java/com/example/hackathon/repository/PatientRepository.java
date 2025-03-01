package com.example.hackathon.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hackathon.bean.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByUser_Email(String email);

    // char getPatientIdByEmail(String email);

    // Patient findByUser_Email(String email);
    
    
}
