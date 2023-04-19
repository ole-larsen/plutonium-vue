<script lang="ts" setup>
import type { Ref } from "vue";
import { toRefs, ref } from "vue";
import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";
import Collectible from "@/components/Collection/Collectible.vue";
import Modal from "@/components/Modal/Modal.vue";
import {useLoaderStore} from "@/stores/loader/store";
import type {PublicCategoryCollectionCollectible} from "@/types";

const emit = defineEmits(["buy", "placeBid", "loadHistory"]);
const props = defineProps(["collectibles"]);
const { collectibles } = toRefs(props);

const market = useMarketPlaceStore();
const loader = useLoaderStore();
const selectedCategory: Ref<string> = ref("All");

const isActive = ref(false);
const collectibleItem: Ref<PublicCategoryCollectionCollectible | {}> = ref({});

function buy(collectible: PublicCategoryCollectionCollectible) {
  isActive.value = !isActive.value;
  collectibleItem.value = collectible;
}

function placeBid(collectible: PublicCategoryCollectionCollectible) {
  isActive.value = !isActive.value;
  collectibleItem.value = collectible;
}

function loadHistory(collectible: PublicCategoryCollectionCollectible) {
  isActive.value = !isActive.value;
  collectibleItem.value = collectible;
}

function close() {
  isActive.value = !isActive.value;
}
</script>
<template>
  <div class="filter-wrapper">
    <ul class="filter">
      <li  v-on:click="selectedCategory ='All'" :class="{active:selectedCategory === 'All'}" > Items</li>
      <li></li>
    </ul>
    <div class="row">
      <div  class="col-xl-4 col-lg-3 col-md-6 col-sm-6"
            v-for="collectible in collectibles"
            :key="'collectible-' + collectible.id">
        <collectible
          :collectible="collectible"
          @buy="buy"
          @placeBid="placeBid"
          @loadHistory="loadHistory"/>
      </div>
    </div>
  </div>
  <modal
    @close="close"
    :isActive="isActive"
    :collectible="collectibleItem"/>
</template>

