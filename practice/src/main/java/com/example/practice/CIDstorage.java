package com.example.practice;

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
    public static final String BINARY = "6080604052348015600e575f80fd5b506109c08061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610034575f3560e01c80636367da9c14610038578063ccfdd32b14610068575b5f80fd5b610052600480360381019061004d91906102ff565b610084565b60405161005f9190610455565b60405180910390f35b610082600480360381019061007d91906105a1565b610194565b005b60605f808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20805480602002602001604051908101604052809291908181526020015f905b82821015610189578382905f5260205f200180546100fe90610615565b80601f016020809104026020016040519081016040528092919081815260200182805461012a90610615565b80156101755780601f1061014c57610100808354040283529160200191610175565b820191905f5260205f20905b81548152906001019060200180831161015857829003601f168201915b5050505050815260200190600101906100e1565b505050509050919050565b5f8151116101d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ce9061069f565b60405180910390fd5b5f803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081908060018154018082558091505060019003905f5260205f20015f9091909190915090816102429190610863565b503373ffffffffffffffffffffffffffffffffffffffff167fd8a0edc6ade10e42d7ab691902b8c1a635fabe45ace3609fc4fbfad7e424e42782604051610289919061096a565b60405180910390a250565b5f604051905090565b5f80fd5b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6102ce826102a5565b9050919050565b6102de816102c4565b81146102e8575f80fd5b50565b5f813590506102f9816102d5565b92915050565b5f602082840312156103145761031361029d565b5b5f610321848285016102eb565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f61039582610353565b61039f818561035d565b93506103af81856020860161036d565b6103b88161037b565b840191505092915050565b5f6103ce838361038b565b905092915050565b5f602082019050919050565b5f6103ec8261032a565b6103f68185610334565b93508360208202850161040885610344565b805f5b85811015610443578484038952815161042485826103c3565b945061042f836103d6565b925060208a0199505060018101905061040b565b50829750879550505050505092915050565b5f6020820190508181035f83015261046d81846103e2565b905092915050565b5f80fd5b5f80fd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6104b38261037b565b810181811067ffffffffffffffff821117156104d2576104d161047d565b5b80604052505050565b5f6104e4610294565b90506104f082826104aa565b919050565b5f67ffffffffffffffff82111561050f5761050e61047d565b5b6105188261037b565b9050602081019050919050565b828183375f83830152505050565b5f610545610540846104f5565b6104db565b90508281526020810184848401111561056157610560610479565b5b61056c848285610525565b509392505050565b5f82601f83011261058857610587610475565b5b8135610598848260208601610533565b91505092915050565b5f602082840312156105b6576105b561029d565b5b5f82013567ffffffffffffffff8111156105d3576105d26102a1565b5b6105df84828501610574565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061062c57607f821691505b60208210810361063f5761063e6105e8565b5b50919050565b5f82825260208201905092915050565b7f4349442063616e6e6f7420626520656d707479000000000000000000000000005f82015250565b5f610689601383610645565b915061069482610655565b602082019050919050565b5f6020820190508181035f8301526106b68161067d565b9050919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026107197fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826106de565b61072386836106de565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f61076761076261075d8461073b565b610744565b61073b565b9050919050565b5f819050919050565b6107808361074d565b61079461078c8261076e565b8484546106ea565b825550505050565b5f90565b6107a861079c565b6107b3818484610777565b505050565b5b818110156107d6576107cb5f826107a0565b6001810190506107b9565b5050565b601f82111561081b576107ec816106bd565b6107f5846106cf565b81016020851015610804578190505b610818610810856106cf565b8301826107b8565b50505b505050565b5f82821c905092915050565b5f61083b5f1984600802610820565b1980831691505092915050565b5f610853838361082c565b9150826002028217905092915050565b61086c82610353565b67ffffffffffffffff8111156108855761088461047d565b5b61088f8254610615565b61089a8282856107da565b5f60209050601f8311600181146108cb575f84156108b9578287015190505b6108c38582610848565b86555061092a565b601f1984166108d9866106bd565b5f5b82811015610900578489015182556001820191506020850194506020810190506108db565b8683101561091d5784890151610919601f89168261082c565b8355505b6001600288020188555050505b505050505050565b5f61093c82610353565b6109468185610645565b935061095681856020860161036d565b61095f8161037b565b840191505092915050565b5f6020820190508181035f8301526109828184610932565b90509291505056fea264697066735822122054dc44994190b48eab9d95bc7df885f10c69f04f2981f8bb693954833935babe64736f6c634300081a0033";

    public static final String FUNC_STORECID = "storeCID";

    public static final String FUNC_GETCIDS = "getCIDs";

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

    public RemoteFunctionCall<TransactionReceipt> storeCID(String _cid) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_STORECID, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(_cid)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<List> getCIDs(String user) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETCIDS, 
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
