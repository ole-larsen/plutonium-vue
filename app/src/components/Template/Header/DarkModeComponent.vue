<script setup lang="ts">
import type { ComputedRef } from "vue";
import { computed, onMounted } from "vue";
import { useModeStore } from "./store/mode";

const modeStore = useModeStore(),
  userTheme: ComputedRef<string> = computed(() => modeStore.theme),
  toggleTheme = modeStore.toggleTheme;

onMounted(() => {
  modeStore.setTheme(modeStore.getTheme() || modeStore.getMediaPreference());
});
</script>
<template>
  <div class="mode_switcher">
    <h6>{{ userTheme === "is_dark" ? "Light Mode" : "Dark Mode" }}</h6>
    <a href="javascript:void(0)" @click="toggleTheme"
      ><img src="@/assets/images/item-background/sun.png" alt="theme-toggle"
    /></a>
  </div>
</template>
