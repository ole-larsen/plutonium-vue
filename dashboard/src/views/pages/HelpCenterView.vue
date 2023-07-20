<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol :sm="12" :md="12">
            <help-center/>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import HelpCenter from "@/components/dashboard/helpCenter/HelpCenter.vue";
export default {
  name: "HelpCenterView",
  components: {HelpCenter}
}
</script>