import { defineStore } from "pinia";
import axios from "axios";
import type {Ref} from "vue";
import {ref} from "vue";

export type SliderItem = {
  btnLink1:    string;
  btnLink2:    string;
  btnText1:    string;
  btnText2:    string;
  description: string;
  heading:     string;
  image: {
    id: number;
    attributes: {
      alternativeText: string;
      caption:         string;
      ext:             string;
      height:          number;
      name:            string;
      provider:        string;
      size:            number;
      url:             string;
      width:           number;
    }
  }
}

export const useSliderStore = defineStore("slider", () => {
  const banner: Ref<SliderItem[]> = ref([]);

  function getData(sliderNumber: number) {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/slider?provider=home-0${sliderNumber}`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  async function load(sliderNumber: number) {
    try {
      const { data: { attributes } } = await getData(sliderNumber);
      attributes.slidesItem.map((item: SliderItem) => {
        item.image.attributes.url = import.meta.env.VITE_BACKEND + item.image.attributes.url
        return item;
      });
      banner.value = attributes.slidesItem;
    } catch (e) {
      banner.value = [];
    }
  }
  return {
    banner,
    load
  }
});