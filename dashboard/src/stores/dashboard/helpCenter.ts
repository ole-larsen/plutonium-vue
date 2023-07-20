import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
type HelpCenter = {
  id:          number;
  category_id: number;
  order_by:    number;
  provider:    string;
  title:       string;
  slug:        string;
  description: string;
  image_id:    number;
  enabled:     boolean;
}
export const useHelpCenterStore = defineStore({
  id: "helpCenter",
  state: () => ({
    _show: false,
    _helpCenter: {
      provider: "helpCenter"
    },
    _helpCenters: []
  }),
  getters: {
    show: (state) => state._show,
    helpCenter: (state) => state._helpCenter,
    helpCenters: (state) => state._helpCenters
  },
  actions: {
    load() {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/help-center`, {
        method: 'GET', // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        this._helpCenters = JSON.parse(response);
        return this._helpCenters;
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
      this._helpCenter = {
        provider: "helpCenter",
        // @ts-ignore
        title: "",
        description: "",
      }
    },
    save(helpCenter: HelpCenter) {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/help-center`, {
        method: helpCenter.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id:           helpCenter.id ? Number(helpCenter.id) : undefined,
          category_id:  Number(helpCenter.category_id),
          title:        helpCenter.title,
          slug:         helpCenter.slug,
          order_by:     Number(helpCenter.order_by),
          provider:     helpCenter.provider,
          description:  helpCenter.description,
          image_id:     Number(helpCenter.image_id),
          enabled:      helpCenter.enabled
        })
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        if (helpCenter.id) {
          this._helpCenters = JSON.parse(response)
          return this._helpCenters;
        }
        return this.load();
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    setItem(helpCenter: HelpCenter) {
      this._helpCenter = helpCenter;
    }
  }
});
