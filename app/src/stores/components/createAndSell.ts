import { defineStore } from "pinia";
import type { Ref } from "vue";
import type { PublicCreateAndSellItemDto } from "@/types";
import { ref } from "vue";
import { link } from "@/helpers";

export const useCreateAndSellStore = defineStore("createAndSell", () => {
  const items: Ref<PublicCreateAndSellItemDto[]> = ref([]);

  async function load(data: PublicCreateAndSellItemDto[]) {
    items.value = data;
    items.value.map((item: PublicCreateAndSellItemDto) => {
      if (item.attributes.image) {
        item.attributes.image.attributes.url = link(
          item.attributes.image.attributes.url
        );  
      }
      return item;
    });
  }

  return {
    items,
    load: load,
  };
});
