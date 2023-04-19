import { defineStore } from "pinia";
import axios from "axios";
import type {Ref} from "vue";
import {ref} from "vue";
import type {SliderItem} from "@/types";
import {useLoaderStore} from "@/stores/loader/store";

export const useSliderStore = defineStore("slider", () => {
  const loader = useLoaderStore();
  const banner: Ref<SliderItem[]> = ref([]);

  async function load(sliderNumber: number) {
    try {
      const { data: { attributes } } = await loader.loadSlider(sliderNumber);
      attributes.slidesItem.map((item: SliderItem) => {
        item.image.attributes.url = import.meta.env.VITE_BACKEND + item.image.attributes.url
        return item;
      });
      banner.value = attributes.slidesItem;
    } catch (e) {
      banner.value = [];
      throw e;
    }
  }
  return {
    banner,
    load
  }
});