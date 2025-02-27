package com.example.hackathon.controller;

import com.example.hackathon.bean.Doctor;
import com.example.hackathon.bean.Patient;
import com.example.hackathon.bean.Role;
import com.example.hackathon.bean.User;
import com.example.hackathon.repository.DoctorRepository;
import com.example.hackathon.repository.PatientRepository;
import com.example.hackathon.repository.UserRepository;
import com.example.hackathon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.print.Doc;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @PostMapping("/login")
    public Map<String, String> login(@RequestParam String email, @RequestParam String password, HttpSession session) {
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
        System.out.println("Logged out request fro : " + session.getAttribute("user"));
        session.invalidate(); // Destroy session on logout
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Logged out successfully!");
        return response;
    }

    @RequestMapping(value = "/login", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handlePreflight() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/addPatient")
    public ResponseEntity<?> addPatient(@RequestBody Map<String, Object> patientData) {
        // Ensure required fields are present


        if (!patientData.containsKey("email") || !patientData.containsKey("doctorId")) {
            return ResponseEntity.badRequest().body("Missing required fields: email or doctorId");
        }

        String email = (String) patientData.get("email");

        // Check if the user email already exists
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }

        // Create User for Patient
        User user = new User();
        user.setEmail(email);
        user.setPassword((String) patientData.getOrDefault("dob", "defaultPass")); // Default password is DOB
        user.setRole(Role.PATIENT);
        userRepository.save(user);

        // Fetch Doctor by ID using findById()
        Long doctorId;
        try {
            doctorId = Long.valueOf(patientData.get("doctorId").toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid doctorId format");
        }

        Optional<Doctor> doctor = doctorRepository.findById(doctorId);
        if (doctor.isEmpty()) {
            return ResponseEntity.badRequest().body("Doctor not found for given ID");
        }

        // Create and Save Patient
        Patient patient = new Patient();
        patient.setUser(user);
        patient.setAge(Integer.parseInt(patientData.getOrDefault("age", "0").toString()));
        patient.setContact((String) patientData.getOrDefault("contact", "N/A"));
        patient.setGender((String) patientData.getOrDefault("gender", "Other"));
        patient.setDob((String) patientData.getOrDefault("dob", "2000-01-01"));
        patient.setDoctor(doctor.get()); // Assign the doctor

        patientRepository.save(patient);

        return ResponseEntity.ok("Patient added successfully!");
    }

    @PostMapping("/addDoctor")
    public ResponseEntity<?> addDoctor(@RequestBody Map<String, String> doctorData) {
        String email = doctorData.get("email");
        String specialization = doctorData.get("specialization");

        if (email == null || specialization == null) {
            return ResponseEntity.badRequest().body("Missing required fields: email or specialization");
        }

        // Check if user already exists
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }

        // Create a new User for Doctor
        User user = new User();
        user.setEmail(email);
        user.setPassword("defaultPass"); // Admin will set password
        user.setRole(Role.DOCTOR);
        userRepository.save(user); // ✅ Save the User first

        // Create a new Doctor and link it to the User
        Doctor doctor = new Doctor();
        doctor.setUser(user); // ✅ Link the saved User
        doctor.setSpecialization(specialization);

        // Save Doctor
        doctorRepository.save(doctor);

        return ResponseEntity.ok("Doctor added successfully!");
    }

}
