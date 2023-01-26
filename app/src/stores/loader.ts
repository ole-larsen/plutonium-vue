import { defineStore } from "pinia";
import type {Ref} from "vue";
import {inject, ref, computed} from "vue";
import MetaMaskOnboarding from "@metamask/onboarding";
import {useMetaMaskStore} from "@/stores/web3/metamask";
import type {Collection, PublicMarketItem,} from "@/stores/contracts/marketPlace";
import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";
import {useAuthStore} from "@/stores/auth";
import {useUsersStore} from "@/stores/users.store";
import {useWeb3Store} from "@/stores/web3/web3";
import {useCollectionStore} from "@/stores/contracts/collection";
import {useHeaderStore} from "@/stores/header";
import {useItemDetailsStore} from "@/stores/itemDetails";

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
  const metamask = useMetaMaskStore();
  const web3 = useWeb3Store();
  const collection = useCollectionStore();
  const auth = useAuthStore();

  const loading: Ref<boolean> = ref(true);

  const connected: Ref<boolean> = computed(() => !!auth.user);

  function loadUsers() {
    return useUsersStore().load();
  }

  function loadHeader() {
    return useHeaderStore().load();
  }

  function loadLikes() {
    market.items.forEach(async (_item: PublicMarketItem) => {
      try {
        await useItemDetailsStore().load(_item);
      } catch (e) {
        console.error(e);
      }
    });
  }

  function loadMarketData() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/marketdata`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
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

  function storeMarketOwner(owner: string) {
    market.setOwner(owner);
  }

  function loadMarketContractsToWeb3() {
    if (web3.chainID && web3.registered) {
      market.loadWeb3Contract(web3.chainID);
    }
  }

  function loadMarketContractToMetamask() {
    if (metamask.chainID && metamask.registered) {
      market.loadMetamaskContract(metamask.chainID);
    }
  }

  function loadCollectionContractsToWeb3(_collections: { [id: string]: {abi: string; address: string; name: string}}) {
    if (web3.chainID && web3.registered) {
      collection.loadWeb3Contracts(web3.chainID, _collections);
    }
  }

  function loadCollectionContractsToMetamask(_collections: { [id: string]: {abi: string; address: string; name: string}}) {
    if (metamask.chainID && metamask.registered) {
      collection.loadMetaMaskContracts(metamask.chainID, _collections);
    }
  }

  function connectWeb3() {
    return web3.register();
  }

  function connectMetamask() {
    return metamask.register();
  }

  function storeMarketCollectionsCount(collectionsCount: number) {
    market.storeCollectionsCount(collectionsCount);
  }

  function storeMarketCollections(collections: { [id: string]: Collection }) {
    market.storeCollections(collections);
  }

  async function load() {
    loading.value = true;
    const { isMetaMaskInstalled } = MetaMaskOnboarding;
    const installed = isMetaMaskInstalled();

    try {
      const { data } = await loadMarketData();
      console.log(data.market);
      await storeMarketAddress(data.market.address);
      await storeMarketName(data.market.name);
      await storeMarketAbi(data.market.abi);
      await storeMarketFee(data.market.fee);
      await storeMarketOwner(data.market.owner);

      if (data.market.collections) {
        await storeMarketCollectionsCount(Object.keys(data.market.collections).length);
        await storeMarketCollections(data.market.collections);
      }

      await loadLikes();

      if (!installed) {
        await connectWeb3();
        await loadMarketContractsToWeb3();
        if (data.collections) {
          await loadCollectionContractsToWeb3(data.collections);
        }
      } else {
        await connectMetamask();
        await loadMarketContractToMetamask();
        if (data.collections) {
          await loadCollectionContractsToMetamask(data.collections);
        }
      }
      await loadUsers();
      await loadHeader();
    } catch(e) {
      console.error(e);
    }
    loading.value = false;
  }
  return {
    load,
    connected,
    user: computed(() => auth.user),
    name: computed(() => market.name),
    loading: loading,
    login: metamask.login
  }
});