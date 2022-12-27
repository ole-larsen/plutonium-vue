<script lang="ts" setup>

import {computed, toRefs} from "vue";
import {useAuthStore} from "@/stores/auth";
const store = useAuthStore();
const user = computed(() => store.user);

</script>
<template>
  avatars {{ user }}
</template>