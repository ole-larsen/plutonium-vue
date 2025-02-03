<script setup lang="ts">
import Categories from "../Categories/CategoriesComponent.vue";
import Slider from "@/components/Slider/Slider01Component.vue";
import LiveAuction from "@/components/LiveAuction/LiveAuction01Component.vue";
import CreateAndSell from "@/components/Home/CreateAndSellComponent.vue";
import TopSeller from "@/components/TopSeller/TopSeller01Component.vue";
import Collection from "@/components/Collection/Collection01Component.vue";
</script>

<template>
  <Categories />
  <Slider />
  
  <LiveAuction />
  <CreateAndSell />

  <TopSeller />
  <Collection /> 
</template>
