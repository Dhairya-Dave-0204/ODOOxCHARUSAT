package com.example.hackathon.repository;

import java.util.Optional;
import com.example.hackathon.bean.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Optional<Appointment> findByUser_Email(String email);
    
    // Optional<Appointment> findByUser(User user);
    
    // Appointment findByID(Long id);
    
}
