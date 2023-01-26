<script lang="ts" setup>

import {toRefs, ref, computed, watch} from "vue";
import type {MarketItem} from "@/stores/contracts/marketPlace";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import Modal from "@/components/template/Modal/Modal.vue";
import {useItemDetailsStore} from "@/stores/itemDetails";
const props = defineProps(["collections", "categories"]);
const { collections, categories } = toRefs(props);
const market = useMarketPlaceStore();

const isActive: any = ref({});
const isSellEvent = ref(false);

const selectedCategory = ref("All");
const item: any = ref({});

function toggleActive(_item: MarketItem) {
  isSellEvent.value = false;
  item.value = _item;
  if (isActive.value[_item.id] === undefined) {
    isActive.value[_item.id] = false;
  }
  isActive.value[_item.id] = !isActive.value[_item.id];
}

function toggleSellActive(_item: MarketItem) {
  isSellEvent.value = true;
  item.value = _item;
  if (isActive.value[_item.id] === undefined) {
    isActive.value[_item.id] = false;
  }
  isActive.value[_item.id] = !isActive.value[_item.id];
}
const items: any = computed(() => market.items);

const likes = computed(() => {
  const _likes: any = {};
  items.value.forEach((_item: MarketItem) => {

    if (!_likes[_item.collectionId]) {
      _likes[_item.collectionId] = {};
    }
    if (!_likes[_item.collectionId][_item.tokenId]) {
      _likes[_item.collectionId][_item.tokenId] = 0;
    }
    _likes[_item.collectionId][_item.tokenId] = useItemDetailsStore().likes(_item);
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

function close(_item: MarketItem) {
  toggleActive(_item);
}

function viewHistory(_item: MarketItem) {
  console.log(_item);
}
</script>
<template>
  <div class="filter-wrapper">
    <ul class="filter">
      <li  v-on:click="selectedCategory ='All'" :class="{active:selectedCategory === 'All'}" > All</li>
      <li v-for="category in categories" :key="category.id" :class="{active:selectedCategory === category.collection}" v-on:click="selectedCategory = category.collection" > {{category.collection}} </li>
    </ul>
    <div class="row" v-for="collection in collections" :key="'collection-' + collection.id">
      <div  class="col-xl-3 col-lg-4 col-md-6 col-sm-6"  v-for="item in collection['items']" :key="'item-' + item['id']" v-if="collection['name'] === selectedCategory || selectedCategory === 'All'">
        <div class="sc-card-product explode ">
          <div class="card-media">
            <router-link :to="`/card/${collection['id']}/${item['tokenId']}`"><img :src="item['metadata']['image']" alt="image"></router-link>

            <div class="button-place-bid " v-if="item.fulfilled">
              <button class="sc-button style-place-bid style bag fl-button pri-3" v-on:click="toggleSellActive(item)"><span>Sell</span></button>
            </div>

            <span class="wishlist-button heart" @click="like(item)">
              <span class="number-like">{{ likes[collection['id']][item['tokenId'].toString()] }}</span>
            </span>
          </div>
          <div class="card-title mg-bt-16">
            <h5><router-link :to="`/card/${collection['id']}/${item['tokenId']}`">"{{item['metadata']['name']}}"</router-link></h5>
          </div>
          <div class="meta-info" v-if="item && item['creator']">
            <div class="author">
              <div class="avatar">
                <img :src="item['creator']['gravatar']" :alt="item['creator']['username']">
              </div>
              <div class="info">
                <span>Creator</span>
                <h6>
                  <router-link :to="`/author/${item['creator']['username']}`">
                    {{item['creator']['username'].length > 10 ? item['creator']['username'].slice(0, 4) + "..." + item['creator']['username'].slice(-4) : item['creator']['username']}}
                  </router-link>
                </h6>
              </div>
            </div>
          </div>
          <div class="meta-info" v-if="item && item['owner']">
            <div class="author">
              <div class="avatar">
                <img :src="item['owner']['gravatar']" :alt="item['owner']['username']">
              </div>
              <div class="info">
                <span>Owner</span>
                <h6>
                  <router-link :to="`/author/${item['owner']['username']}`">
                    {{item['owner']['username'].length > 10 ? item['owner']['username'].slice(0, 4) + "..." + item['owner']['username'].slice(-4) : item['owner']['username']}}
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
            <router-link to="#" @click.prevent="viewHistory(item)" class="view-history reload">View History</router-link>
          </div>
        </div>
      </div>
      <!--      <div class="col-md-12 wrap-inner load-more text-center">-->
      <!--        &lt;!&ndash;<router-link to="#" id="load-more" class="sc-button loadmore fl-button pri-3" ><span>Load More</span></router-link>&ndash;&gt;-->
      <!--      </div>-->
    </div>
    <modal :item="item" :isActive="isActive" @close="close" :isSellEvent="isSellEvent"/>
  </div>
</template>

