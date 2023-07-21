<script lang="ts" setup>
import { toRefs } from "vue";
import type { PublicCategoryCollection } from "@/types";
const props = defineProps(["collection"]);
const { collection } = toRefs(props);
const emit = defineEmits(["editCollection"]);

function editCollection(collection: PublicCategoryCollection) {
  emit("editCollection", collection);
}
</script>
<template>
  <div class="sc-card-product explode">
    <div class="card-media">
      <router-link :to="collection['attributes']['url']">
        <img
          :src="collection['attributes']['logo']['attributes']['url']"
          :alt="collection['attributes']['logo']['attributes']['alt']"
        />
      </router-link>
      <div class="button-place-bid">
        <button
          class="sc-button style-place-bid style bag fl-button pri-3"
          v-on:click="editCollection(collection)"
        >
          <span>Edit</span>
        </button>
      </div>
    </div>
    <div class="card-title mg-bt-16">
      <h5>
        <router-link :to="collection['attributes']['url']"
          >"{{ collection["attributes"]["name"] }}"</router-link
        >
      </h5>
      <router-link :to="collection['attributes']['category']['url']">
        {{ collection["attributes"]["category"]["title"] }}
      </router-link>
    </div>
    <div class="meta-info" v-if="collection['attributes']['creator']">
      <div class="author">
        <div class="avatar">
          <img
            :src="collection['attributes']['creator']['gravatar']"
            :alt="collection['attributes']['creator']['username']"
          />
        </div>
        <div class="info">
          <span>Creator</span>
          <h6>
            <router-link
              :to="`/author/${collection['attributes']['creator']['username']}`"
            >
              {{
                collection["attributes"]["creator"]["username"].length > 10
                  ? collection["attributes"]["creator"]["username"].slice(
                      0,
                      4
                    ) +
                    "..." +
                    collection["attributes"]["creator"]["username"].slice(-4)
                  : collection["attributes"]["creator"]["username"]
              }}
            </router-link>
          </h6>
        </div>
      </div>
    </div>
    <div class="meta-info" v-if="collection['attributes']['owner']">
      <div class="author">
        <div class="avatar">
          <img
            :src="collection['attributes']['owner']['gravatar']"
            :alt="collection['attributes']['owner']['username']"
          />
        </div>
        <div class="info">
          <span>Owner</span>
          <h6>
            <router-link
              :to="`/author/${collection['attributes']['owner']['username']}`"
            >
              {{
                collection["attributes"]["owner"]["username"].length > 10
                  ? collection["attributes"]["owner"]["username"].slice(0, 4) +
                    "..." +
                    collection["attributes"]["owner"]["username"].slice(-4)
                  : collection["attributes"]["owner"]["username"]
              }}
            </router-link>
          </h6>
        </div>
      </div>
      <div class="tags">
        {{
          collection["attributes"]["collectibles"]
            ? collection["attributes"]["collectibles"].length
            : 0
        }}
        items
      </div>
    </div>
  </div>
</template>
