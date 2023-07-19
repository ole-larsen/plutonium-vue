<script lang="ts" setup>
import type { ComputedRef } from "vue";
import type { BlogItem } from "@/types";

import { useBlogStore } from "@/stores/template/blog";
import { computed, onBeforeMount } from "vue";

import { error } from "@/helpers";

const store = useBlogStore();
const blogs: ComputedRef<{[id: string]: BlogItem}> = computed(() => store.getBlogs());

onBeforeMount(async () => {
  try {
    await store.loadBlogs();
  } catch (e) {
    error(e);
  }
  await store.loadBlogs();
});

function handleButton () {
  console.log("button");
  // if (blogs.value.length < this.moreBlogs.value.length) {
  //   const nextEsts = blogs.value.splice(0, 3);
  //   moreBlogs.value = moreBlogs.value.concat(nextEsts);
  // }
  // // else if (this.blogs.length >= this.moreBlogs.length) {
  // document.getElementById("load-more").classList.add("none")
  // }

}
</script>
<template>
  <div class="blog-area pt-100 pb-100">
      <div class="tf-section sc-card-blog dark-style2">
        <div class="themesflat-container">

        <div class="row" v-if="blogs">
          <div
            class="fl-blog fl-item2 col-lg-4 col-md-6"
            v-for="blog in blogs"
            :key="blog.id">
            <div
              class="sc-card-article"
              data-aos="fade-up"
              data-aos-delay="80"
              data-aos-duration="800"
              data-aos-once="true">

              <div class="card-media" v-if="blog['link']">
                <router-link :to="'/blog/' + blog['link']">
                  <img v-if="blog['image']['attributes']['url']" :src="blog['image']['attributes']['url']" :alt="blog['image']['attributes']['alt']">
                </router-link>
              </div>
              <div class="meta-info">
                <div class="author">
                  <div class="avatar" v-if="blog['author']['attributes']['image']['attributes']['url']">
                      <img :src="blog['author']['attributes']['image']['attributes']['url']" alt="image">
                    </div>
                    <div class="info">
                      <span>Post owner</span>
                      <h6>  <router-link :to="'/blog/' + blog['link']">{{blog['author']['attributes']['name']}} </router-link> </h6>
                    </div>
                  </div>
                <div class="date">{{blog['date']}}</div>
              </div>

              <div class="text-article">
                <h3>
                  <router-link v-if="blog['link']" :to="'/blog/' + blog['link']">
                    {{blog['title']}}
                  </router-link>
                </h3>
                <div v-html="blog['description']"/>
              </div>

              <router-link :to="'/blog/' + blog['link']" class="sc-button fl-button pri-3">
                <span>Follow</span>
              </router-link>
            </div>
          </div>

          <div class="col-md-12 wrap-inner load-more text-center" v-show="false">
            <a id="load-more" class="sc-button loadmore fl-button pri-3 mt-6"  @click="handleButton">
              <span>Load More</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

