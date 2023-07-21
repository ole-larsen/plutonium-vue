<script lang="ts" setup>
import type { FAQ } from "@/types";
import type { ComputedRef } from "vue";
import { computed, onBeforeMount } from "vue";
import { error } from "@/helpers";

import { useFaqStore } from "@/stores/pages/faq";

import Accordion from "@/components/Accordion/AccordionComponent.vue";
import AccordionItem from "@/components/Accordion/AccordionItemComponent.vue";
import PageTitle from "@/components/Header/PageTitleComponent.vue";

const store = useFaqStore();

onBeforeMount(async () => {
  try {
    await store.load();
  } catch (e) {
    error(e);
  }
});

const faqs: ComputedRef<FAQ[]> = computed(() => store.faqs);
</script>

<template>
  <PageTitle pageTitle="Frequently Asked Questions" pageTitleActive="FAQ" />
  <section class="tf-section wrap-accordion">
    <div class="container" v-if="faqs !== null">
      <div class="row">
        <div class="col-md-12">
          <div class="flat-accordion2">
            <accordion>
              <accordion-item
                class="accordion-item"
                v-for="faq in faqs"
                v-bind:key="faq['question']"
              >
                <template v-slot:accordion-trigger>
                  <button
                    class="accordion-button"
                    v-html="faq['question']"
                  ></button>
                </template>
                <template v-slot:accordion-content>
                  <p v-html="faq['answer']" />
                </template>
              </accordion-item>
            </accordion>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
