<script setup lang="ts">
import type { ComputedRef, Ref } from "vue";
import type { PublicMenuDto, PublicUserDto } from "@/types";

import { useHeaderStore } from "@/components/Template/Header/store/header";
import { onMounted, computed } from "vue";

import DarkMode from "@/components/Template/Header/DarkModeComponent.vue";
import HeaderMenu from "@/components/Template/Header/HeaderMenuComponent.vue";
import HeaderProfile from "@/components/Template/Header/HeaderProfileComponent.vue";
import HeaderSearch from "@/components/Template/Header/HeaderSearchComponent.vue";

const store = useHeaderStore();

const isSticky: Ref<boolean> = computed(() => store.isSticky),
  isActive: Ref<boolean> = computed(() => store.isActive),
  isActiveMobile: Ref<boolean> = computed(() => store.isActiveMobile),
  isActiveSearch: Ref<boolean> = computed(() => store.isActiveSearch),
  isAuthorized: ComputedRef<boolean> = computed(() => store.isAuthorized),
  menu: ComputedRef<PublicMenuDto | null> = computed(() => store.menu),
  name: ComputedRef<string> = computed(() => store.name),
  user: ComputedRef<PublicUserDto | null> = computed(() => store.user);

onMounted(() => {
  window.addEventListener("scroll", () => {
    store.toggleSticky();
  });
  store.loadMenu("header");
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

function handleWalletConnect() {
  store.handleWalletConnect();
}
</script>
<template>
  <div>
    <div :class="['header_1', { 'is-fixed': isSticky }]" id="header_main">
      <div class="themesflat-container">
        <div class="row">
          <div class="col-md-12">
            <div id="site-header-inner">
              <nav class="wrap-box flex">
                <div id="site-logo" class="clearfix">
                  <div id="site-logo-inner">
                    <router-link class="main-logo" to="/">
                      <img
                        src="@/assets/images/logo.svg"
                        :alt="name"
                        id="logo-all"
                        class="header-img"
                      />
                      <span class="header-img-text" v-html="name"></span>
                    </router-link>
                  </div>
                </div>

                <header-menu
                  v-if="menu"
                  :menu="menu"
                  :isActive="isActive"
                  :isActiveMobile="isActiveMobile"
                  @toggleActive="toggleActive"
                  @toggleActiveMobile="toggleActiveMobile"
                />

                <div class="flat-search-btn flex">
                  <header-search
                    :isActiveSearch="isActiveSearch"
                    @toggleActiveSearch="toggleActiveSearch"
                  />

                  <div class="sc-btn-top mg-r-12" id="site-header">
                    <a
                      v-if="!isAuthorized"
                      href="#"
                      class="sc-button header-slider style style-1 wallet fl-button pri-1"
                      @click="handleWalletConnect"
                    >
                      <span>Wallet connect</span>
                    </a>
                    <template v-if="isAuthorized && user">
                      <router-link
                        :to="`/profile/${user.attributes.uuid}`"
                        class="sc-button header-slider style style-1 wallet fl-button pri-1"
                      >
                        <span>Profile</span>
                      </router-link>
                    </template>
                    
                  </div>
                  <template v-if="user">
                    <header-profile :user="user" />
                  </template>
                  
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
