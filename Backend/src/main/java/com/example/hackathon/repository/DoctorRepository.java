package com.example.hackathon.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.hackathon.bean.Doctor;
import com.example.hackathon.bean.User;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUser_Email(String email);

    @Query("SELECT d FROM Doctor d WHERE d.user.email = :email")
    Optional<Doctor> findByUserEmail(@Param("email") String email);

    // Doctor findByID(Long id);

}
