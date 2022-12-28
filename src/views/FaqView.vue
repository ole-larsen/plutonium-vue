<script lang="ts" setup>
import Accordion from "@/components/template/Accordion/Accordion.vue";
import AccordionItem from "@/components/template/Accordion/AccordionItem.vue";
import PageTitle from "@/components/template/PageTitle/PageTitle.vue";
import {useFaqStore} from "@/stores/faq";
import {computed, onBeforeMount, toRaw} from "vue";

const store = useFaqStore();
onBeforeMount(async() => {
  try {
    await store.load();
  } catch (e) {
    console.error(e);
  }
});
const faqs = computed(() => store.faqs);
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