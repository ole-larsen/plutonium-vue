import { defineStore } from "pinia";
import type { SliderItemDto } from "@/types";
import type { Ref } from "vue";
import { ref } from "vue";
import { useLoaderStore } from "@/stores/loader/store";

export const useSliderStore = defineStore("slider", () => {
  const loader = useLoaderStore();
  
  const banner: Ref<SliderItemDto[]> = ref([]);

  async function load(provider: string) {
    // memoization
    if (banner.value.length > 0) {
      return;
    }
    const { data } = await loader.loadSlider(provider);
    if (data && data.attributes) {
      banner.value = data.attributes.sliderItems;
    }
  }
  return {
    banner,
    load,
  };
});
