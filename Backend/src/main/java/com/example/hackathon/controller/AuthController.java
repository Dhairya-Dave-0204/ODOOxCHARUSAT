package com.example.hackathon.controller;

import com.example.hackathon.bean.Appointment;
import com.example.hackathon.bean.Doctor;
import com.example.hackathon.bean.Patient;
import com.example.hackathon.bean.Role;
import com.example.hackathon.bean.User;
import com.example.hackathon.repository.DoctorRepository;
import com.example.hackathon.repository.PatientRepository;
import com.example.hackathon.repository.UserRepository;
import com.example.hackathon.repository.AppointmentRepository;
import com.example.hackathon.service.UserService;
import com.example.hackathon.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.hackathon.service.EmailService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addPatient(@RequestBody Map<String, Object> patientData) {
        if (!patientData.containsKey("email") || !patientData.containsKey("doctorId")) {
            return ResponseEntity.badRequest().body("Missing required fields: email or doctorId");
        }

        String email = (String) patientData.get("email");

        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }

        Long doctorId = Long.valueOf(patientData.get("doctorId").toString());

        Optional<Doctor> doctor = doctorRepository.findById(doctorId);
        if (doctor.isEmpty()) {
            return ResponseEntity.badRequest().body("Doctor not found with ID: " + doctorId);
        }

        User user = new User();
        user.setEmail(email);
        String dob = (String) patientData.getOrDefault("dob", "2000-01-01");
        String formattedDob = LocalDate.parse(dob).format(DateTimeFormatter.ofPattern("ddMMyyyy"));
        user.setPassword(passwordEncoder.encode(formattedDob));
        user.setRole(Role.PATIENT);
        user.setName((String) patientData.getOrDefault("name", "N/A"));
        userRepository.save(user);

        Patient patient = new Patient();
        patient.setUser(user);
        patient.setAge(Integer.parseInt(patientData.getOrDefault("age", "0").toString()));
        patient.setContact((String) patientData.getOrDefault("contact", "N/A"));
        patient.setGender((String) patientData.getOrDefault("gender", "Other"));
        patient.setDob(dob);
        patient.setDoctor(doctor.get());

        patientRepository.save(patient);

        // ✅ Send email after successful registration
        String subject = "Welcome to CareConnect!";
        String message = "Hello " + user.getName() + ",\n\n" +
                "Your account has been created successfully.\n" +
                "Login using your email: " + user.getEmail() + "\n" +
                "Your temporary password is: " + formattedDob + "\n\n" +
                "Best Regards,\nCareConnect Team";

        emailService.sendEmail(user.getEmail(), subject, message, true);

        Optional<Patient> patientid = patientRepository.findByUser_Email(email);
        if(patientid.isEmpty()) {
            return ResponseEntity.badRequest().body("Patient not found!");
        }
        else
        {
            System.out.println("Patient ID: " + patientid.get().getPatientId());
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Patient added successfully!");
        response.put("patientId", patientid.get().getPatientId()); // Include patient ID

        return ResponseEntity.ok(response);
    }

    @PostMapping("/addDoctor")
    @PreAuthorize("hasRole('ADMIN')")
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
        user.setName(doctorData.getOrDefault("name", "N/A"));
        userRepository.save(user); // ✅ Save the User first

        // Create a new Doctor and link it to the User
        Doctor doctor = new Doctor();
        doctor.setUser(user); // ✅ Link the saved User
        doctor.setSpecialization(specialization);

        // Save Doctor
        doctorRepository.save(doctor);

        return ResponseEntity.ok("Doctor added successfully!");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(userService.sendResetEmail(request.get("email")));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(userService.resetPassword(request.get("token"), request.get("newPassword")));
    }

    @PostMapping("/addAppointment")
    @PreAuthorize("hasAnyRole('ADMIN', 'PATIENT')")
    public ResponseEntity<?> addAppointment(@RequestBody Map<String, Object> request) {
        try {
            Long patientId = Long.valueOf(request.get("patientId").toString());
            Long doctorId = Long.valueOf(request.get("doctorId").toString());
            String dateStr = request.get("date").toString();
            String timeStr = request.get("time").toString();
            String cause = request.get("cause").toString();

            LocalDate date = LocalDate.parse(dateStr);
            LocalTime time = LocalTime.parse(timeStr);

            Appointment appointment = new Appointment();
            appointment.setDate(date);
            appointment.setTime(time);
            appointment.setCause(cause);

            String savedAppointment = appointmentService.addAppointment(patientId, doctorId, appointment);
            return ResponseEntity.ok(String.format("Appointment added successfully: %s", savedAppointment));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add appointment: " + e.getMessage());
        }
    }

}
