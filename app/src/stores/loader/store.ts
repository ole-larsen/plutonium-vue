import { defineStore } from "pinia";

import type { ComputedRef, Ref } from "vue";
import type {
  CollectionDTO,
  ContactFormData,
  PublicMarketData,
  PublicUser,
  PublicCategoryCollectionCollectible,
  CollectibleDTO, PublicContract
} from "@/types";

import {ref, inject, computed} from "vue";

import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";
import { useUserStore }        from "@/stores/users/users.store";
import { useHeaderStore }      from "@/stores/template/header";

import { useMetaMaskStore } from "@/stores/web3/metamask";
import { useWeb3Store } from "@/stores/web3/web3";
import {useFooterStore} from "@/stores/template/footer";
import axios from "axios";
import {useAuthStore} from "@/stores/auth/store";
import {useCollectionStore} from "@/stores/contracts/collection";
import {useAuctionStore} from "@/stores/contracts/auction";


export const useLoaderStore = defineStore("loader", () => {
  const axios: any = inject("axios");  // inject axios

  const market     = useMarketPlaceStore();
  const auth       = useAuthStore();
  const userStore  = useUserStore();
  const header     = useHeaderStore();
  const footer     = useFooterStore();
  const metamask   = useMetaMaskStore();
  const web3       = useWeb3Store();
  const collection = useCollectionStore();
  const auction    = useAuctionStore();
  const loading: Ref<boolean> = ref(false);
  const user: ComputedRef<PublicUser> = computed(() => auth.getUser());

  async function load() {
    try {
      loading.value = true;

      const { data: { contracts, marketplace } } = await _loadMarketData();

      // 1. load contract data
      if (contracts.marketplace) {
        market.storeContract(contracts.marketplace);
      }

      // 2. load categories
      if (marketplace.categories) {
        market.storeCategories(marketplace.categories);
        market.storeCollections(market.getCategories());
      }

      // 3. load users
      const { data } = await _loadUsers();
      userStore.storeUsers(data);

      // 4. load header
      {
        const { data: { logo, menu } } = await _loadHeader();
        header.storeHeader(logo, menu);
      }

      // 5. load footer
      {
        const { data: { logo, menu } } = await _loadFooter();
        footer.storeFooter(logo, menu);
      }

      // 6. check metamask
      // 6.1 if installed load contract to metamask
      if (metamask.installed) {
        await metamask.register();
        market.loadMetamaskContract();
        if (contracts.collections) {
          await loadCollectionContractsToMetamask(contracts.collections);
        }
        if (contracts.auctions) {
          await loadAuctionContractsToMetamask(contracts.auctions);
        }
      }
      // 6.2 if not installed, use web3
      if (!metamask.installed) {
        await web3.register();
        market.loadWeb3Contract();
        if (contracts.collections) {
          await loadCollectionContractsToWeb3(contracts.collections);
        }
        if (contracts.auctions) {
          await loadAuctionContractsToWeb3(contracts.auctions);
        }
      }
    } catch (e) {
      throw e;
    } finally {
      loading.value = false;
    }
  }

  function _loadMarketData(): Promise<PublicMarketData> {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/marketdata`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function _loadUsers() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/users`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function loadUserByAddress(address: string) {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/users?address=${address}`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function _loadHeader() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/header`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function _loadFooter() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/footer`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function getNonce(address: string) {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/auth/wallet-connect?operation=nonce&address=${address}`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function verify(msg: string, signature: string, address: string) {
    return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/auth/wallet-connect`, {
      msg,
      signature,
      address
    }, {
      withCredentials: true
    });
  }

  function loadSlider(sliderNumber: number) {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/slider?provider=home-0${sliderNumber}`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function loadCreateAndSell() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/create-and-sell`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function loadPage(slug: string) {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/page/${slug}`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function loadContact(pageID: number) {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/contact?id=${pageID}`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function postContactForm(form: ContactFormData, pageId: number) {
    const user = auth.getUser()
    if (!user || !user.username) {
      throw new Error("invalid credentials");
    }
    const subject: { label: string; value: number; } | undefined = form.subjectItems
      .find((item: { label: string; value: number; }) => item.value === form.subject);

    return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/contact-form`, {
      pageId: pageId,
      provider: form.provider,
      name: form.name,
      email: form.email,
      subject: (subject as { label: string; value: number; }).label,
      message: form.message,
      csrf: form.csrf
    }, {
      withCredentials: true
    });
  }

  function loadFaq() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/faq`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function loadWalletConnect() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/wallet-connect`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function loadHelpCenter() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/help-center`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function loadBlog(slug: string) {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/blog/${slug}`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function loadBlogs() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/blog`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function upload (file: any, user: PublicUser) {
    const formData = new FormData();
    formData.append("name", file.name);
    formData.append("alt", file.alt);
    formData.append("hash", file.hash);
    formData.append("ext", file.ext);
    formData.append("caption", file.caption);
    formData.append("type", file.type);
    formData.append("size", file.size);
    formData.append("width", file.width);
    formData.append("height", file.height);
    formData.append("provider", file.provider);
    formData.append("file", file.file);

    let url = `${import.meta.env.VITE_BACKEND}/api/v1/files`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${user.token}`
      },
      body: formData
    })
      .then((response) => response.status === 200 ? response.json() : response.text())
      .then( (file) => {
        return file;
      })
      .catch((e) => {
        throw e;
      });
  }

  function loadCollectionContractsToWeb3(_collections: { [id: string]: {abi: string; address: string; name: string}}) {
    collection.loadWeb3Contracts(_collections);
  }

  function loadCollectionContractsToMetamask(_collections: { [id: string]: {abi: string; address: string; name: string}}) {
    collection.loadMetaMaskContracts(_collections);
  }

  function loadAuctionContractsToWeb3(auctions: PublicContract[]) {
    auction.loadWeb3Contracts(auctions);
  }

  function loadAuctionContractsToMetamask(auctions: PublicContract[]) {
    auction.loadMetaMaskContracts(auctions);
  }

  function loadCollectibleLikes(collectible: PublicCategoryCollectionCollectible) {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/like?&itemId=${collectible.attributes.itemId}&collectionId=${collectible.attributes.collectionId}`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function like(collectible: PublicCategoryCollectionCollectible) {
    if (user.value) {
      return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/like`, {
        userId: user.value.id,
        itemId: collectible.attributes.itemId,
        collectionId: collectible.attributes.collectionId
      }, {
        withCredentials: true
      });
    }
  }

  function deployCollectible(collectible: CollectibleDTO) {
    return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/collectibles`, collectible, {
      withCredentials: true
    });
  }

  function deployCollection(_collection: CollectionDTO) {
    return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/collections`, _collection, {
      withCredentials: true
    });
  }

  function deployAuction(collectible: PublicCategoryCollectionCollectible, biddingTime: number) {
    return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/auction`, {
      id: collectible.id,
      collectionId: collectible.attributes.collectionId,
      tokenIds: collectible.attributes.tokenIds,
      itemId: collectible.attributes.itemId,
      biddingtime: biddingTime,
      bid: collectible.attributes.details.price
    }, {
      withCredentials: true
    });
  }

  function updateCollection(_collection: CollectionDTO) {
    return axios.patch(`${import.meta.env.VITE_BACKEND}/api/v1/collections`, _collection, {
      withCredentials: true
    });
  }


  return {
    load,
    loading,
    getNonce,
    verify,
    loadSlider,
    loadCreateAndSell,
    loadPage,
    loadContact,
    postContactForm,
    loadFaq,
    loadWalletConnect,
    loadHelpCenter,
    loadBlog,
    loadBlogs,
    upload,
    loadCollectibleLikes,
    like,
    deployCollectible,
    deployCollection,
    deployAuction,
    updateCollection,
    loadUserByAddress,
  };
});
