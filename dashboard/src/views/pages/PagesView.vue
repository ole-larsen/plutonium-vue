<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol :sm="12" :md="12">
            <pages/>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import Pages from "@/components/dashboard/pages/Pages.vue";
export default {
  name: "PagesView",
  components: {Pages},
  setup() {
    return {}
  }
}
</script>