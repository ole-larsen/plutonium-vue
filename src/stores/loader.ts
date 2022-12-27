import { defineStore } from "pinia";
import {inject, ref, computed} from "vue";
import MetaMaskOnboarding from "@metamask/onboarding";
import {useMetaMaskStore} from "@/stores/web3/metamask";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import {useNFTStore} from "@/stores/contracts/nft";
import {useAuthStore} from "@/stores/auth";
import {useUsersStore} from "@/stores/users.store";
import {useWeb3Store} from "@/stores/web3/web3";

export const useLoaderStore = defineStore("loader", () => {
  const axios: any = inject("axios");  // inject axios
  const market = useMarketPlaceStore();
  const nft = useNFTStore();
  const metamask = useMetaMaskStore();
  const web3 = useWeb3Store();

  const connected = computed(() => !!useAuthStore().user);

  function loadUsers() {
    return useUsersStore().load();
  }

  function storeMarketItems() {
    return market.getItems();
  }

  function storeMarketName() {
    return market.getName().then((name: string) => {
      market.setName(name);
    });
  }

  function loadMarketName() {
    return market.getName();
  }

  function loadContractsToWeb3() {
    if (web3.chainID) {
      market.loadWeb3Contract(web3.chainID);
      nft.loadWeb3Contract(web3.chainID);
    }
  }

  function loadContractsToMetamask() {
    if (metamask.chainID) {
      market.loadMetamaskContract(metamask.chainID);
      nft.loadMetamaskContract(metamask.chainID);
    }
  }

  function connectWeb3() {
    return useWeb3Store().register();
  }
  function connectMetamask() {
    return useMetaMaskStore().register();
  }

  function runOnboarding() {
    const currentUrl = new URL(window.location.href);
    const forwarderOrigin = currentUrl.hostname === 'localhost' ? 'http://localhost:3000' : undefined;

    try {
      const metaMaskOnboarding = new MetaMaskOnboarding({ forwarderOrigin });
      metaMaskOnboarding.startOnboarding();
    } catch (error) {
      throw(error);
    }
  }

  async function load() {
    const { isMetaMaskInstalled } = MetaMaskOnboarding;
    const installed = isMetaMaskInstalled();

    try {
      await loadUsers();
      if (!installed) {
        await connectWeb3();
        await loadContractsToWeb3();
      }  else {
        await loadContractsToMetamask();
        await storeMarketName();
        await storeMarketItems();
        // if (!installed) {
        //   runOnboarding();
        // }
        await connectMetamask();
      }
    } catch(e) {
      console.error(e);
    }
  }
  return {
    load,
    loadMarketName,
    connected
  }
});