import { defineStore } from "pinia";

import type { SubscribeFormDataDto } from "@/types";
import type { PublicMenuDto } from "@/types";
import type { Ref } from "vue";
import { inject, ref } from "vue";
import { useLoaderStore } from "@/stores/loader/store";
import { error } from "@/helpers";

export const useFooterStore = defineStore("footer", () => {
  const loader = useLoaderStore();

  const isActive = ref(false),
        menu: Ref<PublicMenuDto | null> = ref(null),
        name: Ref<string> = ref("Plutonium");

  function toggleActive() {
    isActive.value = !isActive.value;
  }

  function loadMenu(provider: string) {
    loader.loadMenu(provider)
    .then((response) => {
        menu.value = response.data as PublicMenuDto;
    })
    .catch((e) => {
        error(`Error fetching menu: ${e.message}`);
      });
  }

  function submit(form: SubscribeFormDataDto) {
    return loader.postSubscribeForm(form);
  }

  return {
    isActive,
    menu,
    name,
    loadMenu,
    toggleActive,
    submit,
  };
});
