<script lang="ts" setup>

import {onMounted, toRefs, ref, computed} from "vue";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import Modal from "@/components/template/Modal/Modal.vue";
const props = defineProps(["items"]);
const { items } = toRefs(props);
const isActive: any = ref({});
const selectedCategory = ref("All");
const item: any = ref({});

function toggleActive(id: any) {
  if (items) {
    item.value = items.value.find((i: any) => i.id === id);
    isActive.value[id] = !isActive.value[id];
  }
}

onMounted(() => {
  if (items) {
    for (let i = 0; i <= items.value.length; i++) {
      const _item = items.value[i];
      if (_item) {
        isActive.value[_item.id] = false;
      }
    }
  }
});

// in production fetch from nft category
const unique = computed(() => [
  {
    id: 1,
    category: "Art"
  },
  {
    id: 2,
    category: "Music"
  },
  {
    id: 3,
    category: "Games"
  }
]);

async function buy(_item: any) {
  try {
    await useMarketPlaceStore().buy(_item.id, _item.total);
  } catch (e) {
    console.error(e);
  }
}

</script>
<template>
  <div>
    <ul class="filter">
        <li  v-on:click="selectedCategory ='All'" :class="{active:selectedCategory === 'All'}" > All</li>
        <li v-for="item in unique" :key="item.id" :class="{active:selectedCategory === item.category}" v-on:click="selectedCategory = item.category" > {{item.category}} </li>
    </ul>
    <div class="row">
      <div  class="col-xl-3 col-lg-4 col-md-6 col-sm-6"  v-for="item in items" :key="item.id" >
        <div class="sc-card-product explode ">
          <div class="card-media">
            <router-link :to="`/card/${item['id']}`"><img :src="item['metadata']['image']" alt="image"></router-link>
            <div class="button-place-bid ">
              <button class="sc-button style-place-bid style bag fl-button pri-3" v-on:click="toggleActive(item.id)"><span>Buy</span></button>

              <!--
              <button class="sc-button style-place-bid style bag fl-button pri-3" v-on:click="toggleActive(isActive)"><span>Place Bid</span></button>
              -->
            </div>
<!--            <router-link to="/login" class="wishlist-button heart"><span class="number-like"> 100 </span></router-link>-->
          </div>
          <div class="card-title mg-bt-16">
            <h5><router-link :to="`/card/${item['id']}`">"{{item['metadata']['name']}}"</router-link></h5>
          </div>
          <div class="meta-info">
            <div class="author">
              <div class="avatar">
                <img :src="item['seller']['gravatar']" :alt="item['seller']['username']">
              </div>
              <div class="info">
                <span>Creator</span>
                <h6>
                  <router-link :to="`/author/${item['seller']['username']}`">
                    {{item['seller']['username'].slice(0, 4) + "..." + item['seller']['username'].slice(-4)}}
                  </router-link>
                </h6>
              </div>
            </div>
            <div class="tags">{{item.sold ? 'SOLD' : ''}}</div>
          </div>
          <div class="card-bottom style-explode">
            <div class="price">
              <span>Current Bid</span>
              <div class="price-details">
                <h5>{{item.price}}</h5>
                <span>= {{item.price}}</span>
              </div>
            </div>
<!--            <router-link to="/activity-01" class="view-history reload">View History</router-link>-->
          </div>
        </div>
      </div>
      <div class="col-md-12 wrap-inner load-more text-center">
        <!--<router-link to="#" id="load-more" class="sc-button loadmore fl-button pri-3" ><span>Load More</span></router-link>-->
      </div>
    </div>
    <modal :item="item" :isActive="isActive"/>
  </div>
</template>

