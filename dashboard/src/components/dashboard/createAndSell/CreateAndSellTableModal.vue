<template>
  <CModal :visible="show" @close="$emit('close')" scrollable size="lg">
    <CModalHeader>
      <CModalTitle>Edit item {{ item.title }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="text-left">
        <CFormInput
          v-model="item.title"
          id="title"
          type="text"
          label="Title"
          placeholder="item title"
          aria-describedby="title"
        />
        <br/>
        <CFormInput
          v-model="item.link"
          id="title"
          type="text"
          label="Link"
          placeholder="item link"
          aria-describedby="link"
        />
        <br/>
        <QuillEditor theme="snow" v-if="item && Object.keys(item).includes('description')"
                     v-model:content="item.description"
                     id="description"
                     contentType="html"
                     placeholder="Please enter Description"
                     toolbar="full"></QuillEditor>
        <br/>
        <CRow>
          <CCol xs>
            <CFormInput
              v-model="item.order_by"
              id="order_by"
              type="number"
              label="Order"
              placeholder="item order"
              aria-describedby="order_by"
            />
            <br/>
            <CFormCheck
              v-model="item.enabled"
              id="enabled"
              label="Enabled"
              indeterminate />
          </CCol>
          <CCol xs>
            <label class="form-label" for="name">Item Image</label>
            <CFormSelect
              v-model="item.image_id"
              aria-label="Select Image"
              :options="filesOptions">
            </CFormSelect>
            <br/>
            <div v-if="item.image_url" class="author-thumb">
              <img :src="item.image_url">
            </div>
          </CCol>
        </CRow>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="$emit('close')">
        Close
      </CButton>
      <CButton color="primary" type="submit" @click.prevent="$emit('save', item)">{{ item.id ? 'Update' : 'Create' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import {toRefs, ref, onMounted, watch} from "vue";
import {useFilesStore} from "@/stores/dashboard/files";
import {useCreateAndSellStore} from "@/stores/dashboard/createAndSell";

export default {
  name: "CreateAndSellTableModal",
  emits: ["close", "save"],
  props: ["show", "item"],
  setup(props) {
    const store = useCreateAndSellStore();
    const fileStore = useFilesStore();
    const { show, item } = toRefs(props);

    const filesOptions = ref([
      "Select image"
    ]);

    const slugify = (str) =>
      str
        ? str
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")
        : "";

    onMounted(async () => {
      if (store.items.length === 0) {
        await store.load();
      }

      if (fileStore.files.length === 0) {
        await fileStore.load();
      }

      const images = fileStore
        .files
        .filter((_file) => _file.provider === "create-and-sell")
        .map((_file) => {
          return {
            value: _file.id,
            label: _file.name
          }
        });
      filesOptions.value.push(...images);
    });

    return {
      show,
      item,
      filesOptions
    }
  },
}
</script>