package com.example.hackathon.controller;

import com.example.hackathon.bean.User;
import com.example.hackathon.bean.UserPdf;
import com.example.hackathon.repository.UserRepository;
import com.example.hackathon.service.UserPdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-pdfs")
public class UserPdfController {
    @Autowired
    private UserPdfService userPdfService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/count/{userId}")
    public long countPdfsByUser(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(userPdfService::countPdfsByUser).orElse(0L);
    }

    @GetMapping("/list/{userId}")
    public List<UserPdf> getPdfsByUser(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(userPdfService::getPdfsByUser).orElse(List.of());
    }

    @PostMapping("/add/{userId}")
    public UserPdf addPdfForUser(@PathVariable Long userId, @RequestBody UserPdf userPdf) {
        Optional<User> user = userRepository.findById(userId);
        userPdf.setUser(user.orElseThrow());
        return userPdfService.saveUserPdf(userPdf);
    }

    @PostMapping("/upload/{userId}")
    public ResponseEntity<?> uploadPdfForUser(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {
        try {
            // Save file to static/uploads
            String uploadDir = "static/uploads";
            Files.createDirectories(Paths.get(uploadDir));
            Path filePath = Paths.get(uploadDir, file.getOriginalFilename());
            file.transferTo(filePath);

            // Save record in DB
            Optional<User> user = userRepository.findById(userId);
            if (user.isEmpty()) {
                return ResponseEntity.badRequest().body("User not found");
            }
            UserPdf userPdf = new UserPdf();
            userPdf.setUser(user.get());
            userPdf.setPdfFilename(file.getOriginalFilename());
            userPdf.setUploadDate(java.time.LocalDateTime.now());
            userPdfService.saveUserPdf(userPdf);

            return ResponseEntity.ok("PDF uploaded and linked to user!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to upload PDF: " + e.getMessage());
        }
    }
} 