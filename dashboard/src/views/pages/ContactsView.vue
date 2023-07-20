<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol :sm="12" :md="12">
            <contacts/>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import Contacts from "@/components/dashboard/contacts/Contacts.vue";
export default {
  name: "ContactsView",
  components: {Contacts},
  setup() {
    return {}
  }
}
</script>