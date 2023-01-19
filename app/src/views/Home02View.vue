<script lang="ts" setup>
import Slider from "@/components/template/Home02/Slider.vue";
import LiveAuction from "@/components/template/LiveAuction/LiveAuction01.vue";
import CreateAndSell from "@/components/template/CreateAndSell/CreateAndSell.vue";
import Collection from "@/components/template/Home02/Collection.vue";
import TodayPick from "@/components/template/TodayPick/TodayPick01.vue";
import TopSeller from "@/components/template/TopSeller/TopSeller01.vue";

</script>
<template>
  <div class="home-02">
    <Slider />
    <CreateAndSell />
    <LiveAuction />
<!--    <Collection />-->
    <TopSeller />
    <TodayPick />
  </div>
</template>
