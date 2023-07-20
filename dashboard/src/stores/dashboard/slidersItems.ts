import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
type SliderItem = {
  id:          number;
  heading:     string;
  description: string;
  slider_id:   string;
  btn_link_1:  string;
  btn_text_1:  string;
  btn_link_2:  string;
  btn_text_2:  string;
  image_id:    string;
  bg_image_id: string;
  enabled:     boolean;
}
export const useSlidersItemsStore = defineStore({
  id: "slidersItems",
  state: () => ({
    _show: false,
    _item: {},
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
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/sliders-items`, {
        method: 'GET', // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        this._items = JSON.parse(response);
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
        heading: "",
        description: ""
      }
    },
    save(item: SliderItem) {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/sliders-items`, {
        method: item.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id:           item.id ? Number(item.id) : undefined,
          heading:      item.heading,
          description:  item.description,
          slider_id:    Number(item.slider_id),
          btn_link_1:   item.btn_link_1,
          btn_text_1:   item.btn_text_1,
          btn_link_2:   item.btn_link_2,
          btn_text_2:   item.btn_text_2,
          image_id:     Number(item.image_id),
          bg_image_id:  Number(item.bg_image_id),
          enabled:      item.enabled
        })
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        if (item.id) {
          this._items = JSON.parse(response)
          return this._items;
        }
        return this.load();
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    setItem(item: SliderItem) {
      if (item.image_id) {
        item.image_id = String(item.image_id);
      }
      if (item.bg_image_id) {
        item.bg_image_id = String(item.bg_image_id);
      }
      if (item.slider_id) {
        item.slider_id = String(item.slider_id);
      }
      if (!item.heading) {
        item.heading = "";
      }
      if (!item.description) {
        item.description = "";
      }
      this._item = item;
    }
  },
});
