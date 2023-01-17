<script lang="ts" setup>

import Filter from "./Filter.vue";
import type {MarketItem} from "@/stores/contracts/marketPlace";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";

import type {ComputedRef} from "vue";

import {computed, reactive, ref, watch, toRefs} from "vue";
const props = defineProps(["user"]);
const { user } = toRefs(props);
const market = useMarketPlaceStore();

const items = computed(() => market.items.filter((_item: MarketItem) => {
  // @ts-ignore
  return _item.creator.address.toLowerCase() === user.value.address.toLowerCase();
}));

const wallpaper: any = ref(null);

const item = ref({
  name: "",
  description: "",
  price: 0,
  file: undefined,
  category: "All",
  tags: ""
});

const wallPaperStyle = reactive({
  background: `url(${user?.value?.wallpaper}) no-repeat top`,
});

watch(
  () => user?.value,
  (_user) => {
    if (_user.wallpaper) {
      wallPaperStyle.background = `url(${_user.wallpaper}) no-repeat top`;
    }
  });

const collectionsCount = computed(() => market.collectionsCount);
// @ts-ignore
const collections: ComputedRef<any> = computed(() => {
  const ownerCollections: any = {};
  if (market.collections) {
    for (const id in market.collections) {
      if (market.collections.hasOwnProperty(id)) {
        // @ts-ignore
        if (market.collections[id].owner === user.value.address) {
          // @ts-ignore
          ownerCollections[id] = market.collections[id];
        }
      }
    }
  }
  return ownerCollections;
});
const categories = computed(() => {
  const _collections: { id: string; collection: string }[] = [];
  if (collections?.value) {
    for (const id in collections.value) {
      _collections.push({
        id: id,
        collection: collections.value[id].name
      });
    }
  }
  return _collections;
});
</script>
<template>
  <div class="authors-2">
    <section class="tf-section authors profile" v-if="user">
      <div class="themesflat-container">
        <div class="flat-tabs tab-authors">
          <div class="author-profile flex" ref="profile" :style="wallPaperStyle">

            <div class="feature-profile" ref="uploadNav">
              <img :src="user['gravatar']" alt="image" class="avatar">
            </div>
            <div class="infor-profile">
              <span>{{user['address']}}</span>
              <div class="infor-profile-username">
                <h2 class="title">{{user['username']}}</h2>
              </div>

              <div class="infor-profile-email">
                <div class="content" v-html="user['email']"></div>
              </div>

              <div v-for="wallet in user['wallets']">
                <form>
                  <div>
                    <label class="form-label">{{ wallet['name'] }}</label>
                  </div>
                  <input type="text" class="inputcopy" v-model="wallet['address']" readOnly />
                  <button type="button" class="btn-copycode"><i class="icon-fl-file-1"></i></button>
                </form>
                <br/>
              </div>

            </div>

            <div class="widget-social style-3" v-if="user['socials']">
              <ul>
                <li v-for="social in user['socials']">
                  <a :href="social['link']" target="_blank"><i :class="social['icon']"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <Filter v-if="collectionsCount > 0" :collections="collections" :categories="categories"/>
        </div>
      </div>
    </section>

  </div>
</template>