<template>
  <hr/>
  <CTable striped hover align="middle" responsive="sm">
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
        <CTableHeaderCell scope="col">Description</CTableHeaderCell>
        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
        <CTableHeaderCell scope="col">Slug</CTableHeaderCell>
        <CTableHeaderCell scope="col">Btn Link</CTableHeaderCell>
        <CTableHeaderCell scope="col">Btn Text</CTableHeaderCell>
        <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(author) in authors">
        <CTableHeaderCell scope="row">{{ author.id }}</CTableHeaderCell>
        <CTableDataCell>
          <template v-if="author.image_url">
            <div class="img-thumb">
              <img :src="author.image_url" class="img-fluid img-thumb">
            </div>
          </template>
          <template v-else>
            {{ author.image_id }}
          </template>
        </CTableDataCell>
        <CTableDataCell v-if="author.title">
          <CBadge color="info" v-html="author.provider"/>
          <br/>
          {{ author.title.length > 100 ? author.title.slice(0, 100) + "..." : author.title }}</CTableDataCell>
        <CTableDataCell v-html="author.description.length > 100 ? author.description.slice(0, 100) + '...' : author.description"></CTableDataCell>
        <CTableDataCell v-html="author.name.length > 100 ? author.name.slice(0, 100) + '...' : author.name"></CTableDataCell>
        <CTableDataCell v-html="author.slug"></CTableDataCell>
        <CTableDataCell v-html="author['btn_link']"></CTableDataCell>
        <CTableDataCell v-html="author['btn_text']"></CTableDataCell>
         <CTableDataCell v-html="author.enabled"></CTableDataCell>
        <CTableDataCell>
          <CButtonGroup role="group">
            <CButton color="warning" @click="$emit('edit', author)">
              <CIcon icon="cilPencil" size="sm"/>
            </CButton>
            <CButton color="danger"  @click="$emit('remove', author)">
              <CIcon icon="cilXCircle" size="sm"/>
            </CButton>
          </CButtonGroup>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<script>

import {toRefs, watch} from "vue";
import {useFilesStore} from "@/stores/dashboard/files";

export default {
  name: "AuthorsTable",
  props: ["authors"],
  emits: ["edit", "remove"],
  setup(props) {
    const { authors } = toRefs(props);
    const files = useFilesStore();
    watch(
      () => authors,
      (authors) => {
        authors.value.map(async (author) => {
          const img = await files.find(author.image_id);
          if (img) {
            author.image_url = import.meta.env.VITE_BACKEND_URL + img.thumb;
          }
          return author;
        });
        // Note: `newValue` will be equal to `oldValue` here
        // *unless* state.someObject has been replaced
      },
      { deep: true }
    )
    return {
      authors
    }
  },
}
</script>
