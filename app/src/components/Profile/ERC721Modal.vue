<script lang="ts" setup>

import {computed, toRefs} from "vue";

import { useProfileStore } from "@/stores/template/profile";

import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";
import Mint from "@/components/Profile/Mint.vue";

const store = useProfileStore();
const market = useMarketPlaceStore();

const props = defineProps(["user", "collections", "collectible"]);
const { user, collections, collectible } = toRefs(props);

const isActiveERC721Modal = computed(() => store.isActiveERC721Modal);

function handleCloseERC721Modal() {
  store.handleERC721Modal();
}

</script>

<template>
  <div class="modal" id="popup_collection" tabIndex="-1" role="dialog" aria-hidden="true"
       :class="{ show: isActiveERC721Modal }" ref="collectibleModal">
    <div class="overlay" v-on:click="handleCloseERC721Modal"></div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="handleCloseERC721Modal" >
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-body space-y-20 pd-40 collection-form" :class="{ show: isActiveERC721Modal }">
          <mint :collectible="collectible" :collections="collections"/>
        </div>
      </div>
    </div>
  </div>
</template>