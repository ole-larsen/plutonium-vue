<script lang="ts" setup>
import { reactive, provide } from "vue";
const Accordion = reactive({
  count: 0,
  active: null
})
provide("Accordion", Accordion);
</script>

<template>
  <ul class="accordion">
    <slot></slot>
  </ul>
</template>

