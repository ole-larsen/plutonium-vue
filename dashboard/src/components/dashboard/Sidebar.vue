
<template>
  <CSidebar
      position="fixed"
      :unfoldable="sidebarUnfoldable"
      :visible="sidebarVisible"
  >
    <CSidebarBrand>
      <img class="sidebar-brand-full" :width="200" :src="logo">
      <CIcon
          custom-class-name="sidebar-brand-narrow"
          :icon="sygnet"
          :height="35"
      />
    </CSidebarBrand>

    <AppSidebarNav />
    <CSidebarToggler
        class="d-none d-lg-flex"
        @click="toggleSidebar"
    />
  </CSidebar>
</template>

<script lang="ts">

import { computed } from "vue";
import { SidebarNav }   from "./SidebarNav.js";
import { logoNegative }    from "@/assets/brand/logo-negative";
import { sygnet }          from "@/assets/brand/sygnet";
import {useSidebarStore}   from "@/stores/sidebar";
import logo from "@/assets/brand/logo.svg";

export default {
  name: 'DashboardSidebar',
  components: {
    AppSidebarNav: SidebarNav,
  },
  setup() {
    const sidebar = useSidebarStore();

    return {
      toggleSidebar: () => sidebar.toggleSidebarUnfoldable(),
      logo,
      logoNegative,
      sygnet,
      sidebarUnfoldable: computed(() => sidebar.getSidebarUnfoldable),
      sidebarVisible: computed(() => sidebar.getSidebarVisible),
    }
  },
}
</script>
