<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol :sm="12" :md="12">
            <blogs/>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import Blogs from "@/components/dashboard/blogs/Blogs.vue";
export default {
  name: "BlogsView",
  components: {Blogs},
  setup() {
    return {}
  }
}
</script>