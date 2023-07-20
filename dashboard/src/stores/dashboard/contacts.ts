import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
type Contact = {
  id:          number;
  page_id:     number;
  provider:    string;
  heading:     string;
  sub_heading: string;
  btn_link:    string;
  btn_text:    string;
  image_id:    number;
  enabled:     boolean;
}
export const useContactsStore = defineStore({
  id: "contacts",
  state: () => ({
    _show: false,
    _contact: {},
    _contacts: []
  }),
  getters: {
    show: (state) => state._show,
    contact: (state) => state._contact,
    contacts: (state) => state._contacts
  },
  actions: {
    load() {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/contacts`, {
        method: 'GET', // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        this._contacts = JSON.parse(response);
        return this._contacts;
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
      this._contact = {
      }
    },
    save(contact: Contact) {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/contacts`, {
        method: contact.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id:           contact.id ? Number(contact.id) : undefined,
          page_id:      contact.page_id ? Number(contact.page_id) : undefined,
          heading:      contact.heading,
          provider:     contact.provider,
          sub_heading:  contact.sub_heading,
          btn_link:     contact.btn_link,
          btn_text:     contact.btn_text,
          image_id:     Number(contact.image_id),
          enabled:      contact.enabled
        })
      })
      .then((response) => response.status === 200 ? response.json() : response.text())
      .then((response) => {
        if (contact.id) {
          this._contacts = response
          return this._contacts;
        }
        return this.load();
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    setItem(contact: Contact) {
      this._contact = contact;
    }
  },
});
