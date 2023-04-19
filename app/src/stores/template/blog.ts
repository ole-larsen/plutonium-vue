import { defineStore } from "pinia";
import type { Ref } from "vue";
import type { BlogItem } from "@/types";

import { ref } from "vue";
import { useLoaderStore } from "@/stores/loader/store";
import {link} from "@/helpers";

export const useBlogStore = defineStore("blog", () => {
  const blogs: Ref<{[id: string]: BlogItem}> = ref({});
  const path: Ref<string> = ref("");
  const loader = useLoaderStore();

  function getBlogs(): {[id: string]: BlogItem} {
    return blogs.value;
  }

  function getBlog(slug: string): BlogItem {
    return blogs.value[slug];
  }

  function setPath(_path: string) {
    path.value = _path;
  }

  function getPath(): string {
    return path.value
  }

  async function loadBlogs() {
    try {
      const { data: blogs } = await loader.loadBlogs();

      for (const blog of blogs) {
        console.log(blog);
        updateLinks(blog);
        blogs.value[blog.link] = blog;
      }
    } catch (e) {
      throw e;
    }
  }

  async function loadBlog(slug: string) {
    try {
      const { data } = await getBlog(slug);
      updateLinks(data.blog);
      blogs.value[slug] = data.blog;
    } catch (e) {
      throw e;
    }
  }

  function updateLinks(blog: any) {
    if (blog.image && blog.image.attributes) {
      blog.image.attributes.url = link(blog.image.attributes.url)
    }
    if (blog.image1 && blog.image1.attributes) {
      blog.image1.attributes.url = link(blog.image1.attributes.url);
    }
    if (blog.image2 && blog.image2.attributes) {
      blog.image2.attributes.url = link(blog.image2.attributes.url);
    }
    if (blog.image3 && blog.image3.attributes) {
      blog.image3.attributes.url = link(blog.image3.attributes.url);
    }
    if (blog.author && blog.author.attributes && blog.author.attributes.image) {
      blog.author.attributes.image.attributes.url = link(blog.author.attributes.image.attributes.url);
    }
  }

  return {
    setPath, getPath, getBlogs, getBlog, loadBlogs, loadBlog
  }
});