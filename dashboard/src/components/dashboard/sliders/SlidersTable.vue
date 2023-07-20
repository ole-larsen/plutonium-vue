<template>
  <hr/>
  <CTable bordered>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
        <CTableHeaderCell scope="col">Description</CTableHeaderCell>
        <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
        <CTableHeaderCell scope="col">User</CTableHeaderCell>
        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(slider) in sliders">
        <CTableDataCell scope="row">{{ slider.id }}</CTableDataCell>
        <CTableDataCell scope="row">{{ slider.provider }}</CTableDataCell>
        <CTableDataCell>{{ slider.title && slider.title.length > 20 ? slider.title.slice(0, 20) + "..." : slider.title }}</CTableDataCell>
        <CTableDataCell v-html="slider.description && slider.description.length > 100 ? slider.description.slice(0, 100) + '...' : slider.description"></CTableDataCell>
        <CTableDataCell>{{ slider.enabled }}</CTableDataCell>
        <CTableDataCell>{{ slider["created_by_id"] }}</CTableDataCell>
        <CTableDataCell>
          <CButtonGroup role="group">
            <CButton color="dark" @click="$emit('edit', slider)">
              <CIcon icon="cilPencil" size="sm"/>
            </CButton>
            <CButton color="dark"  @click="$emit('remove', slider)">
              <CIcon icon="cilXCircle" size="sm"/>
            </CButton>
          </CButtonGroup>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<script>

import { toRefs } from "vue";

export default {
  name: "SlidersTable",
  props: ["sliders"],
  emits: ["edit", "remove"],
  setup(props) {
    const { sliders } = toRefs(props);
    return {
      sliders
    }
  },
}
</script>
