import { defineStore } from "pinia";
import type {Ref} from "vue";

import { ref, inject } from "vue";

export type CreateAndSellItem = {
  id: number;
  attributes: {
    title: string;
    description: string;
    link: string;
    image: {
      id: number;
      attributes: {
        alt: string;
        caption: string;
        ext: string;
        height: number;
        name: string;
        provider: string;
        size: number;
        url: string;
        width: number;
      }
    }
  }
}
export const useCreateAndSellStore = defineStore("createAndSell", () => {
  const axios: any = inject("axios");  // inject axios
  const items: Ref<CreateAndSellItem[]> = ref([]);

  function getData() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/create-and-sell`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  async function load() {
    try {
      const response = await getData();

      const { data } = response;
      items.value = data;
      items.value.map((item: CreateAndSellItem) => {
        item.attributes.image.attributes.url = import.meta.env.VITE_BACKEND + item.attributes.image.attributes.url;
        return item;
      })
    } catch (e) {
      console.error(e);
    }
  }
  return {
    items,
    load
  }
});