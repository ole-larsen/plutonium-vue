<script lang="ts" setup>

import {ref, toRefs} from "vue";
import {useNFTStore} from "@/stores/contracts/nft";

const props = defineProps(["item"]);

const { item } = toRefs(props);

const nftFile: any = ref(null);

const loading = ref(false);

async function handleFileUpload () {
  if (item) {
    item.value.file = nftFile.value.files[0];
    console.log(item.value);
    // console.log(item.value);
    // console.log(nftFile.value.files[0]);
    // const provider = `nft:${user.value.uuid}`
    // store.handleFileUpload(nftFile.value.files[0], user.value, provider);
    await useNFTStore().mint(item.value);
    loading.value = false;
  }
}

function mint() {
  loading.value = true;
  nftFile.value.click();
}

</script>
<template>
  <div class="mint-form" v-if="item">
    <h3>Mint your NFT</h3>
    <div class="lds-dual-ring" v-if="loading"></div>
    <div v-show="!loading">
      <input id="category" name="category" tabIndex="2"  aria-required="true" type="text" v-model="item.category"
             placeholder="NFT Category" />
      <input id="tags" name="tags" tabIndex="2"  aria-required="true" type="text" v-model="item.tags"
             placeholder="NFT Tags" />
      <input id="name" name="name" tabIndex="2"  aria-required="true" type="text" v-model="item.name"
             placeholder="NFT Name" />
      <textarea id="description" name="description" tabIndex="2"  aria-required="true" type="text"
                placeholder="NFT Description" v-model="item.description"/>
      <input id="price" name="price" tabIndex="2"  aria-required="true" type="number"
             placeholder="NFT Price" v-model="item.price"/>
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

