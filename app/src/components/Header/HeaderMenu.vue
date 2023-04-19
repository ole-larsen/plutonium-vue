<script setup lang="ts">
import {toRefs} from "vue";

const props = defineProps([
  "menu",
  "isActive",
  "isActiveMobile"
]);

const {
  menu,
  isActive,
  isActiveMobile
} = toRefs(props);

const emit = defineEmits([
  "isSideMenuMethod",
  "toggleActive",
  "toggleActiveMobile"
]);

</script>
<template>
  <div class="mobile-button" @click="$emit('toggleActive')" v-bind:class="{active: isActive}" ><span></span></div>

  <div id="main-nav" class="main-nav" v-bind:class="{active: isActive}">
    <ul id="menu-primary-menu" class="menu">
      <li
        v-for="item in menu.attributes.items"
        class="menu-item"
        @click="$emit('toggleActiveMobile')"
        v-bind:class="{active: isActiveMobile, 'menu-item-has-children': item.attributes.items && item.attributes.items.length > 1}">
        <template v-if="item.attributes.items && item.attributes.items.length > 1">
          <a href="#" v-html="item.attributes.name"></a>
          <ul class="sub-menu">
            <li class="menu-item" v-for="page in item.attributes.items">
              <router-link :to="(page.attributes.link ? page.attributes.link : '/')" v-html="page.attributes.name"></router-link>
            </li>
          </ul>
        </template>
        <template v-else-if="item.attributes.items && item.attributes.items.length === 1">
          <router-link :to="(item.attributes.items[0].attributes.link ? item.attributes.items[0].attributes.link : '/')" v-html="item.attributes.items[0].attributes.name"></router-link>
        </template>
      </li>
    </ul>
  </div>
</template>
