<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol :sm="12" :md="12">
            <faqs/>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import Faqs from "@/components/dashboard/faqs/Faqs.vue";
export default {
  name: "FaqsView",
  components: {
    Faqs
  }
}
</script>