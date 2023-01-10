import { defineStore } from "pinia";

import { ref, inject } from "vue";
export const useCreateAndSellStore = defineStore("createAndSell", () => {
  const axios: any = inject("axios");  // inject axios
  const items = ref([]);

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
      items.value.map((_item: any) => {
        _item.attributes.image.attributes.url = import.meta.env.VITE_BACKEND + _item.attributes.image.attributes.url;
        return _item;
      })
    } catch (e) {
      throw e;
    }
  }
  return {
    items,
    load
  }
});