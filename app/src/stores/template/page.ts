import { defineStore } from "pinia";
import type { Ref } from "vue";
import type { PublicPage } from "@/types";

import { ref } from "vue";
import { useLoaderStore } from "@/stores/loader/store";
import { link } from "@/helpers";

export const usePageStore = defineStore("page", () => {
  const loader = useLoaderStore();

  const pages: Ref<{ [slug: string]: PublicPage }> = ref({});
  const path: Ref<string | null> = ref(null);

  function setPath(slug: string | null) {
    path.value = slug;
  }

  function getPath(): string | null {
    return path.value;
  }

  async function loadPage(slug: string) {
    const { data } = await loader.loadPage(slug);

    if (data) {
      if (data.attributes.image && data.attributes.image.attributes) {
        data.attributes.image.attributes.url = link(
          data.attributes.image.attributes.url
        );
      }
      pages.value[slug] = data;
    }
  }

  function getPages(): { [slug: string]: PublicPage } {
    return pages.value;
  }

  function getPage(slug: string): PublicPage {
    return pages.value[slug];
  }

  return {
    setPath,
    getPath,
    getPage,
    getPages,
    loadPage,
  };
});
