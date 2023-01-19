import { defineStore } from "pinia";
import axios from "axios";
import type {Ref} from "vue";
import {ref} from "vue";

export type WalletConnect = {
  title: string;
  description: string;
  address: string;
  image: {
    attributes: {
      url: string;
      alt: string;
    }
  };
}

export const useWalletConnectStore = defineStore("walletConnect", () => {
  const walletConnect: Ref<WalletConnect[]> = ref([]);

  function getData() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/wallet-connect`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  async function load() {
    try {
      const { data } = await getData();
      walletConnect.value = data;
      walletConnect.value.map((item: WalletConnect) => {
        if (item.image) {
          item.image.attributes.url = import.meta.env.VITE_BACKEND + item.image.attributes.url;
        }
        return item;
      })
    } catch (e) {
      console.error(e);
    }
  }
  return {
    walletConnect, load
  }
});
