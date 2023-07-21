<script lang="ts" setup>
import { ethers } from "ethers";
import moment from "moment";
import Datepicker from "vue3-datepicker";
import { ref, toRefs, watch } from "vue";
import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";
import type { PublicCategoryCollection } from "@/types";

const props = defineProps(["collectible", "collections"]);

const { collectible, collections } = toRefs(props);

const market = useMarketPlaceStore();

const nftFile: any = ref(null);

const loading = ref(false);

const error = ref("");

async function handleFileUpload() {
  if (collectible?.value) {
    for (const _file of nftFile.value.files) {
      collectible.value.file = _file;
      if (!collectible.value.price) {
        collectible.value.price = ethers.utils.parseEther("0").toString();
      }
      if (!collectible.value.startPrice) {
        collectible.value.startPrice = ethers.utils.parseEther("0").toString();
      }
      if (!collectible.value.reservePrice) {
        collectible.value.reservePrice = ethers.utils
          .parseEther("0")
          .toString();
      }
      if (!collectible.value.quantity) {
        collectible.value.quantity = 0;
      }

      await market.mintERC721(Object.assign(collectible.value, {}));
    }

    loading.value = false;
  }
}

function mint() {
  error.value = "";
  if (collectible?.value && collectible.value) {
    if (!collectible.value.collectionId) {
      error.value = "collection is required";
      return;
    }
    if (!collectible.value.name) {
      error.value = "name is required";
      return;
    }

    loading.value = true;
    nftFile.value.click();
  }
}
if (collectible?.value) {
  watch(
    () => collectible.value.collectionId,
    (collectionId: number) => {
      const collection = collections?.value.find(
        (_collection: PublicCategoryCollection) =>
          _collection.id === collectionId
      );
      if (collection) {
        collectible.value.name = `${collection.attributes.name} #${
          collection.attributes.collectibles.length + 1
        }`;
      }
    }
  );
}

const now = new Date();
const startTime = ref(now);

watch(
  () => startTime.value,
  (_startTime: Date) => {
    const momentTime = moment(_startTime).unix();
    if (collectible?.value) {
      collectible.value.startTime = momentTime;
    }
  }
);

// by default auction is period is one year
const endTime = ref(new Date(now.setMonth(now.getMonth() + 12)));
watch(
  () => endTime.value,
  (_endTime: Date) => {
    const momentTime = moment(_endTime).unix();
    if (collectible?.value) {
      collectible.value.endTime = momentTime;
    }
  }
);

const price = ref(0);
watch(
  () => price.value,
  (_price: number) => {
    if (collectible?.value) {
      if (_price) {
        collectible.value.price = ethers.utils
          .parseEther(_price.toString())
          .toString();
      }
    }
  }
);

const startPrice = ref(0);
watch(
  () => startPrice.value,
  (_startPrice: number) => {
    if (collectible?.value) {
      if (_startPrice) {
        collectible.value.startPrice = ethers.utils
          .parseEther(_startPrice.toString())
          .toString();
      }
    }
  }
);

const reservePrice = ref(0);
watch(
  () => reservePrice.value,
  (_reservePrice: number) => {
    if (collectible?.value) {
      if (_reservePrice) {
        collectible.value.reservePrice = ethers.utils
          .parseEther(_reservePrice.toString())
          .toString();
      }
    }
  }
);
</script>
<template>
  <div class="mint-form" v-if="collectible">
    <h3>Mint your NFT</h3>
    <div class="lds-dual-ring" v-if="loading"></div>
    <div>
      <div class="row-form style-2">
        <label class="form-label" for="collection-selector">Choose Collection</label>
        <select
          id="collection-selector"
          class="form-select"
          aria-label="Select Collection"
          v-model="collectible.collectionId"
        >
          <option value="0">Select Collection</option>
          <option
            v-for="collection in collections"
            :value="collection.id"
            v-bind:key="collection.id"
          >
            {{ collection.attributes.name }}
          </option>
        </select>
      </div>

      <hr />
      <div class="row-form style-2">
        <label class="form-label" for="tags">Tags</label>
        <input
          id="tags"
          name="tags"
          tabIndex="2"
          aria-required="true"
          type="text"
          v-model="collectible.tags"
          placeholder="NFT Tags"
        />
      </div>
      <div class="row-form style-2">
        <label class="form-label" for="name">Name</label>
        <input
          id="name"
          autocomplete="false"
          name="name"
          tabIndex="2"
          aria-required="true"
          type="text"
          v-model="collectible.name"
          placeholder="NFT Name"
        />
      </div>
      <div class="row-form style-2">
        <label class="form-label" for="description">Description</label>
        <textarea
          id="description"
          name="description"
          tabIndex="2"
          aria-required="true"
          type="text"
          placeholder="NFT Description"
          v-model="collectible.description"
        />
      </div>
      <div class="row-form style-2">
        <label class="form-label" for="price">ERC721 Fix Price</label>
        <input
          id="price"
          name="price"
          tabIndex="2"
          aria-required="true"
          type="number"
          placeholder="NFT Price"
          v-model="price"
        />
      </div>
      <div class="row-form style-2">
        <label class="form-label" for="price">Quantity</label>
        <input
          id="quantity"
          name="quantity"
          tabIndex="2"
          aria-required="true"
          type="number"
          placeholder="NFT quantity"
          v-model="collectible.quantity"
        />
      </div>
      <input
        id="file"
        name="file"
        tabIndex="2"
        aria-required="true"
        type="file"
        multiple
        placeholder="NFT Image"
        ref="nftFile"
        v-on:change="handleFileUpload()"
        hidden
      />
      <label class="form-label" for="auction">Auction</label>
      <br />
      <input
        id="auction"
        type="checkbox"
        name="auction"
        tabIndex="2"
        aria-required="true"
        placeholder="Auction"
        ref="auction"
        v-model="collectible.auction"
      />

      <div v-if="collectible.auction">
        <div class="row-form style-2">
          <label class="form-label" for="start_price">Start Price</label>
          <input
            id="start_price"
            name="start_price"
            tabIndex="2"
            aria-required="true"
            type="number"
            placeholder="Start Price"
            v-model="startPrice"
          />
        </div>
        <div class="row-form style-2">
          <label class="form-label" for="reserve_price">Reserve Price</label>
          <input
            id="reserve_price"
            name="reserve_price"
            tabIndex="2"
            aria-required="true"
            type="number"
            placeholder="reserve Price"
            v-model="reservePrice"
          />
        </div>
        <div class="row-form style-2">
          <label class="form-label">Auction Start</label>
          <datepicker
            v-model="startTime"
            minimumView="time"
            inputFormat="yyyy-MM-dd HH:mm"
          />
        </div>
        <div class="row-form style-2">
          <label class="form-label">Auction End</label>
          <datepicker
            v-model="endTime"
            minimumView="time"
            inputFormat="yyyy-MM-dd HH:mm"
          />
        </div>
      </div>
      <br />
      <p v-if="error" class="alert alert-danger" v-html="error"></p>
      <button type="button" class="min-form-btn" @click.prevent="mint">
        Mint
      </button>
    </div>
  </div>
</template>
