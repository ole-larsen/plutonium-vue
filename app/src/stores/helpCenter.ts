import { defineStore } from "pinia";
import axios from "axios";

export const useHelpCenterStore = defineStore({
  id: "helpCenter",
  state: () => ({
    _helpCenter: [],
  }),
  getters: {
    helpCenter: (state) => state._helpCenter
  },
  actions: {
    getData() {
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/help-center`, {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN
        }
      });
    },

    async load() {
      try {
        const { data } = await this.getData();
        this._helpCenter = data;
        this._helpCenter.map((item: { title: string; description: string; image: any }) => {
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