<script lang="ts" setup>
import { useFaqStore } from "@/stores/pages/faq";
import type { FAQ } from "@/types";
import type { ComputedRef } from "vue";
import {computed, onBeforeMount} from "vue";
import { error } from "@/helpers";

import Accordion     from "@/components/Accordion/Accordion.vue";
import AccordionItem from "@/components/Accordion/AccordionItem.vue";
import PageTitle     from "@/components/Header/PageTitle.vue";


const store = useFaqStore();
onBeforeMount(async() => {
  try {
    await store.load();
  } catch (e) {
    error(e);
  }
});

const faqs: ComputedRef<FAQ[]> = computed(() => store.faqs);
</script>

<template>
  <PageTitle
             pageTitle="Frequently Asked Questions"
             pageTitleActive="FAQ"/>
  <section class="tf-section wrap-accordion">
    <div class="container" v-if="faqs !== null">
      <div class="row">
        <div class="col-md-12">
          <div class="flat-accordion2">
            <accordion>
              <accordion-item class="accordion-item" v-for="faq in faqs">
                <template v-slot:accordion-trigger>
                  <button class="accordion-button" v-html="faq['question']"></button>
                </template>
                <template v-slot:accordion-content>
                  <p v-html="faq['answer']"/>
                </template>
              </accordion-item>
            </accordion>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>