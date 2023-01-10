<script lang="ts" setup>

import { Carousel, Slide  } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
import {computed} from "vue";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";

const store = useMarketPlaceStore();
const collections: any = computed(() => store.collections);

const settings = {
  itemsToShow: 1
};
const auction = null;

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
  <section class="tf-section popular-collection" v-for="(ownerCollection, owner) in collections">
    <div class="themesflat-container" v-for="(collection, collectionId) in ownerCollection">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-live-auctions">
            <h2 class="tf-title pb-22 text-left">{{collection['name']}}</h2>
            <router-link :to="`/collection/${collection['id']}`" class="exp style2">more</router-link>
          </div>
        </div>
        <div class="col-md-12">
          <div class="collection">
            <carousel
              :autoplay="0"
              :settings='settings'
              :breakpoints='breakpoints'
              v-if="collection">
              <Slide v-for="item in collection['items']" :key="item['id']">
                <div class="sc-card-collection style-3">
                  <router-link :to="`/author/${item['creator']['uuid']}`">
                    <div class="media-images-box">
                      <div class="top-media">
                        <img v-if="item['metadata']" :src="item['metadata']['image']" alt="image" class="avatar">
<!--                        <img v-if="item['metadata']" :src="item['metadata']['image']" alt="image" class="avatar">-->
                      </div>
<!--                      <div class="bottom-media">-->
<!--                        <img v-if="slide['img3']" :src="slide['img3']['data']['attributes']['url']" alt="image" class="avatar">-->
<!--                        <img v-if="slide['img4']" :src="slide['img4']['data']['attributes']['url']" alt="image" class="avatar">-->
<!--                        <img v-if="slide['img5']" :src="slide['img5']['data']['attributes']['url']" alt="image" class="avatar">-->
<!--                      </div>-->
                    </div>
                  </router-link>
                  <div class="card-bottom">
                    <div class="author">
                      <div class="sc-author-box style-2">
                        <div class="author-avatar">
                          <img :src="item['creator']['gravatar']" :alt="item['creator']['username']" class="avatar">
                          <div class="badge"><i class="ripple"></i></div>
                        </div>
                      </div>
                      <div class="content">
                        <h4><router-link :to="`/card/${item['collectionId']}/${item['itemInCollectionId']}`">{{item['metadata']['name']}}</router-link></h4>
                        <div class="infor">
                          <span>Created by</span>
                          <span class="name"><router-link :to="`/author/${item['creator']['uuid']}`">{{item['creator']['username']}}</router-link></span>
                        </div>
                      </div>
                    </div>
                    <router-link to="/login" class="wishlist-button public heart"><span class="number-like">100</span></router-link>
                  </div>
                </div>
              </Slide>
            </carousel>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>