<template>
  <CModal :visible="show" @close="$emit('close')" scrollable size="lg">
    <CModalHeader>
      <CModalTitle>Edit faq {{ faq.question }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="text-left">
        <CFormInput
          v-model="faq.order_by"
          id="order"
          type="number"
          label="Order"
          placeholder="faq order"
          aria-describedby="order"
        />
        <br/>
        <CFormInput
          v-model="faq.question"
          id="question"
          type="text"
          label="question"
          placeholder="faq question"
          aria-describedby="question"
        />
        <QuillEditor theme="snow"
                     v-model:content="faq.answer"
                     id="answer"
                     contentType="html"
                     placeholder="Please enter answer"
                     toolbar="full"
                     :modules="modules"
        />
        <br/>
        <CFormCheck
          v-model="faq.enabled"
          id="enabled"
          label="Enabled"
          indeterminate />
        <br/>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="$emit('close')">
        Close
      </CButton>
      <CButton color="primary" type="submit" @click.prevent="$emit('save', faq)">{{ faq.id ? 'Update' : 'Create' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import {toRefs, onMounted, ref} from "vue";
import {useFaqsStore} from "@/stores/dashboard/faqs";
import {usePagesStore} from "@/stores/dashboard/pages";
import {useQuillStore} from "@/stores/dashboard/quill";

export default {
  name: "FaqsTableModal",
  emits: ["close", "save"],
  props: ["show", "faq"],
  setup(props) {
    const store = useFaqsStore();
    const { show, faq } = toRefs(props);

    onMounted(async () => {
      if (store.faqs.length === 0) {
        await store.load();
      }
    });

    return {
      show,
      faq,
      modules: useQuillStore().setupImageUploader(`page:${usePagesStore().page.title}`)
    }
  },
}
</script>