<script lang="ts" setup>

import { Carousel, Slide  } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
import {useCollectionStore} from "@/stores/collection";
import {computed, onBeforeMount} from "vue";

const store = useCollectionStore();
const collection = computed(() => store.collection);
onBeforeMount(async() => {
  try {
    await store.load(2);
  } catch (e) {
    throw e;
  }
});
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
  <section class="tf-section popular-collection" v-if="collection !== null">
    <div class="themesflat-container">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-live-auctions">
            <h2 class="tf-title pb-22 text-left">{{collection['heading']}}</h2>
            <router-link :to="collection['btnLink']" class="exp style2">{{collection['btn']}}</router-link>
          </div>
        </div>
        <div class="col-md-12">
          <div class="collection">
            <carousel
              :autoplay="0"
              :settings='settings'
              :breakpoints='breakpoints'
              v-if="collection">
              <Slide v-for="slide in collection['Collection']" :key="slide['id']">
                <div class="sc-card-collection style-3">
                  <router-link to="/author/trista-francis">
                    <div class="media-images-box">
                      <div class="top-media">
                        <img v-if="slide['img1']" :src="slide['img1']['data']['attributes']['url']" alt="image" class="avatar">
                        <img v-if="slide['img2']" :src="slide['img2']['data']['attributes']['url']" alt="image" class="avatar">
                      </div>
                      <div class="bottom-media">
                        <img v-if="slide['img3']" :src="slide['img3']['data']['attributes']['url']" alt="image" class="avatar">
                        <img v-if="slide['img4']" :src="slide['img4']['data']['attributes']['url']" alt="image" class="avatar">
                        <img v-if="slide['img5']" :src="slide['img5']['data']['attributes']['url']" alt="image" class="avatar">
                      </div>
                    </div>
                  </router-link>
                  <div class="card-bottom">
                    <div class="author">
                      <div class="sc-author-box style-2">
                        <div class="author-avatar">
                          <img :src="slide['imgAuthor']['data']['attributes']['url']" alt="image" class="avatar">
                          <div class="badge"><i class="ripple"></i></div>
                        </div>
                      </div>
                      <div class="content">
                        <h4><router-link to="/authors-01">{{slide['title']}}</router-link></h4>
                        <div class="infor">
                          <span>Created by</span>
                          <span class="name"><router-link to="/author/trista-francis">{{slide['nameAuthor']}}</router-link></span>
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