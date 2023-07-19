import { defineStore } from "pinia";

import type { Form } from "@/types";
import type { PublicMenu } from "@/types";
import type { Ref } from "vue";
import { inject, ref } from "vue";

export const useFooterStore = defineStore("footer", () => {
  const axios: any = inject("axios");  // inject axios

  const isActive = ref(false),
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

  function storeFooter(_menu: PublicMenu) {
    menu.value = _menu;
  }

  function submit(form: Form) {
    return postData(form);
  }

  return {
    isActive,
    menu,
    storeFooter,
    postData,
    toggleActive,
    submit,
  }
});
