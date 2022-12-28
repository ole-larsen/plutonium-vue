import {defineStore} from "pinia";
import axios from "axios";

export const useAuthorStore = defineStore({
  id: "author",
  state: () => ({
    _path: null,
    _authors: {},
  }),
  getters: {
    author: (state) => {
      // @ts-ignore
      return (slug: string) => state._authors[slug];
    },
    authors: (state) => state._authors,
    path: (state) => state._path
  },
  actions: {
    setPath(path: string) {
      // @ts-ignore
      this._path = path;
    },
    getAuthor(slug: string) {
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/author/${slug}`, {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN
        }
      });
    },
    getAuthors() {
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/author`, {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN
        }
      });
    },
    async load() {
      try {
        const { data: authors } = await this.getAuthors();
        for (const author of authors) {
          const key = author.link;
          this.updateLinks(author);

          // @ts-ignore
          this._authors[key] = author;
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async loadAuthor(slug: string) {
      try {
        const { data: author } = await this.getAuthor(slug);
        this.updateLinks(author);
        // @ts-ignore
        this._authors[slug] = author;
      } catch (e) {
        console.error(e);
      }
    },
    updateLinks(author: any) {
      if (author.image && author.image.attributes) {
        author.image.attributes.url = import.meta.env.VITE_BACKEND + author.image.attributes.url;
      }
      const key = author.link.replace(/\//d, "/", "");
      author.link = "/authors/" + key;
    }
  }
});