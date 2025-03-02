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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.hackathon.service.EmailService;
import com.example.hackathon.service.OtpService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
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

    @Autowired
    private OtpService otpService;

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
        if (patientid.isEmpty()) {
            return ResponseEntity.badRequest().body("Patient not found!");
        } else {
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
        try {
            // Extract required fields
            String email = doctorData.get("email");
            String specialization = doctorData.get("specialization");
            String name = doctorData.getOrDefault("name", "N/A");
            String experience = doctorData.get("experience");
            String qualification = doctorData.get("qualification");
            String contactNumber = doctorData.get("contactNumber");
            String languagesSpoken = doctorData.get("languagesSpoken"); // Expecting a comma-separated string
            String password = doctorData.get("password");

            if (email == null || specialization == null || contactNumber == null || languagesSpoken == null) {
                return ResponseEntity.badRequest()
                        .body("Missing required fields: email, specialization, contactNumber, or languagesSpoken");
            }

            // Check if user already exists
            if (userRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.badRequest().body("Email already exists!");
            }

            // Hash the default password (Admin can change later)
            String hashedPassword = passwordEncoder.encode(password);

            // Create and save the User
            User user = new User();
            user.setEmail(email);
            user.setPassword(hashedPassword);
            user.setRole(Role.DOCTOR);
            user.setName(name);
            userRepository.save(user);

            // Create and save the Doctor
            Doctor doctor = new Doctor();
            doctor.setUser(user);
            doctor.setSpecialization(specialization);
            doctor.setExperience(experience != null ? Integer.parseInt(experience) : 0);
            doctor.setQualification(qualification != null ? qualification : "N/A");
            doctor.setContactNumber(contactNumber);
            doctor.setLanguagesSpoken(languagesSpoken); // Store languages as a comma-separated string

            doctorRepository.save(doctor);

            return ResponseEntity.ok("Doctor added successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding doctor: " + e.getMessage());
        }
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

    @PostMapping("/sendOtp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required!");
        }

        String otp = otpService.generateOtp(email);
        return ResponseEntity.ok("OTP sent successfully!");
    }

    @PostMapping("/verifyOtp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        System.out.println("Email: " + email + ", OTP: " + otp);

        if (email == null || otp == null) {
            return ResponseEntity.badRequest().body("Email and OTP are required!");
        }

        boolean isValid = otpService.verifyOtp(email, otp);
        System.out.println(isValid);

        if (isValid) {
            return ResponseEntity.ok(Map.of("verified", true, "message", "OTP verified successfully!"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("verified", false, "message", "Invalid OTP!"));
        }
    }

    @GetMapping("/getPatientId")
    public ResponseEntity<Map<String, Object>> getPatientId(@RequestParam String email) {
        Optional<Patient> patient = patientRepository.findByUser_Email(email);
        if (patient != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("patientId", patient.get().getPatientId());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Patient not found"));
        }
    }

    @GetMapping("/getDoctorId")
    public ResponseEntity<Map<String, Object>> getDoctorId(@RequestParam String email) {
        Optional<Doctor> doctor = doctorRepository.findByUser_Email(email); // Assuming you have a Doctor entity with a
                                                                            // User entity linked by email.
        if (doctor.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("doctorId", doctor.get().getDoctorId()); // Replace with the actual field name for the doctor
                                                                  // ID in your entity
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Doctor not found"));
        }
    }

}
