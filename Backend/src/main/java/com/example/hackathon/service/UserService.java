package com.example.hackathon.service;

import com.example.hackathon.bean.*;
import com.example.hackathon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // public Optional<User> authenticate(String email, String password) {
    //     Optional<User> user = userRepository.findByEmail(email);
    //     if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
    //         return user;
    //     }
    //     return Optional.empty();
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
}
