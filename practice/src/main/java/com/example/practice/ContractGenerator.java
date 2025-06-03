package com.example.practice;
import org.web3j.codegen.SolidityFunctionWrapperGenerator;
import java.io.File;

public class ContractGenerator {
    public static void main(String[] args) {
        try {
            String abiFile = "D:\\CC\\practice\\src\\main\\java\\com\\example\\practice/CIDstorage.abi";
            String binFile = "D:\\CC\\practice\\src\\main\\java\\com\\example\\practice/CIDstorage.bin";
            String destinationPackage = "com.example.practice"; // Change as needed
            String destinationPath = "D:/CC/practice/src/main/java/com/example/practice";

            SolidityFunctionWrapperGenerator.main(new String[]{
                    "-a", abiFile,
                    "-b", binFile,
                    "-p", destinationPackage,
                    "-o", destinationPath
            });

            System.out.println("✅ Contract wrapper generated successfully!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
