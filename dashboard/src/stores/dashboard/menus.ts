import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
import type {Page} from "@/stores/dashboard/pages";
type Menu = {
  id:              number;
  title:           string;
  enabled:         boolean;
  sections:        [];
}
type Section = {
  id:              number;
  title:           string;
  enabled:         boolean;
  order_by:        number;
  items:           number[] & Page[];
}
export const useMenusStore = defineStore({
  id: "menus",
  state: () => ({
    _show: false,
    _menu: {
      title: "",
      sections: []
    },
    _menus: {}
  }),
  getters: {
    show: (state) => state._show,
    menu: (state) => state._menu,
    menus: (state) => state._menus
  },
  actions: {
    load() {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/menus`, {
        method: 'GET', // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status === 200 ? response.json() : response.text())
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          // @ts-ignore
          this._menus[response[i].title] = {
            id: response[i].id,
            title: response[i].title,
            enabled: response[i].enabled,
            sections: response[i].sections ?? []
          };
        }
        return this._menus;
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
      this._menu = {
        title: "",
        sections: []
      }
    },
    save(menu: Menu) {
      const user = useAuthStore().user;

      if (!menu.title) return;

      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/menus`, {
        method: menu.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id:           menu.id ? Number(menu.id) : undefined,
          title:        menu.title,
          enabled:      menu.enabled,
          sections:     menu.sections ?? [],
        })
      })
      .then((response) => response.status === 200 ? response.json() : response.text())
      .then((response) => {
        if (menu.id) {
          for (let i = 0; i < response.length; i++) {
            // @ts-ignore
            this._menus[response[i].title] = {
              id: response[i].id,
              title: response[i].title,
              enabled: response[i].enabled,
              sections: response[i].sections ?? []
            };
          }
          return this._menus;
        }
        return this.load();
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    setItem(menu: Menu) {
      this._menu = menu;
    },
    async toggleEnabled(menu: Menu) {
      menu.enabled = !menu.enabled;
      await this.save(menu);
    },
    async toggleSectionEnabled(section: Section, menu: Menu) {
      section.enabled = !section.enabled;
      await this.save(<Menu>menu);
    },
    async saveSection(section: Section, menu: Menu) {
      this._menu = menu;
      await this.save(<Menu>this._menu);
    },
    async createSection(section: Section, menu: Menu) {
      const exist = menu.sections.find((_section: {title: string}) => _section.title === section.title)
      if (!exist) {
        // @ts-ignore
        menu.sections.push(section);
        await this.save(<Menu>menu);
      }
    },
  },
});
