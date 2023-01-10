<script lang="ts" setup>

import {computed, ref, watch} from "vue";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import {useLiveAuctionStore} from "@/stores/liveAuction";
import Modal from "@/components/template/Modal/Modal.vue";

import "vue3-carousel/dist/carousel.css";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import type {BigNumber} from "ethers";
import type {MarketItem} from "@/stores/contracts/marketPlace";
import {useItemDetailsStore} from "@/stores/itemDetails";

const store = useLiveAuctionStore();
const market = useMarketPlaceStore();

const item: any = ref({});

const isActive: any = computed(() => store.isActive);

const itemCount = computed(() => market.itemCount);

const items: any = computed(() => market.items);

const likes = computed(() => {
  return items.value.map((_item: MarketItem) => {
    return useItemDetailsStore().likes(_item);
  });
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

const settings = {
  itemsToShow: 1
};

const breakpoints = {
  768: {
    itemsToShow: 2
  },
  991: {
    itemsToShow: 3
  },
  1200: {
    itemsToShow: 4
  }
};

function toggleActive(_item: MarketItem) {
  store.toggleActive(_item.id);
  item.value = _item;
}

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
  <section class="tf-section live-auctions" v-if="items && items.length > 0">
    <div class="themesflat-container">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-live-auctions">
            <h2 class="tf-title pb-20">Live Auction</h2>
            <!--<router-link to="/live-auctions" class="exp style2">more</router-link>-->
          </div>
        </div>
        <div class="col-md-12">
          <carousel
            :autoplay="0"
            :wrap-around="false"
            :settings="settings"
            :breakpoints="breakpoints">
              <Slide v-for="(slide, index) in items.slice(0,6)" :key="slide.id">
                <div class="sc-card-product">
                  <div class="card-media">
                    <router-link :to="`/card/${slide['collectionId']}/${slide['id']}`">
                      <img :src="slide['metadata']['image']" alt="image">
                    </router-link>
                    <span class="wishlist-button heart" @click="like(slide)">
                      <span class="number-like">{{ likes ? likes[index] : 0 }}</span>
                    </span>

                    <!--<div class="featured-countdown">-->
                    <!--<span class="slogan"></span>-->
                    <!--<Countdown starttime="Jul 1, 2022 15:37:25" endtime="Dec 8, 2022 16:37:25" />-->
                    <!--</div>-->
                    <div class="button-place-bid">
                      <button class="sc-button style-place-bid style bag fl-button pri-3"  v-on:click="toggleActive(slide)"><span>Buy</span></button>
                    </div>
                  </div>
                  <div class="card-title">
                    <h5><router-link :to="`/card/${slide['collectionId']}/${slide['id']}`">{{slide['metadata']['name']}}</router-link></h5>
                    <div class="tags">{{slide['metadata']['tags'] }}</div>
                  </div>
                  <div class="meta-info" v-if="slide['creator']">
                    <div class="author">
                      <div class="avatar" v-if="slide['creator']['gravatar']">
                        <img :src="slide['creator']['gravatar']" :alt="slide['creator']['username']">
                      </div>
                      <div class="info" v-if="slide['creator']['address']">
                        <span>{{ slide['creator']['address'].slice(0, 4) + "..." + slide['creator']['address'].slice(-4) }}</span>
                        <h6 v-if="slide['creator']['uuid']">
                          <router-link :to="`/author/${slide['creator']['uuid']}`">{{slide['creator']['username'].slice(0, 16)}}...</router-link>
                        </h6>
                      </div>
                    </div>
                    <div class="price">
                      <span>Current Bid</span>
                      <h5> {{slide['price']}}</h5>
                    </div>
                  </div>
                </div>
              </Slide>

              <template #addons v-if="items && items.length > 4">
                <Navigation  />
                <Pagination  />
              </template>
          </carousel>
        </div>
      </div>
    </div>
    <modal :item="item" :isActive="isActive" />
  </section>
</template>

