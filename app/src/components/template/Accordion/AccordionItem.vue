<script lang="ts" setup>
import {ref, computed, onBeforeMount, inject} from "vue";
const Accordion: any = inject("Accordion");
const index = ref(0);
const visible = computed(() => {
  return index.value === Accordion.active;
});
onBeforeMount(() => {
  index.value = Accordion.count++;
})
function show() {
  if (visible.value) {
    Accordion.active = null;
  } else {
    Accordion.active = index.value;
  }
}

function startTransition(el: any) {
  el.style.height = el.scrollHeight + "px";
}

function endTransition(el: any) {
  el.style.height = "";
}

</script>
<template>
  <li class="accordion-item">
    <div
      class="accordion-title"
      :class="{'active': visible}"
      @click="show">
      <slot name="accordion-trigger"></slot>
    </div>

    <transition
      name="accordion"
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition">
      <div class="accordion-content" v-show="visible">
        <ul>
          <slot name="accordion-content"></slot>
        </ul>
      </div>
    </transition>
  </li>
</template>
<style lang="scss">
.accordion-button:not(.collapsed) {
  background-color: transparent;
}
</style>

