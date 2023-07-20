import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
export type Category = {
  id:            number;
  parent_id:     number;
  parent_title?: string;
  provider:      string;
  title:         string;
  slug:          string;
  description:   string;
  content:       string;
  image_id:      number;
  image_url?:    string;
  enabled:       boolean;
  order_by:      number;
}
export const useCategoriesStore = defineStore({
  id: "categories",
  state: () => ({
    _show: false,
    _category: {},
    _categories: []
  }),
  getters: {
    show: (state) => state._show,
    category: (state) => state._category,
    categories: (state) => state._categories
  },
  actions: {
    load() {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/categories`, {
        method: 'GET', // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        this._categories = JSON.parse(response);
        this._categories.sort((a: Category, b: Category) => a.id > b.id ? 1 : -1)
        return this._categories;
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
      this._category = {
        provider: "category",
        description: "",
        content: ""
      }
    },
    save(category: Category) {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/categories`, {
        method: category.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id:           category.id ? Number(category.id) : undefined,
          parent_id:    category.parent_id ? Number(category.parent_id) : undefined,
          provider:     category.provider,
          title:        category.title,
          slug:         category.slug,
          description:  category.description,
          content:      category.content,
          image_id:     Number(category.image_id),
          enabled:      category.enabled,
          order_by:     Number(category.order_by)
        })
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        if (category.id) {
          this._categories = JSON.parse(response);
          return this._categories;
        }
        return this.load();
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    setItem(category: Category) {
      this._category = category;
    },
    find(title: string) {
      return this._categories.find((category: Category) => category.title === title);
    }
  },
});
