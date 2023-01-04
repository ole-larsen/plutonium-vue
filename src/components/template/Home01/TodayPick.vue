<script lang="ts" setup>
import {useTodayPickStore} from "@/stores/todayPick";
import {computed, onBeforeMount, ref, watch} from "vue";
import Modal from "@/components/template/Modal/Modal.vue";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";

const store = useTodayPickStore();
const item: any = ref({});
const todayPicks = computed(() => useMarketPlaceStore().items);
const isActive: any = computed(() => store.isActive);

watch(() => todayPicks.value, (items: any) => {
  items.forEach((_item: {id: number}) => {
    isActive.value[_item.id] = false;
  });
});

function toggleActive(itemId: number) {
  item.value = todayPicks.value.find((_item: any) => _item.id === itemId) as any;
  store.toggleActive(itemId);
}
</script>
<template>
    <section class="tf-section today-pick" v-if="todayPicks !== null">
      <div class="themesflat-container">
        <div class="row" >
          <div class="col-md-12">
            <div class="heading-live-auctions mg-bt-21">
              <h2 class="tf-title pad-l-7">Today Picks</h2>
              <!--<router-link :to="todayPicks.btnLink" class="exp style2">{{ todayPicks.btnText }}</router-link>-->
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6" v-for="item in todayPicks" :key="item['id']">
            <div v-if="item" class="sc-card-product" :class="`${item['coomingsoon'] ? 'comingsoon' : ''}`">
              <div class="card-media">
                <router-link :to="`/card/${item['id']}`" v-if="item['metadata']"> <img :src="item['metadata']['image']" :alt="item['metadata']['name']"></router-link>
<!--                <router-link to="/login" class="wishlist-button heart"><span class="number-like">100</span></router-link>-->
<!--                <div class="coming-soon">{{item.coomingsoon}}</div>-->
              </div>
              <div class="card-title">
                <h5 class="style2"><router-link :to="`/card/${item['id']}`">"{{item['metadata']['name']}}"</router-link></h5>
                <div class="tags">{{item['sold'] ? 'sold' : 'ETH'}}</div>
              </div>

              <div class="meta-info" v-if="item && item['seller']">
                <div class="author">
                  <div class="avatar">
                    <img :src="item['seller']['gravatar']" alt="image">
                  </div>
                  <div class="info">
                    <span>Owned By</span>
                    <h6>
                      <router-link :to="`/author/${item['seller']['username']}`">
                        {{String(item['seller']['username']).slice(0, 8)}}
                      </router-link>
                    </h6>
                  </div>
                </div>
                <div class="price">
                  <span>Current Bid</span>
                  <h5> {{item['price']}}</h5>
                </div>
              </div>
              <div class="card-bottom" :class="`${item['coomingsoon'] ? 'none' : ''}`" v-if="!item['sold']">
                  <button class="sc-button style bag fl-button pri-3 no-bg" v-on:click="toggleActive(item['id'])"><span>Buy</span></button>
<!--                  <router-link to="/activity-01" class="view-history reload">History</router-link>-->
                </div>
            </div>
          </div>
          <div class="col-md-12 wrap-inner load-more text-center" v-if="todayPicks.length > 10">
            <router-link to="#" id="load-more" class="sc-button loadmore fl-button pri-3" ><span>Load More</span></router-link>
          </div>
        </div>
      </div>
      <modal :item="item" :isActive="isActive"/>
    </section>
</template>