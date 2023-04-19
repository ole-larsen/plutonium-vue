<script lang="ts" setup>
import type { PublicUser } from "@/types";
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { Carousel, Slide ,Navigation } from "vue3-carousel";

import 'vue3-carousel/dist/carousel.css';
import { useUserStore } from "@/stores/users/users.store";

const users: ComputedRef<PublicUser[]> = computed(() => useUserStore().getUsers().filter((user: PublicUser) => Number(user.funds) > 0));

const settings = {
    loop: false,
    itemsToShow: 1,
    snapAlign: "left",
  };

const breakpoints = {
    0: {
      itemsToShow: 3,
      snapAlign: "left",
    },
    768: {
      itemsToShow: 5,
      snapAlign: "left",
    },
    1200: {
      itemsToShow: 9,
      snapAlign: "left",
    },
  }
</script>
<template>
  <section class="tf-section top-seller">
    <div class="themesflat-container" v-if="users.length > 0">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-live-auctions">
            <h2 class="tf-title">Top Seller</h2>
          </div>
        </div>
        <div class="col-md-12">
          <carousel
            :autoplay="0"
            :settings='settings'
            :wrap-around="false"
            :breakpoints='breakpoints'>
            <Slide v-for="user in users" :key="user.id">
              <div class="sc-author-box style-2">
                <div class="author-avatar">
                  <img :src="user.gravatar" alt="image" class="avatar">
                  <div class="badge"></div>
                </div>
                <div class="author-infor" v-if="user.username">
                  <h5>
                    <router-link :to="'/author/' + user.uuid">
                      {{user.username.slice(0, 8)}}
                    </router-link>
                  </h5>
                  <span class="price">{{user.funds}} ETH</span>
                </div>
              </div>
            </Slide>

            <template #addons>
              <Navigation />
            </template>
          </carousel>
        </div>
      </div>
    </div>
  </section>
</template>