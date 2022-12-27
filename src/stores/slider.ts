import { defineStore } from "pinia";
import axios from "axios";

export const useSliderStore = defineStore({
  id: "slider",
  state: () => ({
    _banner: {
      slidesItem: []
    }
  }),
  getters: {
    banner: (state) => state._banner
  },
  actions: {
    getData(sliderNumber: number) {
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/slider?provider=home-0${sliderNumber}`, {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN
        }
      });
    },
    async load(sliderNumber: number) {
      try {
        const { data: { attributes } } = await this.getData(sliderNumber);
        attributes.slidesItem.map((item: {
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
        }) => {
          item.image.attributes.url = import.meta.env.VITE_BACKEND + item.image.attributes.url
          return item;
        });
        this._banner = attributes.slidesItem;
      } catch (e) {
        this._banner = {
          slidesItem: []
        }
      }
    }
  }
});