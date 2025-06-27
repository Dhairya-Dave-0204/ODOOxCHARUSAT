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

    // public Optional<User> authenticate(String email, String password) {
    // Optional<User> user = userRepository.findByEmail(email);
    // if (user.isPresent() && passwordEncoder.matches(password,
    // user.get().getPassword())) {
    // return user;
    // }
    // return Optional.empty();
    // }

    public Optional<User> updatePass(String email , String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setPassword(passwordEncoder.encode(password)); // Encrypt new password
            userRepository.save(existingUser);
            return Optional.of(existingUser);
        }
        return Optional.empty();
    }

    public Optional<User> authenticate(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            String storedHashedPassword = user.get().getPassword();
            System.out.println("Stored Hashed Password: " + storedHashedPassword);
            // System.out.println(passwordEncoder.encode(password));
            // System.out.println(passwordEncoder.encode(password));

            if (passwordEncoder.matches(password, storedHashedPassword)) {
                System.out.println(password);
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

    public User addAdminUser(String email, String password) {
        String name = "Admin";
        User admin = new User();
        admin.setEmail(email);
        admin.setPassword(passwordEncoder.encode(password));
        admin.setRole(Role.ADMIN);
        admin.setName(name);
        return userRepository.save(admin);
    }

}
