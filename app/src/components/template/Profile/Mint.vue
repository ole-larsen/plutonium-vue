<script lang="ts" setup>

import {ref, toRefs} from "vue";
import {useCollectionStore} from "@/stores/contracts/collection";

const props = defineProps(["item"]);

const { item } = toRefs(props);

const nftFile: any = ref(null);

const loading = ref(false);

async function handleFileUpload () {
  if (item) {
    item.value.file = nftFile.value.files[0];
    await useCollectionStore().mint(item.value);
    loading.value = false;
  }
}

function mint() {
  loading.value = true;
  nftFile.value.click();
}


</script>
<template>
  <div class="mint-form" v-if="item && item.collections && item.collections.length > 0">
    <h3>Mint your NFT</h3>
    <div class="lds-dual-ring" v-if="loading"></div>
    <div>
      <div class="row-form style-2">
        <select class="form-select" aria-label="Select Collection" v-model="item.collectionId">
          <option value="0">Select Collection</option>
          <option v-for="collection in item.collections" :value="collection.id">{{ collection.label }}</option>
        </select>
      </div>
      <input id="tags" name="tags" tabIndex="2"  aria-required="true" type="text" v-model="item.tags"
             placeholder="NFT Tags" />
      <input id="name" name="name" tabIndex="2"  aria-required="true" type="text" v-model="item.name"
             placeholder="NFT Name" />
      <textarea id="description" name="description" tabIndex="2"  aria-required="true" type="text"
                placeholder="NFT Description" v-model="item.description"/>
      <input id="price" name="price" tabIndex="2"  aria-required="true" type="number"
             placeholder="NFT Price" v-model="item.price"/>
      <input id="count" name="count" tabIndex="2"  aria-required="true" type="number"
             placeholder="NFT Count" v-model="item.count"/>
      <input id="file" name="file" tabIndex="2"  aria-required="true" type="file"
             placeholder="NFT Image" ref="nftFile" v-on:change="handleFileUpload()" hidden />
      <button type="button"
              class="min-form-btn"
              @click.prevent="mint">
        Mint
      </button>
    </div>
  </div>
</template>

