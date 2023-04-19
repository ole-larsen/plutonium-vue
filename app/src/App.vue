<script setup lang="ts">
import { RouterView } from "vue-router";
import Loader from "@/components/Header/Loader.vue";
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";

import { useLoaderStore } from "@/stores/loader/store";
import { onBeforeMount } from "vue";
import { error } from "@/helpers";

const store = useLoaderStore();

onBeforeMount(async () => {
  try {
    await store.load();
  } catch(e) {
    error(e);
  }
});
</script>

<template>
  <Loader/>
  <Header/>
  <RouterView />
  <Footer />
</template>
