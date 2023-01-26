import { defineStore } from "pinia";
import type {Ref} from "vue";
import {ref} from "vue";
import axios from "axios";
import type {MarketItem} from "@/stores/contracts/marketPlace";
export const useItemDetailsStore = defineStore("itemDetails", () => {
  const _likes: Ref<{[id: string]: {[tokenId: string]: number}}> = ref({});
  const likes = function(_item: MarketItem) {
    if (!_likes.value[_item.collectionId] || !_likes.value[_item.collectionId][_item.tokenId]) {
      return 0;
    }
    return _likes.value[_item.collectionId][_item.tokenId];
  }

  function getData(item: MarketItem) {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/like?&tokenId=${item.tokenId}&collectionId=${item.collectionId}`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  async function load(_item: MarketItem) {
    try {
      const { data } = await getData(_item);

      if (!_likes.value[_item.collectionId]) {
        _likes.value[_item.collectionId] = {};
      }
      if (!_likes.value[_item.collectionId][_item.tokenId]) {
        _likes.value[_item.collectionId][_item.tokenId] = 0;
      }
      _likes.value[_item.collectionId][_item.tokenId] = data.likes ? data.likes : 0;
    } catch (e) {
      throw e;
    }
  }
  return {
    likes, load
  }
});