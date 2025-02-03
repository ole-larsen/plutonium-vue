<script setup lang="ts">
import { RouterView } from "vue-router";

import Loader from "@/components/Template/Header/LoaderComponent.vue";
import Header from "@/components/Template/Header/HeaderComponent.vue";
import Footer from "@/components/Template/Footer/FooterComponent.vue";
import { onBeforeMount } from "vue";
import { useLoaderStore } from "./stores/loader/store";

// first connect wallet to get address
const loader = useLoaderStore();

onBeforeMount(async () => {
  await loader.loadContracts();
})
</script>

<template>
  <Loader />
  <Header />
  <RouterView />
  <Footer />
</template>
