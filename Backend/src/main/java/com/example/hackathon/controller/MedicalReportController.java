// package com.example.practice;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.core.io.ByteArrayResource;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.MediaType;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.BufferedReader;
// import java.io.IOException;
// import java.io.InputStreamReader;

// @RestController
// @RequestMapping("/api/reports")
// public class MedicalReportController {

//     @Autowired
//     private MedicalReportPdfGenerator pdfGenerator;

//     @PostMapping("/generate")
//     public ResponseEntity<ByteArrayResource> generateReport(@RequestParam("file") MultipartFile file) {
//         try {
//             // Read the contents of the text file
//             String fileContent = readFileContent(file);

//             // Convert text content to ReportData object
//             ReportData reportData = parseReportData(fileContent);

//             // Generate PDF
//             byte[] pdfBytes = pdfGenerator.generateReport(
//                 reportData.getPatientName(),
//                 reportData.getPatientId(),
//                 reportData.getExamType(),
//                 reportData.getIndication(),
//                 reportData.getComparison(),
//                 reportData.getImpression(),
//                 reportData.getFindings(),
//                 reportData.getRadiologistName(),
//                 reportData.getDiaphragm(),
//                 reportData.getHeartFailure(),
//                 reportData.getLung(),
//                 reportData.getLungOpacity(),
//                 reportData.getOpacity(),
//                 reportData.getPnuemothorax(),
//                 reportData.getPulmonary(),
//                 reportData.getCongestion(),
//                 reportData.getDisease(),
//                 reportData.getDemphysema(),
//                 reportData.getFibriosis(),
//                 reportData.getArtery(),
//                 reportData.getGranuloma()
//             );

//             ByteArrayResource resource = new ByteArrayResource(pdfBytes);
            
//             return ResponseEntity.ok()
//                 .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=medical_report.pdf")
//                 .contentType(MediaType.APPLICATION_PDF)
//                 .contentLength(pdfBytes.length)
//                 .body(resource);
                
//         } catch (IOException e) {
//             e.printStackTrace();
//             return ResponseEntity.internalServerError().build();
//         }
//     }

//     private String readFileContent(MultipartFile file) throws IOException {
//         StringBuilder content = new StringBuilder();
//         try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
//             String line;
//             while ((line = reader.readLine()) != null) {
//                 content.append(line).append("\n");
//             }
//         }
//         return content.toString();
//     }

//     private ReportData parseReportData(String content) {
//         ReportData reportData = new ReportData();
//         String[] lines = content.split("\n");

//         for (String line : lines) {
//             String[] parts = line.split(":", 2);
//             if (parts.length == 2) {
//                 String key = parts[0].trim();
//                 String value = parts[1].trim();

//                 switch (key) {
//                     case "Patient Name": reportData.setPatientName(value); break;
//                     case "Patient ID": reportData.setPatientId(value); break;
//                     case "Exam Type": reportData.setExamType(value); break;
//                     case "Indication": reportData.setIndication(value); break;
//                     case "Comparison": reportData.setComparison(value); break;
//                     case "Impression": reportData.setImpression(value); break;
//                     case "Findings": reportData.setFindings(value); break;
//                     case "Radiologist Name": reportData.setRadiologistName(value); break;
//                     case "Diaphragm": reportData.setDiaphragm(value); break;
//                     case "Heart Failure": reportData.setHeartFailure(value); break;
//                     case "Lung": reportData.setLung(value); break;
//                     case "Lung Opacity": reportData.setLungOpacity(value); break;
//                     case "Opacity": reportData.setOpacity(value); break;
//                     case "Pneumothorax": reportData.setPnuemothorax(value); break;
//                     case "Pulmonary": reportData.setPulmonary(value); break;
//                     case "Congestion": reportData.setCongestion(value); break;
//                     case "Disease": reportData.setDisease(value); break;
//                     case "Emphysema": reportData.setDemphysema(value); break;
//                     case "Fibrosis": reportData.setFibriosis(value); break;
//                     case "Artery": reportData.setArtery(value); break;
//                     case "Granuloma": reportData.setGranuloma(value); break;
//                 }
//             }
//         }
//         return reportData;
//     }
// }

package com.example.hackathon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.hackathon.service.MedicalReportPdfGenerator;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping("/api/reports")
public class MedicalReportController {

    @Autowired
    private MedicalReportPdfGenerator pdfGenerator;

    @PostMapping("/generate")
    public ResponseEntity<ByteArrayResource> generateReport(@RequestParam("file") MultipartFile file,@RequestParam String patientname,@RequestParam String patientid) {
        try {
            // Save uploaded file temporarily
            Path tempFile = Files.createTempFile("uploaded-", ".csv");
            Files.copy(file.getInputStream(), tempFile, StandardCopyOption.REPLACE_EXISTING);

            // Set output directory for PDFs
            String outputDir = "D:\\generated_reports";
            new File(outputDir).mkdirs();
           
            // Read CSV file
            List<String> lines = Files.readAllLines(tempFile);
            
            if (lines.size() == 2) { // If only 1 data row (excluding header)
                // Generate a **single** PDF
                String pdfFilePath = "D:\\generated_reports/" ;
                MedicalReportPdfGenerator.generateReport(tempFile.toString(), pdfFilePath,patientname,patientid);
                
                // ByteArrayResource pdfResource = new ByteArrayResource(Files.readAllBytes(Path.of(pdfFilePath)));
                
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=medical_report.pdf")
                        .contentType(MediaType.APPLICATION_PDF)
                        .contentLength(Files.size(Path.of(pdfFilePath)))
                        .body(null);
            } else {
                // Generate **multiple PDFs** and create a ZIP file
                MedicalReportPdfGenerator.generateReport(tempFile.toString(), outputDir,patientname,patientid);

                // Create a ZIP file
                File zipFile = new File("medical_reports.zip");
                try (FileOutputStream fos = new FileOutputStream(zipFile);
                     ZipOutputStream zos = new ZipOutputStream(fos)) {

                    File[] pdfFiles = new File(outputDir).listFiles();
                    if (pdfFiles != null) {
                        for (File pdf : pdfFiles) {
                            zos.putNextEntry(new ZipEntry(pdf.getName()));
                            Files.copy(pdf.toPath(), zos);
                            zos.closeEntry();
                        }
                    }
                }

                // Read ZIP file as byte array
                ByteArrayResource zipResource = new ByteArrayResource(Files.readAllBytes(zipFile.toPath()));

                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=medical_reports.zip")
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .contentLength(zipFile.length())
                        .body(zipResource);
            }

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
