import { defineStore } from "pinia";
import { ref, inject } from "vue";
import type {PublicFile} from "@/index";

export const useHeaderStore = defineStore("header", () => {
  const axios: any = inject("axios");  // inject axios
  const
    isSticky = ref(false),
    isActive = ref(false),
    isActiveMobile = ref(false),
    search = ref(false),
    img = ref(""),
    attributes = ref(<PublicFile>{}),
    headerMenu = ref(null);

  function toggleActive() {
    isActive.value = !isActive.value;
  }

  function toggleActiveMobile() {
    isActiveMobile.value = !isActiveMobile.value;
  }

  function toggleActiveSearch() {
    search.value = !search.value;
  }

  function link(url: string): string {
    return `${import.meta.env.VITE_BACKEND}${url}`;
  }

  function loadHeader() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/header`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  async function load() {
    try {
      const {data: {logo, menu}} = await loadHeader();
      console.log(await loadHeader());
      img.value = link(logo.attributes.url);
      attributes.value = logo.attributes;
      if (menu && menu.attributes) {
        menu.attributes.items.forEach((menuItem: any) => {
          if (menuItem.attributes.link) {
            const breadcrumbs = menuItem.attributes.link.split("/");
            if (breadcrumbs.length === 1) {
              menuItem.attributes.link = "/" + breadcrumbs[0]
                .replace(/\//g, "/", "");
            }
            if (menuItem.attributes.items) {
              menuItem.attributes.items.forEach((item: any) => {
                const breadcrumbs = item.attributes.link.split("/");
                if (breadcrumbs.length === 1) {
                  item.attributes.link = "/" + breadcrumbs[0]
                    .replace(/\//g, "/", "");
                }
              })
            }
          }
        })
        headerMenu.value = menu.attributes;
      }


    } catch (e) {
      throw e;
    }
  }
  return {
    isActive,
    isActiveMobile,
    isSticky,
    search,
    img,
    attributes,
    menu: headerMenu,
    toggleActive,
    toggleActiveMobile,
    toggleActiveSearch,
    load
  }
});