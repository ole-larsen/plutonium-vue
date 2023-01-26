import {defineStore} from "pinia";
import type {Ref} from "vue";
import {ethers} from "ethers";
import { useWeb3Store} from "@/stores/web3/web3";
import {ref} from "vue";
import {useMetaMaskStore} from "@/stores/web3/metamask";
import type {NFTCollection} from "@ploutonion/dapp-contracts/typechain-types/contracts/NFTCollection.sol";

export const useCollectionStore = defineStore("collection", () => {
  const contractAddress: Ref<{ [id: string]: string }> = ref({});
  const contract: Ref<{ [id: string]: NFTCollection }> = ref({});
  const abi: Ref<{ [id: string]: string }> = ref({});

  const metamask = useMetaMaskStore();
  const web3 = useWeb3Store();

  function loadMetaMaskContracts(chainID: number, _collections: { [id: string]: {abi: string; address: string; name: string}}) {
    for (const collectionId in _collections) {
      if (_collections.hasOwnProperty(collectionId)) {
        contractAddress.value[collectionId] = _collections[collectionId].address;
        abi.value[collectionId] = _collections[collectionId].abi;
        contract.value[collectionId] = new ethers.Contract(contractAddress.value[collectionId], JSON.parse(abi.value[collectionId]), metamask.signer()) as NFTCollection;
      }
    }
  }

  function loadWeb3Contracts(chainID: number, _collections: { [id: string]: {abi: string; address: string; name: string}}) {
    for (const collectionId in _collections) {
      if (_collections.hasOwnProperty(collectionId)) {
        contractAddress.value[collectionId] = _collections[collectionId].address;
        abi.value[collectionId] = _collections[collectionId].abi;
        contract.value[collectionId] = new ethers.Contract(contractAddress.value[collectionId], JSON.parse(abi.value[collectionId]), web3.getSigner()) as NFTCollection;
      }
    }
  }

  return {
    contractAddress,
    contract,
    loadWeb3Contracts,
    loadMetaMaskContracts
  }
});
