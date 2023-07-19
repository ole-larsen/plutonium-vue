<script lang="ts" setup>
import type { PublicCategoryCollection } from "@/types";
import type { ComputedRef } from "vue";

import {computed} from "vue";

import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";

import { Carousel, Slide  } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const store = useMarketPlaceStore();

const collections: ComputedRef<PublicCategoryCollection[]> = computed(() => store.getCollections()
  .filter((collection: PublicCategoryCollection) => collection.attributes.collectibles.length >= 5));

const settings = {
 itemsToShow: 1
};

const breakpoints = {
 768: {
   itemsToShow: 2,
 },
 991: {
   itemsToShow: 2,
 },
 1200: {
   itemsToShow: 3
 }
}
</script>
<template>
  <section class="tf-section popular-collection" v-if="collections.length">
    <div class="themesflat-container">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-live-auctions">
            <h2 class="tf-title pb-22 text-left">Popular Collection</h2>
          </div>
        </div>
        <div class="col-md-12">
          <div class="collection">
            <carousel
              :autoplay=0
              :settings='settings'
              :breakpoints='breakpoints'
            >
              <Slide
                v-for="collection in collections"
                :key="'collection-' + collection.id"
              >
                <div class="sc-card-collection style-2 home2">
                  <div class="card-bottom">
                    <div class="author">
                      <div class="sc-author-box style-2">
                        <div class="author-avatar">
                          <img :src="collection['attributes']['creator']['gravatar']"
                               :alt="collection['attributes']['creator']['username']" class="avatar">
                          <div class="badge"><i class="ripple"></i></div>
                        </div>
                      </div>
                      <div class="content">
                        <h4>
                          <router-link :to="collection['attributes']['url']">
                            {{collection['attributes']['name']}}
                          </router-link>
                        </h4>
                        <div class="infor">
                          <span>Created by</span>
                          <span class="name">
                            <router-link :to="`/author/${collection['attributes']['creator']['uuid']}`">
                              {{collection['attributes']['creator']['username'].slice(0, 16)}}
                            </router-link>
                          </span>
                        </div>
                      </div>
                    </div>
<!--                    <router-link to="/login" class="wishlist-button public heart"><span class="number-like"> 100</span></router-link>-->
                  </div>
                  <router-link :to="collection['attributes']['url']">
                    <div class="media-images-collection">
                      <div class="box-left">
                        <img :src="collection['attributes']['collectibles'][0]['attributes']['metadata']['image']"
                             :alt="collection['attributes']['collectibles'][0]['attributes']['metadata']['name']">
                      </div>
                      <div class="box-right">
                        <div class="top-img">
                          <img :src="collection['attributes']['collectibles'][1]['attributes']['metadata']['image']"
                               :alt="collection['attributes']['collectibles'][1]['attributes']['metadata']['name']">
                          <img :src="collection['attributes']['collectibles'][2]['attributes']['metadata']['image']"
                               :alt="collection['attributes']['collectibles'][2]['attributes']['metadata']['name']">
                        </div>
                        <div class="bottom-img">
                          <img :src="collection['attributes']['collectibles'][3]['attributes']['metadata']['image']"
                               :alt="collection['attributes']['collectibles'][3]['attributes']['metadata']['name']">
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </Slide>
            </carousel>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>