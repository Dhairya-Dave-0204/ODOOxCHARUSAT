package com.example.hackathon.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.hackathon.bean.Appointment;
import com.example.hackathon.bean.Doctor;
import com.example.hackathon.bean.Patient;
import com.example.hackathon.repository.AppointmentRepository;
import com.example.hackathon.repository.DoctorRepository;
import com.example.hackathon.repository.PatientRepository;
import com.example.hackathon.repository.UserRepository;
import com.example.hackathon.service.AppointmentService;
import com.example.hackathon.service.UserService;

@RestController
@RequestMapping("/fetch")
@CrossOrigin(origins = "http://localhost:5173")
public class FetchController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository   appointmentRepository;

    @Autowired
    private AppointmentService appointmentService;  

    @GetMapping("/alldoctors")
    public ResponseEntity<List<Map<String, Object>>> allDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        List<Map<String, Object>> doctorList = new ArrayList<>();

        for (Doctor doctor : doctors) {
            Map<String, Object> doctorData = new HashMap<>();
            doctorData.put("id", doctor.getDoctorId());
            doctorData.put("name", doctor.getUser().getName()); // Get doctor's name
            doctorData.put("email", doctor.getUser().getEmail()); // Get doctor's email (name)
            doctorData.put("specialization", doctor.getSpecialization());

            doctorList.add(doctorData);
        }

        // showdoctordata
        System.out.println(doctorList);

        return ResponseEntity.ok(doctorList);
    }

    @GetMapping("/allpatients")
    public ResponseEntity<List<Map<String, Object>>> allPatients() {
        List<Patient> patients = patientRepository.findAll();
        List<Map<String, Object>> patientList = new ArrayList<>();

        for (Patient patient : patients) {
            Map<String, Object> patientData = new HashMap<>();
            patientData.put("id", patient.getPatientId());
            patientData.put("name", patient.getUser().getName()); // Get patient's name
            patientData.put("email", patient.getUser().getEmail()); // Get patient's email (name)
            patientData.put("age", patient.getAge());
            patientData.put("doctor", patient.getDoctor().getUser().getName()); // Get doctor's name
            patientData.put("gender", patient.getGender());
            patientData.put("contact", patient.getContact());
            patientList.add(patientData);
        }

        System.out.println(patientList);

        return ResponseEntity.ok(patientList);

    }

    // findpatient
    @GetMapping("/findpatient")
    public ResponseEntity<Map<String, Object>> findPatient(@RequestParam String email) {
        Optional<Patient> patientOptional = patientRepository.findByUser_Email(email);

        if (patientOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Patient not found!"));
        }

        Patient patient = patientOptional.get();

        Map<String, Object> patientData = new HashMap<>();
        patientData.put("id", patient.getPatientId());
        patientData.put("name", patient.getUser().getName());
        patientData.put("email", patient.getUser().getEmail());
        patientData.put("age", patient.getAge());
        patientData.put("doctor", patient.getDoctor().getUser().getName());
        patientData.put("gender", patient.getGender());
        patientData.put("contact", patient.getContact());
        patientData.put("dob", patient.getDob());

        return ResponseEntity.ok(patientData);
    }

    @GetMapping("/appointments")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<?> getAllAppointments() {
    List<Appointment> appointments = appointmentRepository.findAll();
    return ResponseEntity.ok(appointments);
}

@GetMapping("/patientappointments")
@PreAuthorize("hasAnyRole('ADMIN', 'PATIENT')")
public ResponseEntity<?> getPatientAppointments(@RequestParam String email) {
    Optional<Patient> patient = patientRepository.findByUser_Email(email);
    
    if (patient.isEmpty()) {
        return ResponseEntity.badRequest().body("Patient not found!");
    }

    List<Appointment> appointments = appointmentRepository.findByPatient(patient.get());

    
    
    return ResponseEntity.ok(appointments);
}

@GetMapping("/doctor/profile/{doctorId}")
public ResponseEntity<?> getDoctorProfile(@PathVariable Long doctorId) {
    Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);

    if (doctorOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found");
    }

    Doctor doctor = doctorOpt.get();
    Map<String, Object> response = new HashMap<>();
    response.put("doctorId", doctor.getDoctorId());
    response.put("name", doctor.getUser().getName());
    response.put("email", doctor.getUser().getEmail());
    response.put("specialization", doctor.getSpecialization());
    response.put("experience", doctor.getExperience());
    response.put("qualification", doctor.getQualification());
    response.put("contactNumber", doctor.getContactNumber());
    response.put("languagesSpoken", doctor.getLanguagesSpoken());

    return ResponseEntity.ok(response);
}


@GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable Doctor doctorId) {
        List<Appointment> appointments = appointmentRepository.findByDoctor(doctorId);
        return ResponseEntity.ok(appointments);
    }

@PutMapping("/appointments/{appointmentId}")
public ResponseEntity<?> updateAppointment(@PathVariable Long appointmentId, @RequestBody Map<String, String> request) {
    String prescription = request.get("prescription");
    try {
        Appointment updatedAppointment = appointmentService.updateAppointment(appointmentId, prescription);
        return ResponseEntity.ok(updatedAppointment);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Error updating appointment: " + e.getMessage());
    }
}


}
