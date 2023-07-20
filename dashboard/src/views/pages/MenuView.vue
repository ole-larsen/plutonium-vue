<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol :sm="12" :md="12">
            <CCard class="full-height">
              <CCardBody>
                <CCardTitle>Menu Builder</CCardTitle>
                <CCardText>
                  <main-menu/>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import MainMenu from "@/components/dashboard/menu/MainMenu.vue";
export default {
  name: "MenuView",
  components: {
    MainMenu,
  },
  setup() {
    return {
    }
  }
}
</script>