<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps(["menu", "isActive", "isActiveMobile"]);

const { menu, isActive, isActiveMobile } = toRefs(props);
</script>
<template>
  <div>
    <div
    class="mobile-button"
    @click="$emit('toggleActive')"
    v-bind:class="{ active: isActive }"
  >
    <span></span>
  </div>

  <div id="main-nav" class="main-nav" v-bind:class="{ active: isActive }">
    <ul id="menu-primary-menu" class="menu">
      <li
        v-for="item in menu.attributes.items"
        v-bind:key="item.id"
        class="menu-item"
        @click="$emit('toggleActiveMobile')"
        v-bind:class="{
          active: isActiveMobile,
          'menu-item-has-children':
            item.attributes.items && item.attributes.items.length > 1,
        }"
      >
        <template
          v-if="item.attributes.items && item.attributes.items.length > 1"
        >
          <a href="#" v-html="item.attributes.name"></a>
          <ul class="sub-menu">
            <li
              class="menu-item"
              v-for="page in item.attributes.items"
              v-bind:key="page.id"
            >
              <router-link
                :to="page.attributes.link ? '/' + page.attributes.link : '/'"
                >{{ page.attributes.name }}</router-link
              >
            </li>
          </ul>
        </template>
        <template v-else-if="item.attributes.items && item.attributes.items.length === 1">
          <router-link
            :to="
              item.attributes.items[0].attributes.link
                ? item.attributes.items[0].attributes.link
                : '/'
            "
            >{{ item.attributes.items[0].attributes.name }}</router-link
          >
        </template>
      </li>
    </ul>
  </div>
  </div>
</template>
