package com.example.hackathon.bean;

import io.reactivex.Flowable;
import io.reactivex.functions.Function;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 4.9.5.
 */
@SuppressWarnings("rawtypes")
public class CIDstorage extends Contract {
    public static final String BINARY = "6080604052348015600e575f80fd5b50610c688061001c5f395ff3fe608060405234801561000f575f80fd5b506004361061003f575f3560e01c80633728b08d146100435780634309755f14610073578063ccfdd32b146100a3575b5f80fd5b61005d600480360381019061005891906104b2565b6100bf565b60405161006a9190610608565b60405180910390f35b61008d600480360381019061008891906104b2565b6101cf565b60405161009a9190610670565b60405180910390f35b6100bd60048036038101906100b891906107bc565b610347565b005b60605f808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20805480602002602001604051908101604052809291908181526020015f905b828210156101c4578382905f5260205f2001805461013990610830565b80601f016020809104026020016040519081016040528092919081815260200182805461016590610830565b80156101b05780601f10610187576101008083540402835291602001916101b0565b820191905f5260205f20905b81548152906001019060200180831161019357829003601f168201915b50505050508152602001906001019061011c565b505050509050919050565b60605f805f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f208054905090505f8111610256576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161024d906108aa565b60405180910390fd5b5f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2060018261029f91906108fe565b815481106102b0576102af610931565b5b905f5260205f200180546102c390610830565b80601f01602080910402602001604051908101604052809291908181526020018280546102ef90610830565b801561033a5780601f106103115761010080835404028352916020019161033a565b820191905f5260205f20905b81548152906001019060200180831161031d57829003601f168201915b5050505050915050919050565b5f81511161038a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610381906109a8565b60405180910390fd5b5f803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081908060018154018082558091505060019003905f5260205f20015f9091909190915090816103f59190610b63565b503373ffffffffffffffffffffffffffffffffffffffff167fd8a0edc6ade10e42d7ab691902b8c1a635fabe45ace3609fc4fbfad7e424e4278260405161043c9190610670565b60405180910390a250565b5f604051905090565b5f80fd5b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61048182610458565b9050919050565b61049181610477565b811461049b575f80fd5b50565b5f813590506104ac81610488565b92915050565b5f602082840312156104c7576104c6610450565b5b5f6104d48482850161049e565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f61054882610506565b6105528185610510565b9350610562818560208601610520565b61056b8161052e565b840191505092915050565b5f610581838361053e565b905092915050565b5f602082019050919050565b5f61059f826104dd565b6105a981856104e7565b9350836020820285016105bb856104f7565b805f5b858110156105f657848403895281516105d78582610576565b94506105e283610589565b925060208a019950506001810190506105be565b50829750879550505050505092915050565b5f6020820190508181035f8301526106208184610595565b905092915050565b5f82825260208201905092915050565b5f61064282610506565b61064c8185610628565b935061065c818560208601610520565b6106658161052e565b840191505092915050565b5f6020820190508181035f8301526106888184610638565b905092915050565b5f80fd5b5f80fd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6106ce8261052e565b810181811067ffffffffffffffff821117156106ed576106ec610698565b5b80604052505050565b5f6106ff610447565b905061070b82826106c5565b919050565b5f67ffffffffffffffff82111561072a57610729610698565b5b6107338261052e565b9050602081019050919050565b828183375f83830152505050565b5f61076061075b84610710565b6106f6565b90508281526020810184848401111561077c5761077b610694565b5b610787848285610740565b509392505050565b5f82601f8301126107a3576107a2610690565b5b81356107b384826020860161074e565b91505092915050565b5f602082840312156107d1576107d0610450565b5b5f82013567ffffffffffffffff8111156107ee576107ed610454565b5b6107fa8482850161078f565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061084757607f821691505b60208210810361085a57610859610803565b5b50919050565b7f4e6f204349442073746f72656420666f722074686973207573657200000000005f82015250565b5f610894601b83610628565b915061089f82610860565b602082019050919050565b5f6020820190508181035f8301526108c181610888565b9050919050565b5f819050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610908826108c8565b9150610913836108c8565b925082820390508181111561092b5761092a6108d1565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b7f4349442063616e6e6f7420626520656d707479000000000000000000000000005f82015250565b5f610992601383610628565b915061099d8261095e565b602082019050919050565b5f6020820190508181035f8301526109bf81610986565b9050919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302610a227fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826109e7565b610a2c86836109e7565b95508019841693508086168417925050509392505050565b5f819050919050565b5f610a67610a62610a5d846108c8565b610a44565b6108c8565b9050919050565b5f819050919050565b610a8083610a4d565b610a94610a8c82610a6e565b8484546109f3565b825550505050565b5f90565b610aa8610a9c565b610ab3818484610a77565b505050565b5b81811015610ad657610acb5f82610aa0565b600181019050610ab9565b5050565b601f821115610b1b57610aec816109c6565b610af5846109d8565b81016020851015610b04578190505b610b18610b10856109d8565b830182610ab8565b50505b505050565b5f82821c905092915050565b5f610b3b5f1984600802610b20565b1980831691505092915050565b5f610b538383610b2c565b9150826002028217905092915050565b610b6c82610506565b67ffffffffffffffff811115610b8557610b84610698565b5b610b8f8254610830565b610b9a828285610ada565b5f60209050601f831160018114610bcb575f8415610bb9578287015190505b610bc38582610b48565b865550610c2a565b601f198416610bd9866109c6565b5f5b82811015610c0057848901518255600182019150602085019450602081019050610bdb565b86831015610c1d5784890151610c19601f891682610b2c565b8355505b6001600288020188555050505b50505050505056fea264697066735822122030887b82443a1a758d6182d5be8d793472926b3fdb2a78224c1b1bd32304aed764736f6c634300081a0033";

    public static final String FUNC_GETALLCIDS = "getAllCIDs";

    public static final String FUNC_GETLATESTCID = "getLatestCID";

    public static final String FUNC_STORECID = "storeCID";

    public static final Event CIDSTORED_EVENT = new Event("CIDStored", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    @Deprecated
    protected CIDstorage(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected CIDstorage(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected CIDstorage(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected CIDstorage(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public List<CIDStoredEventResponse> getCIDStoredEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = extractEventParametersWithLog(CIDSTORED_EVENT, transactionReceipt);
        ArrayList<CIDStoredEventResponse> responses = new ArrayList<CIDStoredEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            CIDStoredEventResponse typedResponse = new CIDStoredEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.user = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.cid = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<CIDStoredEventResponse> cIDStoredEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, CIDStoredEventResponse>() {
            @Override
            public CIDStoredEventResponse apply(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(CIDSTORED_EVENT, log);
                CIDStoredEventResponse typedResponse = new CIDStoredEventResponse();
                typedResponse.log = log;
                typedResponse.user = (String) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.cid = (String) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<CIDStoredEventResponse> cIDStoredEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(CIDSTORED_EVENT));
        return cIDStoredEventFlowable(filter);
    }

    public RemoteFunctionCall<List> getAllCIDs(String user) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETALLCIDS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, user)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<Utf8String>>() {}));
        return new RemoteFunctionCall<List>(function,
                new Callable<List>() {
                    @Override
                    @SuppressWarnings("unchecked")
                    public List call() throws Exception {
                        List<Type> result = (List<Type>) executeCallSingleValueReturn(function, List.class);
                        return convertToNative(result);
                    }
                });
    }

    public RemoteFunctionCall<String> getLatestCID(String user) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETLATESTCID, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, user)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> storeCID(String _cid) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_STORECID, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(_cid)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static CIDstorage load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new CIDstorage(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static CIDstorage load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new CIDstorage(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static CIDstorage load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new CIDstorage(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static CIDstorage load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new CIDstorage(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<CIDstorage> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(CIDstorage.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<CIDstorage> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(CIDstorage.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<CIDstorage> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(CIDstorage.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<CIDstorage> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(CIDstorage.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    public static class CIDStoredEventResponse extends BaseEventResponse {
        public String user;

        public String cid;
    }
}
