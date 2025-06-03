package com.example.hackathon.controller;
import com.example.hackathon.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class IPFSController {

    @Autowired
    private IPFSServiceCLI ipfsService; 
    @Autowired
    private CIDRetrievalService cidRetrievalService;// Using CLI-based service
   
    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Convert MultipartFile to File
            File convertedFile = convertMultipartFileToFile(file);

            // Upload to IPFS using CLI
            String cid = ipfsService.uploadToIPFS(convertedFile);

            // Delete temporary file after upload
            convertedFile.delete();

            return "File uploaded to IPFS with CID: " + cid;

        } catch (IOException e) {
            return "Error uploading file to IPFS: " + e.getMessage();
        }
    }
    
    @PostMapping("/storeblock")
    public ResponseEntity<String> storeCIDInBlockchain(@RequestParam String cid) {
        try {
            String transactionHash = ipfsService.storeCIDInBlockchain(cid);
            return ResponseEntity.ok("CID stored in blockchain with transaction hash: " + transactionHash);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Error storing CID in blockchain: " + e.getMessage());
        }
    }
    @GetMapping("/getblock")
    public ResponseEntity<String> getfromBlockchain(@RequestParam String useracc) {
        try {
            List<String> cidString = cidRetrievalService.getAllCIDs(useracc);
            return ResponseEntity.ok("CID from blockchain: " + cidString);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Error fetching CID from blockchain: " + e.getMessage());
        }
    }
    @GetMapping("/getone")
    public String getonefromblockchain(@RequestParam String useracc)
    {
        String cid= new String() ;
        try {
            cid = cidRetrievalService.getLatestCID(useracc);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cid;
    }
    private File convertMultipartFileToFile(MultipartFile file) throws IOException {
        File convertedFile = File.createTempFile("upload_", "_" + file.getOriginalFilename());
        file.transferTo(convertedFile);
        return convertedFile;
    }
}
