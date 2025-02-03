import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";
import type { PublicHelpCenterItemDto } from "@/types";
import { useLoaderStore } from "@/stores/loader/store";

export const useHelpCenterStore = defineStore("helpCenter", () => {
  const loader = useLoaderStore();
  const helpCenter: Ref<PublicHelpCenterItemDto[]> = ref([]);

  async function load() {
    // memoization
    if (helpCenter.value.length > 0) {
      return;
    }
    const { data } = await loader.loadHelpCenter();
    helpCenter.value = data as PublicHelpCenterItemDto[];
  }
  return {
    load,
    helpCenter,
  };
});
