<template>
  <CCard class="full-height sliders-container">
    <CCardBody>
      <CCardTitle>
        <CButton class="btn btn-dark" @click="create">
          <CIcon :content="cilPlus" size="sm"/> Slider Item
        </CButton>
      </CCardTitle>
      <CCardText>
        <sliders-items-table
          :items="items"
          @edit="edit"
          @remove="remove"/>
        <sliders-items-table-modal
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
import { cilPlus } from "@coreui/icons";
import { computed, onMounted } from "vue";
import { useSlidersItemsStore } from "@/stores/dashboard/slidersItems";
import SlidersItemsTable from "@/components/dashboard/sliders/SlidersItemsTable.vue";
import SlidersItemsTableModal from "@/components/dashboard/sliders/SlidersItemsTableModal.vue";
export default {
  name: "SlidersItems",
  components: {SlidersItemsTableModal, SlidersItemsTable},
  setup() {
    const store = useSlidersItemsStore();
    const show = computed(() => store.show);
    onMounted(async () => {
      await store.load();
    });
    return {
      cilPlus,
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