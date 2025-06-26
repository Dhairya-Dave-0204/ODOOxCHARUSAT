package com.example.hackathon.repository;

import com.example.hackathon.bean.UserPdf;
import com.example.hackathon.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserPdfRepository extends JpaRepository<UserPdf, Long> {
    List<UserPdf> findByUser(User user);
    long countByUser(User user);
} 