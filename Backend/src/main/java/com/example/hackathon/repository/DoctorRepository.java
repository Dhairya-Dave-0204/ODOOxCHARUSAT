package com.example.hackathon.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hackathon.bean.Doctor;
import com.example.hackathon.bean.User;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUser_Email(String email);

    Optional<Doctor> findByUser(User user);

    // Doctor findByID(Long id);

}
