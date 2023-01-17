import { defineStore } from "pinia";
import type {Ref} from "vue";
import {ref} from "vue";

export const useLiveAuctionStore = defineStore("liveAuction", () => {
  const isActive: Ref<{[id: number]: boolean}> = ref({});

  function toggleActive(itemId: number) {

    if (isActive.value[itemId] === undefined) {
      isActive.value[itemId] = false;
    }

    isActive.value[itemId] = !isActive.value[itemId];
  }

  return {
    isActive,
    toggleActive
  }
});
