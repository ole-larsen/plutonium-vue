<script lang="ts" setup>

import { useRoute } from "vue-router";
import { BigNumber, ethers } from "ethers";
import type {
  PublicCategoryDto,
  CollectionDTO,
  MarketplaceCollectionDto as PublicCollectionDto,
  PublicUserDto,
  CollectibleDTO,
  PublicFileDto
} from "@/types";

import type { ComputedRef, Ref } from "vue";

import { computed, onMounted, ref, watch } from "vue";

import { useProfileStore } from "@/stores/template/profile";

import { useAuthStore } from "@/stores/auth/store";
import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";

import Filter from "../Profile/FilterComponent.vue";

import CollectionModal from "@/components/Profile/CollectionModalComponent.vue";
import ERC721Modal from "@/components/Profile/ERC721ModalComponent.vue";

import Personal from "@/components/Profile/PersonalComponent.vue";
import Wallpaper from "@/components/Profile/WallpaperComponent.vue";
import { useMetaMaskStore } from "@/stores/web3/metamask";
import { useWeb3Store } from "@/stores/web3/web3";

const store = useProfileStore();
const market = useMarketPlaceStore();
const metamask = useMetaMaskStore();
const web3 = useWeb3Store();

const user: ComputedRef<PublicUserDto> = computed(() => useAuthStore().getUser());
const balance: Ref<BigNumber> = ref(BigNumber.from("0"));
onMounted(async() => {
  balance.value = await metamask.getBalance();
});

const categories: ComputedRef<PublicCategoryDto[]> = computed(() =>
  market.getCategories()
);

// const collections: ComputedRef<MarketplaceCollectionDto[]> = computed(() =>
//   market.getCollections()
// );
const collections: PublicCollectionDto[] = [];
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
    owner: user?.value?.attributes.address,
    categoryId: 0,
    itemsInCollection: 100000,
    // categories: categories.value.map((_category: PublicCategoryDto) => {
    //   return {
    //     id: _category.id,
    //     label: _category.attributes.title,
    //   };
    // }),
  };
}

function createCollection() {
  reloadCollection();
  store.handleCollectionModal();
}

function reloadCollection() {
  collection.value = newCollection();
}

function editCollection(publicCollection: PublicCollectionDto) {
  collection.value = {
    id: publicCollection.id,
    name: publicCollection.attributes.name,
    symbol: publicCollection.attributes.symbol,
    description: publicCollection.attributes.description,
    price: publicCollection.attributes.price,
    slug: publicCollection.attributes.slug,
    url: publicCollection.attributes.url,
    fee: ethers.utils.formatEther(publicCollection.attributes.fee),
    owner: publicCollection.attributes?.owner?.attributes.address as string,
    categoryId: publicCollection.attributes.categoryId,
    categories: categories.value.map((publicCategory: PublicCategoryDto) => {
      return {
        id: publicCategory.id,
        label: publicCategory.attributes.title,
      };
    }),
  };
  if (publicCollection.attributes.logo) {
    collection.value.logo = publicCollection.attributes.logo;
  }
  if (publicCollection.attributes.featured) {
    collection.value.featured = publicCollection.attributes.featured;
  }
  if (publicCollection.attributes.banner) {
    collection.value.banner = publicCollection.attributes.banner;
  }
  store.handleCollectionModal();
}

watch(
  () => categories.value,
  (publicCategories: PublicCategoryDto[]) => {
    collection.value.categories = publicCategories.map(
      (publicCategory: PublicCategoryDto) => {
        return {
          id: publicCategory.id,
          label: publicCategory.attributes.title,
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
  owner: user?.value?.attributes.address,
  creator: user?.value?.attributes.address,
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
    >
      <div class="flat-tabs tab-authors">
        <wallpaper/>
        <div class="themesflat-container">
          <div class="row">
            <personal :user="user"/>
          </div>
          <br />
          <br />
          <hr />
          <h5>Balance: {{ (+ethers.utils.formatEther(balance)).toFixed(4) }} ETH</h5>
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
