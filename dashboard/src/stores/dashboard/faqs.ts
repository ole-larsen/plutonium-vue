import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
type Faq = {
  id:          number;
  order_by:    number;
  question:    string;
  answer:      string;
  enabled:     boolean;
}
export const useFaqsStore = defineStore({
  id: "faqs",
  state: () => ({
    _show: false,
    _faq: {
      question: "",
      answer: ""
    },
    _faqs: []
  }),
  getters: {
    show: (state) => state._show,
    faq: (state) => state._faq,
    faqs: (state) => state._faqs
  },
  actions: {
    load() {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/faqs`, {
        method: 'GET', // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        this._faqs = JSON.parse(response);
        return this._faqs;
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
      this._faq = {
        question: "",
        answer: ""
      }
    },
    save(faq: Faq) {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/faqs`, {
        method: faq.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id:           faq.id ? Number(faq.id) : undefined,
          order_by:     Number(faq.order_by),
          question:     faq.question,
          answer:       faq.answer,
          enabled:      faq.enabled
        })
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        if (faq.id) {
          this._faqs = JSON.parse(response)
          return this._faqs;
        }
        return this.load();
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    setItem(faq: Faq) {
      this._faq = faq;
    }
  }
});
