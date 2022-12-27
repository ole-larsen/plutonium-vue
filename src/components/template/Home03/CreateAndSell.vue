<script lang="ts" setup>

import {useCreateAndSellStore} from "@/stores/createAndSell";
import {computed, onBeforeMount} from "vue";

const store = useCreateAndSellStore();
const items = computed(() => store.items);
onBeforeMount(async() => {
  try {
    await store.load();
  } catch (e) {
    throw e;
  }
});
</script>
<template>
  <section class="tf-box-icon create style1 tf-section">
    <div class="themesflat-container"  v-if="items && items.length > 0">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-live-auctions mg-bt-22">
            <h2 class="tf-title pb-17">Create and Sell</h2>
          </div>
        </div>
        <div class="box-create row col-lg-12">
          <div class='col-lg-3 col-md-6 col-12' v-for="item in items" :key="item['id']" >
            <div class="sc-box-icon" v-if="item && item['attributes']">
              <div class="image center" v-if="item['attributes']['image']">
                <div class="icon-create" v-if="item['attributes']['image']['data']">
                  <img :src="item['attributes']['image']['data']['attributes']['url']" alt="image">
                </div>
              </div>
              <h3 class="heading">
                <router-link :to="item['attributes']['link']">{{item['attributes']['title']}}</router-link>
              </h3>
              <div class="content" v-html="item['attributes']['description']"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>