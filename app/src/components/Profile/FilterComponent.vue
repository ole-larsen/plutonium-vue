<script lang="ts" setup>
import type { PublicCategoryCollection } from "@/types";
import type { Ref } from "vue";
import { toRefs, ref } from "vue";

import CollectionItem from "@/components/Profile/CollectionItemComponent.vue";

const emit = defineEmits(["createCollection", "editCollection", "mintERC721"]);
const props = defineProps(["categories", "collections", "uuid"]);
const { categories, collections, uuid } = toRefs(props);

const selectedCategory: Ref<string> = ref("All");

function createCollection() {
  emit("createCollection");
}

function editCollection(collection: PublicCategoryCollection) {
  emit("editCollection", collection);
}
</script>
<template>
  <div class="filter-wrapper">
    <ul class="filter">
      <li
        v-on:click="selectedCategory = 'All'"
        :class="{ active: selectedCategory === 'All' }"
      >
        All
      </li>
      <li
        v-for="category in categories"
        :key="category.id"
        :class="{
          active: selectedCategory === category['attributes']['title'],
        }"
        v-on:click="selectedCategory = category['attributes']['title']"
      >
        {{ category["attributes"]["title"] }}
      </li>
      <li>
        <button
          type="button"
          class="mint-form-btn"
          @click.prevent="createCollection"
        >
          Create Collection
        </button>
        <router-link
          :to="`/profile/${uuid}/create/erc721`"
          class="mint-form-btn"
        >
          Mint ERC721
        </router-link>
      </li>
    </ul>

    <div class="row">
      <template
        v-for="collection in collections"
        :key="'collection-' + collection.id"
      >
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
          <collection-item
            :collection="collection"
            @editCollection="editCollection"
          />
        </div>
      </template>
    </div>
  </div>
</template>
