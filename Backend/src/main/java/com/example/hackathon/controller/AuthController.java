package com.example.hackathon.controller;

import com.example.hackathon.bean.User;
import com.example.hackathon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Map<String, String> login(@RequestParam String email, @RequestParam String password,HttpSession session) {
        System.out.println("Login request received for : " + email);
        Optional<User> user = userService.authenticate(email, password);
        Map<String, String> response = new HashMap<>();

        if (user.isPresent()) {
        session.setAttribute("user", user.get());
        response.put("status", "success");
        response.put("role", user.get().getRole().toString());
        response.put("message", "Login successful!");
        } else {
            response.put("status", "error");
            response.put("message", "Invalid credentials!");
        }
        return response;
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        System.out.println("Registration request received for: " + user.getEmail());
        Map<String, String> response = new HashMap<>();

        if (userService.getUserByEmail(user.getEmail()).isPresent()) {
            response.put("status", "error");
            response.put("message", "Email already exists!");
        } else {
            userService.registerUser(user);
            response.put("status", "success");
            response.put("message", "User registered successfully!");
        }
        return response;
    }

    @PostMapping("/logout")
    public Map<String, String> logout(HttpSession session) {
        session.invalidate();  // Destroy session on logout
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Logged out successfully!");
        return response;
    }

    @RequestMapping(value = "/login", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handlePreflight() {
        return ResponseEntity.ok().build();
    }
}
