import { defineStore } from "pinia";
import type { Ref } from "vue";
import type { PublicPageDto } from "@/types";

import { ref } from "vue";
import { useLoaderStore } from "@/stores/loader/store";

export const usePageStore = defineStore("page", () => {
  const loader = useLoaderStore();

  const pages: Ref<{ [slug: string]: PublicPageDto }> = ref({});
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
      pages.value[slug] = data;
    }
  }

  function getPages(): { [slug: string]: PublicPageDto } {
    return pages.value;
  }

  function getPage(slug: string): PublicPageDto {
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
