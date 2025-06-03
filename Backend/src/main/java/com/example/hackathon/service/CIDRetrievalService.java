package com.example.hackathon.service;


import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.crypto.Credentials;
import org.web3j.tx.TransactionManager;
import org.springframework.stereotype.Service;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.utils.Convert;
import org.web3j.utils.Numeric;

import com.example.hackathon.bean.CIDstorage;

import java.io.IOException;
import java.util.List;
@Service
public class CIDRetrievalService {

    private static final String INFURA_URL = "http://127.0.0.1:7545"; // Infura or local node URL
    private static final String CONTRACT_ADDRESS = "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99"; // The deployed contract address
    private static final String WALLET_PRIVATE_KEY = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"; // Private key (if needed for sending tx)

    private Web3j web3j;

    public CIDRetrievalService() {
        this.web3j = Web3j.build(new HttpService(INFURA_URL)); // Connect to Ethereum node via Infura (or your own)
    }

    // Method to get the latest CID from the contract
    public String getLatestCID(String userAddress) {
        try {
            // Set up credentials (if needed for sending tx)
            Credentials credentials = Credentials.create(WALLET_PRIVATE_KEY);

            // Load the smart contract
            CIDstorage contract = CIDstorage.load(
                    CONTRACT_ADDRESS,
                    web3j,
                    credentials,
                    new DefaultGasProvider()
            );

            // Call the getLatestCID function (view function) from the contract
            String latestCID = contract.getLatestCID(userAddress).send();
            return latestCID;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Method to get all CIDs stored for a user
    public List<String> getAllCIDs(String userAddress) {
        try {
            // Set up credentials (if needed for sending tx)
            Credentials credentials = Credentials.create(WALLET_PRIVATE_KEY);

            // Load the smart contract
            CIDstorage contract = CIDstorage.load(
                    CONTRACT_ADDRESS,
                    web3j,
                    credentials,
                    new DefaultGasProvider()
            );

            // Call the getAllCIDs function (view function) from the contract
            List<String> cids = contract.getAllCIDs(userAddress).send();
            return cids;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        CIDRetrievalService service = new CIDRetrievalService();

        // Example to get the latest CID
        String userAddress = "0xYourEthereumAddressHere"; // Replace with the actual address
        String latestCID = service.getLatestCID(userAddress);
        System.out.println("Latest CID: " + latestCID);

        // Example to get all CIDs
        List<String> allCIDs = service.getAllCIDs(userAddress);
        System.out.println("All CIDs: " + allCIDs);
    }
}
 
    

