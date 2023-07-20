<template>
  <hr/>
  <CTable striped hover align="middle" responsive="sm" bordered class="category-table">
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col" width="30">ID</CTableHeaderCell>
        <CTableHeaderCell scope="col" width="50">Priority</CTableHeaderCell>
        <CTableHeaderCell scope="col" width="50">Image</CTableHeaderCell>
        <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
        <CTableHeaderCell scope="col">State</CTableHeaderCell>
        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(category) in categories">
        <CTableHeaderCell scope="row" v-if="category.id">{{ category.id }}</CTableHeaderCell>
        <CTableHeaderCell scope="row">{{ category.order_by }}</CTableHeaderCell>
        <CTableDataCell>
          <template v-if="category.image">
            <div class="img-thumb">
              <img :src="category.image.thumb" class="img-fluid img-thumb">
            </div>
          </template>
          <template v-else>
            {{ category.image_id }}
          </template>
        </CTableDataCell>
        <CTableDataCell>{{ category.provider }}</CTableDataCell>
        <CTableDataCell>{{ category.title }}</CTableDataCell>
        <CTableDataCell>{{ category.enabled }}</CTableDataCell>
        <CTableDataCell>
          <CButtonGroup role="group">
            <CButton color="dark" @click="$emit('edit', category)">
              <CIcon icon="cilPencil" size="sm"/>
            </CButton>
            <CButton color="dark"  @click="$emit('remove', category)">
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
  name: "CategoriesTable",
  props: ["categories"],
  emits: ["edit", "remove"],
  setup(props) {
    const { categories } = toRefs(props);
    const files = useFilesStore();
    const setParentTitle = (_category) => {
      if (_category.parent_id) {
        const category = categories.value.find((category) => category.id === _category.parent_id);
        if (category.title) {
          _category.parent_title = category.title;
        }
      }
    }
    const setImage = (_category) => {
      if (_category.image_id) {
        files
          .find(_category.image_id)
          .then((img) => {
            if (img) {
              _category.image_url = import.meta.env.VITE_BACKEND_URL + img.thumb;
            }
        });
      }
    }
    watch(
      () => categories,
      (categories) => {
        categories.value
          .map(async (_category) => {
            setParentTitle(_category);
            await setImage(_category);
            return _category;
          });
      },
      { deep: true }
    );
    return {
      categories
    }
  },
}
</script>
