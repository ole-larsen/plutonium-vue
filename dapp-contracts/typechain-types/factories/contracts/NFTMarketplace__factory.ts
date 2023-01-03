/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
} from "ethers";
import type { Overrides, BigNumberish } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  NFTMarketplace,
  NFTMarketplaceInterface,
} from "../../contracts/NFTMarketplace";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_feePercent",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nft",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "sold",
        type: "bool",
      },
    ],
    name: "Bought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nft",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "sold",
        type: "bool",
      },
    ],
    name: "Offered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC721",
        name: "_nft",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "createItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getFeeAccount",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFeePercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_itemCount",
        type: "uint256",
      },
    ],
    name: "getItem",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "contract IERC721",
            name: "nft",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarketplace.Item",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getItemCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
    ],
    name: "getTotalPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_feePercent",
        type: "uint256",
      },
    ],
    name: "setFeePercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_itemCount",
        type: "uint256",
      },
    ],
    name: "setItemCount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "setName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040523480156200001157600080fd5b5060405162001ee738038062001ee783398181016040528101906200003791906200026c565b6001600081905550816002908162000050919062000513565b503373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050806001819055505050620005fa565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620000fd82620000b2565b810181811067ffffffffffffffff821117156200011f576200011e620000c3565b5b80604052505050565b60006200013462000094565b9050620001428282620000f2565b919050565b600067ffffffffffffffff821115620001655762000164620000c3565b5b6200017082620000b2565b9050602081019050919050565b60005b838110156200019d57808201518184015260208101905062000180565b83811115620001ad576000848401525b50505050565b6000620001ca620001c48462000147565b62000128565b905082815260208101848484011115620001e957620001e8620000ad565b5b620001f68482856200017d565b509392505050565b600082601f830112620002165762000215620000a8565b5b815162000228848260208601620001b3565b91505092915050565b6000819050919050565b620002468162000231565b81146200025257600080fd5b50565b60008151905062000266816200023b565b92915050565b600080604083850312156200028657620002856200009e565b5b600083015167ffffffffffffffff811115620002a757620002a6620000a3565b5b620002b585828601620001fe565b9250506020620002c88582860162000255565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200032557607f821691505b6020821081036200033b576200033a620002dd565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003a57fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000366565b620003b1868362000366565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620003f4620003ee620003e88462000231565b620003c9565b62000231565b9050919050565b6000819050919050565b6200041083620003d3565b620004286200041f82620003fb565b84845462000373565b825550505050565b600090565b6200043f62000430565b6200044c81848462000405565b505050565b5b8181101562000474576200046860008262000435565b60018101905062000452565b5050565b601f821115620004c3576200048d8162000341565b620004988462000356565b81016020851015620004a8578190505b620004c0620004b78562000356565b83018262000451565b50505b505050565b600082821c905092915050565b6000620004e860001984600802620004c8565b1980831691505092915050565b6000620005038383620004d5565b9150826002028217905092915050565b6200051e82620002d2565b67ffffffffffffffff8111156200053a5762000539620000c3565b5b6200054682546200030c565b6200055382828562000478565b600060209050601f8311600181146200058b576000841562000576578287015190505b620005828582620004f5565b865550620005f2565b601f1984166200059b8662000341565b60005b82811015620005c5578489015182556001820191506020850194506020810190506200059e565b86831015620005e55784890151620005e1601f891682620004d5565b8355505b6001600288020188555050505b505050505050565b6080516118ca6200061d6000396000818161042f015261093801526118ca6000f3fe60806040526004361061009c5760003560e01c80637a7d12f8116100645780637a7d12f8146101885780637ce3489b146101b1578063be74264d146101da578063c47f002714610205578063ca7dd3751461022e578063d96a094a1461026b5761009c565b806317d7de7c146100a15780633129e773146100cc5780634614be9f1461010957806357baf0fb146101345780637749cf231461015d575b600080fd5b3480156100ad57600080fd5b506100b6610287565b6040516100c39190610cf0565b60405180910390f35b3480156100d857600080fd5b506100f360048036038101906100ee9190610d5c565b610319565b6040516101009190610ece565b60405180910390f35b34801561011557600080fd5b5061011e61042b565b60405161012b9190610f0a565b60405180910390f35b34801561014057600080fd5b5061015b60048036038101906101569190610f63565b610453565b005b34801561016957600080fd5b506101726106e2565b60405161017f9190610fc5565b60405180910390f35b34801561019457600080fd5b506101af60048036038101906101aa9190610d5c565b6106ec565b005b3480156101bd57600080fd5b506101d860048036038101906101d39190610d5c565b6106f6565b005b3480156101e657600080fd5b506101ef610700565b6040516101fc9190610fc5565b60405180910390f35b34801561021157600080fd5b5061022c60048036038101906102279190611115565b61070a565b005b34801561023a57600080fd5b5061025560048036038101906102509190610d5c565b61072b565b6040516102629190610fc5565b60405180910390f35b61028560048036038101906102809190610d5c565b61079a565b005b6060600280546102969061118d565b80601f01602080910402602001604051908101604052809291908181526020018280546102c29061118d565b801561030f5780601f106102e45761010080835404028352916020019161030f565b820191906000526020600020905b8154815290600101906020018083116102f257829003601f168201915b5050505050905090565b610321610bf3565b600460008381526020019081526020016000206040518060c0016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160028201548152602001600382015481526020016004820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016004820160149054906101000a900460ff1615151515815250509050919050565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b61045b610b42565b6000811161049e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104959061120a565b60405180910390fd5b600360008154809291906104b190611259565b91905055508273ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff1660e01b81526004016104f3939291906112a1565b600060405180830381600087803b15801561050d57600080fd5b505af1158015610521573d6000803e3d6000fd5b505050506040518060c0016040528060035481526020018473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281526020013373ffffffffffffffffffffffffffffffffffffffff168152602001600015158152506004600060035481526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550604082015181600201556060820151816003015560808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a08201518160040160146101000a81548160ff0219169083151502179055509050503373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fd475ed778cb25766467f5f25ccea88d651188c790a7c58507a50dcfaa7ed9db2600354858560006040516106cd94939291906112e7565b60405180910390a36106dd610b91565b505050565b6000600354905090565b8060038190555050565b8060018190555050565b6000600154905090565b600081510361071857600080fd5b806002908161072791906114ce565b5050565b600061079361076e60646107606004600087815260200190815260200160002060030154600154610b9b90919063ffffffff16565b610bb190919063ffffffff16565b6004600085815260200190815260200160002060030154610bc790919063ffffffff16565b9050919050565b6107a2610b42565b60006107ad8261072b565b9050600060046000848152602001908152602001600020905060006107df826003015484610bdd90919063ffffffff16565b90506000841180156107f357506003548411155b610832576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610829906115ec565b60405180910390fd5b82341015610875576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086c90611658565b60405180910390fd5b8160040160149054906101000a900460ff16156108c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108be906116c4565b60405180910390fd5b8160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc83600301549081150290604051600060405180830381858888f19350505050158015610935573d6000803e3d6000fd5b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561099c573d6000803e3d6000fd5b5060018260040160146101000a81548160ff0219169083151502179055508160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd303385600201546040518463ffffffff1660e01b8152600401610a1f939291906112a1565b600060405180830381600087803b158015610a3957600080fd5b505af1158015610a4d573d6000803e3d6000fd5b505050503373ffffffffffffffffffffffffffffffffffffffff168260040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168360010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f2338d44341bebebf9bc5716643778e616f04ee9e0a5f4ee9417d7e3cda85a9b687866002015487600301548860040160149054906101000a900460ff16604051610b2c94939291906112e7565b60405180910390a4505050610b3f610b91565b50565b600260005403610b87576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b7e90611730565b60405180910390fd5b6002600081905550565b6001600081905550565b60008183610ba99190611750565b905092915050565b60008183610bbf91906117d9565b905092915050565b60008183610bd5919061180a565b905092915050565b60008183610beb9190611860565b905092915050565b6040518060c0016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000151581525090565b600081519050919050565b600082825260208201905092915050565b60005b83811015610c91578082015181840152602081019050610c76565b83811115610ca0576000848401525b50505050565b6000601f19601f8301169050919050565b6000610cc282610c57565b610ccc8185610c62565b9350610cdc818560208601610c73565b610ce581610ca6565b840191505092915050565b60006020820190508181036000830152610d0a8184610cb7565b905092915050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b610d3981610d26565b8114610d4457600080fd5b50565b600081359050610d5681610d30565b92915050565b600060208284031215610d7257610d71610d1c565b5b6000610d8084828501610d47565b91505092915050565b610d9281610d26565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000610ddd610dd8610dd384610d98565b610db8565b610d98565b9050919050565b6000610def82610dc2565b9050919050565b6000610e0182610de4565b9050919050565b610e1181610df6565b82525050565b6000610e2282610d98565b9050919050565b610e3281610e17565b82525050565b60008115159050919050565b610e4d81610e38565b82525050565b60c082016000820151610e696000850182610d89565b506020820151610e7c6020850182610e08565b506040820151610e8f6040850182610d89565b506060820151610ea26060850182610d89565b506080820151610eb56080850182610e29565b5060a0820151610ec860a0850182610e44565b50505050565b600060c082019050610ee36000830184610e53565b92915050565b6000610ef482610d98565b9050919050565b610f0481610ee9565b82525050565b6000602082019050610f1f6000830184610efb565b92915050565b6000610f3082610ee9565b9050919050565b610f4081610f25565b8114610f4b57600080fd5b50565b600081359050610f5d81610f37565b92915050565b600080600060608486031215610f7c57610f7b610d1c565b5b6000610f8a86828701610f4e565b9350506020610f9b86828701610d47565b9250506040610fac86828701610d47565b9150509250925092565b610fbf81610d26565b82525050565b6000602082019050610fda6000830184610fb6565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61102282610ca6565b810181811067ffffffffffffffff8211171561104157611040610fea565b5b80604052505050565b6000611054610d12565b90506110608282611019565b919050565b600067ffffffffffffffff8211156110805761107f610fea565b5b61108982610ca6565b9050602081019050919050565b82818337600083830152505050565b60006110b86110b384611065565b61104a565b9050828152602081018484840111156110d4576110d3610fe5565b5b6110df848285611096565b509392505050565b600082601f8301126110fc576110fb610fe0565b5b813561110c8482602086016110a5565b91505092915050565b60006020828403121561112b5761112a610d1c565b5b600082013567ffffffffffffffff81111561114957611148610d21565b5b611155848285016110e7565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806111a557607f821691505b6020821081036111b8576111b761115e565b5b50919050565b7f5072696365206d7573742062652067726561746572207468616e203000000000600082015250565b60006111f4601c83610c62565b91506111ff826111be565b602082019050919050565b60006020820190508181036000830152611223816111e7565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061126482610d26565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036112965761129561122a565b5b600182019050919050565b60006060820190506112b66000830186610efb565b6112c36020830185610efb565b6112d06040830184610fb6565b949350505050565b6112e181610e38565b82525050565b60006080820190506112fc6000830187610fb6565b6113096020830186610fb6565b6113166040830185610fb6565b61132360608301846112d8565b95945050505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261138e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82611351565b6113988683611351565b95508019841693508086168417925050509392505050565b60006113cb6113c66113c184610d26565b610db8565b610d26565b9050919050565b6000819050919050565b6113e5836113b0565b6113f96113f1826113d2565b84845461135e565b825550505050565b600090565b61140e611401565b6114198184846113dc565b505050565b5b8181101561143d57611432600082611406565b60018101905061141f565b5050565b601f821115611482576114538161132c565b61145c84611341565b8101602085101561146b578190505b61147f61147785611341565b83018261141e565b50505b505050565b600082821c905092915050565b60006114a560001984600802611487565b1980831691505092915050565b60006114be8383611494565b9150826002028217905092915050565b6114d782610c57565b67ffffffffffffffff8111156114f0576114ef610fea565b5b6114fa825461118d565b611505828285611441565b600060209050601f8311600181146115385760008415611526578287015190505b61153085826114b2565b865550611598565b601f1984166115468661132c565b60005b8281101561156e57848901518255600182019150602085019450602081019050611549565b8683101561158b5784890151611587601f891682611494565b8355505b6001600288020188555050505b505050505050565b7f6974656d20646f6573206e6f7420657869737400000000000000000000000000600082015250565b60006115d6601383610c62565b91506115e1826115a0565b602082019050919050565b60006020820190508181036000830152611605816115c9565b9050919050565b7f696e73756666696369656e742066756e64730000000000000000000000000000600082015250565b6000611642601283610c62565b915061164d8261160c565b602082019050919050565b6000602082019050818103600083015261167181611635565b9050919050565b7f6974656d20616c726561647920736f6c64000000000000000000000000000000600082015250565b60006116ae601183610c62565b91506116b982611678565b602082019050919050565b600060208201905081810360008301526116dd816116a1565b9050919050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b600061171a601f83610c62565b9150611725826116e4565b602082019050919050565b600060208201905081810360008301526117498161170d565b9050919050565b600061175b82610d26565b915061176683610d26565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561179f5761179e61122a565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006117e482610d26565b91506117ef83610d26565b9250826117ff576117fe6117aa565b5b828204905092915050565b600061181582610d26565b915061182083610d26565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156118555761185461122a565b5b828201905092915050565b600061186b82610d26565b915061187683610d26565b9250828210156118895761188861122a565b5b82820390509291505056fea264697066735822122025b1a052354b6255b541bd42d55eda30153af204c7f665e88e549e95e68a56ef64736f6c634300080f0033";

type NFTMarketplaceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTMarketplaceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFTMarketplace__factory extends ContractFactory {
  constructor(...args: NFTMarketplaceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _name: PromiseOrValue<string>,
    _feePercent: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NFTMarketplace> {
    return super.deploy(
      _name,
      _feePercent,
      overrides || {}
    ) as Promise<NFTMarketplace>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _feePercent: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name, _feePercent, overrides || {});
  }
  override attach(address: string): NFTMarketplace {
    return super.attach(address) as NFTMarketplace;
  }
  override connect(signer: Signer): NFTMarketplace__factory {
    return super.connect(signer) as NFTMarketplace__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTMarketplaceInterface {
    return new utils.Interface(_abi) as NFTMarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTMarketplace {
    return new Contract(address, _abi, signerOrProvider) as NFTMarketplace;
  }
}
