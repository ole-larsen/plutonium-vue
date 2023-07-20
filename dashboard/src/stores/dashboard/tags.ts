import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";

export type Tag = {
  id?:         number;
  parent_id:   number | null;
  blog_id:     number[];
  page_id:     number[];
  provider:    string;
  title:       string;
  slug:        string;
  enabled:     boolean;
}
export const useTagsStore = defineStore({
  id: "tags",
  state: () => ({
    _show: false,
    _selectedTag: null,
    _selectedTags: [],
    _newTag: {
      id: undefined,
      parent_id: null,
      blog_id: [],
      page_id: [],
      provider: "tag",
      title: "",
      slug: "",
      enabled: true
    },
    _tag: {
      provider: "tag"
    },
    _tags: []
  }),
  getters: {
    show: (state) => state._show,
    tag: (state) => state._tag,
    tags: (state) => state._tags,
    newTag: (state) => state._newTag,
    selectedTag: (state) => state._selectedTag,
    selectedTags: (state) => state._selectedTags,
    searchTags: (state) => {
      if (state._newTag.title === "") {
        return []
      }

      let matches = 0

      return state._tags.filter((tag: Tag) => {
        if (
          tag.title.toLowerCase().includes(state._newTag.title.toLowerCase())
          && matches < 10
        ) {
          matches++;
          return tag;
        }
      })
    }
  },
  actions: {
    selectTag(_tag: Tag) {
      if (!this._selectedTags.map((tag: Tag) => tag.title.toLowerCase()).includes(_tag.title)) {
        // @ts-ignore
        this._selectedTags.push(_tag);
      }
      // @ts-ignore
      this._selectedTag = _tag;
      this.reload();
    },
    load() {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/tags`, {
        method: 'GET', // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        this._tags = JSON.parse(response);
        return this._tags;
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
      this._tag = {
        provider: "tag",
        // @ts-ignore
        title: "",
      }
    },
    save(tag: Tag) {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/tags`, {
        method: tag.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id:           tag.id ? Number(tag.id) : undefined,
          parent_id:    Number(tag.parent_id),
          blog_id:      tag.blog_id,
          page_id:      tag.page_id,
          title:        tag.title,
          slug:         tag.slug,
          provider:     tag.provider,
          enabled:      tag.enabled
        })
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        if (tag.id) {
          this._tags = JSON.parse(response)
          return this._tags;
        }
        return this.load();
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    setItem(tag: Tag) {
      this._tag = tag;
    },
    reload() {
      this._newTag = {
        id: undefined,
        parent_id: null,
        blog_id: [],
        page_id: [],
        provider: "tag",
        title: "",
        slug: "",
        enabled: true
      };
    },
    slugify(str: string): string {
      return str
        ? str
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")
        : ""
    },

    async add(tagTitle: string, blogId: number) {
      if (!this._tags.find((tag: Tag) => tag.title === tagTitle)) {
        const tags = tagTitle.split(",");
        await Promise.all(tags.map(async(title) => {
          const newTag = Object.assign(this._newTag, {});
          newTag.title = title.trim();
          newTag.slug = this.slugify(newTag.title);
          if (blogId) {
            // @ts-ignore
            newTag.blog_id.push(blogId);
          }
          await this.save(newTag);
          await this.load();
        }));
        this.reload();
      }
    }
  }
});
