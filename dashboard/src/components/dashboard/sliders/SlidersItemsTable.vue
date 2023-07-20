<template>
  <hr/>
  <CTable bordered>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Slider</CTableHeaderCell>
        <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
        <CTableHeaderCell scope="col">Description</CTableHeaderCell>
        <CTableHeaderCell scope="col">Btn Link 1</CTableHeaderCell>
        <CTableHeaderCell scope="col">Btn Text 1</CTableHeaderCell>
        <CTableHeaderCell scope="col">Btn Link 2</CTableHeaderCell>
        <CTableHeaderCell scope="col">Btn Text 2</CTableHeaderCell>
        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
        <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
        <CTableHeaderCell scope="col">User</CTableHeaderCell>
        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(item) in items">
        <CTableHeaderCell scope="row" v-if="item.id">{{ item.id }}</CTableHeaderCell>
        <CTableDataCell v-if="item['slider_id']">{{ item["slider_id"]}}</CTableDataCell>
        <CTableDataCell v-html="item.heading && item.heading.length > 100 ? item.heading.slice(0, 100) + '...' : item.heading"></CTableDataCell>
        <CTableDataCell v-html="item.description && item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description"></CTableDataCell>
        <CTableDataCell v-if="item['btn_link_1']">{{ item["btn_link_1"] }}</CTableDataCell>
        <CTableDataCell v-if="item['btn_text_1']">{{ item["btn_text_1"] }}</CTableDataCell>
        <CTableDataCell v-if="item['btn_link_2']">{{ item["btn_link_2"] }}</CTableDataCell>
        <CTableDataCell v-if="item['btn_text_2']">{{ item["btn_text_2"] }}</CTableDataCell>
        <CTableDataCell v-if="item['image_id']">{{ item["image_id"] }}</CTableDataCell>
        <CTableDataCell v-if="item.enabled">{{ item.enabled }}</CTableDataCell>
        <CTableDataCell v-if="item['created_by_id']">{{ item["created_by_id"] }}</CTableDataCell>
        <CTableDataCell>
          <CButtonGroup role="group">
            <CButton color="dark" @click="$emit('edit', item)">
              <CIcon icon="cilPencil" size="sm"/>
            </CButton>
            <CButton color="dark"  @click="$emit('remove', item)">
              <CIcon icon="cilXCircle" size="sm"/>
            </CButton>
          </CButtonGroup>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<script>

import {toRefs} from "vue";

export default {
  name: "SlidersItemsTable",
  props: ["items"],
  emits: ["edit", "remove"],
  setup(props) {
    const { items } = toRefs(props);
    return {
      items
    }
  },
}
</script>
