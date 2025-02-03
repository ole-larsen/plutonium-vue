<script lang="ts" setup>
import type { ComputedRef } from "vue";
import type { PublicCategoryDto, MarketplaceCollectionDto } from "@/types";

import { computed, onMounted } from "vue";
import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";

import Filter from "@/components/Categories/FilterComponent.vue";
import { useLoaderStore } from "@/stores/loader/store";
import { error } from "@/helpers";

const loader = useLoaderStore();
const store = useMarketPlaceStore();
const categories: ComputedRef<PublicCategoryDto[]> = computed(() =>
  store.getCategories()
);
// const collections: ComputedRef<MarketplaceCollectionDto[]> = computed(() =>
//   //store.getCollections()
// );
onMounted(async () => {
  if (store.getCategories().length === 0) {
      try {
        const { data } = await loader.loadCategories();
        store.loadCategories(data);
      } catch (e) {
        error(e);
      }
    }
});
const collections: MarketplaceCollectionDto[] = [];
</script>

<template>
  <section class="tf-box-icon categories style1 tf-section">
    <div class="themesflat-container">
      <div class="flat-tabs tab-authors" v-if="categories && categories.length">
        <Filter :categories="categories" :collections="collections" />
      </div>
    </div>
  </section>
</template>
