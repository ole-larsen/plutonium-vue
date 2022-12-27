import { defineStore } from "pinia";
import axios from "axios";
import {inject, ref} from "vue";

type Form = {
  email: string;
  csrf: string;
}
export const useFooterStore = defineStore("footer", () => {
  const axios: any = inject("axios");  // inject axios
  const isActive = ref(false),
        footerLogo = ref(""),
        info = ref({}),
        footerMenu = ref(null);

  function postData(form: Form) {
    return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/subscribe`, {
      email: form.email,
      csrf: form.csrf,
      provider: "footer"
    }, {
      withCredentials: true
    });
  }

  function getData() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/footer`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }

  function toggleActive() {
    isActive.value = !isActive.value;
  }

  async function load() {
    try {
      const { data: { logo, menu } } = await getData();
      const url = `${import.meta.env.VITE_BACKEND}${logo.attributes.url}`;
      info.value = logo.attributes;
      footerLogo.value = url
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
      });
      footerMenu.value = menu.attributes;
    } catch (e) {
      throw e;
    }
  }

  function submit(form: Form) {
    return postData(form);
  }

  return {
    isActive,
    logo: footerLogo,
    info,
    menu: footerMenu,
    postData,
    getData,
    toggleActive,
    load,
    submit
  }
});
