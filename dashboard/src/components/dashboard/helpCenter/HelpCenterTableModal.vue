<template>
  <CModal :visible="show" @close="$emit('close')" scrollable size="lg">
    <CModalHeader>
      <CModalTitle>Edit helpCenter {{ helpCenter.heading }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="text-left">
        <CFormInput
          v-model="helpCenter.order_by"
          id="order"
          type="text"
          label="Order"
          placeholder="helpCenter order"
          aria-describedby="order"
        />
        <br/>
        <CFormInput
          v-model="helpCenter.title"
          id="title"
          type="text"
          label="Title"
          placeholder="helpCenter title"
          aria-describedby="title"
        />
        <br/>
        <CFormInput
          v-model="helpCenter.slug"
          id="slug"
          type="text"
          label="Slug"
          placeholder="helpCenter slug"
          aria-describedby="slug"
        />
        <br/>
        <QuillEditor theme="snow"
                     v-model:content="helpCenter.description"
                     id="description"
                     contentType="html"
                     placeholder="Please enter Description"
                     toolbar="full"
                     :modules="modules"></QuillEditor>
        <br/>
        <CFormSelect
          v-model="helpCenter.image_id"
          aria-label="Select Image"
          :options="filesOptions">
        </CFormSelect>
        <br/>
        <CFormCheck
          v-model="helpCenter.enabled"
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
      <CButton color="primary" type="submit" @click.prevent="$emit('save', helpCenter)">{{ helpCenter.id ? 'Update' : 'Create' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import {toRefs, ref, onMounted, watch} from "vue";
import {useFilesStore} from "@/stores/dashboard/files";
import {useHelpCenterStore} from "@/stores/dashboard/helpCenter";
import {useCategoriesStore} from "@/stores/dashboard/categories";
import {useQuillStore} from "@/stores/dashboard/quill";
import {usePagesStore} from "@/stores/dashboard/pages";

export default {
  name: "HelpCenterTableModal",
  emits: ["close", "save"],
  props: ["show", "helpCenter"],
  setup(props) {
    const store = useHelpCenterStore();
    const fileStore = useFilesStore();
    const { show, helpCenter } = toRefs(props);
    const categoryStore = useCategoriesStore();

    const categoriesOptions = ref([
      "Select category"
    ]);

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
      if (store.helpCenters.length === 0) {
        await store.load();
      }

      if (fileStore.files.length === 0) {
        await fileStore.load();
      }

      const images = fileStore
        .files
        .filter((_file) => _file.provider === "helpCenter")
        .map((_file) => {
          return {
            value: _file.id,
            label: _file.name
          }
        });
      filesOptions.value.push(...images);

      if (categoryStore.categories.length === 0) {
        await categoryStore.load();
      }
      const categories = categoryStore
        .categories
        .filter((_category) => _category.provider === "helpCenter")
        .map((_category) => {
          if (_category) {
            return {
              value: _category.id,
              label: _category.parent_id ? `- ${_category.title}` : `${_category.title}`,
              order_by: _category.order_by
            }
          }
        });
      categories.sort((a, b) => a.order_by > b.order_by ? 1 : -1)
      categoriesOptions.value.push(...categories);

    });
    watch(
      () => store.helpCenter.title,
      (title) => {
        store.helpCenter.slug = slugify(title);
        // Note: `newValue` will be equal to `oldValue` here
        // *unless* state.someObject has been replaced
      },
      { deep: true }
    )
    return {
      show,
      helpCenter,
      filesOptions,
      categoriesOptions,
      modules: useQuillStore().setupImageUploader(`page:${usePagesStore().page.title}`)
    }
  },
}
</script>