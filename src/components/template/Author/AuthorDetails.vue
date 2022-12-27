<script lang="ts" setup>

import Filter from "./Filter.vue";

import {computed, reactive, ref, watch} from "vue";

import type { User } from "@/stores/auth";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import {useRoute} from "vue-router";
import {useUsersStore} from "@/stores/users.store";

const route = useRoute();
const uuid = route.params.uuid // read parameter id (it is reactive)

const store = useUsersStore();
const user: any = computed(() => {
  if (store.users) {
    return store.users.find((_user: User) => _user.uuid === uuid);
  }
  return undefined;
});

const items = computed(() => useMarketPlaceStore().items);

const wallpaper: any = ref(null);

const item = ref({
  name: "",
  description: "",
  price: 0,
  file: undefined,
  category: "All",
  tags: ""
});

const wallPaperStyle = reactive({
  background: `url(${user?.value?.wallpaper}) no-repeat top`,
});

watch(
  () => user.value,
  (_user) => {
    if (_user.wallpaper) {
      wallPaperStyle.background = `url(${_user.wallpaper}) no-repeat top`;
    }
  });

</script>
<template>
  <div class="authors-2">
    <section class="tf-section authors profile" v-if="user">
      <div class="themesflat-container">
        <div class="flat-tabs tab-authors">
          <div class="author-profile flex" ref="profile" :style="wallPaperStyle">

            <div class="feature-profile" ref="uploadNav">
              <img :src="user['gravatar']" alt="image" class="avatar">
            </div>
            <div class="infor-profile">
              <span>{{user['address']}}</span>
              <div class="infor-profile-username">
                <h2 class="title">{{user['username']}}</h2>
              </div>

              <div class="infor-profile-email">
                <div class="content" v-html="user['email']"></div>
              </div>

              <div v-for="wallet in user['wallets']">
                <form>
                  <div>
                    <label class="form-label">{{ wallet['name'] }}</label>
                  </div>
                  <input type="text" class="inputcopy" v-model="wallet['address']" readOnly />
                  <button type="button" class="btn-copycode"><i class="icon-fl-file-1"></i></button>
                </form>
                <br/>
              </div>

            </div>

            <div class="widget-social style-3" v-if="user['socials']">
              <ul>
                <li v-for="social in user['socials']">
                  <a :href="social['link']" target="_blank"><i :class="social['icon']"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <Filter :items="items"/>
        </div>
      </div>
    </section>

  </div>
</template>