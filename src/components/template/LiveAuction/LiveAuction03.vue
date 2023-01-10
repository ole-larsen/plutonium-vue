<script lang="ts" setup>

import {computed, ref} from "vue";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import {useLiveAuctionStore} from "@/stores/liveAuction";
import Modal from "@/components/template/Modal/Modal.vue";

import "vue3-carousel/dist/carousel.css";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";

const store = useLiveAuctionStore();
const market = useMarketPlaceStore();

const item: any = ref({});

const isActive: any = computed(() => store.isActive);

const itemCount = computed(() => market.itemCount);

const items: any = computed(() => market.items);

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

function toggleActive(itemId: number) {
  item.value = items.value.find((_item: any) => _item.id === itemId);
  store.toggleActive(itemId);
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
            <Slide v-for="slide in items.slice(0,6)" :key="slide.id">
              <div class="sc-card-product">
                <div class="card-media">
                  <router-link :to="`/card/${slide.id}`">
                    <img :src="slide.metadata.image" alt="image">
                  </router-link>
                  <!--<router-link to="/login" class="wishlist-button heart"><span class="number-like">100</span></router-link>-->
                  <!--<div class="featured-countdown">-->
                  <!--<span class="slogan"></span>-->
                  <!--<Countdown starttime="Jul 1, 2022 15:37:25" endtime="Dec 8, 2022 16:37:25" />-->
                  <!--</div>-->
                  <div class="button-place-bid">
                    <button class="sc-button style-place-bid style bag fl-button pri-3"  v-on:click="toggleActive(slide.id)"><span>Buy</span></button>
                  </div>
                </div>
                <div class="card-title">
                  <h5><router-link :to="`/card/${slide.id}`">{{slide.metadata.name}}</router-link></h5>
                  <div class="tags">{{slide.metadata.category }}</div>
                </div>
                <div class="meta-info">
                  <div class="author">
                    <div class="avatar">
                      <img :src="slide.seller.gravatar" :alt="slide.seller.username">
                    </div>
                    <div class="info">
                      <span>{{ slide.seller.address.slice(0, 4) + "..." + slide.seller.address.slice(-4) }}</span>
                      <h6>
                        <router-link :to="`/author/${slide.seller.uuid}`">{{slide.seller.username.slice(0, 16)}}...</router-link>
                      </h6>
                    </div>
                  </div>
                  <div class="price">
                    <span>Current Bid</span>
                    <h5> {{slide.price}}</h5>
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

