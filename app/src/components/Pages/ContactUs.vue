<script lang="ts" setup>
import type { Contact, ContactFormData } from "@/types";
import type { Ref } from "vue";

import { onBeforeMount, ref } from "vue";
import { useContactStore } from "@/stores/pages/contact";
import { error } from "@/helpers";
import { usePageStore } from "@/stores/template/page";

import PageTitle from "@/components/Header/PageTitle.vue";
import ContactForm from "@/components/Contact/ContactForm.vue";

const contact: Ref<Contact | null> = ref(null);
const store = usePageStore();
const contactStore = useContactStore();
const path = store.getPath();
const page = store.getPage(path as string);

onBeforeMount(async () => {
  try {
    console.log(page);
    if (path && page.id) {
      if (!contactStore.getContact(page.id)) {
        await contactStore.load(page.id);
      }
      contact.value = contactStore.getContact(page.id);
      console.log(contact.value);
    }
  } catch( e) {
    error(e);
  }
});

function submit(form: ContactFormData) {
  contactStore.submit(form, page.id);
}

</script>
<template>
  <PageTitle v-if="contact && contact['attributes']"
             pageTitle="Contact Us"/>
  <section class="tf-contact tf-section" v-if="contact && contact['attributes']">
    <div class="themesflat-container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <div class="box-feature-contact" v-if="contact['attributes']['image']">
            <img 
              :src="contact['attributes']['image']['attributes']['url']" 
              :alt="contact['attributes']['image']['attributes']['alt']">
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <div class="form-inner">
            <contact-form
              :heading="contact['attributes']['heading']"
              :subHeading="contact['attributes']['subHeading']"
              @submit="submit" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>