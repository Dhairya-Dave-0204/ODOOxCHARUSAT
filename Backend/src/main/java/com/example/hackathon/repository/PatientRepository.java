package com.example.hackathon.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hackathon.bean.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    // Optional<Patient> findbyUser_Email(String email);
    
    //set doctor id
    
}
