<template>
  <br/>
  <CTable striped hover align="middle" responsive="sm" class="blog-table">
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col" width="30">ID</CTableHeaderCell>
        <CTableHeaderCell scope="col" width="50">Image</CTableHeaderCell>
        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
        <CTableHeaderCell scope="col">Tags</CTableHeaderCell>
        <CTableHeaderCell scope="col">Author</CTableHeaderCell>
        <CTableHeaderCell scope="col">State</CTableHeaderCell>
        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(blog) in blogs">
        <CTableHeaderCell scope="row" v-if="blog.id">{{ blog.id }}</CTableHeaderCell>
        <CTableDataCell>
          <template v-if="blog.image">
            <div class="img-thumb">
              <img :src="blog.image.thumb" class="img-fluid img-thumb">
            </div>
          </template>
          <template v-else>
            {{ blog.image_id }}
          </template>
        </CTableDataCell>
        <CTableDataCell>{{ blog.title }}</CTableDataCell>
        <CTableDataCell>{{ blog.tags ? blog.tags.map(tag => tag.title) : [] }}</CTableDataCell>
        <CTableDataCell>{{ blog.author ? blog.author.name : '' }}</CTableDataCell>
        <CTableDataCell>{{ blog.enabled }}</CTableDataCell>
        <CTableDataCell>
          <CButtonGroup role="group">
            <CButton color="warning" @click="$emit('edit', blog)">
              <CIcon icon="cilPencil" size="sm"/>
            </CButton>
            <CButton color="danger"  @click="$emit('remove', blog)">
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
  name: "BlogsTable",
  props: ["blogs"],
  emits: ["edit", "remove"],
  setup(props) {
    const { blogs } = toRefs(props);
    return {
      blogs
    }
  },
}
</script>
