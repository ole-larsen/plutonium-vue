<script lang="ts" setup>
import {useTodayPickStore} from "@/stores/todayPick";
import type {ComputedRef} from "vue";
import {computed, ref, watch} from "vue";
import Modal from "@/components/template/Modal/Modal.vue";
import type {MarketItem} from "@/stores/contracts/marketPlace";
import type {PublicMarketItem} from "@/stores/contracts/marketPlace";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import {useItemDetailsStore} from "@/stores/itemDetails";

const store = useTodayPickStore();
const item: any = ref({});
const isActive: any = computed(() => store.isActive);
const market = useMarketPlaceStore();

const items: ComputedRef<PublicMarketItem[]> = computed(() => market.items.filter((_item: PublicMarketItem) => !_item.auction));

const likes: ComputedRef<any> = computed(() => {
  return items.value.map((_item: PublicMarketItem) => {
    return useItemDetailsStore().likes(_item);
  });
});

function toggleActive(_item: PublicMarketItem) {
  store.toggleActive(_item.id);
  item.value = _item;
}

async function like(_item: PublicMarketItem) {
  try {
    await market.like(_item as PublicMarketItem);
    await useItemDetailsStore().load(_item);
  } catch(e) {
    console.error(e);
  }
}
function close(_item: PublicMarketItem) {
  toggleActive(_item);
}

</script>
<template>
    <section class="tf-section today-pick" v-if="items.length > 0">
      <div class="themesflat-container">
        <div class="row" >
          <div class="col-md-12">
            <div class="heading-live-auctions mg-bt-21">
              <h2 class="tf-title pad-l-7">Today Picks</h2>
              <!--<router-link :to="todayPicks.btnLink" class="exp style2">{{ todayPicks.btnText }}</router-link>-->
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6" v-for="(_item, index) in items" :key="_item['id']">
            <div v-if="_item" class="sc-card-product" :class="`${_item['comingsoon'] ? 'comingsoon' : ''}`">
              <div class="card-media">
                <router-link :to="`/card/${_item['collectionId']}/${_item['tokenId']}`" v-if="_item['metadata']"> <img :src="_item['metadata']['image']" :alt="_item['metadata']['name']"></router-link>
                <span class="wishlist-button heart" @click="like(_item)">
                  <span class="number-like">{{ likes ? likes[index] : 0 }}</span>
                </span>
<!--                <div class="coming-soon">{{item.comingsoon}}</div>-->
              </div>
              <div class="card-title">
                <h5 class="style2"><router-link :to="`/card/${_item['collectionId']}/${_item['tokenId']}`">"{{_item['metadata']['name']}}"</router-link></h5>
                <div class="tags">{{_item['fulfilled'] ? 'sold' : _item['tags']}}</div>
              </div>

              <div class="meta-info" v-if="_item && _item['owner']">
                <div class="author">
                  <div class="avatar">
                    <img :src="_item['owner']['gravatar']" alt="image">
                  </div>
                  <div class="info">
                    <span>Owned By</span>
                    <h6>
                      <router-link :to="`/author/${_item['owner']['uuid']}`">
                        {{String(_item['owner']['username']).slice(0, 8)}}
                      </router-link>
                    </h6>
                  </div>
                </div>
                <div class="price">
                  <span>Current Bid</span>
                  <h5> {{_item['price']}}</h5>
                </div>
              </div>
              <div class="card-bottom" :class="`${_item['comingsoon'] ? 'none' : ''}`" v-if="!_item['fulfilled']">
                  <button class="sc-button style bag fl-button pri-3 no-bg" v-on:click="toggleActive(_item)"><span>Buy</span></button>
                  <router-link to="/activity-01" class="view-history reload">History</router-link>
                </div>
            </div>
          </div>
          <div class="col-md-12 wrap-inner load-more text-center" v-if="items.length > 10">
            <router-link to="#" id="load-more" class="sc-button loadmore fl-button pri-3" ><span>Load More</span></router-link>
          </div>
        </div>
      </div>
      <modal :item="item" :isActive="isActive" @close="close"/>
    </section>
</template>