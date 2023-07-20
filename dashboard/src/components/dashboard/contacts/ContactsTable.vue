<template>
  <hr/>
  <CTable bordered>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Page ID</CTableHeaderCell>
        <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
        <CTableHeaderCell scope="col">Sub Heading</CTableHeaderCell>
        <CTableHeaderCell scope="col">Btn Link</CTableHeaderCell>
        <CTableHeaderCell scope="col">Btn Text</CTableHeaderCell>
        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
        <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
        <CTableHeaderCell scope="col">User</CTableHeaderCell>
        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(contact) in contacts">
        <CTableHeaderCell scope="row">{{ contact.id }}</CTableHeaderCell>
        <CTableDataCell scope="row">{{ contact.page_id }}</CTableDataCell>
        <CTableDataCell v-html="contact.heading"/>
        <CTableDataCell v-html="contact['sub_heading']"/>
        <CTableDataCell v-html="contact['btn_link']"/>
        <CTableDataCell v-html="contact['btn_text']"/>
        <CTableDataCell v-html="contact['image_id']"/>
        <CTableDataCell v-html="contact.enabled"/>
        <CTableDataCell v-html="contact['created_by_id']"/>
        <CTableDataCell>
          <CButtonGroup role="group">
            <CButton color="warning" @click="$emit('edit', contact)">
              <CIcon icon="cilPencil" size="sm"/>
            </CButton>
            <CButton color="danger"  @click="$emit('remove', contact)">
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
  name: "ContactsTable",
  props: ["contacts"],
  emits: ["edit", "remove"],
  setup(props) {
    const { contacts } = toRefs(props);
    return {
      contacts
    }
  },
}
</script>
