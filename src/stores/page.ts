import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
import axios from "axios";

export const usePageStore = defineStore({
  id: "page",
  state: () => ({
    _pages: {},
    _path: null
  }),
  getters: {
    page: (state) => {
      // @ts-ignore
      return (path: string) => state._pages[path];
    },
    pages: (state) => state._pages,
    path: (state) => state._path,
  },
  actions: {
    setPath(slug: string) {
      // @ts-ignore
      this._path = slug;
    },
    getPage(slug: string) {
      if (slug === "") {
        slug = "home-01";
      }
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/page/${slug}`, {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN
        }
      });
    },
    async loadPage(slug: string) {
      try {
        const { data: page } = await this.getPage(slug);
        if (page) {
          if (page.attributes.image && page.attributes.image.attributes) {
            page.attributes.image.attributes.url = import.meta.env.VITE_BACKEND + page.attributes.image.attributes.url;
          }
          // @ts-ignore
          this._pages[slug] = page;
        }
      } catch (e) {
        console.error(e);
      }
    },
  }
});