package com.example.hackathon.bean;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

public class Web3jConfig {
    private static final String INFURA_URL = "http://127.0.0.1:7545";
    
    public static Web3j getWeb3j() {
        return Web3j.build(new HttpService(INFURA_URL));
    }
}
