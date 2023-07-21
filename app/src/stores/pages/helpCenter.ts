import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";
import { useLoaderStore } from "@/stores/loader/store";
import type { HelpCenter } from "@/types";
import { link } from "@/helpers";

export const useHelpCenterStore = defineStore("helpCenter", () => {
  const loader = useLoaderStore();
  const helpCenter: Ref<HelpCenter[]> = ref([]);

  async function load() {
    const { data } = await loader.loadHelpCenter();

    helpCenter.value = data;
    helpCenter.value.map((item: HelpCenter) => {
      if (item.image) {
        item.image.attributes.url = link(item.image.attributes.url);
      }
      return item;
    });
  }

  return {
    load,
    helpCenter,
  };
});
