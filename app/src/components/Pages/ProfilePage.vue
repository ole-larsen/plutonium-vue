<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ethers } from "ethers";
import type {
  PublicCategory,
  CollectionDTO,
  PublicCategoryCollection,
  PublicUser,
  CollectibleDTO,
} from "@/types";

import type { ComputedRef, Ref } from "vue";

import { computed, ref, watch } from "vue";

import { useProfileStore } from "@/stores/template/profile";

import { useAuthStore } from "@/stores/auth/store";
import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";

import Filter from "../Profile/FilterComponent.vue";

import CollectionModal from "@/components/Profile/CollectionModalComponent.vue";
import ERC721Modal from "@/components/Profile/ERC721ModalComponent.vue";

import Personal from "@/components/Profile/PersonalComponent.vue";
import Wallpaper from "@/components/Profile/WallpaperComponent.vue";
import { useMetaMaskStore } from "@/stores/web3/metamask";

const store = useProfileStore();
const market = useMarketPlaceStore();
const metamask = useMetaMaskStore();

const user: ComputedRef<PublicUser> = computed(() => useAuthStore().getUser());
const balance = computed(() =>
  (+ethers.utils.formatEther(metamask.getBalance())).toFixed(4)
);

const categories: ComputedRef<PublicCategory[]> = computed(() =>
  market.getCategories()
);
const collections: ComputedRef<PublicCategoryCollection[]> = computed(() =>
  market.getCollections()
);

const collection: Ref<CollectionDTO> = ref(newCollection());

function newCollection(): CollectionDTO {
  return {
    id: 0,
    name: "",
    symbol: "",
    description: "",
    price: "",
    slug: "",
    url: "",
    fee: "0",
    owner: user?.value?.address,
    categoryId: 0,
    itemsInCollection: 100000,
    categories: categories.value.map((_category: PublicCategory) => {
      return {
        id: _category.id,
        label: _category.attributes.title,
      };
    }),
    logo: 0,
    featured: 0,
    banner: 0,
  };
}

function createCollection() {
  reloadCollection();
  store.handleCollectionModal();
}

function reloadCollection() {
  collection.value = newCollection();
}

function editCollection(_collection: PublicCategoryCollection) {
  collection.value = {
    id: _collection.id,
    name: _collection.attributes.name,
    symbol: _collection.attributes.symbol,
    description: _collection.attributes.description,
    price: _collection.attributes.price,
    slug: _collection.attributes.slug,
    url: _collection.attributes.url,
    fee: ethers.utils.formatEther(_collection.attributes.fee),
    owner: _collection.attributes.owner.address,
    categoryId: _collection.attributes.categoryId,
    categories: categories.value.map((_category: PublicCategory) => {
      return {
        id: _category.id,
        label: _category.attributes.title,
      };
    }),
    logo: _collection.attributes.logo,
    featured: _collection.attributes.featured,
    banner: _collection.attributes.banner,
  };
  store.handleCollectionModal();
}

watch(
  () => categories.value,
  (_categories: PublicCategory[]) => {
    collection.value.categories = _categories.map(
      (_category: PublicCategory) => {
        return {
          id: _category.id,
          label: _category.attributes.title,
        };
      }
    );
  }
);

const collectible: Ref<CollectibleDTO> = ref({
  name: "",
  description: "",
  price: 0,
  file: undefined,
  collectionId: 0,
  tags: "",
  owner: user?.value?.address,
  creator: user?.value?.address,
  auction: false,
  quantity: 1,
});

function handleMintERC721() {
  store.handleERC721Modal();
}

const route = useRoute();
const uuid = route.params.uuid; // read parameter id (it is reactive)
</script>

<template>
  <div class="tf-profile">
    <section
      class="tf-section tf-activity s1 authors profile"
      v-if="collection"
    >
      <div class="flat-tabs tab-authors">
        <wallpaper :user="user" />
        <div class="themesflat-container">
          <div class="row"><personal :user="user" /></div>
          <br />
          <br />
          <hr />
          <h5>Balance: {{ balance }} ETH</h5>
          <div class="infor-collection"></div>
        </div>
      </div>
      <div class="themesflat-container">
        <div class="infor-collection"></div>

        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <Filter
              :collections="collections"
              :categories="categories"
              @createCollection="createCollection"
              @editCollection="editCollection"
              @mintERC721="handleMintERC721"
              :uuid="uuid"
            />
          </div>
        </div>
      </div>
      <collection-modal
        :user="user"
        :collection="collection"
        @reloadCollection="reloadCollection"
      />
      <ERC721Modal
        :user="user"
        :collections="collections"
        :collectible="collectible"
      />
    </section>
  </div>
</template>
