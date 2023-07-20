<template>
  <CModal :visible="show" @close="$emit('close')" scrollable size="xl">
    <CModalHeader>
      <CModalTitle>Edit page {{ page.heading }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="text-left">
        <CFormSelect
          v-model="page.category_id"
          aria-label="Select category"
          :options="categoriesOptions">
        </CFormSelect>
        <br/>
        <CFormInput
          v-model="page.title"
          id="title"
          type="text"
          label="Title"
          placeholder="page title"
          aria-describedby="title"
        />
        <br/>
        <CFormInput
          v-model="page.slug"
          :value="slugify(page.name)"
          id="slug"
          type="text"
          label="Slug"
          placeholder="page slug"
          aria-describedby="slug"
        />
        <br/>
        <label class="form-label" for="description">Description</label>
        <QuillEditor theme="snow"
                     v-model:content="page.description"
                     id="description"
                     contentType="html"
                     placeholder="Please enter Description"
                     :modules="modules"
                     toolbar="full"></QuillEditor>
        <br/>
        <label class="form-label" for="content">Content</label>
        <QuillEditor theme="snow"
                     v-model:content="page.content"
                     id="content"
                     contentType="html"
                     placeholder="Please enter content"
                     :modules="modules"
                     toolbar="full"
        />
        <br/>
        <label class="form-label" for="image">Image</label>
        <CFormSelect
          v-model="page.image_id"
          aria-label="Select Image"
          :options="filesOptions">
        </CFormSelect>
        <br/>
        <CFormCheck
          v-model="page.enabled"
          id="enabled"
          label="Enabled"
          indeterminate />
        <br/>
        <CFormInput
          v-model="page.order_by"
          id="order_by"
          type="number"
          label="Order BY"
          placeholder="Order"
          aria-describedby="order_by"
        />
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="$emit('close')">
        Close
      </CButton>
      <CButton color="primary" type="submit" @click.prevent="$emit('save', page)">{{ page.id ? 'Update' : 'Create' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import {toRefs, ref, onMounted, watch} from "vue";
import {useFilesStore} from "@/stores/dashboard/files";
import {usePagesStore} from "@/stores/dashboard/pages";
import {useCategoriesStore} from "@/stores/dashboard/categories";
import {useQuillStore} from "@/stores/dashboard/quill";

export default {
  name: "pagesTableModal",
  emits: ["close", "save"],
  props: ["show", "page"],
  setup(props) {
    const store = usePagesStore();
    const fileStore = useFilesStore();
    const categoryStore = useCategoriesStore();
    const { show, page } = toRefs(props);

    const filesOptions = ref([
      "Select image"
    ]);

    const categoriesOptions = ref([
      "Select menu category"
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
      if (store.pages.length === 0) {
        await store.load();
      }

      if (fileStore.files.length === 0) {
        await fileStore.load();
      }

      const images = fileStore
        .files
        .filter((_file) => _file.provider === "page")
        .map((_file) => {
          if (_file) {
            return {
              value: _file.id,
              label: _file.name
            }
          }
        });
      filesOptions.value.push(...images);

      if (categoryStore.categories.length === 0) {
        await categoryStore.load();
      }

      const categories = categoryStore
        .categories
        .filter((_category) => _category.provider === "page")
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
      () => store.page.title,
      (title) => {
        store.page.slug = slugify(title);
        // Note: `newValue` will be equal to `oldValue` here
        // *unless* state.someObject has been replaced
      },
      { deep: true }
    )
    return {
      show,
      page,
      filesOptions,
      categoriesOptions,
      slugify,
      modules: useQuillStore().setupImageUploader(`page:${store.page.title}`)
    }
  },
}
</script>