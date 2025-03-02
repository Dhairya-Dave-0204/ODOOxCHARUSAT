package com.example.hackathon.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.Function;
import org.web3j.crypto.*;
import org.web3j.protocol.Web3j;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.Type;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IPFSServiceCLI {
    private final Web3j web3;
    private final Credentials credentials;
    private final String contractAddress;

    public IPFSServiceCLI() {
        // Initialize Web3j with an Ethereum node (e.g., Infura)
        this.web3 = Web3j.build(new HttpService("http://127.0.0.1:7545"));
        // Load credentials from a private key (replace with your private key)
        this.credentials = Credentials.create("0xb1244585a78754f44d07a079f612b22cbf7d53d9dbb00033421c008fcc4eb6da");

        // Set the contract address (replace with your contract address)
        this.contractAddress = "0xDA0bab807633f07f013f94DD0E6A4F96F8742B53";
    }

    // private MedicalReportStorage medicalReportStorage;
    public String uploadToIPFS(File file) throws IOException {
        if (!file.exists()) {
            throw new IOException("File not found: " + file.getAbsolutePath());
        }

        ProcessBuilder processBuilder = new ProcessBuilder("ipfs", "add", "-Q", file.getAbsolutePath());
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {

            // Read the output (CID)
            String cid = reader.readLine();

            // Read errors (if any)
            String errorLine;
            while ((errorLine = errorReader.readLine()) != null) {
                System.err.println("Error: " + errorLine);
            }

            if (cid == null || cid.isEmpty()) {
                throw new IOException("Failed to upload file to IPFS. No CID returned.");
            }
            return cid;
        }
    }

    public String storeCIDInBlockchain(String cid) throws Exception {
        // Define the smart contract function
        Function function = new Function(
                "storeCID", // Smart contract function name
                Collections.singletonList(new Utf8String(cid)), // Function arguments
                Collections.emptyList() // Function return types
        );

        // Encode the function call
        String encodedFunction = FunctionEncoder.encode(function);

        // Create a transaction
        Transaction transaction = Transaction.createFunctionCallTransaction(
                credentials.getAddress(), // Sender address
                null, // Nonce (null for automatic)
                null, // Gas price (null for automatic)
                null, // Gas limit (null for automatic)
                "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99", // Contract address
                encodedFunction // Encoded function call
        );

        // Send the transaction
        EthSendTransaction response = web3.ethSendTransaction(transaction).send();

        // Check for errors
        if (response.hasError()) {
            throw new RuntimeException("Error sending transaction: " + response.getError().getMessage());
        }

        // Return the transaction hash
        return response.getTransactionHash();
    }

    public List<String> retrieveCIDFromBlockchain(String userAddress) throws Exception {
        Function function = new Function(
                "getCIDs",
                List.of(new Address(userAddress)),
                List.of(new TypeReference<DynamicArray<Utf8String>>() {})
        );

        String encodedFunction = FunctionEncoder.encode(function);

        EthCall response = web3.ethCall(
                Transaction.createEthCallTransaction(null, contractAddress, encodedFunction),
                DefaultBlockParameterName.LATEST).send();

        if (response.hasError()) {
            throw new RuntimeException("Error calling contract: " + response.getError().getMessage());
        }

        @SuppressWarnings("rawtypes")
        List<Type> decodedResult = FunctionReturnDecoder.decode(response.getValue(), function.getOutputParameters());

        if (decodedResult.isEmpty()) {
            return new ArrayList<>();
        }

        @SuppressWarnings("unchecked")
        List<Utf8String> cidList = ((DynamicArray<Utf8String>) decodedResult.get(0)).getValue();
        return cidList.stream().map(Utf8String::getValue).collect(Collectors.toList());
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        IPFSServiceCLI ipfsService = new IPFSServiceCLI();

        // Check if IPFS is available
        try {
            Process process = new ProcessBuilder("ipfs", "version").start();
            process.waitFor();
            System.out.println("IPFS is available");
        } catch (IOException e) {
            System.out.println("IPFS is not found in system PATH");
            return; // Exit if IPFS is not available
        }

        // Test with a file
        File file = new File("D:\\generated_reports\\hitarth.pdf"); // Replace with your file path

        try {
            String cid = ipfsService.uploadToIPFS(file);
            System.out.println("Uploaded to IPFS, CID: " + cid);
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

}