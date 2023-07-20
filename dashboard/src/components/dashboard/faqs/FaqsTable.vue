<template>
  <hr/>
  <CTable bordered>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Question</CTableHeaderCell>
        <CTableHeaderCell scope="col">Answer</CTableHeaderCell>
        <CTableHeaderCell scope="col">Order</CTableHeaderCell>
        <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
        <CTableHeaderCell scope="col">User</CTableHeaderCell>
        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(faq) in faqs">
        <CTableDataCell scope="row">{{ faq.id }}</CTableDataCell>
        <CTableDataCell>{{ faq.question.length > 10 ? faq.question.slice(0, 10) + "..." : faq.question }}</CTableDataCell>
        <CTableDataCell>{{ faq.answer.length > 10 ? faq.answer.slice(0, 10) + "..." : faq.answer }}</CTableDataCell>
        <CTableDataCell>{{ faq["order_by"] }}</CTableDataCell>
        <CTableDataCell>{{ faq.enabled }}</CTableDataCell>
        <CTableDataCell>{{ faq["created_by_id"] }}</CTableDataCell>
        <CTableDataCell>
          <CButtonGroup role="group">
            <CButton color="warning" @click="$emit('edit', faq)">
              <CIcon icon="cilPencil" size="sm"/>
            </CButton>
            <CButton color="danger"  @click="$emit('remove', faq)">
              <CIcon icon="cilXCircle" size="sm"/>
            </CButton>
          </CButtonGroup>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<script>

import {toRefs} from "vue";

export default {
  name: "FaqsTable",
  props: ["faqs"],
  emits: ["edit", "remove"],
  setup(props) {
    const { faqs } = toRefs(props);
    return {
      faqs
    }
  },
}
</script>
