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
        <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(item) in items">
        <CTableHeaderCell scope="row">{{ item.id }}</CTableHeaderCell>
        <CTableDataCell>
          <template v-if="item.image_url">
            <div class="img-thumb">
              <img :src="item.image_url" class="img-fluid img-thumb">
            </div>
          </template>
          <template v-else>
            {{ item.image_id }}
          </template>
        </CTableDataCell>
        <CTableDataCell v-if="item.title">
          <CBadge color="info" v-html="item.provider"/>
          <br/>
          {{ item.title.length > 100 ? item.title.slice(0, 100) + "..." : item.title }}</CTableDataCell>
        <CTableDataCell v-html="item.description && item.description.length > 100 ? item.description.slice(0, 100) + '...' : String(item.description)"></CTableDataCell>
         <CTableDataCell v-html="item.enabled"></CTableDataCell>
        <CTableDataCell>
          <CButtonGroup role="group">
            <CButton color="warning" @click="$emit('edit', item)">
              <CIcon icon="cilPencil" size="sm"/>
            </CButton>
            <CButton color="danger"  @click="$emit('remove', item)">
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
  name: "CreateAndSellTable",
  props: ["items"],
  emits: ["edit", "remove"],
  setup(props) {
    const { items } = toRefs(props);
    const files = useFilesStore();
    watch(
      () => items,
      (_items) => {
        if (_items) {
          console.log(_items.value);
          // _items.value.map(async (_item) => {
          //   const img = await files.find(_item.image_id);
          //   if (img) {
          //     _item.image_url = import.meta.env.VITE_BACKEND_URL + img.thumb;
          //   }
          //   return _item;
          // });
        }
        // Note: `newValue` will be equal to `oldValue` here
        // *unless* state.someObject has been replaced
      },
      { deep: true }
    )
    return {
      items
    }
  },
}
</script>
