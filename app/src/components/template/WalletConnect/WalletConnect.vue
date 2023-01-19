<script lang="ts" setup>

import {useWalletConnectStore} from "@/stores/walletConnect";
import {computed, onMounted} from "vue";

onMounted(async () => {
  try {
    await useWalletConnectStore().load();
  } catch (e) {
    console.error(e);
  }
});

const walletConnect = computed(() => useWalletConnectStore().walletConnect);

</script>
<template>
  <section class="tf-connect-wallet tf-section " v-if="walletConnect !== null">
    <div class="themesflat-container">
      <div class="row">
        <div class="col-md-12" >
          <div class="sc-box-icon-inner style-2"  >
            <div class="sc-box-icon" v-for="item in walletConnect">
              <div class="img" v-if="item['image']['attributes']['url']">
                  <img :src="item['image']['attributes']['url']" :alt="item['image']['attributes']['alt']">
              </div>
              <h4 class="heading">{{item['title']}}</h4>
              <span v-if="item['address']" v-html="item['address']"></span>
              <p class="content" v-else v-html="item['description']"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>