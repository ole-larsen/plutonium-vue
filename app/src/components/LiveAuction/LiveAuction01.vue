<script lang="ts" setup>
import type { ComputedRef } from "vue";
import { computed } from "vue";

import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

import type { 
  PublicCategoryCollection, 
  PublicCategoryCollectionCollectible, 
  PublicUser
} from "@/types";

import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";
import { useLoaderStore } from "@/stores/loader/store";
import { useAuthStore } from "@/stores/auth/store";
import { useLiveAuctionStore } from "@/stores/components/liveAuction";

import Collectible01 from "@/components/LiveAuction/Collectible01.vue";
import Single01 from "@/components/LiveAuction/Single01.vue";

const settings = {
  itemsToShow: 1,
  snapAlign: "left",
};

const breakpoints = {
  768: {
    itemsToShow: 2
  },
  991: {
    itemsToShow: 4
  },
  1200: {
    itemsToShow: 4
  }
};

const auth    = useAuthStore();
const store   = useMarketPlaceStore();

const collectibles: ComputedRef<PublicCategoryCollectionCollectible[]> = computed(() => {
  return store.getCollections().reduce((collectibles: PublicCategoryCollectionCollectible[], next: PublicCategoryCollection) => {
    return collectibles.concat(next.attributes.collectibles);
  }, []).filter((collectible: PublicCategoryCollectionCollectible) => !!collectible.attributes.details.end_time && collectible.attributes.details.start_time);
});

const user: ComputedRef<PublicUser> = computed(() => auth.getUser());

</script>
<template>
  <section class="tf-section live-auctions" v-if="collectibles.length > 0">
    <div class="themesflat-container">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-live-auctions">
            <h2 class="tf-title pb-20">Live Auction</h2>
            <router-link to="/live-auctions" class="exp style2">Explore more</router-link>
          </div>
        </div>
        <div class="col-md-12">
          <carousel
            :autoplay="0"
            :wrap-around="false"
            :settings="settings"
            :breakpoints="breakpoints">
              <Slide v-for="(collectible, index) in collectibles" :key="collectible.id">
                <template v-if="collectible.attributes.details.auction">
                  <collectible01 :collectible="collectible" :user="user"/>
                </template>
                <template v-else>
                  <single01 :collectible="collectible" :user="user"/>
                </template>
              </Slide>

              <template #addons v-if="collectibles.length > 4">
                <Navigation  />
                <Pagination  />
              </template>
          </carousel>
        </div>
      </div>
    </div>
<!--    <modal :item="item" :isActive="isActive" @close="close"/>-->
  </section>
</template>

