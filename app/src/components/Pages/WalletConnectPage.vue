<script lang="ts" setup>
import type { WalletConnect } from "@/types";
import type { ComputedRef } from "vue";
import { useWalletConnectStore } from "@/stores/pages/walletConnect";
import { computed, onMounted } from "vue";
import { error } from "@/helpers";

import PageTitle from "@/components/Header/PageTitleComponent.vue";

const store = useWalletConnectStore();

onMounted(async () => {
  try {
    await store.load();
  } catch (e) {
    error(e);
  }
});

const walletConnect: ComputedRef<WalletConnect[]> = computed(
  () => useWalletConnectStore().walletConnect
);
</script>
<template>
  <PageTitle pageTitle="Wallet Connect" />
  <section class="tf-connect-wallet tf-section" v-if="walletConnect !== null">
    <div class="themesflat-container">
      <div class="row">
        <div class="col-md-12">
          <div class="sc-box-icon-inner style-2">
            <div
              class="sc-box-icon"
              v-for="item in walletConnect"
              v-bind:key="item['image']['id']"
            >
              <div class="img" v-if="item['image']['attributes']['url']">
                <img
                  :src="item['image']['attributes']['url']"
                  :alt="item['image']['attributes']['alt']"
                />
              </div>
              <h4 class="heading">{{ item["title"] }}</h4>
              <span v-if="item['address']" v-html="item['address']"></span>
              <p class="content" v-else v-html="item['description']"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
