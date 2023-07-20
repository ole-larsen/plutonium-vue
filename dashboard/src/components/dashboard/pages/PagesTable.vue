<template>
  <hr/>
  <CTable striped hover align="middle" responsive="sm" bordered class="page-table">
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col" width="30">ID</CTableHeaderCell>
        <CTableHeaderCell scope="col" width="150">Category</CTableHeaderCell>
        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
        <CTableHeaderCell scope="col">State</CTableHeaderCell>
        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(page) in pages">
        <CTableHeaderCell scope="row" v-if="page.id">{{ page.id }}</CTableHeaderCell>
        <CTableDataCell width="150">
          <template v-if="page.category_title">
            {{ page.category_title }}
          </template>
          <template v-else>
            {{ page.category_id }}
          </template>
        </CTableDataCell>
        <CTableDataCell>{{ page.title }}</CTableDataCell>
        <CTableDataCell>{{ page.enabled }}</CTableDataCell>
        <CTableDataCell>
          <CButtonGroup role="group">
            <CButton color="dark" @click="$emit('edit', page)">
              <CIcon icon="cilPencil" size="sm"/>
            </CButton>
            <CButton color="dark"  @click="$emit('remove', page)">
              <CIcon icon="cilXCircle" size="sm"/>
            </CButton>
          </CButtonGroup>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<script>

import {onBeforeMount, toRefs, watch, computed} from "vue";
import {useFilesStore} from "@/stores/dashboard/files";
import {useCategoriesStore} from "@/stores/dashboard/categories";
import {useAuthorsStore} from "@/stores/dashboard/authors";

export default {
  name: "PagesTable",
  props: ["pages"],
  emits: ["edit", "remove"],
  setup(props) {
    const { pages } = toRefs(props);
    const files = useFilesStore();

    const categories = computed(() => useCategoriesStore().categories);
    const authors = computed(() => useAuthorsStore().authors);

    watch(
      () => pages,
      (pages) => {
        pages.value.map(async (page) => {
          if (page.image_id) {
            const img = await files.find(page.image_id);
            if (img) {
              page.image_url = import.meta.env.VITE_BACKEND_URL + img.thumb;
            }
          }
          const category = categories.value.find(category => category.id === page.category_id);
          if (category) {
            page.category_title = category.title;
          }
          if (page.author_id) {
            const author = await authors.value.find((author) => author.id === page.author_id);
            if (author) {
              page.author_name = author.name;
            }
          }
          return page;
        });
        // Note: `newValue` will be equal to `oldValue` here
        // *unless* state.someObject has been replaced
      },
      { deep: true }
    );
    onBeforeMount(async () => {
      if (categories.value.length === 0) {
        await useCategoriesStore().load();
        await useAuthorsStore().load();
      }
    });
    return {
      pages
    }
  },
}
</script>