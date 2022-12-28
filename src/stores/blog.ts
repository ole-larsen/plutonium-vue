import {defineStore} from "pinia";
import axios from "axios";

export const useBlogStore = defineStore({
  id: "blog",
  state: () => ({
    _blogs: {},
    _path: null
  }),
  getters: {
    blog: (state) => {
      // @ts-ignore
      return (slug: string) => state._blogs[slug];
    },
    blogs: (state) => state._blogs,
    path: (state) => state._path
  },
  actions: {
    setPath(path: string) {
      // @ts-ignore
      this._path = path;
    },
    getBlog(slug: string) {
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/blog/${slug}`, {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN
        }
      });
    },
    getBlogs() {
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/blog`, {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN
        }
      });
    },
    async load() {
      try {
        const { data: blogs } = await this.getBlogs();

        for (const blog of blogs) {
          this.updateLinks(blog);
          // @ts-ignore
          this._blogs[blog.link] = blog;
        }
      } catch (e) {
        console.error("error from store", e);
        throw(e);
      }
    },
    async loadBlog(slug: string) {
      try {
        const { data: blog } = await this.getBlog(slug);
        this.updateLinks(blog);

        // @ts-ignore
        this._blogs[slug] = blog;
      } catch (e) {
        console.error("error from store", e);
      }
    },
    updateLinks(blog: any) {
      if (blog.image && blog.image.attributes) {
        blog.image.attributes.url = import.meta.env.VITE_BACKEND + blog.image.attributes.url;
      }
      if (blog.image1 && blog.image1.attributes) {
        blog.image1.attributes.url = import.meta.env.VITE_BACKEND + blog.image1.attributes.url;
      }
      if (blog.image2 && blog.image2.attributes) {
        blog.image2.attributes.url = import.meta.env.VITE_BACKEND + blog.image2.attributes.url;
      }
      if (blog.image3 && blog.image3.attributes) {
        blog.image3.attributes.url = import.meta.env.VITE_BACKEND + blog.image3.attributes.url;
      }
      if (blog.author && blog.author.attributes && blog.author.attributes.image) {
        blog.author.attributes.image.attributes.url = import.meta.env.VITE_BACKEND + blog.author.attributes.image.attributes.url;
      }
    }
  }
});