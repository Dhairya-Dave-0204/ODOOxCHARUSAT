package com.example.hackathon.service;

import com.example.hackathon.bean.*;
import com.example.hackathon.controller.*;
import com.example.hackathon.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public String addAppointment(Long patientId, Long doctorId, Appointment appointmentDetails) {
        Optional<Patient> patientOpt = patientRepository.findById(patientId);
        Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);

        if (patientOpt.isEmpty() || doctorOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid patient or doctor ID.");
        }

        appointmentDetails.setPatient(patientOpt.get());
        appointmentDetails.setDoctor(doctorOpt.get());

        Appointment appointment = appointmentRepository.save(appointmentDetails);

        if(appointment == null) {
            throw new IllegalArgumentException("Failed to add appointment.");
        }
        else{
            return "Appointment added successfully.";
        }    
    }
}
