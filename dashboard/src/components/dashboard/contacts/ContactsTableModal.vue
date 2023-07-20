<template>
  <CModal :visible="show" @close="$emit('close')" scrollable size="lg">
    <CModalHeader>
      <CModalTitle>Edit Contact {{ contact.heading }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="text-left">
        <CFormSelect
          v-model="contact.page_id"
          aria-label="Select Page"
          :options="pagesOptions">
        </CFormSelect>
        <br/>
        <label class="form-label" for="heading">Heading</label>
        <QuillEditor theme="snow"
                     v-model:content="contact.heading"
                     id="heading"
                     contentType="html"
                     placeholder="Please enter heading"
                     :modules="modules"
                     toolbar="full"></QuillEditor>
        <br/>
        <label class="form-label" for="sub_heading">Sub Heading</label>
        <QuillEditor theme="snow"
                     v-model:content="contact.sub_heading"
                     id="sub_heading"
                     contentType="html"
                     placeholder="Please enter sub heading"
                     :modules="modules"
                     toolbar="full"></QuillEditor>
        <br/>
        <CFormInput
          v-model="contact.btn_link"
          id="btnLink"
          type="text"
          label="Button Link"
          placeholder="link for button"
          aria-describedby="btnLink"
        />
        <br/>
        <CFormInput
          v-model="contact.btn_text"
          id="btnText"
          type="text"
          label="Button Text"
          placeholder="text for button"
          aria-describedby="btnText"
        />
        <br/>
        <CFormSelect
          v-model="contact.image_id"
          aria-label="Select Image"
          :options="filesOptions">
        </CFormSelect>
        <br/>
        <CFormCheck
          v-model="contact.enabled"
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
      <CButton color="primary" type="submit" @click.prevent="$emit('save', contact)">{{ contact.id ? 'Update' : 'Create' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import {toRefs, ref, onMounted, computed, nextTick} from "vue";
import {useSliderStore} from "@/stores/dashboard/sliders";
import {useFilesStore} from "@/stores/dashboard/files";
import {useContactsStore} from "@/stores/dashboard/contacts";
import {usePagesStore} from "@/stores/dashboard/pages";
import {useQuillStore} from "@/stores/dashboard/quill";

export default {
  name: "ContactsTableModal",
  emits: ["close", "save"],
  props: ["show", "contact"],
  setup(props) {
    const store = useContactsStore();
    const fileStore = useFilesStore();
    const pagesStore = usePagesStore();

    const { show, contact } = toRefs(props);

    const filesOptions = ref([
      "Select image"
    ]);

    const pagesOptions = ref([
      "Select Page"
    ]);

    onMounted(async () => {
      if (store.contacts.length === 0) {
        await store.load();
      }

      if (fileStore.files.length === 0) {
        await fileStore.load();
      }

      if (pagesStore.pages.length === 0) {
        await pagesStore.load();
      }

      const images = fileStore
        .files
        .filter((_file) => _file.provider === "contact")
        .map((_file) => {
          return {
            value: _file.id,
            label: _file.name
          }
        });
      filesOptions.value.push(...images);

      const pages = pagesStore
        .pages
        .filter((_page) => _page.enabled === true)
        .map((_page) => {
          return {
            value: _page.id,
            label: _page.title,
            order_by: _page.order_by
          }
        });
      pagesOptions.value.push(...pages);
    });

    return {
      show,
      contact,
      filesOptions,
      pagesOptions,
      modules: useQuillStore().setupImageUploader(`page:${pagesStore.page.title}`)
    }
  },
}
</script>