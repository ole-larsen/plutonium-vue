<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol :sm="12" :md="12">
            <categories/>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import Categories from "@/components/dashboard/categories/Categories.vue";
export default {
  name: "CategoriesView",
  components: {Categories},
  setup() {
    return {}
  }
}
</script>