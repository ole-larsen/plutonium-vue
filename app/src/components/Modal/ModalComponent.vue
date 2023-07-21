<script lang="ts" setup>
import { ethers } from "ethers";
import { watch, ref } from "vue";
import { error } from "@/helpers";

import { toRefs } from "vue";

import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";

const emit = defineEmits(["close"]);
const props = defineProps(["collectible", "isActive"]);

const { collectible, isActive } = toRefs(props);

const market = useMarketPlaceStore();

const price = ref(collectible?.value?.attributes?.details["price"]);

function close() {
  emit("close");
}

async function placeBid() {
  try {
    await market.placeBid(Object.assign({}, collectible?.value));
    close();
    //location.reload();
  } catch (e) {
    error(e);
  }
}

watch(
  () => price.value,
  (_price: string) => {
    if (
      collectible?.value &&
      _price &&
      isFinite(Number(_price)) &&
      !isNaN(Number(_price))
    ) {
      collectible.value.attributes.details.price = _price;
      const fee = +collectible.value.attributes.details.fee;

      const total = +_price + +((fee * +_price) / 100);
      collectible.value.attributes.details.total = total.toString();
      collectible.value.attributes.details.price_wei = ethers.utils.parseEther(
        collectible.value.attributes.details.price
      );
      collectible.value.attributes.details.total_wei = ethers.utils.parseEther(
        collectible.value.attributes.details.total
      );
    }
  }
);

// function toggleActive(_collectible: PublicCategoryCollectionCollectible) {
//   emit("close", _collectible);
// }
//
// async function buy(_collectible: PublicCategoryCollectionCollectible) {
//   try {
//     //await market.buy(Object.assign({}, _item));
//     toggleActive(_collectible);
//     //location.reload();
//   } catch (e) {
//     error(e);
//   }
// }
//
// async function sell(_collectible: PublicCategoryCollectionCollectible) {
//   try {
//     //await market.sell(Object.assign({}, _item));
//     toggleActive(_collectible);
//   } catch (e) {
//     error(e);
//   }
// }
</script>
<template>
  <div
    v-if="collectible && collectible['attributes']"
    class="modal fade popup"
    id="popup_bid"
    tabIndex="-1"
    role="dialog"
    aria-hidden="true"
    :class="{ show: isActive }"
  >
    <div class="overlay" v-on:click="close"></div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button
          type="button"
          class="btn-close"
          data-dismiss="modal"
          aria-label="Close"
          v-on:click="close"
        ></button>
        <div class="modal-body space-y-20 pd-40" :class="{ show: isActive }">
          <h3>Place BID {{ collectible["attributes"]["metadata"].name }}</h3>
          <p class="text-center">
            You must bid at least
            <span class="price color-popup">
              {{ collectible["attributes"]["details"]["total"] }} ETH</span
            >
          </p>
          <input
            type="text"
            class="form-control"
            :placeholder="
              collectible['attributes']['details']['total'] + ' ETH'
            "
            v-model="price"
          />
          <!--                    <p>Enter quantity. <span class="color-popup">5 available</span>-->
          <!--                    </p>-->
          <!--                    <input type="number" class="form-control" placeholder="1" />-->
          <div class="hr"></div>
          <div class="d-flex justify-content-between">
            <p>Total bid amount:</p>
            <p class="text-right price color-popup">
              {{ collectible["attributes"]["details"]["price"] }} ETH
            </p>
          </div>

          <div class="d-flex justify-content-between">
            <p>Service free:</p>
            <p class="text-right price color-popup">
              {{ collectible["attributes"]["details"]["fee"] }} %
            </p>
          </div>
          <div class="d-flex justify-content-between">
            <p>You must bid at least:</p>
            <p class="text-right price color-popup">
              {{ (+collectible["attributes"]["details"]["total"]).toFixed(4) }}
              ETH
            </p>
          </div>
          <button
            class="sc-button style-place-bid style bag fl-button pri-3"
            @click.prevent="placeBid"
          >
            <span>Place a bid</span>
          </button>

          <!--          <template v-else>-->
          <!--            <h3>Sell {{ collectible['attributes']['details']['name'] }}</h3>-->
          <!--            <p class="text-center">You must bid at least <span class="price color-popup">{{-->
          <!--                collectible['attributes']['details']['price']-->
          <!--              }} ETH</span>-->
          <!--            </p>-->
          <!--            <input type="text" class="form-control"-->
          <!--                   :placeholder="collectible['attributes']['details']['price'] + ' ETH'" v-model="collectible['attributes']['details']['price']"/>-->
          <!--            <div class="hr"></div>-->

          <!--            <button class="sc-button style-place-bid style bag fl-button pri-3" v-on:click="sell(collectible)"><span>Sell</span></button>-->
          <!--          </template>-->
        </div>
      </div>
    </div>
  </div>
</template>
