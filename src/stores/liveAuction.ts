import { defineStore } from "pinia";
import {ref} from "vue";

export const useLiveAuctionStore = defineStore("liveAuction", () => {
  const isActive = ref({});

  function toggleActive(itemId: number) {
    // @ts-ignore
    isActive.value[itemId] = !isActive.value[itemId];
  }

  return {
    isActive,
    toggleActive
  }
});
