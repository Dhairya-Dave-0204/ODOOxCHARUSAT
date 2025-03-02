package com.example.hackathon.service;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.element.Text;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.layout.element.AreaBreak;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class MedicalReportPdfGenerator {

    public static void generateReport(String csvFilePath, String outputDirectory ,String patientname , String patientid) {
        try {
            List<String> lines = Files.readAllLines(Paths.get(csvFilePath));
            if (lines.isEmpty()) {
                System.out.println("CSV file is empty.");
                return;
            }

            File directory = new File(outputDirectory);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            for (int i = 1; i < lines.size(); i++) { // Skip header row
                String[] values = lines.get(i).split(",");
                if (values.length < 15) continue;

                String baseFileName = patientname;
                String pdfFilePath = getUniqueFilePath(outputDirectory, baseFileName);

                try (PdfWriter writer = new PdfWriter(pdfFilePath);
                     PdfDocument pdf = new PdfDocument(writer);
                     Document document = new Document(pdf)) {

                        document.add(new Paragraph("Medical Imaging Center")
                        
                        .setFontSize(16)
                        .setTextAlignment(TextAlignment.CENTER));

                document.add(new Paragraph("City, State 12345")
                        .setTextAlignment(TextAlignment.CENTER));

                document.add(new Paragraph("Phone: (555) 123-4567 | Fax: (555) 123-4568")
                        .setTextAlignment(TextAlignment.CENTER)
                        .setUnderline());

                document.add(new Paragraph("\nREPORT: Lung Cancer Detection")
                     
                        .setTextAlignment(TextAlignment.CENTER));

                document.add(new Paragraph("-------------------------------------------------------------")
                        .setTextAlignment(TextAlignment.CENTER));

                document.add(boldText("Patient Name: "+ patientname));
                document.add(boldText("Patient ID: "+ patientid));
                document.add(new Paragraph("Date of Report: " + "02/25/2025"));
                document.add(new Paragraph("Date of Exam: " + "02/25/2025"));
                document.add(new Paragraph("\n"));

                document.add(boldText("FINDINGS:"));

                // Adding the condition values from the values array
                document.add(new Paragraph("Cardiomegaly: " + values[0]));
                document.add(new Paragraph("Lung Opacity: " + values[1]));
                document.add(new Paragraph("Lung Lesion: " + values[2]));
                document.add(new Paragraph("Edema: " + values[3]));
                document.add(new Paragraph("Consolidation: " + values[4]));
                document.add(new Paragraph("Pneumonia: " + values[5]));
                document.add(new Paragraph("Atelectasis: " + values[6]));
                document.add(new Paragraph("Pneumothorax: " + values[7]));
                document.add(new Paragraph("Pleural Effusion: " + values[8]));
                document.add(new Paragraph("Pleural Other: " + values[9]));
                document.add(new Paragraph("Fracture: " + values[10]));
                document.add(new Paragraph("Support Devices: " + values[11]));
                document.add(new Paragraph("\n"));

                document.add(boldText("Generated Report:"));
                document.add(new Paragraph(values[14]));
                document.add(new Paragraph("\n"));

                // Add page break if content exceeds one page
                document.add(new AreaBreak());

                document.add(new Paragraph("-------------------------------------------------------------")
                        .setTextAlignment(TextAlignment.CENTER));
                document.add(new Paragraph("Electronically signed by:")
                        
                        .setTextAlignment(TextAlignment.RIGHT));
                document.add(new Paragraph("Dr. Shinchan")
                        .setTextAlignment(TextAlignment.RIGHT));
                document.add(new Paragraph("Board Certified Radiologist")
                        .setTextAlignment(TextAlignment.RIGHT));

                document.close();
                    System.out.println("✅ PDF generated: " + pdfFilePath);
                } catch (Exception e) {
                    System.out.println("Error generating PDF: " + e.getMessage());
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static String getUniqueFilePath(String outputDirectory, String baseFileName) {
        int counter = 1;
        String filePath = outputDirectory + "/" + baseFileName + ".pdf";
        while (new File(filePath).exists()) {
            filePath = outputDirectory + "/" + baseFileName + "_" + counter + ".pdf";
            counter++;
        }
        return filePath;
    }

    private static Paragraph boldText(String text) {
        try {
            PdfFont boldFont = PdfFontFactory.createFont(com.itextpdf.io.font.constants.StandardFonts.HELVETICA_BOLD);
            return new Paragraph(new Text(text).setFont(boldFont));
        } catch (IOException e) {
            return new Paragraph(text);
        }
    }
}
