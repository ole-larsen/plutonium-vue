<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol :sm="12" :md="12">
            <sliders/>
          </CCol>
        </CRow>
        <br/>
        <CRow>
          <CCol :sm="12" :md="12">
            <sliders-items/>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import Sliders from "@/components/dashboard/sliders/Sliders.vue";
import SlidersItems from "@/components/dashboard/sliders/SlidersItems.vue";
export default {
  name: "SlidersView",
  components: {SlidersItems, Sliders},
  setup() {
    return {}
  }
}
</script>