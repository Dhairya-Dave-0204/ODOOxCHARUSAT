package com.example.hackathon.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.hackathon.bean.Doctor;
import com.example.hackathon.bean.Patient;
import com.example.hackathon.repository.DoctorRepository;
import com.example.hackathon.repository.PatientRepository;
import com.example.hackathon.repository.UserRepository;
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

        return ResponseEntity.ok(patientData);
    }

}
