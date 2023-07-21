<script lang="ts" setup>
import type { ComputedRef } from "vue";
import type { PublicCategory, PublicCategoryCollection } from "@/types";

import { computed } from "vue";
import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";

import Filter from "@/components/Categories/FilterComponent.vue";

const store = useMarketPlaceStore();
const categories: ComputedRef<PublicCategory[]> = computed(() =>
  store.getCategories()
);
const collections: ComputedRef<PublicCategoryCollection[]> = computed(() =>
  store.getCollections()
);
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
