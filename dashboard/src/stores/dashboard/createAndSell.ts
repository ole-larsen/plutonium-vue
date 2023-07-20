import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
export type CreateAndSell = {
  id:          number;
  title:       string;
  description: string;
  link:        string;
  image_id:    number;
  image_url?:  string;
  order_by:    number;
  enabled:     boolean;
}
export const useCreateAndSellStore = defineStore({
  id: "createAndSell",
  state: () => ({
    _show: false,
    _item: {
      title:       "",
      description: "",
      link: ""
    },
    _items: []
  }),
  getters: {
    show: (state) => state._show,
    item: (state) => state._item,
    items: (state) => state._items
  },
  actions: {
    load() {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/create-and-sell`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status === 200 ? response.json() : response.text())
      .then((response) => {
        this._items = response;
        return this._items;
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
      this._item = {
        title: "",
        description: "",
        link: ""
      }
    },
    save(item: CreateAndSell) {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/create-and-sell`, {
        method: item.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id:           item.id ? Number(item.id) : undefined,
          title:        item.title,
          description:  item.description,
          link:         item.link,
          image_id:     Number(item.image_id),
          order_by:     Number(item.order_by),
          enabled:      item.enabled
        })
      })
      .then((response) => response.status === 200 ? response.json() : response.text())
      .then((response) => {
        if (item.id && response.length) {
          this._items = response;

          return this._items;
        }
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    setItem(item: CreateAndSell) {
      this._item = item;
    },
    find(id: number) {
      return this._items.find((item: CreateAndSell) => item.id === id);
    }
  }

});
