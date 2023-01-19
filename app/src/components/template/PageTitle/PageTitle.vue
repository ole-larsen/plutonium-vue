<script lang="ts" setup>

import {toRefs} from "vue";

const props = defineProps(["pageTitle", "pageTitleActive", "link", "pageName"]);
const { pageTitle, pageTitleActive, link, pageName } = toRefs(props);
</script>

<template>
  <section class="flat-title-page inner">
    <div class="overlay"></div>
    <div class="themesflat-container">
      <div class="row">
        <div class="col-md-12">
          <div class="page-title-heading mg-bt-12">
            <h1 class="heading text-center">{{pageTitle}}</h1>
          </div>
          <div class="breadcrumbs style2">
            <ul>
              <li><router-link :to="'/'">Home</router-link></li>
              <li v-if="pageTitleActive">{{pageTitleActive}}</li>
              <li v-if="link"><router-link :to="link">{{link}}</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

