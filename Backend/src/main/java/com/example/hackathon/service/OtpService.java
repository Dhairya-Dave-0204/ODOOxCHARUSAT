package com.example.hackathon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private JavaMailSender mailSender;

    private final Map<String, String> otpStorage = new HashMap<>(); // Store OTPs temporarily

    public String generateOtp(String email) {
        String otp = String.valueOf(100000 + new Random().nextInt(900000)); // Generate 6-digit OTP
        otpStorage.put(email, otp); // Store OTP against email
        sendOtpEmail(email, otp); // Send OTP to email
        return otp;
    }

    public boolean verifyOtp(String email, String enteredOtp) {
        System.out.println(otpStorage.get(email));
        System.out.println(enteredOtp);
        return otpStorage.containsKey(email) && otpStorage.get(email).equals(enteredOtp);
    }

    private void sendOtpEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP for CareConnect");
        message.setText("Your OTP is: " + otp + ". It is valid for 5 minutes.");
        mailSender.send(message);
    }
}
