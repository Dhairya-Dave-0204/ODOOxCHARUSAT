package com.example.hackathon.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hackathon.bean.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUser_Email(String email);

    // Doctor findByID(Long id);

}
