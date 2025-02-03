<script lang="ts" setup>
import type { PublicContactDto, ContactFormData } from "@/types";
import type { Ref } from "vue";

import { onBeforeMount, ref } from "vue";
import { error } from "@/helpers";

import PageTitle from "@/components/Template/Header/PageTitleComponent.vue";
import ContactForm from "@/components/Contact/ContactFormComponent.vue";
import { usePageStore } from "./store/page";
import { useContactStore } from "./store/contact";

const contact: Ref<PublicContactDto | null> = ref(null);
const pageStore = usePageStore();
const store = useContactStore();
const path = pageStore.getPath();
const page = pageStore.getPage(path as string);

onBeforeMount(async () => {
  try {
    if (path && page.id) {
      if (!store.getContact(page.id)) {
        await store.load(page.id);
      }
      contact.value = store.getContact(page.id);
    }
  } catch (e) {
    error(e);
  }
});

function submit(form: ContactFormData) {
  store.submit(form, page.id);
}
</script>
<template>
  <PageTitle v-if="contact && contact['attributes']" pageTitle="Contact Us" />
  <section
    class="tf-contact tf-section"
    v-if="contact && contact['attributes']"
  >
    <div class="themesflat-container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <div
            class="box-feature-contact"
            v-if="contact['attributes']['image']"
          >
            <img
              :src="contact['attributes']['image']['attributes']['url']"
              :alt="contact['attributes']['image']['attributes']['alt']"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <div class="form-inner">
            <contact-form
              :heading="contact['attributes']['heading']"
              :subHeading="contact['attributes']['subHeading']"
              @submit="submit"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
