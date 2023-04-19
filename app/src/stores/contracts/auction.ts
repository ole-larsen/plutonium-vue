import {defineStore} from "pinia";
import type {Ref} from "vue";
import {ref} from "vue";

import {useWeb3Store} from "@/stores/web3/web3";
import {useMetaMaskStore} from "@/stores/web3/metamask";
import {ethers} from "ethers";
import type {NFTAuction} from "@ploutonion/dapp-contracts/typechain-types/contracts/NFTAuction";
import type {PublicContract} from "@/types";

export const useAuctionStore = defineStore("auction", () => {
  const contractAddress: Ref<{ [name: string]: string }> = ref({});
  const contract: Ref<{ [name: string]: NFTAuction }> = ref({});
  const abi: Ref<{ [name: string]: string }> = ref({});

  const metamask = useMetaMaskStore();
  const web3 = useWeb3Store();

  function loadMetaMaskContracts(auctions: PublicContract[]) {
    for (const _auction of auctions) {
      contractAddress.value[_auction.name] = _auction.address;
      abi.value[_auction.name] = _auction.abi;
      contract.value[_auction.name] = new ethers.Contract(contractAddress.value[_auction.name], JSON.parse(abi.value[_auction.name]), metamask.signer()) as NFTAuction;
    }
  }

  function loadWeb3Contracts(auctions: PublicContract[]) {
    for (const _auction of auctions) {
      contractAddress.value[_auction.name] = _auction.address;
      abi.value[_auction.name] = _auction.abi;
      contract.value[_auction.name] = new ethers.Contract(contractAddress.value[_auction.name], JSON.parse(abi.value[_auction.name]), web3.signer()) as NFTAuction;
    }
  }

  return {
    contractAddress,
    contract,
    loadWeb3Contracts,
    loadMetaMaskContracts
  }
});