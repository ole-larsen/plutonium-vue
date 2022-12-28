<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";
import {useContactStore} from "@/stores/contact";
import {usePageStore} from "@/stores/page";
import ContactForm from "@/components/template/Contact/ContactForm.vue";
import PageTitle from "@/components/template/PageTitle/PageTitle.vue";
const contact = ref(null);
const pageStore = usePageStore();
const store = useContactStore();

onBeforeMount(async () => {
  if (pageStore.path) {
    const page = pageStore.page(pageStore.path);
    if (page.id) {
      if (!store.contact(page.id)) {
        await store.load(page.id);
      }
      contact.value = store.contact(page.id);
    }
  }

});

async function submit(form: any) {
  if (pageStore.path) {
    const page = pageStore.page(pageStore.path);
    await store.submit(form, page.id);
  }
}

</script>
<template>

  <PageTitle v-if="contact && contact['attributes']"
             pageTitle="Contact Us"
             :pageTitleActive="contact['attributes']['title']"
             :link="contact['attributes']['title']" />
  <section class="tf-contact tf-section" v-if="contact && contact['attributes']">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-12">
        <div class="box-feature-contact" v-if="contact['attributes']['image']">
          <img :src="contact['attributes']['image']['attributes']['url']" :alt="contact['attributes']['image']['attributes']['alt']">
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-12">
        <div class="form-inner">
          <contact-form
            :heading="contact['attributes']['heading']"
            :subHeading="contact['attributes']['subHeading']"
            :csrf="contact['attributes']['csrf']"
            @submit="submit" />
        </div>
      </div>
    </div>
  </section>
</template>