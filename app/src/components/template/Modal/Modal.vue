<script lang="ts" setup>

import {toRefs} from "vue";
import type {MarketItem} from "@/stores/contracts/marketPlace";

import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import {useLoaderStore} from "@/stores/loader";

const props = defineProps(["item", "isActive", "isSellEvent"]);
const emit = defineEmits(["close", "buy", "sell"])
const { item, isActive, isSellEvent } = toRefs(props);
const market = useMarketPlaceStore();

function toggleActive(_item: MarketItem) {
  emit("close", _item);
}
async function buy(_item: MarketItem) {
  try {
    await market.buy(Object.assign({}, _item));
    toggleActive(_item);
    location.reload();
  } catch (e) {
    console.error(e);
  }
}
async function sell(_item: MarketItem) {
  try {
    await market.sell(Object.assign({}, _item));
    toggleActive(_item);
  } catch (e) {
    console.error(e);
  }
}

</script>
<template>
  <div v-if="item" class="modal fade popup" id="popup_bid" tabIndex="-1" role="dialog" aria-hidden="true"  :class="{ show: isActive[item.id] }">
    <div class="overlay" v-on:click="toggleActive(item)"></div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" v-on:click="toggleActive(item)"></button>
        <div class="modal-body space-y-20 pd-40" :class="{ show: isActive[item.id] }">
          <template v-if="!isSellEvent">
            <h3>Buy {{ item?.metadata?.name }}</h3>
            <p class="text-center">You must bid at least <span class="price color-popup">{{ item.total }} ETH</span>
            </p>
            <input type="text" class="form-control"
                   :placeholder="item.total + ' ETH'" v-model="item.total"/>
            <!--                    <p>Enter quantity. <span class="color-popup">5 available</span>-->
            <!--                    </p>-->
            <!--                    <input type="number" class="form-control" placeholder="1" />-->
            <div class="hr"></div>
            <div class="d-flex justify-content-between">
              <p>Price:</p>
              <p class="text-right price color-popup"> {{ item.price }} ETH </p>
            </div>

            <div class="d-flex justify-content-between">
              <p> Service free:</p>
              <p class="text-right price color-popup"> {{ item.fee }} ETH </p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="text-right price color-popup"> {{ item.feePercent }} % </p>
            </div>
            <div class="d-flex justify-content-between">
              <p> Total amount:</p>
              <p class="text-right price color-popup"> {{ item.total }} ETH </p>
            </div>
            <button class="sc-button style-place-bid style bag fl-button pri-3" v-on:click="buy(item)"><span>Buy</span></button>
          </template>
          <template v-else>
            <h3>Sell {{ item?.metadata?.name }}</h3>
            <p class="text-center">You must bid at least <span class="price color-popup">{{ item.price }} ETH</span>
            </p>
            <input type="text" class="form-control"
                   :placeholder="item.price + ' ETH'" v-model="item.price"/>
            <div class="hr"></div>

            <button class="sc-button style-place-bid style bag fl-button pri-3" v-on:click="sell(item)"><span>Sell</span></button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>