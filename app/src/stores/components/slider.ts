import { defineStore } from "pinia";
import type { SliderItem as SlidesItem } from "@/types";
import type { Ref } from "vue";
import { ref } from "vue";
import { useLoaderStore } from "@/stores/loader/store";

export const useSliderStore = defineStore("slider", () => {
  const loader = useLoaderStore();
  const banner: Ref<SlidesItem[]> = ref([]);

  async function load(sliderNumber: number) {
    try {
      const { data } = await loader.loadSlider(sliderNumber);
      console.log(await loader.loadSlider(sliderNumber))
      if (!data) {
        banner.value = [];
        return;
      }
      
      data.attributes.slidesItem.map((item: SlidesItem) => {
        if (item.bg) {
          item.bg.attributes.url = import.meta.env.VITE_BACKEND + item.bg.attributes.url.replace("/api/v1/files", "/api/v1/frontend/files");
        }
        if (item.image) {
          item.image.attributes.url = import.meta.env.VITE_BACKEND + item.image.attributes.url.replace("/api/v1/files", "/api/v1/frontend/files");
        }
        return item;
      });
      banner.value = data.attributes.slidesItem;
    } catch (e) {
      banner.value = [];
      throw e;
    }
  }
  return {
    banner,
    load,
  };
});
