<template>
  <CModal :visible="show" @close="$emit('close')" scrollable size="lg">
    <CModalHeader>
      <CModalTitle>Edit wallet {{ wallet.heading }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="text-left">
        <CFormInput
          v-model="wallet.order_by"
          id="order"
          type="text"
          label="Order"
          placeholder="wallet order"
          aria-describedby="order"
        />
        <br/>
        <CFormInput
          v-model="wallet.title"
          id="title"
          type="text"
          label="Title"
          placeholder="wallet title"
          aria-describedby="title"
        />
        <br/>
        <QuillEditor theme="snow"
                     v-model:content="wallet.description"
                     id="description"
                     contentType="html"
                     placeholder="Please enter Description"
                     toolbar="full"
                     :modules="modules"></QuillEditor>
        <br/>
        <CFormSelect
          v-model="wallet.image_id"
          aria-label="Select Image"
          :options="filesOptions">
        </CFormSelect>
        <br/>
        <CFormCheck
          v-model="wallet.enabled"
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
      <CButton color="primary" type="submit" @click.prevent="$emit('save', wallet)">{{ wallet.id ? 'Update' : 'Create' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import {toRefs, ref, onMounted} from "vue";
import {useFilesStore} from "@/stores/dashboard/files";
import {useWalletsStore} from "@/stores/dashboard/wallets";
import {useCategoriesStore} from "@/stores/dashboard/categories";
import {useQuillStore} from "@/stores/dashboard/quill";
import {usePagesStore} from "@/stores/dashboard/pages";

export default {
  name: "WalletsTableModal",
  emits: ["close", "save"],
  props: ["show", "wallet"],
  setup(props) {
    const store = useWalletsStore();
    const fileStore = useFilesStore();
    const { show, wallet } = toRefs(props);

    const filesOptions = ref([
      "Select image"
    ]);

    onMounted(async () => {
      if (store.wallets.length === 0) {
        await store.load();
      }

      if (fileStore.files.length === 0) {
        await fileStore.load();
      }

      const images = fileStore
        .files
        .filter((_file) => _file.provider === "wallet")
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
      wallet,
      filesOptions,
      modules: useQuillStore().setupImageUploader(`page:${usePagesStore().page.title}`)
    }
  },
}
</script>