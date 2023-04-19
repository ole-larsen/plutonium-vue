<script lang="ts" setup>
import type { AccordionType} from "@/types";
import type { Ref, ComputedRef } from "vue";
import { ref, computed, onBeforeMount, inject } from "vue";

const Accordion: unknown = inject("Accordion");
const index: Ref<number> = ref(0);

const visible: ComputedRef<boolean> = computed(() => index.value === (Accordion as AccordionType).active);

onBeforeMount(() => {
  index.value = (Accordion as AccordionType).count++;
})

function show() {
  if (visible.value) {
    (Accordion as AccordionType).active = null;
  } else {
    (Accordion as AccordionType).active = index.value;
  }
}

function startTransition(el: {
  style: {
    height: string;
  };
  scrollHeight: number;
}) {
  el.style.height = el.scrollHeight + "px";
}

function endTransition(el: {
  style: {
    height: string;
  };
  scrollHeight: number;
}) {
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

