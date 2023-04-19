<script lang="ts" setup>
import Filter from "@/components/Categories/Filter.vue"
import type {ComputedRef} from "vue";
import {computed} from "vue";
import type {PublicCategory, PublicCategoryCollection} from "@/types";

import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";

const store = useMarketPlaceStore();
const categories: ComputedRef<PublicCategory[]> = computed(() => store.getCategories());
const collections: ComputedRef<PublicCategoryCollection[]> = computed(() => store.getCollections())
</script>

<template>
  <section class="tf-box-icon categories style1 tf-section">
    <div class="themesflat-container">
      <div class="flat-tabs tab-authors">
        <Filter :categories="categories" :collections="collections"/>
      </div>
    </div>
  </section>
</template>