<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps(["isActiveSearch"]);

const { isActiveSearch } = toRefs(props);
</script>
<template>
  <div class="header-search flat-show-search" id="s1">
    <router-link
      to="#"
      class="show-search header-search-trigger"
      @click="$emit('toggleActiveSearch')"
    >
      <i class="far fa-search"></i>
    </router-link>
    <div class="top-search" :class="{ active: isActiveSearch }">
      <form action="#" method="get" role="search" class="search-form">
        <input
          type="search"
          id="s"
          class="search-field"
          placeholder="Search..."
          name="s"
          title="Search for"
          required
        />
        <button class="search search-submit" type="submit" title="Search">
          <i class="icon-fl-search-filled"></i>
        </button>
      </form>
    </div>
  </div>
</template>
