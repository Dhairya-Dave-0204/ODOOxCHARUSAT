// package com.example;

// import java.util.regex.Matcher;
// import java.util.regex.Pattern;

// public class LungCancerReportFormatter {

//     public static String formatReport(String paragraph) {
//         String lungWater = extractInfo(paragraph, "lung water level is (\\w+)");
//         String tumorSize = extractInfo(paragraph, "tumor size is ([0-9\\.]+ cm)");
//         String metastasis = extractInfo(paragraph, "(No metastasis detected|Metastasis detected)");
//         String cancerStage = extractInfo(paragraph, "cancer stage is (\\w+)");

//         return String.format(
//             "Lung Water Level: %s\nTumor Size: %s\nMetastasis: %s\nCancer Stage: %s",
//             lungWater, tumorSize, metastasis, cancerStage
//         );
//     }

//     private static String extractInfo(String text, String regex) {
//         Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
//         Matcher matcher = pattern.matcher(text);
//         return matcher.find() ? matcher.group(1) : "Not Available";
//     }
// }
