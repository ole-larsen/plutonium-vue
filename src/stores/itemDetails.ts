import { defineStore } from "pinia";
import axios from "axios";
import type {MarketItem} from "@/stores/contracts/marketPlace";

export const useItemDetailsStore = defineStore({
  id: "itemDetails",
  state: () => ({
    _itemDetails: null,
    _likes: {}
  }),
  getters: {
    itemDetails: (state) => state._itemDetails,
    likes: (state) => {
      return (_item: MarketItem) => {
        // @ts-ignore
        if (!state._likes[_item.collectionId] || !state._likes[_item.collectionId][_item.itemInCollectionId]) {
          return 0;
        }

        // @ts-ignore
        return state._likes[_item.collectionId][_item.itemInCollectionId]
      };
    },
  },
  actions: {
    getData(item: MarketItem) {
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/like?itemId=${item.id.toString()}&tokenId=${item.tokenId.toString()}&collectionId=${item.collectionId}&itemInCollectionId=${item.itemInCollectionId}`, {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN
        }
      });
    },
    async load(_item: MarketItem) {
      try {
        const { data } = await this.getData(_item);
        // @ts-ignore
        if (!this._likes[_item.collectionId]) {
          // @ts-ignore
          this._likes[_item.collectionId] = {};
        }
        // @ts-ignore
        if (!this._likes[_item.collectionId][_item.itemInCollectionId]) {
          // @ts-ignore
          this._likes[_item.collectionId][_item.itemInCollectionId] = 0;
        }

        // @ts-ignore
        this._likes[_item.collectionId][_item.itemInCollectionId] = data.likes ? data.likes : 0;

      } catch (e) {
        throw e;
      }
    }
  }
});