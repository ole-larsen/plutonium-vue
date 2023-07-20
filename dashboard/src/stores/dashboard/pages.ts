import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
export type Page = {
  id:              number;
  category_id:     number;
  category_title?: string;
  title:           string;
  slug:            string;
  description:     string;
  content:         string;
  image_id:        number;
  image_url?:      string;
  enabled:         boolean;
  order_by:        number;
}
export const usePagesStore = defineStore({
  id: "pages",
  state: () => ({
    _show: false,
    _page: {},
    _pages: []
  }),
  getters: {
    show: (state) => state._show,
    page: (state) => state._page,
    pages: (state) => state._pages
  },
  actions: {
    load() {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/pages`, {
        method: 'GET', // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status === 200 ? response.json() : response.text())
      .then((response) => {
        this._pages = response;
        this._pages.sort((page1: Page, page2: Page) => {
          return page1.id > page2.id ? 1 : -1;
        })
        return this._pages;
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
      this._page = {
        provider: "page",
        description: "",
        content: ""
      }
    },
    save(page: Page) {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/pages`, {
        method: page.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id:           page.id ? Number(page.id) : undefined,
          category_id:  Number(page.category_id),
          title:        page.title,
          slug:         page.slug,
          description:  page.description,
          content:      page.content,
          image_id:     Number(page.image_id),
          enabled:      page.enabled,
          order_by:     Number(page.order_by)
        })
      })
      .then((response) => response.status === 200 ? response.json() : response.text())
      .then((response) => {
        if (page.id) {
          this._pages = response;
          return this._pages;
        }
        return this.load();
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    setItem(page: Page) {
      this._page = page;
    },
    async toggleEnabled(page: Page) {
      page.enabled = !page.enabled;
      await this.save(page);
    },
  },
});
