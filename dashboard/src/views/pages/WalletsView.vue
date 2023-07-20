<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol :sm="12" :md="12">
            <wallets/>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import Wallets from "@/components/dashboard/wallets/Wallets.vue";
export default {
  name: "WalletsView",
  components: {Wallets},
  setup() {
    return {}
  }
}
</script>