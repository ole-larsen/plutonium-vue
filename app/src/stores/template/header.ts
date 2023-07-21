import { defineStore } from "pinia";
import type { PublicMenu } from "@/types";
import type { Ref } from "vue";
import { ref } from "vue";

export const useHeaderStore = defineStore("header", () => {
  const isSticky: Ref<boolean> = ref(false),
    isActive: Ref<boolean> = ref(false),
    isActiveMobile: Ref<boolean> = ref(false),
    isActiveSearch: Ref<boolean> = ref(false),
    menu: Ref<PublicMenu | null> = ref(null);

  function toggleSticky() {
    isSticky.value = window.scrollY >= 100;
  }

  function toggleActive() {
    isActive.value = !isActive.value;
  }

  function toggleActiveMobile() {
    isActiveMobile.value = !isActiveMobile.value;
  }

  function toggleActiveSearch() {
    isActiveSearch.value = !isActiveSearch.value;
  }

  function storeHeader(_menu: PublicMenu) {
    menu.value = _menu;
  }

  return {
    isSticky,
    isActive,
    isActiveMobile,
    isActiveSearch,
    menu,
    storeHeader,
    toggleSticky,
    toggleActive,
    toggleActiveMobile,
    toggleActiveSearch,
  };
});
