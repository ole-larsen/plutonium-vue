<template>
  <hr/>
  <CTable bordered>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
        <CTableHeaderCell scope="col">Description</CTableHeaderCell>
        <CTableHeaderCell scope="col">Order</CTableHeaderCell>
        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
        <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
        <CTableHeaderCell scope="col">User</CTableHeaderCell>
        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(wallet) in wallets">
        <CTableDataCell scope="row" >{{ wallet.id }}</CTableDataCell>
        <CTableDataCell >{{ wallet.title.length > 100 ? wallet.title.slice(0, 100) + "..." : wallet.title }}</CTableDataCell>
        <CTableDataCell >{{ wallet.description.length > 100 ? wallet.description.slice(0, 100) + "..." : wallet.description }}</CTableDataCell>
        <CTableDataCell >{{ wallet["order_by"] }}</CTableDataCell>
        <CTableDataCell >{{ wallet["image_id"] }}</CTableDataCell>
        <CTableDataCell >{{ wallet.enabled }}</CTableDataCell>
        <CTableDataCell >{{ wallet["created_by_id"] }}</CTableDataCell>
        <CTableDataCell>
          <CButtonGroup role="group">
            <CButton color="warning" @click="$emit('edit', wallet)">
              <CIcon icon="cilPencil" size="sm"/>
            </CButton>
            <CButton color="danger"  @click="$emit('remove', wallet)">
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
  name: "WalletsTable",
  props: ["wallets"],
  emits: ["edit", "remove"],
  setup(props) {
    const { wallets } = toRefs(props);
    return {
      wallets
    }
  },
}
</script>
