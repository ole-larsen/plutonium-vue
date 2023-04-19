import { defineStore } from "pinia";
import axios from "axios";
import type { Ref } from "vue";
import {inject, ref} from "vue";
import type {Form, PublicMenuItem} from "@/types";
import type { PublicFile, PublicMenu } from "@/types";
import { link } from "@/helpers";


export const useFooterStore = defineStore("footer", () => {
  const axios: any = inject("axios");  // inject axios

  const isActive = ref(false),
        img: Ref<PublicFile | null>  = ref(null),
        menu: Ref<PublicMenu | null> = ref(null);

  function postData(form: Form) {
    return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/subscribe`, {
      email: form.email,
      csrf: form.csrf,
      provider: "footer"
    }, {
      withCredentials: true
    });
  }

  function toggleActive() {
    isActive.value = !isActive.value;
  }

  function storeFooter(_logo: PublicFile, _menu: PublicMenu) {
    _logo.attributes.url = link(_logo.attributes.url)
    img.value = _logo;
    menu.value = _menu;
  }

  function submit(form: Form) {
    return postData(form);
  }

  return {
    isActive,
    img,
    menu,
    storeFooter,
    postData,
    toggleActive,
    submit,
  }
});
