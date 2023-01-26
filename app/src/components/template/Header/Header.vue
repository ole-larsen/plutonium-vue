<script setup lang="ts">
import {onMounted, onBeforeMount, ref, computed, toRefs} from "vue";
import type {ComputedRef, Ref} from "vue";

import DarkMode from "@/components/template/DarkMode.vue";
import HeaderMenu from "@/components/template/Header/HeaderMenu.vue";
import HeaderProfile from "@/components/template/Header/HeaderProfile.vue";
import HeaderSearch from "@/components/template/Header/HeaderSearch.vue";
import {useHeaderStore} from "@/stores/header";
import type {PublicFile} from "@/index";

const props = defineProps({
  user: Object,
  name: String,
  connected: Boolean
});

const { user, name, connected } = toRefs(props);

const emit = defineEmits(["handleConnect"]);

const store = useHeaderStore();

const isSticky: Ref<boolean>           = ref(false),
  isActive: ComputedRef<boolean>       = computed(() => store.isActive),
  isActiveMobile: ComputedRef<boolean> = computed(() => store.isActiveMobile),
  search: ComputedRef<boolean>         = computed(() => store.search),
  attributes: ComputedRef<PublicFile>  = computed(() => store.attributes),
  img: ComputedRef<string>             = computed(() => store.img),
  menu                                 = computed(() => store.menu);

onMounted(() => {
  window.addEventListener("scroll", () => {
    isSticky.value = window.scrollY >= 100;
  });
});

function toggleActive() {
  store.toggleActive();
}

function toggleActiveMobile() {
  store.toggleActiveMobile();
}

function toggleActiveSearch() {
  store.toggleActiveSearch();
}

function handleConnect() {
  emit("handleConnect");
}

</script>
<template>
  <div>
    <div :class="['header_1', { 'is-fixed': isSticky }]" id="header_main">
      <div class="themesflat-container">
        <div class="row">
          <div class="col-md-12">
            <div id="site-header-inner">
              <nav class="wrap-box flex" v-if="attributes">
                <div id="site-logo" class="clearfix">
                  <div id="site-logo-inner" v-if="img">
                    <router-link class="main-logo" to="/">
                      <img :src="img" :alt="attributes.alt" id="logo-all" class="header-img">
                      <span class="header-img-text" v-html="name"></span>
                    </router-link>
                  </div>
                </div>
                <header-menu
                  :menu="menu"
                  :isActive="isActive"
                  :isActiveMobile="isActiveMobile"
                  @toggleActive="toggleActive"
                  @toggleActiveMobile="toggleActiveMobile"
                ></header-menu>
                <div class="flat-search-btn flex">
                  <header-search
                    :search="search"
                    @toggleActiveSearch="toggleActiveSearch"/>
                  <div class="sc-btn-top mg-r-12" id="site-header">
                    <a v-if="!connected" href="#" class="sc-button header-slider style style-1 wallet fl-button pri-1" @click="handleConnect">
                      <span>Wallet connect</span>
                    </a>
                    <router-link :to="`/profile/${user.uuid}`" v-else-if="user" class="sc-button header-slider style style-1 wallet fl-button pri-1">
                      <span>Profile</span>
                    </router-link>
                  </div>
                  <header-profile :user="user"/>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <DarkMode />
    </div>
  </div>
</template>