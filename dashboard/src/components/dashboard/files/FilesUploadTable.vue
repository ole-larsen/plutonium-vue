<template>
  <CTable striped hover align="middle" responsive="sm" bordered>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Thumb</CTableHeaderCell>
        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
        <CTableHeaderCell scope="col">Ext</CTableHeaderCell>
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
        <CTableDataCell><img class="td-image-thumb" v-if="file.thumb" :src="file.thumb" /></CTableDataCell>
        <CTableDataCell>{{ file.name.length > 10 ? file.name.slice(0, 10) + "..." : file.name }}</CTableDataCell>
        <CTableDataCell>{{ file.ext }}</CTableDataCell>
        <CTableDataCell>{{ file["alt"].length > 10 ? file["alt"].slice(0, 10) + "..." : file["alt"] }}</CTableDataCell>
        <CTableDataCell>{{ file["caption"].length > 10 ? file["caption"].slice(0, 10) + "..." : file["caption"] }}</CTableDataCell>
        <CTableDataCell>{{ file.width }}</CTableDataCell>
        <CTableDataCell>{{ file.height }}</CTableDataCell>
        <CTableDataCell>{{ file.size }}</CTableDataCell>
        <CTableDataCell>{{ file.provider }}</CTableDataCell>
        <CTableDataCell><code>{{ file.status }}</code></CTableDataCell>
        <CTableDataCell>{{ file["created_by_id"] }}</CTableDataCell>
        <CTableDataCell>
          <div class="btn-group">
            <CDropdown>
              <CDropdownToggle>Action</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem
                  :class="{'dropdown-item': true}"
                  href="#"
                  @click="$emit('edit', file)">Edit</CDropdownItem>
                <CDropdownItem
                  :class="{'dropdown-item': true, disabled: file.success || file.error === 'compressing' || file.error === 'image parsing'}"
                  href="#"
                  @click="$emit('uploadFile', file)">Upload</CDropdownItem>
                <CDropdownItem
                  class="dropdown-item"
                  href="#"
                  @click="$emit('remove', file)">Remove</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<script>

import { toRefs, ref } from "vue";
import VueUploadComponent from "vue-upload-component";

export default {
  name: "FilesUploadTable",
  components: {
    FileUpload: VueUploadComponent
  },
  props: ["files"],
  emits: ["edit", "remove", "uploadFile"],
  setup(props) {
    const { files } = toRefs(props);
    const show = ref(false);
    const fileForEdit = ref();
    files.value.map(file => {
      return file;
    })
    return {
      files,
      show,
      fileForEdit
    }
  },
}
</script>
