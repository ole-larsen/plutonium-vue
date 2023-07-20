import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
type Slider = {
  id: number;
  title: string;
  provider: string;
  description: string;
  enabled: boolean
}

export const useSliderStore = defineStore({
  id: "sliders",
  state: () => ({
    _sliders: [],
    _slider: {},
    _show: false,
  }),
  getters: {
    sliders: (state) => state._sliders,
    slider: (state) => state._slider,
    show: (state) => state._show
  },
  actions: {
    load() {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/sliders`, {
        method: 'GET', // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        this._sliders = JSON.parse(response);
        this._sliders.sort((s1: Slider, s2: Slider) => {
          return s1.id > s2.id ? 1 : -1;
        });
        return this._sliders;
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    toggleModal() {
      this._show = !this._show;
    },
    new() {
      this._slider = {
        title: "",
        provider: "",
        description: "",
        enabled: false
      }
    },
    save(slider: Slider) {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/sliders`, {
        method: slider.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(this._slider)
      })
      .then((response) => response.status === 200 ? response.json() : response.text())
      .then((response) => {
        if (response.message) {
          return this.load();
        }
        this._sliders = response;
        return this._sliders;
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    setSlider(slider: Slider) {
      this._slider = slider
    }
  },
});
