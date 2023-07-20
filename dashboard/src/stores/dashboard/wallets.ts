import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
type Wallet = {
  id:          number;
  order_by:    number;
  title:       string;
  description: string;
  image_id:    number;
  enabled:     boolean;
}
export const useWalletsStore = defineStore({
  id: "wallets",
  state: () => ({
    _show: false,
    _wallet: {
      title: "",
      description: "",
    },
    _wallets: []
  }),
  getters: {
    show: (state) => state._show,
    wallet: (state) => state._wallet,
    wallets: (state) => state._wallets
  },
  actions: {
    load() {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/wallets`, {
        method: 'GET', // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status == 200 ? response.json() : response.text())
      .then((response) => {
        this._wallets = response;
        return this._wallets;
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    toggleModal() {
      this._show = !this._show;
    },
    new() {
      this._wallet = {
        title: "",
        description: "",
      }
    },
    save(wallet: Wallet) {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/wallets`, {
        method: wallet.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id:           wallet.id ? Number(wallet.id) : undefined,
          title:        wallet.title,
          order_by:     Number(wallet.order_by),
          description:  wallet.description,
          image_id:     Number(wallet.image_id),
          enabled:      wallet.enabled
        })
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        if (wallet.id) {
          this._wallets = JSON.parse(response)
          return this._wallets;
        }
        return this.load();
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    setItem(wallet: Wallet) {
      this._wallet = wallet;
    }
  }
});
