<script lang="ts" setup>

import {toRefs, ref, computed, watch} from "vue";
import type {MarketItem} from "@/stores/contracts/marketPlace";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import Modal from "@/components/template/Modal/Modal.vue";
import {useItemDetailsStore} from "@/stores/itemDetails";
const props = defineProps(["collections", "categories"]);
const { collections, categories } = toRefs(props);
const market = useMarketPlaceStore();

const isActive: any = computed(() => {
  const _isActive: {[id: number]: boolean} = {};
  if (collections && collections.value) {
    for (let i = 0; i <= collections.value.length; i++) {
      const _collection = collections.value[i];
      if (_collection) {
        _isActive[_collection.id] = false;
      }
    }
  }
  return _isActive;
});

const selectedCategory = ref("All");
const item: any = ref({});

function toggleActive(_item: MarketItem) {
  if (items) {
    item.value = _item;
    isActive.value[_item.id] = !isActive.value[_item.id];
  }
}

async function buy(_item: MarketItem) {
  try {
    await useMarketPlaceStore().buy(_item);
  } catch (e) {
    console.error(e);
  }
}
const items: any = computed(() => market.items);

const likes = computed(() => {
  const _likes: any = {};
  items.value.forEach((_item: MarketItem) => {
    if (!_likes[_item.collectionId]) {
      _likes[_item.collectionId] = {};
    }
    if (!_likes[_item.collectionId][_item.itemInCollectionId]) {
      _likes[_item.collectionId][_item.itemInCollectionId] = 0;
    }
    _likes[_item.collectionId][_item.itemInCollectionId] = useItemDetailsStore().likes(_item);
  });
  return _likes;
});

watch(() => items.value, (_items: MarketItem[]) => {
  if (_items) {
    _items.map(async (_item: MarketItem) => {
      try {
        await useItemDetailsStore().load(_item);
      } catch (e) {
        console.error(e);
      }
    });
  }
}, { deep: true });

async function like(_item: MarketItem) {
  try {
    await market.like(_item as MarketItem);
    await useItemDetailsStore().load(_item);
  } catch(e) {
    console.error(e);
  }
}

</script>
<template>
  <div>
    <ul class="filter">
      <li  v-on:click="selectedCategory ='All'" :class="{active:selectedCategory === 'All'}" > All</li>
      <li v-for="category in categories" :key="category.id" :class="{active:selectedCategory === category.category}" v-on:click="selectedCategory = category.category" > {{category.category}} </li>
    </ul>
    <div class="row" v-for="collection in collections" :key="'collection-' + collection.id">
      <div  class="col-xl-3 col-lg-4 col-md-6 col-sm-6"  v-for="item in collection['items']" :key="'item-' + item.id" v-if="collection['name'] === selectedCategory || selectedCategory === 'All'">
        <div class="sc-card-product explode ">
          <div class="card-media">
            <router-link :to="`/card/${collection['id']}/${item['id']}`"><img :src="item['metadata']['image']" alt="image"></router-link>
            <div class="button-place-bid ">
              <button class="sc-button style-place-bid style bag fl-button pri-3" v-on:click="toggleActive(item)"><span>Buy</span></button>
            </div>

            <span class="wishlist-button heart" @click="like(item)">
              <span class="number-like">{{ likes[collection['id'].toString()][item['itemInCollectionId'].toString()] }}</span>
            </span>

          </div>

          <div class="card-title mg-bt-16">
            <h5><router-link :to="`/card/${collection['id']}/${item['id']}`">"{{item['metadata']['name']}}"</router-link></h5>
          </div>
          <div class="meta-info" v-if="item && item['creator']">
            <div class="author">
              <div class="avatar">
                <img :src="item['creator']['gravatar']" :alt="item['creator']['username']">
              </div>
              <div class="info">
                <span>Creator</span>
                <h6>
                  <router-link :to="`/author/${item['creator']['uuid']}`">
                    {{item['creator']['username'].slice(0, 4) + "..." + item['creator']['username'].slice(-4)}}
                  </router-link>
                </h6>
              </div>
            </div>
            <div class="tags">{{collection['name']}}</div>
          </div>
          <div class="card-bottom style-explode">
            <div class="price">
              <span>Current Bid</span>
              <div class="price-details">
                <h5>{{item['price']}}</h5>
                <span>= {{item['price']}}</span>
              </div>
            </div>
            <!--            <router-link to="/activity-01" class="view-history reload">View History</router-link>-->
          </div>
        </div>
      </div>
      <!--      <div class="col-md-12 wrap-inner load-more text-center">-->
      <!--        &lt;!&ndash;<router-link to="#" id="load-more" class="sc-button loadmore fl-button pri-3" ><span>Load More</span></router-link>&ndash;&gt;-->
      <!--      </div>-->
    </div>
    <modal :item="item" :isActive="isActive"/>
  </div>
</template>

