<script lang="ts" setup>
import type { Ref } from "vue";
import type { PublicCategory } from "@/types";
import { computed, watch, ref, reactive } from "vue";
import { useRoute } from "vue-router";

import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";
import { useLoaderStore } from "@/stores/loader/store";

import { error } from "@/helpers";

import CollectionItem from "@/components/Profile/CollectionItem.vue";

const market = useMarketPlaceStore();
const route = useRoute();
const loader = useLoaderStore();

const category: Ref<PublicCategory | null> = ref(null);

const wallPaperStyle = reactive({
  background: ``,
  backgroundSize: "cover",
  borderRadius: 0
});

watch(route, async (to) => {
  if (market.getCategories().length === 0) {
    try {
      await loader.load();
    } catch (e) {
      error(e);
    }
  }
  const routeCategory = Object.values(market.getCategories()).find((_category: PublicCategory) => {
    return _category.attributes.slug === "/category/" + to.params.slug;
  });
  category.value = routeCategory as PublicCategory;
  if (category.value) {
    wallPaperStyle.background = `url(${category.value.attributes.image.attributes.url}) no-repeat center`;
    wallPaperStyle.backgroundSize = "cover";
    wallPaperStyle.borderRadius = 0;
  }
}, {flush: 'pre', immediate: true, deep: true})

</script>

<template>
  <div class="tf-profile">
    <section class="tf-section authors profile" v-if="category">
      <div class="flat-tabs tab-authors">
        <div class="author-profile flex" ref="profile" :style="wallPaperStyle">
          <div class="feature-profile" ref="uploadNav">
            <img :src="category['attributes']['image']['attributes']['url']"
                 :alt="category['attributes']['image']['attributes']['alt']" class="avatar">
          </div>
        </div>
      </div>
      <div class="themesflat-container">
        <div class="infor-collection">
          <h1 v-html="category['attributes']['title']"></h1>
          <div class="content">
            <div class="content-item">Collections: {{ category['attributes']['collections'].length }}</div>
            <div class="content-item">·</div>
            <div class="content-item">Chain <strong>Ethereum</strong></div>
          </div>
          <div class="description" v-html="category['attributes']['description']"></div>
          <div class="content" v-html="category['attributes']['content']"></div>
        </div>
      </div>
      <div class="themesflat-container">
        <div class="infor-collection">
          <div class="row">
            <div  class="col-xl-3 col-lg-4 col-md-6 col-sm-6" v-for="collection in category['attributes']['collections']" :key="'collection-' + collection.id">
              <collection-item
                :collection="collection"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>