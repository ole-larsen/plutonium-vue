import { defineStore } from "pinia";
import {inject, ref, computed} from "vue";
import MetaMaskOnboarding from "@metamask/onboarding";
import {useMetaMaskStore} from "@/stores/web3/metamask";
import type {Collection, CollectionItem} from "@/stores/contracts/marketPlace";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import {useNFTStore} from "@/stores/contracts/nft";
import {useAuthStore} from "@/stores/auth";
import {useUsersStore} from "@/stores/users.store";
import {useWeb3Store} from "@/stores/web3/web3";
import {useCollectionStore} from "@/stores/contracts/collection";

export type Item = {
  metadata?: Metadata;
  ItemId: number;
  Nft: string;
  Price: number;
  Seller: string;
  Sold: boolean;
  TokenId: number;
}

export type Metadata = {
  total: number;
  category: string;
  description: string;
  image: string;
  name: string;
  tags: string;
}

export const useLoaderStore = defineStore("loader", () => {
  const axios: any = inject("axios");  // inject axios
  const market = useMarketPlaceStore();
  const nft = useNFTStore();
  const metamask = useMetaMaskStore();
  const web3 = useWeb3Store();
  const collection = useCollectionStore();

  const connected = computed(() => !!useAuthStore().user);

  function loadUsers() {
    return useUsersStore().load();
  }

  function loadMarketData() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/marketdata`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function storeCollectionAbi(abi: string) {
    collection.setAbi(abi);
  }

  function storeCollectionAddress(address: string) {
    collection.setAddress(address);
  }

  function storeNFTAbi(abi: string) {
    nft.setAbi(abi);
  }

  function storeNFTAddress(address: string) {
    nft.setAddress(address);
  }

  function storeMarketName(name: string) {
    market.setName(name);
  }

  function storeMarketAbi(abi: string) {
    market.setAbi(abi);
  }

  function storeMarketAddress(address: string) {
    market.setAddress(address);
  }

  function storeMarketFee(fee: number) {
    market.setFee(fee);
  }

  function loadContractsToWeb3() {
    if (web3.chainID && web3.registered) {
      market.loadWeb3Contract(web3.chainID);
      nft.loadWeb3Contract(web3.chainID);
      collection.loadWeb3Contract(web3.chainID);
    }
  }

  function loadContractsToMetamask() {
    if (metamask.chainID && metamask.registered) {
      market.loadMetamaskContract(metamask.chainID);
      nft.loadMetamaskContract(metamask.chainID);
      collection.loadMetamaskContract(metamask.chainID);
    }
  }

  function connectWeb3() {
    return web3.register();
  }

  function connectMetamask() {
    return metamask.register();
  }

  function runOnboarding() {
    const currentUrl = new URL(window.location.href);
    const forwarderOrigin = currentUrl.hostname === 'localhost' ? 'http://localhost:3000' : undefined;

    try {
      const metaMaskOnboarding = new MetaMaskOnboarding({ forwarderOrigin });
      metaMaskOnboarding.startOnboarding();
    } catch (e) {
      throw(e);
    }
  }

  function storeMarketCollectionsCount(collectionsCount: number) {
    market.storeCollectionsCount(collectionsCount);
  }

  function storeMarketCollections(collections: { [id: string]: Collection }) {
    market.storeCollections(collections);
  }

  async function load() {
    const { isMetaMaskInstalled } = MetaMaskOnboarding;
    const installed = isMetaMaskInstalled();

    try {
      await loadUsers();
      const { data } = await loadMarketData();
      console.log(data.market);
      await storeMarketAddress(data.market.address);
      await storeMarketName(data.market.name);
      await storeMarketAbi(data.market.abi);
      await storeMarketFee(data.market.feePercent);
      // await storeMarketItems(data.market.items, data.market.metadata);
      if (data.market.collections) {
        await storeMarketCollectionsCount(Object.keys(data.market.collections).length);
        await storeMarketCollections(data.market.collections);
      }

      await storeNFTAddress(data.nft.address)
      await storeNFTAbi(data.nft.abi);

      await storeCollectionAddress(data.collection.address)
      await storeCollectionAbi(data.collection.abi);

      if (!installed) {
        await connectWeb3();
        await loadContractsToWeb3();
      }  else {
        await connectMetamask();
        await loadContractsToMetamask();
        console.log(market.contract);
        console.log(collection.contract);
      }
    } catch(e) {
      console.error(e);
    }
  }
  return {
    load,
    connected
  }
});