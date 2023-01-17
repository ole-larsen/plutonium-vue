import {defineStore} from "pinia";
import axios from "axios";
import type {Ref} from "vue";
import {ref} from "vue";

export const useBlogStore = defineStore("blog", () => {
  const blogs: Ref<any> = ref({});
  const path: Ref<string> = ref("");

  function blog(slug: string) {
    return blogs.value[slug];
  }

  function setPath(_path: string) {
    path.value = _path;
  }

  function getBlog(slug: string) {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/blog/${slug}`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function getBlogs() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/blog`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  async function load() {
    try {
      const { data: blogs } = await getBlogs();

      for (const _blog of blogs) {
        updateLinks(_blog);
        // @ts-ignore
        blogs.value[_blog.link] = _blog;
      }
    } catch (e) {
      console.error("error from store", e);
      throw(e);
    }
  }

  async function loadBlog(slug: string) {
    try {
      const { data } = await getBlog(slug);
      updateLinks(data.blog);
      blogs.value[slug] = data.blog;
    } catch (e) {
      console.error("error from store", e);
    }
  }

  function updateLinks(_blog: any) {
    if (_blog.image && _blog.image.attributes) {
      _blog.image.attributes.url = import.meta.env.VITE_BACKEND + _blog.image.attributes.url;
    }
    if (_blog.image1 && _blog.image1.attributes) {
      _blog.image1.attributes.url = import.meta.env.VITE_BACKEND + _blog.image1.attributes.url;
    }
    if (_blog.image2 && _blog.image2.attributes) {
      _blog.image2.attributes.url = import.meta.env.VITE_BACKEND + _blog.image2.attributes.url;
    }
    if (_blog.image3 && _blog.image3.attributes) {
      _blog.image3.attributes.url = import.meta.env.VITE_BACKEND + _blog.image3.attributes.url;
    }
    if (_blog.author && _blog.author.attributes && _blog.author.attributes.image) {
      _blog.author.attributes.image.attributes.url = import.meta.env.VITE_BACKEND + _blog.author.attributes.image.attributes.url;
    }
  }

  return {
    blogs, path, blog, setPath, getBlog, getBlogs, load, loadBlog
  }
});