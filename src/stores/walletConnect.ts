import { defineStore } from "pinia";
import axios from "axios";

export const useWalletConnectStore = defineStore({
  id: "walletConnect",
  state: () => ({
    _walletConnect: [],
  }),
  getters: {
    walletConnect: (state) => state._walletConnect
  },
  actions: {
    getData() {
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/wallet-connect`, {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN
        }
      });
    },
    async load() {
      try {
        const { data } = await this.getData();
        this._walletConnect = data;
        this._walletConnect.map((item: { title: string; description: string; image: any }) => {
          if (item.image) {
            item.image.attributes.url = import.meta.env.VITE_BACKEND + item.image.attributes.url;
          }
          return item;
        })
      } catch (e) {
        throw e;
      }
    }
  }
});