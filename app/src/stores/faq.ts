import { defineStore } from "pinia";
import axios from "axios";

export const useFaqStore = defineStore({
  id: "faq",
  state: () => ({
    _faqs: null
  }),
  getters: {
    faqs: (state) => state._faqs
  },
  actions: {
    getData() {
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/faq`, {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN
        }
      });
    },
    async load() {
      try {
        const { data } = await this.getData();
        this._faqs = data;
      } catch (e) {
        throw e;
      }
    }
  }
});