<template>
  <hr/>
  <CTable bordered>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Parent</CTableHeaderCell>
        <CTableHeaderCell scope="col">Pages</CTableHeaderCell>
        <CTableHeaderCell scope="col">Blogs</CTableHeaderCell>
        <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
        <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
        <CTableHeaderCell scope="col">User</CTableHeaderCell>
        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(tag) in tags">
        <CTableDataCell scope="row" >{{ tag.id }}</CTableDataCell>
        <CTableDataCell scope="row" >{{ tag.parent_id }}</CTableDataCell>
        <CTableDataCell scope="row" >{{ tag.page_id.length > 0 ? tag.page_id.length : '' }}</CTableDataCell>
        <CTableDataCell scope="row" >{{ tag.blog_id.length > 0 ? tag.blog_id.length : '' }}</CTableDataCell>
        <CTableDataCell scope="row" >{{ tag.provider }}</CTableDataCell>
        <CTableDataCell >{{ tag.title }}</CTableDataCell>
        <CTableDataCell >{{ tag.enabled }}</CTableDataCell>
        <CTableDataCell >{{ tag["created_by_id"] }}</CTableDataCell>
        <CTableDataCell>
          <CButtonGroup role="group">
            <CButton color="warning" @click="$emit('edit', tag)">
              <CIcon icon="cilPencil" size="sm"/>
            </CButton>
            <CButton color="danger"  @click="$emit('remove', tag)">
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
  name: "TagsTable",
  props: ["tags"],
  emits: ["edit", "remove"],
  setup(props) {
    const { tags } = toRefs(props);
    return {
      tags
    }
  },
}
</script>
