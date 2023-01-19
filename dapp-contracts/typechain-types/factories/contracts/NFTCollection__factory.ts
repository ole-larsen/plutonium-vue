/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { Overrides } from "ethers";
import { Signer, utils, Contract, ContractFactory} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  NFTCollection,
  NFTCollectionInterface,
} from "../../contracts/NFTCollection";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
    inputs: [
      {
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
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
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenURIs",
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
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620039b9380380620039b9833981810160405281019062000037919062000204565b818181600090816200004a9190620004d4565b5080600190816200005c9190620004d4565b5050505050620005bb565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620000d08262000085565b810181811067ffffffffffffffff82111715620000f257620000f162000096565b5b80604052505050565b60006200010762000067565b9050620001158282620000c5565b919050565b600067ffffffffffffffff82111562000138576200013762000096565b5b620001438262000085565b9050602081019050919050565b60005b838110156200017057808201518184015260208101905062000153565b8381111562000180576000848401525b50505050565b60006200019d62000197846200011a565b620000fb565b905082815260208101848484011115620001bc57620001bb62000080565b5b620001c984828562000150565b509392505050565b600082601f830112620001e957620001e86200007b565b5b8151620001fb84826020860162000186565b91505092915050565b600080604083850312156200021e576200021d62000071565b5b600083015167ffffffffffffffff8111156200023f576200023e62000076565b5b6200024d85828601620001d1565b925050602083015167ffffffffffffffff81111562000271576200027062000076565b5b6200027f85828601620001d1565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620002dc57607f821691505b602082108103620002f257620002f162000294565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200035c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200031d565b6200036886836200031d565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620003b5620003af620003a98462000380565b6200038a565b62000380565b9050919050565b6000819050919050565b620003d18362000394565b620003e9620003e082620003bc565b8484546200032a565b825550505050565b600090565b62000400620003f1565b6200040d818484620003c6565b505050565b5b81811015620004355762000429600082620003f6565b60018101905062000413565b5050565b601f82111562000484576200044e81620002f8565b62000459846200030d565b8101602085101562000469578190505b6200048162000478856200030d565b83018262000412565b50505b505050565b600082821c905092915050565b6000620004a96000198460080262000489565b1980831691505092915050565b6000620004c4838362000496565b9150826002028217905092915050565b620004df8262000289565b67ffffffffffffffff811115620004fb57620004fa62000096565b5b620005078254620002c3565b6200051482828562000439565b600060209050601f8311600181146200054c576000841562000537578287015190505b620005438582620004b6565b865550620005b3565b601f1984166200055c86620002f8565b60005b8281101562000586578489015182556001820191506020850194506020810190506200055f565b86831015620005a65784890151620005a2601f89168262000496565b8355505b6001600288020188555050505b505050505050565b6133ee80620005cb6000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80636352211e116100a257806395d89b411161007157806395d89b4114610317578063a22cb46514610335578063b88d4fde14610351578063c87b56dd1461036d578063e985e9c51461039d57610116565b80636352211e1461026b578063695850fb1461029b5780636c8b703f146102b757806370a08231146102e757610116565b806318160ddd116100e957806318160ddd146101b557806323b872dd146101d35780632f745c59146101ef57806342842e0e1461021f5780634f6ccce71461023b57610116565b806301ffc9a71461011b57806306fdde031461014b578063081812fc14610169578063095ea7b314610199575b600080fd5b61013560048036038101906101309190611fea565b6103cd565b6040516101429190612032565b60405180910390f35b6101536103df565b60405161016091906120e6565b60405180910390f35b610183600480360381019061017e919061213e565b610471565b60405161019091906121ac565b60405180910390f35b6101b360048036038101906101ae91906121f3565b6104b7565b005b6101bd6105ce565b6040516101ca9190612242565b60405180910390f35b6101ed60048036038101906101e8919061225d565b6105db565b005b610209600480360381019061020491906121f3565b61063b565b6040516102169190612242565b60405180910390f35b6102396004803603810190610234919061225d565b6106e0565b005b6102556004803603810190610250919061213e565b610700565b6040516102629190612242565b60405180910390f35b6102856004803603810190610280919061213e565b610771565b60405161029291906121ac565b60405180910390f35b6102b560048036038101906102b091906123e5565b6107f7565b005b6102d160048036038101906102cc919061213e565b610908565b6040516102de91906120e6565b60405180910390f35b61030160048036038101906102fc919061242e565b6109b4565b60405161030e9190612242565b60405180910390f35b61031f610a6b565b60405161032c91906120e6565b60405180910390f35b61034f600480360381019061034a9190612487565b610afd565b005b61036b60048036038101906103669190612568565b610b13565b005b6103876004803603810190610382919061213e565b610b75565b60405161039491906120e6565b60405180910390f35b6103b760048036038101906103b291906125eb565b610c62565b6040516103c49190612032565b60405180910390f35b60006103d882610cf6565b9050919050565b6060600080546103ee9061265a565b80601f016020809104026020016040519081016040528092919081815260200182805461041a9061265a565b80156104675780601f1061043c57610100808354040283529160200191610467565b820191906000526020600020905b81548152906001019060200180831161044a57829003601f168201915b5050505050905090565b600061047c82610d70565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006104c282610771565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610532576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610529906126fd565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16610551610dbb565b73ffffffffffffffffffffffffffffffffffffffff161480610580575061057f8161057a610dbb565b610c62565b5b6105bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105b69061278f565b60405180910390fd5b6105c98383610dc3565b505050565b6000600880549050905090565b6105ec6105e6610dbb565b82610e7c565b61062b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062290612821565b60405180910390fd5b610636838383610f11565b505050565b6000610646836109b4565b8210610687576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067e906128b3565b60405180910390fd5b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002054905092915050565b6106fb83838360405180602001604052806000815250610b13565b505050565b600061070a6105ce565b821061074b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161074290612945565b60405180910390fd5b6008828154811061075f5761075e612965565b5b90600052602060002001549050919050565b60008061077d8361120a565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036107ee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e5906129e0565b60405180910390fd5b80915050919050565b600b816040516108079190612a3c565b908152602001604051809103902060009054906101000a900460ff1615610863576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161085a90612a9f565b60405180910390fd5b600a819080600181540180825580915050600190039060005260206000200160009091909190915090816108979190612c6b565b506000600a80549050905081600c600083815260200190815260200160002090816108c29190612c6b565b506108cd3382611247565b6001600b836040516108df9190612a3c565b908152602001604051809103902060006101000a81548160ff0219169083151502179055505050565b600a818154811061091857600080fd5b9060005260206000200160009150905080546109339061265a565b80601f016020809104026020016040519081016040528092919081815260200182805461095f9061265a565b80156109ac5780601f10610981576101008083540402835291602001916109ac565b820191906000526020600020905b81548152906001019060200180831161098f57829003601f168201915b505050505081565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a24576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a1b90612daf565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060018054610a7a9061265a565b80601f0160208091040260200160405190810160405280929190818152602001828054610aa69061265a565b8015610af35780601f10610ac857610100808354040283529160200191610af3565b820191906000526020600020905b815481529060010190602001808311610ad657829003601f168201915b5050505050905090565b610b0f610b08610dbb565b8383611265565b5050565b610b24610b1e610dbb565b83610e7c565b610b63576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5a90612821565b60405180910390fd5b610b6f848484846113d1565b50505050565b6060610b808261142d565b610bbf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bb690612e41565b60405180910390fd5b600c60008381526020019081526020016000208054610bdd9061265a565b80601f0160208091040260200160405190810160405280929190818152602001828054610c099061265a565b8015610c565780601f10610c2b57610100808354040283529160200191610c56565b820191906000526020600020905b815481529060010190602001808311610c3957829003601f168201915b50505050509050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f780e9d63000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610d695750610d688261146e565b5b9050919050565b610d798161142d565b610db8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610daf906129e0565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610e3683610771565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610e8883610771565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610eca5750610ec98185610c62565b5b80610f0857508373ffffffffffffffffffffffffffffffffffffffff16610ef084610471565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610f3182610771565b73ffffffffffffffffffffffffffffffffffffffff1614610f87576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f7e90612ed3565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ff6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fed90612f65565b60405180910390fd5b6110038383836001611550565b8273ffffffffffffffffffffffffffffffffffffffff1661102382610771565b73ffffffffffffffffffffffffffffffffffffffff1614611079576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161107090612ed3565b60405180910390fd5b6004600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46112058383836001611562565b505050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b611261828260405180602001604052806000815250611568565b5050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036112d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112ca90612fd1565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516113c49190612032565b60405180910390a3505050565b6113dc848484610f11565b6113e8848484846115c3565b611427576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161141e90613063565b60405180910390fd5b50505050565b60008073ffffffffffffffffffffffffffffffffffffffff1661144f8361120a565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061153957507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061154957506115488261174a565b5b9050919050565b61155c848484846117b4565b50505050565b50505050565b6115728383611912565b61157f60008484846115c3565b6115be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115b590613063565b60405180910390fd5b505050565b60006115e48473ffffffffffffffffffffffffffffffffffffffff16611b2f565b1561173d578373ffffffffffffffffffffffffffffffffffffffff1663150b7a0261160d610dbb565b8786866040518563ffffffff1660e01b815260040161162f94939291906130d8565b6020604051808303816000875af192505050801561166b57506040513d601f19601f820116820180604052508101906116689190613139565b60015b6116ed573d806000811461169b576040519150601f19603f3d011682016040523d82523d6000602084013e6116a0565b606091505b5060008151036116e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116dc90613063565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611742565b600190505b949350505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6117c084848484611b52565b6001811115611804576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117fb906131d8565b60405180910390fd5b6000829050600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff160361184b5761184681611c78565b61188a565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614611889576118888582611cc1565b5b5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036118cc576118c781611e2e565b61190b565b8473ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161461190a576119098482611eff565b5b5b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611981576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161197890613244565b60405180910390fd5b61198a8161142d565b156119ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119c1906132b0565b60405180910390fd5b6119d8600083836001611550565b6119e18161142d565b15611a21576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a18906132b0565b60405180910390fd5b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611b2b600083836001611562565b5050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6001811115611c7257600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614611be65780600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611bde91906132ff565b925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614611c715780600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611c699190613333565b925050819055505b5b50505050565b6008805490506009600083815260200190815260200160002081905550600881908060018154018082558091505060019003906000526020600020016000909190919091505550565b60006001611cce846109b4565b611cd891906132ff565b9050600060076000848152602001908152602001600020549050818114611dbd576000600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002054905080600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002081905550816007600083815260200190815260200160002081905550505b6007600084815260200190815260200160002060009055600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008381526020019081526020016000206000905550505050565b60006001600880549050611e4291906132ff565b9050600060096000848152602001908152602001600020549050600060088381548110611e7257611e71612965565b5b906000526020600020015490508060088381548110611e9457611e93612965565b5b906000526020600020018190555081600960008381526020019081526020016000208190555060096000858152602001908152602001600020600090556008805480611ee357611ee2613389565b5b6001900381819060005260206000200160009055905550505050565b6000611f0a836109b4565b905081600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002081905550806007600084815260200190815260200160002081905550505050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611fc781611f92565b8114611fd257600080fd5b50565b600081359050611fe481611fbe565b92915050565b60006020828403121561200057611fff611f88565b5b600061200e84828501611fd5565b91505092915050565b60008115159050919050565b61202c81612017565b82525050565b60006020820190506120476000830184612023565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561208757808201518184015260208101905061206c565b83811115612096576000848401525b50505050565b6000601f19601f8301169050919050565b60006120b88261204d565b6120c28185612058565b93506120d2818560208601612069565b6120db8161209c565b840191505092915050565b6000602082019050818103600083015261210081846120ad565b905092915050565b6000819050919050565b61211b81612108565b811461212657600080fd5b50565b60008135905061213881612112565b92915050565b60006020828403121561215457612153611f88565b5b600061216284828501612129565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006121968261216b565b9050919050565b6121a68161218b565b82525050565b60006020820190506121c1600083018461219d565b92915050565b6121d08161218b565b81146121db57600080fd5b50565b6000813590506121ed816121c7565b92915050565b6000806040838503121561220a57612209611f88565b5b6000612218858286016121de565b925050602061222985828601612129565b9150509250929050565b61223c81612108565b82525050565b60006020820190506122576000830184612233565b92915050565b60008060006060848603121561227657612275611f88565b5b6000612284868287016121de565b9350506020612295868287016121de565b92505060406122a686828701612129565b9150509250925092565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6122f28261209c565b810181811067ffffffffffffffff82111715612311576123106122ba565b5b80604052505050565b6000612324611f7e565b905061233082826122e9565b919050565b600067ffffffffffffffff8211156123505761234f6122ba565b5b6123598261209c565b9050602081019050919050565b82818337600083830152505050565b600061238861238384612335565b61231a565b9050828152602081018484840111156123a4576123a36122b5565b5b6123af848285612366565b509392505050565b600082601f8301126123cc576123cb6122b0565b5b81356123dc848260208601612375565b91505092915050565b6000602082840312156123fb576123fa611f88565b5b600082013567ffffffffffffffff81111561241957612418611f8d565b5b612425848285016123b7565b91505092915050565b60006020828403121561244457612443611f88565b5b6000612452848285016121de565b91505092915050565b61246481612017565b811461246f57600080fd5b50565b6000813590506124818161245b565b92915050565b6000806040838503121561249e5761249d611f88565b5b60006124ac858286016121de565b92505060206124bd85828601612472565b9150509250929050565b600067ffffffffffffffff8211156124e2576124e16122ba565b5b6124eb8261209c565b9050602081019050919050565b600061250b612506846124c7565b61231a565b905082815260208101848484011115612527576125266122b5565b5b612532848285612366565b509392505050565b600082601f83011261254f5761254e6122b0565b5b813561255f8482602086016124f8565b91505092915050565b6000806000806080858703121561258257612581611f88565b5b6000612590878288016121de565b94505060206125a1878288016121de565b93505060406125b287828801612129565b925050606085013567ffffffffffffffff8111156125d3576125d2611f8d565b5b6125df8782880161253a565b91505092959194509250565b6000806040838503121561260257612601611f88565b5b6000612610858286016121de565b9250506020612621858286016121de565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061267257607f821691505b6020821081036126855761268461262b565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b60006126e7602183612058565b91506126f28261268b565b604082019050919050565b60006020820190508181036000830152612716816126da565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b6000612779603d83612058565b91506127848261271d565b604082019050919050565b600060208201905081810360008301526127a88161276c565b9050919050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206f7220617070726f76656400000000000000000000000000000000000000602082015250565b600061280b602d83612058565b9150612816826127af565b604082019050919050565b6000602082019050818103600083015261283a816127fe565b9050919050565b7f455243373231456e756d657261626c653a206f776e657220696e646578206f7560008201527f74206f6620626f756e6473000000000000000000000000000000000000000000602082015250565b600061289d602b83612058565b91506128a882612841565b604082019050919050565b600060208201905081810360008301526128cc81612890565b9050919050565b7f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60008201527f7574206f6620626f756e64730000000000000000000000000000000000000000602082015250565b600061292f602c83612058565b915061293a826128d3565b604082019050919050565b6000602082019050818103600083015261295e81612922565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b60006129ca601883612058565b91506129d582612994565b602082019050919050565b600060208201905081810360008301526129f9816129bd565b9050919050565b600081905092915050565b6000612a168261204d565b612a208185612a00565b9350612a30818560208601612069565b80840191505092915050565b6000612a488284612a0b565b915081905092915050565b7f54686520746f6b656e205552492073686f756c6420626520756e697175650000600082015250565b6000612a89601e83612058565b9150612a9482612a53565b602082019050919050565b60006020820190508181036000830152612ab881612a7c565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302612b217fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612ae4565b612b2b8683612ae4565b95508019841693508086168417925050509392505050565b6000819050919050565b6000612b68612b63612b5e84612108565b612b43565b612108565b9050919050565b6000819050919050565b612b8283612b4d565b612b96612b8e82612b6f565b848454612af1565b825550505050565b600090565b612bab612b9e565b612bb6818484612b79565b505050565b5b81811015612bda57612bcf600082612ba3565b600181019050612bbc565b5050565b601f821115612c1f57612bf081612abf565b612bf984612ad4565b81016020851015612c08578190505b612c1c612c1485612ad4565b830182612bbb565b50505b505050565b600082821c905092915050565b6000612c4260001984600802612c24565b1980831691505092915050565b6000612c5b8383612c31565b9150826002028217905092915050565b612c748261204d565b67ffffffffffffffff811115612c8d57612c8c6122ba565b5b612c97825461265a565b612ca2828285612bde565b600060209050601f831160018114612cd55760008415612cc3578287015190505b612ccd8582612c4f565b865550612d35565b601f198416612ce386612abf565b60005b82811015612d0b57848901518255600182019150602085019450602081019050612ce6565b86831015612d285784890151612d24601f891682612c31565b8355505b6001600288020188555050505b505050505050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b6000612d99602983612058565b9150612da482612d3d565b604082019050919050565b60006020820190508181036000830152612dc881612d8c565b9050919050565b7f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008201527f6e6578697374656e7420746f6b656e0000000000000000000000000000000000602082015250565b6000612e2b602f83612058565b9150612e3682612dcf565b604082019050919050565b60006020820190508181036000830152612e5a81612e1e565b9050919050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b6000612ebd602583612058565b9150612ec882612e61565b604082019050919050565b60006020820190508181036000830152612eec81612eb0565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000612f4f602483612058565b9150612f5a82612ef3565b604082019050919050565b60006020820190508181036000830152612f7e81612f42565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b6000612fbb601983612058565b9150612fc682612f85565b602082019050919050565b60006020820190508181036000830152612fea81612fae565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b600061304d603283612058565b915061305882612ff1565b604082019050919050565b6000602082019050818103600083015261307c81613040565b9050919050565b600081519050919050565b600082825260208201905092915050565b60006130aa82613083565b6130b4818561308e565b93506130c4818560208601612069565b6130cd8161209c565b840191505092915050565b60006080820190506130ed600083018761219d565b6130fa602083018661219d565b6131076040830185612233565b8181036060830152613119818461309f565b905095945050505050565b60008151905061313381611fbe565b92915050565b60006020828403121561314f5761314e611f88565b5b600061315d84828501613124565b91505092915050565b7f455243373231456e756d657261626c653a20636f6e736563757469766520747260008201527f616e7366657273206e6f7420737570706f727465640000000000000000000000602082015250565b60006131c2603583612058565b91506131cd82613166565b604082019050919050565b600060208201905081810360008301526131f1816131b5565b9050919050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b600061322e602083612058565b9150613239826131f8565b602082019050919050565b6000602082019050818103600083015261325d81613221565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b600061329a601c83612058565b91506132a582613264565b602082019050919050565b600060208201905081810360008301526132c98161328d565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061330a82612108565b915061331583612108565b925082821015613328576133276132d0565b5b828203905092915050565b600061333e82612108565b915061334983612108565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561337e5761337d6132d0565b5b828201905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea2646970667358221220a6924f6ceb6a1966e90e574e0a1f3f7aa4e12d3e642bc0dffdde9d5a296940bb64736f6c634300080f0033";

type NFTCollectionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTCollectionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFTCollection__factory extends ContractFactory {
  constructor(...args: NFTCollectionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NFTCollection> {
    return super.deploy(
      _name,
      _symbol,
      overrides || {}
    ) as Promise<NFTCollection>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name, _symbol, overrides || {});
  }
  override attach(address: string): NFTCollection {
    return super.attach(address) as NFTCollection;
  }
  override connect(signer: Signer): NFTCollection__factory {
    return super.connect(signer) as NFTCollection__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTCollectionInterface {
    return new utils.Interface(_abi) as NFTCollectionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTCollection {
    return new Contract(address, _abi, signerOrProvider) as NFTCollection;
  }
}
