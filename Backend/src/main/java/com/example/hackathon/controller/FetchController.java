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
import org.springframework.web.bind.annotation.RestController;

import com.example.hackathon.bean.Doctor;
import com.example.hackathon.bean.Role;
import com.example.hackathon.bean.User;
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
        System.out.println("Hi1");
    List<Doctor> doctors = doctorRepository.findAll();
    System.out.println("Hi2");
    List<Map<String, Object>> doctorList = new ArrayList<>();
    System.out.println("Hi3");
    
    for (Doctor doctor : doctors) {
        Map<String, Object> doctorData = new HashMap<>();
        doctorData.put("id", doctor.getDoctorId()); 
        doctorData.put("name", doctor.getUser().getName()); // Get doctor's name
        doctorData.put("email", doctor.getUser().getEmail()); // Get doctor's email (name)
        doctorData.put("specialization", doctor.getSpecialization());

        doctorList.add(doctorData);
    }
    System.out.println("Hi4");
    
    System.out.println("Showing the data");
    //showdoctordata
    System.out.println(doctorList);

    return ResponseEntity.ok(doctorList);
}



}
