<template>
  <CCard class="full-height authors-container">
    <CCardBody>
      <CCardTitle><CButton class="btn btn-primary" @click="create">Create Item</CButton></CCardTitle>
      <CCardText>
        <create-and-sell-table
          :items="items"
          @edit="edit"
          @remove="remove"/>
        <create-and-sell-table-modal
          :item="item"
          :show="show"
          @close="close"
          @save="save"
        />
      </CCardText>
    </CCardBody>
  </CCard>
</template>

<script>
import {computed, onMounted} from "vue";
import CreateAndSellTableModal from "@/components/dashboard/createAndSell/CreateAndSellTableModal.vue";
import CreateAndSellTable from "@/components/dashboard/createAndSell/CreateAndSellTable.vue";

import {useCreateAndSellStore} from "@/stores/dashboard/createAndSell";
export default {
  name: "CreateAndSell",
  components: {CreateAndSellTableModal, CreateAndSellTable},
  setup() {
    const store = useCreateAndSellStore();
    const show = computed(() => store.show);
    onMounted(async () => {
      await store.load();
    });
    return {
      show,
      items: computed(() => store.items),
      item: computed(() => store.item),
      create() {
        store.toggleModal();
        store.new();
      },
      close() {
        store.toggleModal();
        store.new();
      },
      save(item) {
        store.save(item);
        store.toggleModal();
      },
      edit(item) {
        store.setItem(item);
        store.toggleModal();
      },
      remove(item) {
        console.log(item);
        //store.toggleModal();
      }
    }
  }
}
</script>