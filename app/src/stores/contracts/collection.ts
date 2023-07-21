import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";

import { useWeb3Store } from "@/stores/web3/web3";
import { useMetaMaskStore } from "@/stores/web3/metamask";
import type { NFTCollection } from "@ploutonion/dapp-contracts/typechain-types/contracts/NFTCollection";
import { ethers } from "ethers";

export const useCollectionStore = defineStore("collection", () => {
  const contractAddress: Ref<{ [id: string]: string }> = ref({});
  const contract: Ref<{ [id: string]: NFTCollection }> = ref({});
  const abi: Ref<{ [id: string]: string }> = ref({});

  const metamask = useMetaMaskStore();
  const web3 = useWeb3Store();

  function loadMetaMaskContracts(_collections: {
    [id: string]: { abi: string; address: string; name: string };
  }) {
    for (const collectionId in _collections) {
      contractAddress.value[collectionId] = _collections[collectionId].address;
      abi.value[collectionId] = _collections[collectionId].abi;
      contract.value[collectionId] = new ethers.Contract(
        contractAddress.value[collectionId],
        JSON.parse(abi.value[collectionId]),
        metamask.signer()
      ) as NFTCollection;
    }
  }

  function loadWeb3Contracts(_collections: {
    [id: string]: { abi: string; address: string; name: string };
  }) {
    for (const collectionId in _collections) {
      contractAddress.value[collectionId] = _collections[collectionId].address;
      abi.value[collectionId] = _collections[collectionId].abi;
      contract.value[collectionId] = new ethers.Contract(
        contractAddress.value[collectionId],
        JSON.parse(abi.value[collectionId]),
        web3.signer()
      ) as NFTCollection;
    }
  }

  return {
    contractAddress,
    contract,
    loadWeb3Contracts,
    loadMetaMaskContracts,
  };
});
