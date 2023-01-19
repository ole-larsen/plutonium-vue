<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import { RouterView } from "vue-router";
import Loader from "@/components/template/Loader.vue";
import Header from "@/components/template/Header/Header.vue";
import Footer from "@/components/template/Footer/Footer.vue";
import BackToTop from "@/components/template/BackToTop.vue";
import {useLoaderStore} from "@/stores/loader";
import {useMetaMaskStore} from "@/stores/web3/metamask";
import {useAuthStore} from "@/stores/auth";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";

// spinner loader
const loading = ref(true);

// header variables

const user = computed(() => useAuthStore().user);

const store = useLoaderStore();
const metamask = useMetaMaskStore();
const market = useMarketPlaceStore();
const name = computed(() => market.name);
const connected = computed(() => store.connected);
async function handleConnect() {
  await metamask.login();
  console.log(connected.value);
}

onBeforeMount(async () => {
  await store.load();
  // name.value = await store.loadMarketName();
  loading.value = false;
});
</script>

<template>
  <Loader v-if="loading" :loading="loading"/>
  <Header
    @handleConnect="handleConnect"
    :user="user"
    :name="name"
  />
  <RouterView />
  <Footer />
  <BackToTop />
</template>
