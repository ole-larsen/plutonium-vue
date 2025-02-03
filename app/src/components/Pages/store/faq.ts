import { defineStore } from "pinia";
import { ref } from "vue";

import type { PublicFaqItemDto } from "@/types";
import type { Ref } from "vue";
import { useLoaderStore } from "@/stores/loader/store";

export const useFaqStore = defineStore("faq", () => {
  const loader = useLoaderStore();
  const faqs: Ref<PublicFaqItemDto[]> = ref([]);

  async function load() {
    // memoization
    if (faqs.value.length > 0) {
      return;
    }
    const { data } = await loader.loadFaq();
    faqs.value = data as PublicFaqItemDto[];
  }
  return {
    faqs,
    load,
  };
});
