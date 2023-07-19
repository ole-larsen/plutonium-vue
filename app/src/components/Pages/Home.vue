<script setup lang="ts">
import Slider        from "@/components/Slider/Slider01.vue";
import Categories    from "@/components/Categories/Categories.vue";
import LiveAuction   from "@/components/LiveAuction/LiveAuction01.vue";
import CreateAndSell from "@/components/Home/CreateAndSell.vue";
import TopSeller     from "@/components/TopSeller/TopSeller01.vue";
import Collection    from "@/components/Collection/Collection01.vue";
</script>

<template>
  <Slider/> 
  <Categories />

  <LiveAuction />
  <CreateAndSell/>

  <TopSeller/>
  <Collection/>
</template>