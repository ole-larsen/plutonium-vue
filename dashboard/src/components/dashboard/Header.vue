<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="toggleSidebar">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand>
      <DashboardBreadcrumb />
    </CContainer>
    <CHeaderDivider />
  </CHeader>
</template>

<script>
import DashboardBreadcrumb from "./Breadcrumb.vue";

import {useSidebarStore}   from "@/stores/sidebar";
export default {
  name: "DashboardHeader",
  components: {
    DashboardBreadcrumb
  },
  setup() {
    const sidebar = useSidebarStore()
    return {
      toggleSidebar: () => {
        sidebar.toggleSidebarVisible()
      },
      logo: "/images/logo.svg",
    }
  },
}
</script>
