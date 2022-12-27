<script lang="ts" setup>

import {toRefs} from "vue";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";

const props = defineProps(["item", "isActive"]);
const emit = defineEmits(["close"])
const { item, isActive } = toRefs(props);
function toggleActive(id: number) {
  if (isActive) {
    isActive.value[id] = !isActive?.value[id];
    emit("close", isActive.value[id]);
  }
}
async function buy(item: any) {
  try {
    await useMarketPlaceStore().buy(item.id, item.total);
    // @ts-ignore
    isActive.value[item.id] = false;
  } catch (e) {
    console.error(e);
  }
}

</script>
<template>
  <div v-if="item" class="modal fade popup" id="popup_bid" tabIndex="-1" role="dialog" aria-hidden="true"  :class="{ show: isActive[item.id] }">
    <div class="overlay" v-on:click="toggleActive(item.id)"></div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" v-on:click="toggleActive(item.id)">
        </button>
        <div class="modal-body space-y-20 pd-40" :class="{ show: isActive[item.id] }">
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
            <p class="text-right price color-popup"> {{ item.feePercent }} % </p>
            <p class="text-right price color-popup"> {{ item.fee }} ETH </p>
          </div>
          <div class="d-flex justify-content-between">
            <p> Total amount:</p>
            <p class="text-right price color-popup"> {{ item.total }} ETH </p>
          </div>
          <button class="sc-button style-place-bid style bag fl-button pri-3" v-on:click="buy(item)"><span>Buy</span></button>
        </div>
      </div>
    </div>
  </div>
</template>