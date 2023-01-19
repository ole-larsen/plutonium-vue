import {defineStore} from "pinia";
import axios from "axios";
import type {Ref} from "vue";
import {ref} from "vue";

export const useAuthorStore = defineStore("author", () => {
  const path: Ref<string> = ref("");
  const authors: Ref<any> = ref({});

  function author(slug: string) {
    return authors.value[slug];
  }

  function setPath(_path: string) {
    path.value = _path;
  }

  function getAuthor(slug: string) {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/author/${slug}`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function getAuthors() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/author`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  async function load() {
    try {
      const { data: authors } = await getAuthors();
      for (const author of authors) {
        const key = author.link;
        updateLinks(author);

        authors.value[key] = author;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async function loadAuthor(slug: string) {
    try {
      const { data: author } = await getAuthor(slug);
      updateLinks(author);
      authors.value[slug] = author;
    } catch (e) {
      console.error(e);
    }
  }

  function updateLinks(author: any) {
    if (author.image && author.image.attributes) {
      author.image.attributes.url = import.meta.env.VITE_BACKEND + author.image.attributes.url;
    }
    const key = author.link.replace(/\//d, "/", "");
    author.link = "/authors/" + key;
  }

  return {
    path, authors, author, setPath, getAuthors, getAuthor, load, loadAuthor
  }
});