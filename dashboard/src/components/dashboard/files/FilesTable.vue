<template>
  <CTable v-if="files.length > 0" striped hover align="middle" responsive="sm" bordered>

    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Thumb</CTableHeaderCell>
        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
        <CTableHeaderCell scope="col">Alt</CTableHeaderCell>
        <CTableHeaderCell scope="col">Caption</CTableHeaderCell>
        <CTableHeaderCell scope="col">Width</CTableHeaderCell>
        <CTableHeaderCell scope="col">Height</CTableHeaderCell>
        <CTableHeaderCell scope="col">Size</CTableHeaderCell>
        <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
        <CTableHeaderCell scope="col">User</CTableHeaderCell>
        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(file, index) in files">
        <CTableHeaderCell scope="row">{{ index }}</CTableHeaderCell>
        <CTableDataCell><img class="td-image-thumb" :src="file.thumb" /></CTableDataCell>
        <CTableDataCell>{{ file.name.length > 10 ? file.name.slice(0, 10) + "..." : file.name }}</CTableDataCell>
        <CTableDataCell>{{ file["alt"].length > 10 ? file["alt"].slice(0, 10) + "..." : file["alt"] }}</CTableDataCell>
        <CTableDataCell>{{ file["caption"].length > 10 ? file["caption"].slice(0, 10) + "..." : file["caption"] }}</CTableDataCell>
        <CTableDataCell>{{ file.width }}</CTableDataCell>
        <CTableDataCell>{{ file.height }}</CTableDataCell>
        <CTableDataCell>{{ file.size }}</CTableDataCell>
        <CTableDataCell>{{ file.provider }}</CTableDataCell>
        <CTableDataCell><code>{{ file.status }}</code></CTableDataCell>
        <CTableDataCell>{{ file["created_by_id"] }}</CTableDataCell>
        <CTableDataCell>
          <CButtonGroup role="group">
            <CButton color="dark" @click="$emit('uploadFile', file)">
              <CIcon icon="cilFile" size="sm"/>
            </CButton>
            <CButton color="dark" @click="$emit('edit', file)">
              <CIcon icon="cilPencil" size="sm"/>
            </CButton>
            <CButton color="dark"  @click="$emit('remove', file)">
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
  name: "FilesTable",
  props: ["files"],
  emits: ["edit", "remove", "uploadFile"],
  setup(props) {
    const { files } = toRefs(props)
    return {
      files,
    }
  },
}
</script>
