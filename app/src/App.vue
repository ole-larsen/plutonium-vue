<script setup lang="ts">
import { onBeforeMount, computed } from "vue";
import { RouterView } from "vue-router";
import Loader from "@/components/template/Loader.vue";
import Header from "@/components/template/Header/Header.vue";
import Footer from "@/components/template/Footer/Footer.vue";
import BackToTop from "@/components/template/BackToTop.vue";
import {useLoaderStore} from "@/stores/loader";
import {useHeaderStore} from "@/stores/header";

const store = useLoaderStore();
const loading = computed(() => store.loading);
const name = computed(() => store.name);
const user = computed(() => store.user);
const connected = computed(() => store.connected);

function handleConnect() {
  store.login();
}

onBeforeMount(() => {
  store.load();
});
</script>

<template>
  <Loader v-if="loading" :loading="loading"/>
  <Header
    @handleConnect="handleConnect"
    :user="user"
    :name="name"
    :connected="connected"
  />
  <RouterView />
  <Footer />
  <BackToTop />
</template>
