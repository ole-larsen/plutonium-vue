import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";
import type {PublicFile, PublicMenu} from "@/types";
import {link} from "@/helpers";

export const useHeaderStore = defineStore("header", () => {
  const
    isSticky: Ref<boolean>       = ref(false),
    isActive: Ref<boolean>       = ref(false),
    isActiveMobile: Ref<boolean> = ref(false),
    isActiveSearch: Ref<boolean> = ref(false),
    img: Ref<PublicFile | null>  = ref(null),
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

  function storeHeader(_logo: PublicFile, _menu: PublicMenu) {
    _logo.attributes.url = link(_logo.attributes.url)
    img.value = _logo;
    menu.value = _menu;
  }

  return {
    isSticky,
    isActive,
    isActiveMobile,
    isActiveSearch,
    img,
    menu,
    storeHeader,
    toggleSticky,
    toggleActive,
    toggleActiveMobile,
    toggleActiveSearch,

  }
});