import { defineStore } from "pinia";
import axios from "axios";

export const useItemDetailsStore = defineStore({
  id: "itemDetails",
  state: () => ({
    _itemDetails: null,
    _likes: {}
  }),
  getters: {
    itemDetails: (state) => state._itemDetails,
    likes: (state) => {
      return (itemId: number, tokenId: number) => {
        // @ts-ignore
        if (!state._likes[itemId] || !state._likes[itemId][tokenId]) {
          return 0;
        }

        // @ts-ignore
        return state._likes[itemId][tokenId]
      };
    },
  },
  actions: {
    getData(itemId: number, tokenId: number) {
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/like?itemId=${itemId}&tokenId=${tokenId}`, {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN
        }
      });
    },
    async load(itemId: number, tokenId: number) {
      try {
        const { data } = await this.getData(itemId, tokenId);
        // @ts-ignore
        if (!this._likes[itemId]) {
          // @ts-ignore
          this._likes[itemId] = {};
        }
        // @ts-ignore
        if (!this._likes[itemId][tokenId]) {
          // @ts-ignore
          this._likes[itemId][tokenId] = 0;
        }

        // @ts-ignore
        this._likes[itemId][tokenId]= data.likes;
      } catch (e) {
        throw e;
      }
    }
  }
});