<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol :sm="12" :md="12">
            <authors/>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import Authors from "@/components/dashboard/authors/Authors.vue";
export default {
  name: "AuthorsView",
  components: {Authors},
  setup() {
    return {}
  }
}
</script>