package com.example.hackathon.bean;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_pdfs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPdf {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String pdfFilename;

    @Column(nullable = false)
    private LocalDateTime uploadDate = LocalDateTime.now();
} 