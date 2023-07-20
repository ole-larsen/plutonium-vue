<script setup lang="ts">
import type { ComputedRef, Ref } from "vue";
import type { PublicMenu, PublicUser } from "@/types";

import { useHeaderStore } from "@/stores/template/header";
import { onMounted, computed } from "vue";

import DarkMode      from "@/components/Header/DarkMode.vue";
import HeaderMenu    from "@/components/Header/HeaderMenu.vue";
import HeaderProfile from "@/components/Header/HeaderProfile.vue";
import HeaderSearch  from "@/components/Header/HeaderSearch.vue";

import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";
import { useMetaMaskStore } from "@/stores/web3/metamask";
import { useAuthStore } from "@/stores/auth/store";

const market   = useMarketPlaceStore();
const metamask = useMetaMaskStore();
const auth     = useAuthStore();

const name:       ComputedRef<string>     = computed(() => market.getName());
const user:       ComputedRef<PublicUser> = computed(() => auth.getUser());
const authorized: ComputedRef<boolean>    = computed(() => !!auth.getUser());

const store = useHeaderStore();

const isSticky: Ref<boolean> = computed(() => store.isSticky),
      isActive: Ref<boolean> = computed(() => store.isActive),
      isActiveMobile: Ref<boolean> = computed(() => store.isActiveMobile),
      isActiveSearch: Ref<boolean> = computed(() => store.isActiveSearch),
      menu: ComputedRef<PublicMenu | null> = computed(() => store.menu);

onMounted(() => {
  window.addEventListener("scroll", () => {
    store.toggleSticky();
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

function handlePersonalSign() {
  metamask.personalSign();
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
                      <img src="@/assets/images/logo.svg"
                           :alt="name" id="logo-all" class="header-img">
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
                  @toggleActiveMobile="toggleActiveMobile"/>

                <div class="flat-search-btn flex">
                  <header-search
                    :isActiveSearch="isActiveSearch"
                    @toggleActiveSearch="toggleActiveSearch"/>

                  <div class="sc-btn-top mg-r-12" id="site-header">
                    <a v-if="!authorized" href="#"
                       class="sc-button header-slider style style-1 wallet fl-button pri-1"
                       @click="handlePersonalSign">
                      <span>Wallet connect</span>
                    </a>
                    <router-link :to="`/profile/${user.uuid}`" v-else-if="user"
                       class="sc-button header-slider style style-1 wallet fl-button pri-1">
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