<script lang="ts" setup>

import {ref, toRefs} from "vue";
import {useCollectionStore} from "@/stores/contracts/collection";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";

const props = defineProps(["item"]);

const { item } = toRefs(props);

const nftFile: any = ref(null);

const loading = ref(false);

const error = ref("");
async function handleFileUpload () {
  if (item) {
    for (const _file of nftFile.value.files) {
      item.value.file = _file;
      await useMarketPlaceStore().mintCollectible(Object.assign(item.value, {}));
    }

    loading.value = false;
  }
}

function mint() {
  error.value = "";
  if (item && item.value) {
    if (!item.value.collectionId) {
      error.value = "collection is required";
      return;
    }
    if (!item.value.name) {
      error.value = "name is required";
      return;
    }

    loading.value = true;
    nftFile.value.click();
  }
}


</script>
<template>
  <div class="mint-form" v-if="item">
    <h3>Mint your NFT</h3>
    <div class="lds-dual-ring" v-if="loading"></div>
    <div>
      <div class="row-form style-2">
        <select class="form-select" aria-label="Select Collection" v-model="item.collectionId">
          <option value="0">Select Collection</option>
          <option v-for="collection in item.collections" :value="collection.id">{{ collection.label }}</option>
        </select>
      </div>

      <template v-if="item.count" v-for="count in item.count">
        <hr/>
        <input :id="`tags-${count}`" name="`tags-${count}`" tabIndex="2"  aria-required="true" type="text" v-model="item.tags[count]"
               :placeholder="`NFT Tags ${count > 1 ? count : ''}`" />
        <input :id="`name-${count}`" :name="`name-${count}`" tabIndex="2"  aria-required="true" type="text" v-model="item.name[count]"
               :placeholder="`NFT Name ${count > 1 ? count : ''}`" />
        <textarea :id="`description-${count}`" :name="`description-${count}`" tabIndex="2"  aria-required="true" type="text"
                  :placeholder="`NFT Description ${count > 1 ? count : ''}`" v-model="item.description[count]"/>
        <input :id="`price-${count}`" :name="`price-${count}`" tabIndex="2"  aria-required="true" type="number"
               :placeholder="`NFT Price ${count > 1 ? count : ''}`" v-model="item.price[count]"/>

      </template>

      <input id="count" name="count" tabIndex="2"  aria-required="true" type="number"
             placeholder="NFT Count" v-model="item.count"/>
      <input id="file" name="file" tabIndex="2"  aria-required="true" type="file" multiple
             placeholder="NFT Image" ref="nftFile" v-on:change="handleFileUpload()" hidden />
      <input type="checkbox" name="auction" tabIndex="2"  aria-required="true"
             placeholder="Auction" ref="auction" v-model="item.auction" />
      <br/>
      <p v-if="error" class="alert alert-danger" v-html="error"></p>
      <button type="button"
              class="min-form-btn"
              @click.prevent="mint">
        Mint
      </button>
    </div>
  </div>
</template>

