<script lang="ts" setup>

import {computed, toRefs} from "vue";
import {useAuthStore} from "@/stores/auth/store";
const store = useAuthStore();
const user = computed(() => store.getUser());

</script>
<template>
  avatars {{ user }}
</template>