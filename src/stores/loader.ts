import { defineStore } from "pinia";
import {inject, ref, computed} from "vue";
import MetaMaskOnboarding from "@metamask/onboarding";
import {useMetaMaskStore} from "@/stores/metamask";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import {useNFTStore} from "@/stores/contracts/nft";
import {useAuthStore} from "@/stores/auth";
import {useUsersStore} from "@/stores/users.store";

export const useLoaderStore = defineStore("loader", () => {
  const axios: any = inject("axios");  // inject axios
  const market = useMarketPlaceStore();
  const nft = useNFTStore();
  const metamask = useMetaMaskStore();
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

  function loadContracts() {
    if (metamask.chainID) {
      market.loadContract(metamask.chainID);
      nft.loadContract(metamask.chainID);
    }
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
      if (!installed) {
        runOnboarding();
      }
      if (installed) {
        await loadUsers();
        await connectMetamask();
        await loadContracts();
        await storeMarketName();
        await storeMarketItems();
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