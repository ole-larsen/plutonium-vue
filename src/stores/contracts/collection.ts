import {defineStore} from "pinia";
import {ethers} from "ethers";

import type {NFT} from "@/../dapp-contracts/typechain-types";

import { useWeb3Store} from "@/stores/web3/web3";

import {ref} from "vue";
import {useMetaMaskStore} from "@/stores/web3/metamask";
export const useCollectionStore = defineStore("collection", () => {
  const contractAddress = ref("");
  const contract = ref(null);
  const abi = ref("");

  function loadMetamaskContract(chainID: number) {
    if (contractAddress.value) {
      // @ts-ignore
      contract.value = new ethers.Contract(contractAddress.value, JSON.parse(abi.value), useMetaMaskStore().signer()) as NFT;
    }
  }

  function loadWeb3Contract(chainID: number) {
    if (contractAddress.value) {
      // @ts-ignore
      contract.value = new ethers.Contract(contractAddress.value, JSON.parse(abi.value), useWeb3Store().getSigner()) as NFT;
    }
  }

  function setAbi(_abi: string) {
    abi.value = _abi;
  }

  function setAddress(address: string) {
    contractAddress.value = address;
  }

  return {
    contractAddress,
    contract,
    loadWeb3Contract,
    loadMetamaskContract,
    setAddress,
    setAbi
  }
});
