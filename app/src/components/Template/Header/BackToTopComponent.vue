<script setup lang="ts">
import { onMounted, ref } from "vue";

const isTop = ref(false);

function scrollToTop() {
  window.scrollTo(0, 0);
}

onMounted(() => {
  window.addEventListener("scroll", () => {
    isTop.value = window.scrollY >= 300;
  });
});

</script>
<template>
  <div id="scroll-top" @click="scrollToTop()" :class="[{ show: isTop }]"></div>
</template>

<style lang="scss" scoped>
/* Scroll Top
-------------------------------------------------------------- */
#scroll-top {
  position: fixed;
  display: block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  z-index: 1;
  right: 14px;
  bottom: 23px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  cursor: pointer;
  background-color: #5142fc;
  opacity: 0;
  visibility: hidden;
  transition: all 0.6s;

  .show {
    opacity: 1;
    visibility: visible;
    bottom: 50px;
  }
  &:after {
    content: "\f077";
    font-family: "Font Awesome 5 Pro", serif;
    font-size: 18px;
    color: #ffffff;
    font-weight: 600;
  }
  &:hover {
    transform: translateY(-7%);
  }
}
.is_dark #scroll-top {
  background: #fff;
  &:after {
    color: #5142fc;
  }
}
</style>
