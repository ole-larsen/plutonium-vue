/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory } from "ethers";
import type { Overrides } from "ethers";

import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  NFT,
  NFTInterface,
} from "../../../contracts/NFTCollection.sol/NFT";

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
    inputs: [],
    name: "count",
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
    inputs: [
      {
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
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
  "0x60806040523480156200001157600080fd5b50604051620032b2380380620032b2833981810160405281019062000037919062000204565b818181600090816200004a9190620004d4565b5080600190816200005c9190620004d4565b5050505050620005bb565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620000d08262000085565b810181811067ffffffffffffffff82111715620000f257620000f162000096565b5b80604052505050565b60006200010762000067565b9050620001158282620000c5565b919050565b600067ffffffffffffffff82111562000138576200013762000096565b5b620001438262000085565b9050602081019050919050565b60005b838110156200017057808201518184015260208101905062000153565b8381111562000180576000848401525b50505050565b60006200019d62000197846200011a565b620000fb565b905082815260208101848484011115620001bc57620001bb62000080565b5b620001c984828562000150565b509392505050565b600082601f830112620001e957620001e86200007b565b5b8151620001fb84826020860162000186565b91505092915050565b600080604083850312156200021e576200021d62000071565b5b600083015167ffffffffffffffff8111156200023f576200023e62000076565b5b6200024d85828601620001d1565b925050602083015167ffffffffffffffff81111562000271576200027062000076565b5b6200027f85828601620001d1565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620002dc57607f821691505b602082108103620002f257620002f162000294565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200035c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200031d565b6200036886836200031d565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620003b5620003af620003a98462000380565b6200038a565b62000380565b9050919050565b6000819050919050565b620003d18362000394565b620003e9620003e082620003bc565b8484546200032a565b825550505050565b600090565b62000400620003f1565b6200040d818484620003c6565b505050565b5b81811015620004355762000429600082620003f6565b60018101905062000413565b5050565b601f82111562000484576200044e81620002f8565b62000459846200030d565b8101602085101562000469578190505b6200048162000478856200030d565b83018262000412565b50505b505050565b600082821c905092915050565b6000620004a96000198460080262000489565b1980831691505092915050565b6000620004c4838362000496565b9150826002028217905092915050565b620004df8262000289565b67ffffffffffffffff811115620004fb57620004fa62000096565b5b620005078254620002c3565b6200051482828562000439565b600060209050601f8311600181146200054c576000841562000537578287015190505b620005438582620004b6565b865550620005b3565b601f1984166200055c86620002f8565b60005b8281101562000586578489015182556001820191506020850194506020810190506200055f565b86831015620005a65784890151620005a2601f89168262000496565b8355505b6001600288020188555050505b505050505050565b612ce780620005cb6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80636352211e11610097578063b88d4fde11610066578063b88d4fde14610284578063c87b56dd146102a0578063d85d3d27146102d0578063e985e9c514610300576100f5565b80636352211e146101ea57806370a082311461021a57806395d89b411461024a578063a22cb46514610268576100f5565b8063081812fc116100d3578063081812fc14610166578063095ea7b31461019657806323b872dd146101b257806342842e0e146101ce576100f5565b806301ffc9a7146100fa57806306661abd1461012a57806306fdde0314610148575b600080fd5b610114600480360381019061010f9190611adf565b610330565b6040516101219190611b27565b60405180910390f35b610132610412565b60405161013f9190611b5b565b60405180910390f35b610150610418565b60405161015d9190611c0f565b60405180910390f35b610180600480360381019061017b9190611c5d565b6104aa565b60405161018d9190611ccb565b60405180910390f35b6101b060048036038101906101ab9190611d12565b6104f0565b005b6101cc60048036038101906101c79190611d52565b610607565b005b6101e860048036038101906101e39190611d52565b610667565b005b61020460048036038101906101ff9190611c5d565b610687565b6040516102119190611ccb565b60405180910390f35b610234600480360381019061022f9190611da5565b61070d565b6040516102419190611b5b565b60405180910390f35b6102526107c4565b60405161025f9190611c0f565b60405180910390f35b610282600480360381019061027d9190611dfe565b610856565b005b61029e60048036038101906102999190611f73565b61086c565b005b6102ba60048036038101906102b59190611c5d565b6108ce565b6040516102c79190611c0f565b60405180910390f35b6102ea60048036038101906102e59190612097565b6109e0565b6040516102f79190611b5b565b60405180910390f35b61031a600480360381019061031591906120e0565b610a1c565b6040516103279190611b27565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806103fb57507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061040b575061040a82610ab0565b5b9050919050565b60075481565b6060600080546104279061214f565b80601f01602080910402602001604051908101604052809291908181526020018280546104539061214f565b80156104a05780601f10610475576101008083540402835291602001916104a0565b820191906000526020600020905b81548152906001019060200180831161048357829003601f168201915b5050505050905090565b60006104b582610b1a565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006104fb82610687565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361056b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610562906121f2565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661058a610b65565b73ffffffffffffffffffffffffffffffffffffffff1614806105b957506105b8816105b3610b65565b610a1c565b5b6105f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ef90612284565b60405180910390fd5b6106028383610b6d565b505050565b610618610612610b65565b82610c26565b610657576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064e90612316565b60405180910390fd5b610662838383610cbb565b505050565b6106828383836040518060200160405280600081525061086c565b505050565b60008061069383610fb4565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610704576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106fb90612382565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361077d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077490612414565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060600180546107d39061214f565b80601f01602080910402602001604051908101604052809291908181526020018280546107ff9061214f565b801561084c5780601f106108215761010080835404028352916020019161084c565b820191906000526020600020905b81548152906001019060200180831161082f57829003601f168201915b5050505050905090565b610868610861610b65565b8383610ff1565b5050565b61087d610877610b65565b83610c26565b6108bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108b390612316565b60405180910390fd5b6108c88484848461115d565b50505050565b60606108d982610b1a565b60006006600084815260200190815260200160002080546108f99061214f565b80601f01602080910402602001604051908101604052809291908181526020018280546109259061214f565b80156109725780601f1061094757610100808354040283529160200191610972565b820191906000526020600020905b81548152906001019060200180831161095557829003601f168201915b5050505050905060006109836111b9565b905060008151036109985781925050506109db565b6000825111156109cd5780826040516020016109b5929190612470565b604051602081830303815290604052925050506109db565b6109d6846111d0565b925050505b919050565b6000600760008154809291906109f5906124c3565b9190505550610a0633600754611238565b610a1260075483611256565b6007549050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b610b23816112c3565b610b62576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5990612382565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610be083610687565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610c3283610687565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610c745750610c738185610a1c565b5b80610cb257508373ffffffffffffffffffffffffffffffffffffffff16610c9a846104aa565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610cdb82610687565b73ffffffffffffffffffffffffffffffffffffffff1614610d31576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d289061257d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610da0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d979061260f565b60405180910390fd5b610dad8383836001611304565b8273ffffffffffffffffffffffffffffffffffffffff16610dcd82610687565b73ffffffffffffffffffffffffffffffffffffffff1614610e23576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e1a9061257d565b60405180910390fd5b6004600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4610faf838383600161142a565b505050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361105f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110569061267b565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516111509190611b27565b60405180910390a3505050565b611168848484610cbb565b61117484848484611430565b6111b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111aa9061270d565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b60606111db82610b1a565b60006111e56111b9565b905060008151116112055760405180602001604052806000815250611230565b8061120f846115b7565b604051602001611220929190612470565b6040516020818303038152906040525b915050919050565b611252828260405180602001604052806000815250611685565b5050565b61125f826112c3565b61129e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112959061279f565b60405180910390fd5b806006600084815260200190815260200160002090816112be919061296b565b505050565b60008073ffffffffffffffffffffffffffffffffffffffff166112e583610fb4565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600181111561142457600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16146113985780600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546113909190612a3d565b925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146114235780600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461141b9190612a71565b925050819055505b5b50505050565b50505050565b60006114518473ffffffffffffffffffffffffffffffffffffffff166116e0565b156115aa578373ffffffffffffffffffffffffffffffffffffffff1663150b7a0261147a610b65565b8786866040518563ffffffff1660e01b815260040161149c9493929190612b1c565b6020604051808303816000875af19250505080156114d857506040513d601f19601f820116820180604052508101906114d59190612b7d565b60015b61155a573d8060008114611508576040519150601f19603f3d011682016040523d82523d6000602084013e61150d565b606091505b506000815103611552576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115499061270d565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150506115af565b600190505b949350505050565b6060600060016115c684611703565b01905060008167ffffffffffffffff8111156115e5576115e4611e48565b5b6040519080825280601f01601f1916602001820160405280156116175781602001600182028036833780820191505090505b509050600082602001820190505b60011561167a578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a858161166e5761166d612baa565b5b04945060008503611625575b819350505050919050565b61168f8383611856565b61169c6000848484611430565b6116db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116d29061270d565b60405180910390fd5b505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611761577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000838161175757611756612baa565b5b0492506040810190505b6d04ee2d6d415b85acef8100000000831061179e576d04ee2d6d415b85acef8100000000838161179457611793612baa565b5b0492506020810190505b662386f26fc1000083106117cd57662386f26fc1000083816117c3576117c2612baa565b5b0492506010810190505b6305f5e10083106117f6576305f5e10083816117ec576117eb612baa565b5b0492506008810190505b612710831061181b57612710838161181157611810612baa565b5b0492506004810190505b6064831061183e576064838161183457611833612baa565b5b0492506002810190505b600a831061184d576001810190505b80915050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036118c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118bc90612c25565b60405180910390fd5b6118ce816112c3565b1561190e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161190590612c91565b60405180910390fd5b61191c600083836001611304565b611925816112c3565b15611965576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161195c90612c91565b60405180910390fd5b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611a6f60008383600161142a565b5050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611abc81611a87565b8114611ac757600080fd5b50565b600081359050611ad981611ab3565b92915050565b600060208284031215611af557611af4611a7d565b5b6000611b0384828501611aca565b91505092915050565b60008115159050919050565b611b2181611b0c565b82525050565b6000602082019050611b3c6000830184611b18565b92915050565b6000819050919050565b611b5581611b42565b82525050565b6000602082019050611b706000830184611b4c565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611bb0578082015181840152602081019050611b95565b83811115611bbf576000848401525b50505050565b6000601f19601f8301169050919050565b6000611be182611b76565b611beb8185611b81565b9350611bfb818560208601611b92565b611c0481611bc5565b840191505092915050565b60006020820190508181036000830152611c298184611bd6565b905092915050565b611c3a81611b42565b8114611c4557600080fd5b50565b600081359050611c5781611c31565b92915050565b600060208284031215611c7357611c72611a7d565b5b6000611c8184828501611c48565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611cb582611c8a565b9050919050565b611cc581611caa565b82525050565b6000602082019050611ce06000830184611cbc565b92915050565b611cef81611caa565b8114611cfa57600080fd5b50565b600081359050611d0c81611ce6565b92915050565b60008060408385031215611d2957611d28611a7d565b5b6000611d3785828601611cfd565b9250506020611d4885828601611c48565b9150509250929050565b600080600060608486031215611d6b57611d6a611a7d565b5b6000611d7986828701611cfd565b9350506020611d8a86828701611cfd565b9250506040611d9b86828701611c48565b9150509250925092565b600060208284031215611dbb57611dba611a7d565b5b6000611dc984828501611cfd565b91505092915050565b611ddb81611b0c565b8114611de657600080fd5b50565b600081359050611df881611dd2565b92915050565b60008060408385031215611e1557611e14611a7d565b5b6000611e2385828601611cfd565b9250506020611e3485828601611de9565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611e8082611bc5565b810181811067ffffffffffffffff82111715611e9f57611e9e611e48565b5b80604052505050565b6000611eb2611a73565b9050611ebe8282611e77565b919050565b600067ffffffffffffffff821115611ede57611edd611e48565b5b611ee782611bc5565b9050602081019050919050565b82818337600083830152505050565b6000611f16611f1184611ec3565b611ea8565b905082815260208101848484011115611f3257611f31611e43565b5b611f3d848285611ef4565b509392505050565b600082601f830112611f5a57611f59611e3e565b5b8135611f6a848260208601611f03565b91505092915050565b60008060008060808587031215611f8d57611f8c611a7d565b5b6000611f9b87828801611cfd565b9450506020611fac87828801611cfd565b9350506040611fbd87828801611c48565b925050606085013567ffffffffffffffff811115611fde57611fdd611a82565b5b611fea87828801611f45565b91505092959194509250565b600067ffffffffffffffff82111561201157612010611e48565b5b61201a82611bc5565b9050602081019050919050565b600061203a61203584611ff6565b611ea8565b90508281526020810184848401111561205657612055611e43565b5b612061848285611ef4565b509392505050565b600082601f83011261207e5761207d611e3e565b5b813561208e848260208601612027565b91505092915050565b6000602082840312156120ad576120ac611a7d565b5b600082013567ffffffffffffffff8111156120cb576120ca611a82565b5b6120d784828501612069565b91505092915050565b600080604083850312156120f7576120f6611a7d565b5b600061210585828601611cfd565b925050602061211685828601611cfd565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061216757607f821691505b60208210810361217a57612179612120565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b60006121dc602183611b81565b91506121e782612180565b604082019050919050565b6000602082019050818103600083015261220b816121cf565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b600061226e603d83611b81565b915061227982612212565b604082019050919050565b6000602082019050818103600083015261229d81612261565b9050919050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206f7220617070726f76656400000000000000000000000000000000000000602082015250565b6000612300602d83611b81565b915061230b826122a4565b604082019050919050565b6000602082019050818103600083015261232f816122f3565b9050919050565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b600061236c601883611b81565b915061237782612336565b602082019050919050565b6000602082019050818103600083015261239b8161235f565b9050919050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b60006123fe602983611b81565b9150612409826123a2565b604082019050919050565b6000602082019050818103600083015261242d816123f1565b9050919050565b600081905092915050565b600061244a82611b76565b6124548185612434565b9350612464818560208601611b92565b80840191505092915050565b600061247c828561243f565b9150612488828461243f565b91508190509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006124ce82611b42565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612500576124ff612494565b5b600182019050919050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b6000612567602583611b81565b91506125728261250b565b604082019050919050565b600060208201905081810360008301526125968161255a565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006125f9602483611b81565b91506126048261259d565b604082019050919050565b60006020820190508181036000830152612628816125ec565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b6000612665601983611b81565b91506126708261262f565b602082019050919050565b6000602082019050818103600083015261269481612658565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b60006126f7603283611b81565b91506127028261269b565b604082019050919050565b60006020820190508181036000830152612726816126ea565b9050919050565b7f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008201527f6578697374656e7420746f6b656e000000000000000000000000000000000000602082015250565b6000612789602e83611b81565b91506127948261272d565b604082019050919050565b600060208201905081810360008301526127b88161277c565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026128217fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826127e4565b61282b86836127e4565b95508019841693508086168417925050509392505050565b6000819050919050565b600061286861286361285e84611b42565b612843565b611b42565b9050919050565b6000819050919050565b6128828361284d565b61289661288e8261286f565b8484546127f1565b825550505050565b600090565b6128ab61289e565b6128b6818484612879565b505050565b5b818110156128da576128cf6000826128a3565b6001810190506128bc565b5050565b601f82111561291f576128f0816127bf565b6128f9846127d4565b81016020851015612908578190505b61291c612914856127d4565b8301826128bb565b50505b505050565b600082821c905092915050565b600061294260001984600802612924565b1980831691505092915050565b600061295b8383612931565b9150826002028217905092915050565b61297482611b76565b67ffffffffffffffff81111561298d5761298c611e48565b5b612997825461214f565b6129a28282856128de565b600060209050601f8311600181146129d557600084156129c3578287015190505b6129cd858261294f565b865550612a35565b601f1984166129e3866127bf565b60005b82811015612a0b578489015182556001820191506020850194506020810190506129e6565b86831015612a285784890151612a24601f891682612931565b8355505b6001600288020188555050505b505050505050565b6000612a4882611b42565b9150612a5383611b42565b925082821015612a6657612a65612494565b5b828203905092915050565b6000612a7c82611b42565b9150612a8783611b42565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612abc57612abb612494565b5b828201905092915050565b600081519050919050565b600082825260208201905092915050565b6000612aee82612ac7565b612af88185612ad2565b9350612b08818560208601611b92565b612b1181611bc5565b840191505092915050565b6000608082019050612b316000830187611cbc565b612b3e6020830186611cbc565b612b4b6040830185611b4c565b8181036060830152612b5d8184612ae3565b905095945050505050565b600081519050612b7781611ab3565b92915050565b600060208284031215612b9357612b92611a7d565b5b6000612ba184828501612b68565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b6000612c0f602083611b81565b9150612c1a82612bd9565b602082019050919050565b60006020820190508181036000830152612c3e81612c02565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000612c7b601c83611b81565b9150612c8682612c45565b602082019050919050565b60006020820190508181036000830152612caa81612c6e565b905091905056fea26469706673582212200648be45ae65c6a89075f324a49f8c4c8461e908985fffc0e6f33f642d53eb5864736f6c634300080f0033";

type NFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFT__factory extends ContractFactory {
  constructor(...args: NFTConstructorParams) {
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
  ): Promise<NFT> {
    return super.deploy(_name, _symbol, overrides || {}) as Promise<NFT>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name, _symbol, overrides || {});
  }
  override attach(address: string): NFT {
    return super.attach(address) as NFT;
  }
  override connect(signer: Signer): NFT__factory {
    return super.connect(signer) as NFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTInterface {
    return new utils.Interface(_abi) as NFTInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): NFT {
    return new Contract(address, _abi, signerOrProvider) as NFT;
  }
}
