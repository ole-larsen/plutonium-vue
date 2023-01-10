import { defineStore } from "pinia";
import {ref} from "vue";

export const useLiveAuctionStore = defineStore("liveAuction", () => {
  const isActive: any = ref({});

  function toggleActive(itemId: number) {

    if (isActive.value[itemId] === undefined) {
      isActive.value[itemId] = false;
    }

    // @ts-ignore
    isActive.value[itemId] = !isActive.value[itemId];
  }

  return {
    isActive,
    toggleActive
  }
});
