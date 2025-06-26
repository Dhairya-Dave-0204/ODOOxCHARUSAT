package com.example.hackathon.service;

import com.example.hackathon.bean.User;
import com.example.hackathon.bean.UserPdf;
import com.example.hackathon.repository.UserPdfRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserPdfService {
    @Autowired
    private UserPdfRepository userPdfRepository;

    public List<UserPdf> getPdfsByUser(User user) {
        return userPdfRepository.findByUser(user);
    }

    public long countPdfsByUser(User user) {
        return userPdfRepository.countByUser(user);
    }

    public UserPdf saveUserPdf(UserPdf userPdf) {
        return userPdfRepository.save(userPdf);
    }
} 