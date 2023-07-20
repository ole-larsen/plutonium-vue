import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
import moment from "moment";
import type {Author} from "@/stores/dashboard/authors";
import type {File} from "@/stores/dashboard/files";
import type {Tag} from "@/stores/dashboard/tags";
import type {Category} from "@/stores/dashboard/categories";
import {useFilesStore} from "@/stores/dashboard/files";
import {useCategoriesStore} from "@/stores/dashboard/categories";
import {useAuthorsStore} from "@/stores/dashboard/authors";
import {useTagsStore} from "@/stores/dashboard/tags";
type Blog = {
  id:              number;
  category_id:     number;
  category:        Category;
  tag_id:          number[];
  tags:            Tag[],
  title:           string;
  slug:            string;
  description:     string;
  description_1:   string;
  description_2:   string;
  description_3:   string;
  content:         string;
  author_id:       number;
  author:          Author;
  public_date:     string;
  image_id:        number;
  image_1_id:      number;
  image_2_id:      number;
  image_3_id:      number;
  image:           File;
  image1:          File;
  image2:          File;
  image3:          File;
  enabled:         boolean;
  order_by:        number;
}
export const useBlogsStore = defineStore({
  id: "blogs",
  state: () => ({
    _show: false,
    _blog: {},
    _blogs: []
  }),
  getters: {
    show: (state) => state._show,
    blog: (state) => state._blog,
    blogs: (state) => state._blogs
  },
  actions: {
    load() {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/blogs`, {
        method: 'GET', // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status === 200 ? response.json() : response.text())
      .then(async (response) => {

        const blogs = await Promise.all(response
          .map(async (blog: Blog) => {
            await this.setRelations(blog);
            return blog;
          }));

        if (blogs) {
          // @ts-ignore
          this._blogs = blogs;
        }
        return this._blogs;
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
      this._blog = {
        title: "",
        description: "",
        description_1: "",
        description_2: "",
        description_3: "",
        content: "",
      }
    },
    save(blog: Blog) {
      console.log(blog);
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/blogs`, {
        method: blog.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id:             blog.id ? Number(blog.id) : undefined,
          category_id:    blog.category_id ? Number(blog.category_id) : undefined,
          title:          blog.title,
          slug:           blog.slug,
          description:    blog.description,
          description_1:  blog.description_2,
          description_2:  blog.description_2,
          description_3:  blog.description_3,
          content:        blog.content,
          author_id:      Number(blog.author_id),
          public_date:    moment(blog.public_date).format("YYYY-MM-DD"),
          image_id:       Number(blog.image_id),
          image_1_id:     blog.image_1_id ? Number(blog.image_1_id) : undefined,
          image_2_id:     blog.image_2_id ? Number(blog.image_2_id) : undefined,
          image_3_id:     blog.image_3_id ? Number(blog.image_3_id) : undefined,
          enabled:        blog.enabled,
          order_by:       Number(blog.order_by)
        })
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        if (blog.id) {
          this._blogs = JSON.parse(response)
          return this._blogs;
        }
        return this.load();
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    async setRelations(blog: Blog) {
      const img = await useFilesStore().find(blog.image_id);
      if (img) {
        img.thumb = import.meta.env.VITE_BACKEND_URL + img.thumb;
        blog.image = img;
      }
      const img1 = await useFilesStore().find(blog.image_1_id);
      if (img1) {
        img1.thumb = import.meta.env.VITE_BACKEND_URL + img1.thumb;
        blog.image1 = img1;
      }
      const img2 = await useFilesStore().find(blog.image_2_id);
      if (img2) {
        img2.thumb = import.meta.env.VITE_BACKEND_URL + img2.thumb;
        blog.image2 = img2;
      }
      const img3 = await useFilesStore().find(blog.image_3_id);
      if (img3) {
        img3.thumb = import.meta.env.VITE_BACKEND_URL + img3.thumb;
        blog.image3 = img3;
      }
      const category = useCategoriesStore().categories.find((category: Category) => category.id === blog.category_id);
      if (category) {
        blog.category = category;
      }
      const author = useAuthorsStore().authors.find((author: Author) => author.id === blog.author_id);

      if (author) {
        // @ts-ignore
        if (author.attributes && author.attributes.image) {
          // @ts-ignore
          author.attributes.image.attributes.url = import.meta.env.VITE_BACKEND_URL + author.attributes.image.attributes.url
        }
        blog.author = author;
      }
      // @ts-ignore
      blog.tags = blog.tag_id.map(id => useTagsStore().tags.find((_tag: Tag) => Number(_tag.id) === Number(id)));
    },
    setItem(blog: Blog) {
      if (!blog.description) {
        blog.description = "";
      }
      if (!blog.description_1) {
        blog.description_1 = "";
      }
      if (!blog.description_2) {
        blog.description_2 = "";
      }
      if (!blog.description_3) {
        blog.description_3 = "";
      }
      this._blog = Object.assign(blog, {});
    }
  },
});
