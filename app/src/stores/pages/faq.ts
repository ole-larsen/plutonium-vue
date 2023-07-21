import { defineStore } from "pinia";
import { useLoaderStore } from "@/stores/loader/store";
import { ref } from "vue";

import type { FAQ } from "@/types";
import type { Ref } from "vue";

export const useFaqStore = defineStore("faq", () => {
  const loader = useLoaderStore();
  const faqs: Ref<FAQ[]> = ref([]);

  async function load() {
    const { data } = await loader.loadFaq();
    faqs.value = data;
  }
  return {
    faqs,
    load,
  };
});
