import { defineStore } from "pinia";
import type {Ref} from "vue";
import { ref } from "vue";

export const useTodayPickStore = defineStore("todayPick", () => {
  const isActive: Ref<{[id: number]: boolean}> = ref({});

  function toggleActive(itemId: number) {
    isActive.value[itemId] = !isActive.value[itemId];
  }

  return {
    isActive,
    toggleActive
  }
});