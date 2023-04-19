<script lang="ts" setup>
import type { PublicCategory, CollectionDTO, PublicFile } from "@/types";
import type { ComputedRef, Ref } from "vue";
import { error, slugify } from "@/helpers";
import {computed, ref, toRefs, watch} from "vue";

import { useProfileStore } from "@/stores/template/profile";

import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";

const store = useProfileStore();
const market = useMarketPlaceStore();

const emit = defineEmits([
  "reloadCollection"
]);

const props = defineProps(["user", "collection"]);
const { user, collection } = toRefs(props);

const isActiveCollectionModal = computed(() => store.isActiveCollectionModal);

const errors = ref("");

const categories: ComputedRef<{id: number; label: string}[]> = computed(() => {
  const _categories = market.getCategories() && market.getCategories().length > 0
    ? market.getCategories().map((category: PublicCategory) => {
      return {
        id: category.id,
        label: category.attributes.title
      }
    })
    : [];
  if (_categories.length > 0) {
    if (collection) {
      collection.value.categories = _categories;
    }
  }
  return _categories;
});

if (collection) {
  watch(() => collection?.value.name,
    (name: string) => {
      (collection.value as CollectionDTO).slug = slugify(name);
      (collection.value as CollectionDTO).url = "/" + "collection" + "/" + (collection.value as CollectionDTO).slug;
    });
}

const loading = ref(false);

function handleCloseCollectionModal() {
  store.handleCollectionModal();
}

async function mintCollection() {
  try {
    errors.value = "";
    if (collection && collection.value) {

      if (!collection.value.name) {
        errors.value = "name is required";
        return;
      }

      if (!collection.value.fee) {
        errors.value = "fee is required";
        return;
      }

      if (!collection.value.categoryId) {
        errors.value = "category is required";
      }

      loading.value = true;
    }
    if (collection) {
      await market.mintCollection(Object.assign(collection.value, {}));
      store.handleCollectionModal();
      emit("reloadCollection", true);
    }
  } catch(e) {
    error(e);
  } finally {
    loading.value = false;
  }
}

async function editCollection() {
  try {
    errors.value = "";
    if (collection && collection.value) {

      if (!collection.value.name) {
        errors.value = "name is required";
        return;
      }

      if (!collection.value.fee) {
        errors.value = "fee is required";
        return;
      }

      if (!collection.value.categoryId) {
        errors.value = "category is required";
      }

      loading.value = true;
    }
    if (collection) {
      await market.editCollection(Object.assign(collection.value, {}));
      store.handleCollectionModal();
      emit("reloadCollection", true);
    }
  } catch(e) {
    error(e);
  } finally {
    loading.value = false;
  }
}


const logo: any = ref(null);
const featured: any = ref(null);
const banner: any = ref(null);

async function handleLogoUpload () {
  loading.value = true;
  if (collection) {
    for (const _file of logo.value.files) {
      const provider = `collection:logo:${user?.value.uuid}`
      const _logo: PublicFile | unknown = await store.handleFileUpload(_file, user?.value, provider);

      (collection.value as CollectionDTO).logo = (_logo as PublicFile).id;
    }
  }

  loading.value = false;
}

async function handleFeaturedUpload () {
  loading.value = true;
  if (collection) {
    for (const _file of featured.value.files) {
      const provider = `collection:featured:${user?.value.uuid}`
      const _featured: PublicFile | unknown = await store.handleFileUpload(_file, user?.value, provider);
      (collection.value as CollectionDTO).featured = (_featured as PublicFile).id;
    }
  }

  loading.value = false;
}

async function handleBannerUpload () {
  loading.value = true;
  if (collection) {
    for (const _file of banner.value.files) {
      const provider = `collection:banner:${user?.value.uuid}`
      const _banner: PublicFile | unknown = await store.handleFileUpload(_file, user?.value, provider);
      (collection.value as CollectionDTO).banner = (_banner as PublicFile).id;
    }
  }

  loading.value = false;
}

</script>

<template>
  <div class="modal" id="popup_collection" tabIndex="-1" role="dialog" aria-hidden="true"
       :class="{ show: isActiveCollectionModal }" ref="collectionModal" v-if="collection">
    <div class="overlay" v-on:click="handleCloseCollectionModal"></div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="handleCloseCollectionModal" >
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-body space-y-20 pd-40 collection-form" :class="{ show: isActiveCollectionModal }">
          <h3>{{ collection.id ? 'Edit Collection' : 'Create Collection' }}</h3>
          <div class="lds-dual-ring" v-if="loading"></div>
          <div v-show="!loading">
            <div class="row-form style-2">
              <label class="form-label" for="logo_id">Logo Image</label>
              <div v-if="collection.logo.attributes" class="collection-thumb">
                <img :src="collection.logo.attributes.url">
              </div>
              <input id="logo_id" name="file" tabIndex="2"  aria-required="true" type="file"
                     ref="logo" v-on:change="handleLogoUpload()" />
            </div>
            <div class="row-form style-2">
              <label class="form-label" for="featured_id">Featured Image</label>
              <div v-if="collection.featured.attributes" class="collection-thumb">
                <img :src="collection.featured.attributes.url">
              </div>
              <input id="featured_id" name="file" tabIndex="2"  aria-required="true" type="file"
                     ref="featured" v-on:change="handleFeaturedUpload()" />
            </div>
            <div class="row-form style-2">
              <label class="form-label" for="banner_id">Banner Image</label>
              <div v-if="collection.banner.attributes" class="collection-thumb">
                <img :src="collection.banner.attributes.url">
              </div>
              <input id="banner_id" name="file" tabIndex="2"  aria-required="true" type="file"
                     ref="banner" v-on:change="handleBannerUpload()" />
            </div>
            <br/>
            <div class="row-form style-2">
              <select class="form-select" aria-label="Select Category" v-model="collection.categoryId">
                <option value="0">Select Category</option>
                <option v-for="_category in collection.categories" :value="_category.id">{{ _category.label }}</option>
              </select>
            </div>
            <input id="collection_name" name="collection_name" tabIndex="2"  aria-required="true" type="text" v-model="collection.name"
                   placeholder="Name" />
            <br/>
            <input id="collection_slug" name="collection_slug" tabIndex="2"  aria-required="true" type="text" v-model="collection.slug"
                   placeholder="Slug" />
            <br/>
            <br/>
            <input id="collection_url" name="collection_url" tabIndex="2"  aria-required="true" type="text" v-model="collection.url"
                   placeholder="Url" />
            <br/>
            <input id="collection_symbol" name="collection_symbol" tabIndex="2"  aria-required="true" type="text" v-model="collection.symbol"
                   placeholder="Symbol" />
            <br/>
            <textarea id="collection_description" name="collection_description" tabIndex="2"  aria-required="true" type="text"
                      placeholder="Description" v-model="collection.description"/>
            <br/>
            <input id="collection_price" name="collection_price" tabIndex="2"  aria-required="true" type="text"
                   placeholder="Collection Price" v-model="collection.price"/>
            <br/>
            <input id="collection_fee" name="collection_fee" tabIndex="2"  aria-required="true" type="text"
                   placeholder="Collection Fee" v-model="collection.fee"/>
            <br/>
            <p v-if="errors" class="alert alert-danger" v-html="errors"></p>
            <button v-if="!collection.id" type="button"
                    class="min-form-btn"
                    @click.prevent="mintCollection">
              Mint Collection
            </button>
            <button v-else type="button"
                    class="min-form-btn"
                    @click.prevent="editCollection">
              Edit Collection
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>