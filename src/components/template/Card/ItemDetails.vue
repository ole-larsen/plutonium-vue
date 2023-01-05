<script setup lang="ts">

// import LiveAution from "@/components/Home01/LiveAuction.vue"
import Countdown from "@/components/template/Layouts/Countdown.vue";
import Tab from "@/components/Tab/Tab.vue";
import {computed, watch, ref} from "vue";

import { useRoute } from "vue-router";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import type {MarketItem} from "@/stores/contracts/marketPlace";

import Modal from "@/components/template/Modal/Modal.vue";
import PageTitle from "@/components/template/PageTitle/PageTitle.vue";

const route = useRoute();
const id = route.params.id // read parameter id (it is reactive)
const market = useMarketPlaceStore();
const item: any = computed(() => market.items.find((_item: MarketItem) => Number(_item.id) === Number(id)));
const nft: any = ref(null);
const isActive = ref(false);

watch(() => item.value, async (_item: any) => {
  if (_item) {
    console.log(_item);
    // nft.value = await market.getItem(_item.id);
  }
});


function toggleActive() {
  isActive.value = !isActive.value;
}

const likeCount = ref(0)

async function like() {
  try {
   await market.like(item.value as MarketItem);
  } catch(e) {
    console.error(e);
  }
}
</script>
<template>
  <PageTitle v-if="item && item['id']"
             pageTitle="Card"
             pageTitleActive="card"
             :link="'/card/' + item['id']" />
  <div class="item-details">
    <div class="tf-section tf-item-details">
      <div class="themesflat-container " v-if="item">
        <div class="row">
          <div class="col-xl-6 col-md-12">
            <div class="content-left">
              <div class="media">
                <img :src="item['metadata']['image']" :alt="item['metadata']['name']">
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-md-12">
            <div class="content-right">
              <div class="sc-item-details">
                <h2 class="style2">{{item['metadata']['name']}} </h2>
                <div class="meta-item">
                  <div class="left">
                    <span class="viewed eye">225</span>
                    <span class="liked heart wishlist-button mg-l-8" @click="like"><span class="number-like">{{ likeCount }}</span></span>
                  </div>
                  <div class="right">
                    <router-link to="#" class="share"></router-link>
                    <router-link to="#" class="option"></router-link>
                  </div>
                </div>
                <div class="client-infor sc-card-product">
                  <div class="meta-info">
                    <div class="author">
                      <div class="avatar">
                        <img :src="item['seller']['gravatar']" alt="image">
                      </div>
                      <div class="info">
                        <span>Owned By</span>
                        <h6> <router-link :to="`/author/${item['seller']['uuid']}`">{{ String(item['seller']['username']).slice(0, 16)}}</router-link> </h6>
                      </div>
                    </div>
                  </div>
                  <div class="meta-info">
                    <div class="author">
                      <div class="avatar">
                        <img :src="item['seller']['gravatar']" alt="image">
                      </div>
                      <div class="info">
                        <span>Create By</span>
                        <h6> <router-link :to="`/author/${item['seller']['uuid']}`">{{String(item['seller']['username']).slice(0, 16)}}</router-link> </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <p>{{item['metadata']['description']}}</p>
                <div class="meta-item-details style2">
                  <div class="item meta-price">
                    <span class="heading">Current Bid</span>
                    <div class="price">
                      <div class="price-box">
                        <h5> {{ item['price'] }} ETH</h5>
<!--                        <span>= $12.246</span>-->
                      </div>
                    </div>
                  </div>
                  <div class="item count-down">
                    <span class="heading style-2">Countdown</span>
                    <Countdown starttime="Jul 1, 2022 15:37:25" endtime="Aug 8, 2023 16:37:25" ></Countdown>
                  </div>
                </div>
                <router-link v-if="!item['sold']" to="#" class="sc-button loadmore style bag fl-button pri-3"
                             @click.prevent="toggleActive()">
                  <span>Buy</span>
                </router-link>
                <div class="flat-tabs themesflat-tabs">
                  <Tab />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal v-if="item" :item="item" :isActive="{[item['id']]: isActive}" @close="toggleActive"/>
</template>