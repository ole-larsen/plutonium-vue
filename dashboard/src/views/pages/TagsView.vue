<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol :sm="12" :md="12">
            <tags/>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import Tags from "@/components/dashboard/tags/Tags.vue";
export default {
  name: "WalletsView",
  components: {Tags},
  setup() {
    return {}
  }
}
</script>