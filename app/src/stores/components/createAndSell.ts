import { defineStore } from "pinia";
import type { Ref } from "vue";
import type { CreateAndSellItem } from "@/types";
import { ref } from "vue";
import { useLoaderStore } from "@/stores/loader/store";
import { link } from "@/helpers";

export const useCreateAndSellStore = defineStore("createAndSell", () => {
  const loader = useLoaderStore();
  const items: Ref<CreateAndSellItem[]> = ref([]);

  async function load() {
    const response = await loader.loadCreateAndSell();

    const { data } = response;
    items.value = data;
    items.value.map((item: CreateAndSellItem) => {
      item.attributes.image.attributes.url = link(
        item.attributes.image.attributes.url
      );
      return item;
    });
  }
  return {
    items,
    load,
  };
});
