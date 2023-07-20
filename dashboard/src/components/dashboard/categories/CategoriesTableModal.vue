<template>
  <CModal :visible="show" @close="$emit('close')" scrollable size="lg">
    <CModalHeader>
      <CModalTitle>Edit category {{ category.title }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="text-left">
        <CFormSelect
          v-model="category.parent_id"
          aria-label="Select category"
          :options="categoriesOptions">
        </CFormSelect>
        <br/>
        <CFormSelect
          v-model="category.provider"
          aria-label="Select provider"
          :options="providersOptions">
        </CFormSelect>
        <br/>
        <CFormInput
          v-model="category.provider"
          id="provider"
          type="text"
          label="Provider"
          placeholder="category provider"
          aria-describedby="provider"
        />
        <br/>
        <CFormInput
          v-model="category.title"
          id="title"
          type="text"
          label="Title"
          placeholder="category title"
          aria-describedby="title"
        />
        <br/>
        <CFormInput
          v-model="category.slug"
          id="slug"
          type="text"
          label="Slug"
          placeholder="category slug"
          aria-describedby="slug"
        />
        <br/>
        <QuillEditor theme="snow"
                     v-model:content="category.description"
                     id="description"
                     contentType="html"
                     placeholder="Please enter Description"
                     toolbar="full"
        />
        <br/>
        <QuillEditor theme="snow"
                     v-model:content="category.content"
                     id="content"
                     contentType="html"
                     placeholder="Please enter content"
                     toolbar="full"
        />
        <br/>
        <CFormSelect
          v-model="category.image_id"
          aria-label="Select Image"
          :options="filesOptions">
        </CFormSelect>
        <br/>
        <CFormCheck
          v-model="category.enabled"
          id="enabled"
          label="Enabled"
          indeterminate />
        <br/>
        <CFormInput
          v-model="category.order_by"
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
      <CButton color="primary" type="submit" @click.prevent="$emit('save', category)">{{ category.id ? 'Update' : 'Create' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import {toRefs, ref, onMounted, computed, watch} from "vue";
import {useFilesStore} from "@/stores/dashboard/files";
import {useAuthorsStore} from "@/stores/dashboard/authors";
import {useCategoriesStore} from "@/stores/dashboard/categories";

import { QuillEditor } from '@vueup/vue-quill'
import BlotFormatter from 'quill-blot-formatter'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  name: "CategoriesTableModal",
  emits: ["close", "save"],
  props: ["show", "category"],
  setup(props) {
    const fileStore = useFilesStore();
    const store = useCategoriesStore();
    const { show, category } = toRefs(props);

    const filesOptions = ref([
      "Select image"
    ]);

    const categoriesOptions = ref([
      "Select category"
    ]);

    const providersOptions = ref([
      "Select provider",
      {
        value: "page",
        label: "page"
      },
      {
        value: "blog",
        label: "blog"
      },
      {
        value: "collectible",
        label: "collectible"
      }
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
      if (store.categories.length === 0) {
        await store.load();
      }

      if (fileStore.files.length === 0) {
        await fileStore.load();
      }

      const images = fileStore
        .files
        .filter((_file) => _file.provider === "category")
        .map((_file) => {
          if (_file) {
            return {
              value: _file.id.toString(),
              label: _file.name
            }
          }
        });
      filesOptions.value.push(...images);

      if (store.categories.length === 0) {
        await store.load();
      }

      const categories = store
        .categories
        .map((_category) => {
          if (_category) {
            return {
              value: _category.id,
              label: _category.title
            }
          }
        });
      categoriesOptions.value.push(...categories);
    });
    watch(
      () => store.category.title,
      (title) => {
        store.category.slug = slugify(title);
        // Note: `newValue` will be equal to `oldValue` here
        // *unless* state.someObject has been replaced
      },
      { deep: true }
    )

    return {
      show,
      category,
      filesOptions,
      categoriesOptions,
      providersOptions,
      slugify,
    }
  },
}
</script>