<script lang="ts" setup>

import { toRefs, ref } from "vue";

const props = defineProps(["categories", "collections"]);
const { categories, collections } = toRefs(props);

const selectedCategory = ref("All");

const categoryAllImg = `${import.meta.env.VITE_BACKEND}/api/v1/files/category-all.png`;
</script>
<template>
  <div class="row">
    <div class="box-create row col-lg-12">
      <div class='col-lg-2 col-md-6 col-12'>
        <div class="sc-box-icon">
          <h3>
            Explore categories
          </h3>
        </div>
      </div>
    </div>
  </div>
  <br/>
  <div class="row">
    <div class="box-create row col-lg-12">
      <div class='col-lg-2 col-md-6 col-12'>
        <div class="sc-box-icon">
            <router-link to="#" v-on:click="selectedCategory ='All'">
              <img :src="categoryAllImg">
              <h3 class="heading">All</h3>
            </router-link>
        </div>
      </div>
      <div class='col-lg-2 col-md-6 col-12' v-for="category in categories">
        <div class="sc-box-icon" v-if="category['attributes']">
            <router-link :to="category['attributes']['slug']"
            v-on:click="selectedCategory = category['attributes']['title']">
              <img :src="category['attributes']['image']['attributes']['url']"/>
              <h3 class="heading">
                {{category['attributes']['title']}}
              </h3>
            </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="filter-wrapper">
    <div class="row">
        <template v-for="collection in collections">
          <div  class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div class="sc-card-product explode ">
              <div class="card-media">
                  <router-link :to="collection['attributes']['url']">
                    <img
                      :src="collection['attributes']['logo']['attributes']['url']"
                      :alt="collection['attributes']['logo']['attributes']['alt']">
                  </router-link>
              </div>
              <div class="card-title">
                <h5>
                  <router-link :to="collection['attributes']['url']">"{{collection['attributes']['name']}}"</router-link>
                </h5>
                <router-link :to="collection['attributes']['category']['url']">
                  {{collection['attributes']['category']['title']}}
                </router-link>
              </div>
              <div class="meta-info" v-if="collection['attributes']['creator']">
                <div class="author">
                  <div class="avatar">
                    <img :src="collection['attributes']['creator']['gravatar']" :alt="collection['attributes']['creator']['username']">
                  </div>
                  <div class="info">
                    <span>Creator</span>
                    <h6>
                      <router-link :to="`/author/${collection['attributes']['creator']['username']}`">
                        {{collection['attributes']['creator']['username'].length > 10 ? collection['attributes']['creator']['username'].slice(0, 4) + "..." + collection['attributes']['creator']['username'].slice(-4) : collection['attributes']['creator']['username']}}
                      </router-link>
                    </h6>
                  </div>
                </div>
              </div>
              <div class="tags">{{collection['attributes']['collectibles'] ? collection['attributes']['collectibles'].length : 0 }} items</div>
            </div>
          </div>
        </template>
    </div>
  </div>
</template>

