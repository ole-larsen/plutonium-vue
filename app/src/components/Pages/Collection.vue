<script lang="ts" setup>
import type {
  PublicCategoryCollection, 
  PublicCategoryCollectionCollectible
} from "@/types";

import type { Ref, ComputedRef } from "vue";
import { computed, watch, ref, reactive } from "vue";
import { ethers } from "ethers";
import { useRoute } from "vue-router";

import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";
import { useLoaderStore } from "@/stores/loader/store";

import { error } from "@/helpers";

import Filter from "@/components/Collection/Filter.vue";

const market = useMarketPlaceStore();
const route = useRoute();
const loader = useLoaderStore();

const collection: Ref<PublicCategoryCollection | null> = ref(null);

const wallPaperStyle = reactive({
  background: ``,
  backgroundSize: "cover",
  borderRadius: 0
});

watch(route, async (to) => {
  if (market.getCollections().length === 0) {
    try {
      await loader.load();
    } catch (e) {
      error(e);
    }
  }
  const routeCollection = Object.values(market.getCollections()).find((_collection: PublicCategoryCollection) => {
    return _collection.attributes.url === "/collection/" + to.params.slug;
  });
  collection.value = routeCollection as PublicCategoryCollection;
  if (collection.value) {
    wallPaperStyle.background = `url(${collection.value.attributes.banner.attributes.url}) no-repeat center`;
    wallPaperStyle.backgroundSize = "cover";
    wallPaperStyle.borderRadius = 0;
  }
}, {flush: 'pre', immediate: true, deep: true})

const totalVolume: ComputedRef<number> = computed(() => {
  if (collection && collection.value) {
    return collection.value['attributes']['collectibles']
      .reduce((total: number, collectible: PublicCategoryCollectionCollectible) => {
        return total + +collectible.attributes.details.price;
      }, 0);
  }
  return 0;
});

const floorPrice: ComputedRef<number> = computed(() => {
  if (collection && collection.value) {
    const prices = collection.value['attributes']['collectibles'].map((collectible: PublicCategoryCollectionCollectible) => {
      console.log(collectible.attributes.metadata.name, collectible.attributes.details.price_wei)
      return +collectible.attributes.details.price;
    });
    return Math.min(...prices);
  }
  return 0;
});

const bestOffer: ComputedRef<number> = computed(() => {
  if (collection && collection.value) {
    const prices = collection.value['attributes']['collectibles'].map((collectible: PublicCategoryCollectionCollectible) => {
      return +collectible.attributes.details.price;
    })
    return Math.max(...prices);
  }
  return 0;
});

const owners: ComputedRef<number> = computed(() => {
  if (collection && collection.value) {
    const _owners = [...new Set(collection.value['attributes']['collectibles'].map((collectible: PublicCategoryCollectionCollectible) => {
      return +collectible.attributes.owner.id;
    }))];
    return _owners.length;
  }
  return 0;
});

</script>

<template>
  <div class="tf-profile">
    <section class="tf-section tf-activity s1 authors profile" v-if="collection">
      <div class="flat-tabs tab-authors">
        <div class="author-profile flex" ref="profile" :style="wallPaperStyle">
          <div class="feature-profile" ref="uploadNav">
            <img :src="collection['attributes']['logo']['attributes']['url']"
                 :alt="collection['attributes']['logo']['attributes']['alt']" class="avatar">
          </div>
        </div>
      </div>
      <div class="themesflat-container">
        <div class="infor-collection">
          <h1 v-html="collection['attributes']['name']"></h1>
          <div class="content">
            <div class="content-item">Items: {{ collection['attributes']['collectibles'].length }}</div>
            <div class="content-item">·</div>
            <div class="content-item">Created <strong>{{ collection['attributes']['created']}}</strong></div>
            <div class="content-item">·</div>
            <div class="content-item">Market Fee <strong>{{ ethers.utils.formatEther(collection['attributes']['fee']) }} %</strong></div>
            <div class="content-item">·</div>
            <div class="content-item">Chain <strong>Ethereum</strong></div>
            <div class="content-item">·</div>
            <div class="content-item" v-if="collection['attributes']['category']">Category
              <strong>
                <router-link :to="collection['attributes']['category']['url']">
                  {{ collection['attributes']['category']['title'] }}
                </router-link>
            </strong>
            </div>
          </div>
          <div class="description" v-html="collection['attributes']['description']"></div>
          <div class="content">
            <div class="content-item">
              <span>{{ totalVolume.toFixed(2) }} ETH</span>
              <br/>
              <span>total volume</span>
            </div>
            <div class="content-item">·</div>
            <div class="content-item">
              <span>{{ floorPrice }} ETH</span>
              <br/>
              <span>floor price</span>
            </div>
            <div class="content-item">·</div>
            <div class="content-item">
              <span>{{ bestOffer }} ETH</span>
              <br/>
              <span>best offer</span>
            </div>
            <div class="content-item">·</div>
            <div class="content-item">
              <span>100%</span>
              <br/>
              <span>listed</span>
            </div>
            <div class="content-item">·</div>
            <div class="content-item">
              <span>{{ owners }}</span>
              <br/>
              <span>owners</span>
            </div>
<!--            <div class="content-item">·</div>-->
<!--            <div class="content-item">-->
<!--              <span>55%</span>-->
<!--              <br/>-->
<!--              <span>unique owners</span>-->
<!--            </div>-->
            <div class="content-item">·</div>
            <div class="content-item" v-if="collection['attributes']['category']">Category
              <strong>
                <router-link :to="collection['attributes']['category']['url']">
                  {{ collection['attributes']['category']['title'] }}
                </router-link>
              </strong>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-8 col-md-8 col-12" v-if="collection">
            <Filter
              :collectibles="collection['attributes']['collectibles']"
            />
          </div>
          <div class="col-lg-4 col-md-4 col-12">
            <div id="side-bar" class="side-bar style-2">
              <div class="widget widget-search mgbt-24">
                <form action="#">
                  <input type="text" placeholder="Enter your word art" required />
                  <button><i class="icon-fl-search-filled"></i></button>
                </form>
              </div>
              <div class="widget widget-filter style-2 mgbt-0">
                <h3 class="title-widget">Filter</h3>

                <!--                <ul class="filter box-check">-->
                <!--                  <li v-for="item in unique" :key="item.id"  v-on:click="selectedCategory = item.activity" ><a  class="box-widget-filter" :class="{active:selectedCategory == item.activity}"><i :class="item.activity" ></i>{{item.activity}}</a> </li>-->
                <!--                </ul>-->
                <!--                <router-link to="#" class="clear-check btn-filter style-2" v-on:click="selectedCategory ='All'">-->
                <!--                  Clear All Filters-->
                <!--                </router-link>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>