import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
import axios from "axios";

type Form = {
  provider: string;
  name: string;
  email: string;
  subject: number;
  subjectItems: {label: string; value: number}[];
  message: string;
  csrf: string;
}

export const useContactStore = defineStore({
  id: "contact",
  state: () => ({
    _contact: {},
    _contacts: {}
  }),
  getters: {
    contacts: (state) => state._contacts,
    contact: (state) => {
      // @ts-ignore
      return (pageId: number) => state._contacts[pageId];
    },
  },
  actions: {
    postData(form: Form, pageId: number) {
      const user = useAuthStore().user;
      if (!user || !user.username) {
        throw new Error("invalid credentials");
      }
      const subject: { label: string; value: number; } | undefined = form.subjectItems.find(item => item.value === form.subject);
      return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/contact-form`, {
        pageId: pageId,
        provider: form.provider,
        name: form.name,
        email: form.email,
        subject: (subject as { label: string; value: number; }).label,
        message: form.message,
        csrf: form.csrf
      }, {
        withCredentials: true
      });
    },
    getData(id: number) {
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/contact?id=${id}`, {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN
        }
      });
    },
    async loadData(id: number) {
      try {
        const { data } = await this.getData(id);
        if (data) {
          if (data.attributes.image && data.attributes.image.attributes) {
            data.attributes.image.attributes.url = import.meta.env.VITE_BACKEND + data.attributes.image.attributes.url;
          }
          // @ts-ignore
          this._contacts[id] = data;
        } else {
          // @ts-ignore
          this._contacts[id] = {};
        }
      } catch (e) {
        throw e;
      }
    },
    load(id: number) {
      return this.loadData(id);
    },
    submit(form: Form, pageId: number) {
      return this.postData(form, pageId);
    }
  }
});