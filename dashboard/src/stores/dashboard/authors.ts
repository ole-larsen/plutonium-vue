import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
export type Author = {
  id:          number;
  title:       string;
  description: string;
  name:        string;
  slug:        string;
  btn_link:    string;
  btn_text:    string;
  image_id:    number;
  image_url?:  string;
  socials:    { name: string; link: string; icon: string }[];
  wallets:    { name: string; address: string }[];
  order_by:    number;
  enabled:     boolean;
}
export const useAuthorsStore = defineStore({
  id: "authors",
  state: () => ({
    _show: false,
    _author: {
      title:       "",
      description: "",
      name:        "",
      socials: [{
        name: "",
        link: "",
        icon: ""
      }],
      wallets: [{
        name: "",
        address: ""
      }]
    },
    _authors: []
  }),
  getters: {
    show: (state) => state._show,
    author: (state) => state._author,
    authors: (state) => state._authors
  },
  actions: {
    load() {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/authors`, {
        method: 'GET', // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status === 200 ? response.json() : response.text())
      .then((response) => {
        this._authors = response;
        return this._authors;
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
      this._author = {
        title: "",
        description: "",
        name: "",
        socials: [],
        wallets: []
      }
    },
    save(author: Author) {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/authors`, {
        method: author.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id:           author.id ? Number(author.id) : undefined,
          title:        author.title,
          description:  author.description,
          name:         author.name,
          slug:         author.slug,
          btn_link:     author.btn_link,
          btn_text:     author.btn_text,
          image_id:     Number(author.image_id),
          order_by:     Number(author.order_by),
          enabled:      author.enabled,
          socials:      author.socials,
          wallets:      author.wallets
        })
      })
      .then((response) => response.status === 200 ? response.json() : response.text())
      .then((response) => {
        if (author.id) {
          this._authors = response;

          return this._authors;
        }
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    setItem(author: Author) {
      this._author = author;
    },
    find(id: number) {
      return this._authors.find((author: Author) => author.id === id);
    },
    addSocials(social: { name: string; link: string; icon: string }, socials: { name: string; link: string; icon: string }[]) {
      if (!this._author.socials || this._author.socials.length === 0) {
        this._author.socials = [];
      }
      if (socials && socials.length > 0) {
        this._author.socials = socials.filter((social) => social.name !== "");
      }
      if (!this._author.socials.map(_social => _social.name).includes(social.name) && social.name !== "") {
        this._author.socials.push(social);
      }
    },
    addWallets(wallet: { name: string; address: string }, wallets: { name: string; address: string }[]) {
      if (!this._author.wallets || this._author.wallets.length === 0) {
        this._author.wallets = [];
      }
      if (wallets && wallets.length > 0) {
        this._author.wallets = wallets.filter((wallet) => wallet.name !== "");
      }
      if (!this._author.wallets.map(_wallet => _wallet.name).includes(wallet.name) && wallet.name !== "") {
        this._author.wallets.push(wallet);
      }
    }
  }

});
