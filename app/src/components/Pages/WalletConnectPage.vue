<script lang="ts" setup>
import type { PublicWalletConnectItemDto } from "@/types";
import type { ComputedRef } from "vue";
import { useWalletConnectStore } from "@/stores/pages/walletConnect";
import { computed, onMounted } from "vue";
import { error } from "@/helpers";

import PageTitle from "@/components/Template/Header/PageTitleComponent.vue";

const store = useWalletConnectStore();

onMounted(async () => {
  try {
    await store.load();
  } catch (e) {
    error(e);
  }
});

const walletConnect: ComputedRef<PublicWalletConnectItemDto[]> = computed(
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
              v-bind:key="item.id"
            >
              <template v-if="item.attributes">
                <div class="img" v-if="item['attributes']['image'] && item['attributes']['image']['attributes']['url']">
                  <img
                    :src="item['attributes']['image']['attributes']['url']"
                    :alt="item['attributes']['image']['attributes']['alt']"
                  />
                </div>
                <h4 class="heading">{{ item['attributes']["title"] }}</h4>
                <p class="content" v-html="item['attributes']['description']"></p>
              </template>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
