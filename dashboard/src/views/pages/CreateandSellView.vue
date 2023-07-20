<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol :sm="12" :md="12">
            <CreateAndSell/>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import CreateAndSell from "@/components/dashboard/createAndSell/CreateAndSell.vue";
export default {
  name: "CreateAndSellView",
  components: {CreateAndSell},
  setup() {
    return {}
  }
}
</script>