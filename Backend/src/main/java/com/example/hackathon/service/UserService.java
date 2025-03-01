package com.example.hackathon.service;

import com.example.hackathon.bean.*;
import com.example.hackathon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    // public Optional<User> authenticate(String email, String password) {
    // Optional<User> user = userRepository.findByEmail(email);
    // if (user.isPresent() && passwordEncoder.matches(password,
    // user.get().getPassword())) {
    // return user;
    // }
    // return Optional.empty();
    // }

    public Optional<User> authenticate(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            String storedHashedPassword = user.get().getPassword();
            System.out.println("Stored Hashed Password: " + storedHashedPassword);
            System.out.println(passwordEncoder.encode(password));

            if (passwordEncoder.matches(password, storedHashedPassword)) {
                return user;
            } else {
                System.out.println("Password does not match!");
            }
        } else {
            System.out.println("User not found!");
        }

        return Optional.empty();
    }

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password

        if (user.getRole() == null) {
            user.setRole(Role.PATIENT);
        }

        return userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public String sendResetEmail(String email) {
        System.out.println("Entered sendResetEmail");
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return "Email not found!";
        }
        System.out.println("Email found!");
        User user = userOptional.get();
        String token = UUID.randomUUID().toString(); // Generate random token
        user.setResetToken(token);
        // user.setTokenExpiry(LocalDateTime.now().plusMinutes(1)); // Token expires in
        // 15 mins
        user.setTokenExpiry(LocalDateTime.now().plusMinutes(15)); // Token expires in 15 mins
        userRepository.save(user);

        // ✅ Send Email
        String resetLink = "http://localhost:5173/reset?token=" + token;
        String emailContent = "<p>Click the link below to reset your password:</p>"
                + "<a href='" + resetLink + "' style='color:blue; text-decoration:none;'>Reset Password</a>";

        emailService.sendEmail(user.getEmail(), "Reset Password", emailContent,true);

        return "Reset link sent!";
    }

    public String resetPassword(String token, String newPassword) {
        Optional<User> userOptional = userRepository.findByResetToken(token);
        if (userOptional.isEmpty()) {
            return "Invalid token!";
        }

        User user = userOptional.get();

        // Check if token is expired
        if (user.getTokenExpiry().isBefore(LocalDateTime.now())) {
            return "Token expired!";
        }

        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null); // Clear token after reset
        user.setTokenExpiry(null);
        userRepository.save(user);

        return "Password successfully reset!";
    }

}
