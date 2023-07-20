<template>
  <CCard class="full-height faqs-container">
    <CCardBody>
      <CCardTitle><CButton class="btn btn-primary" @click="create">Create Faq</CButton></CCardTitle>
      <CCardText>
        <faqs-table
          :faqs="faqs"
          @edit="edit"
          @remove="remove"/>
        <faqs-table-modal
          :faq="faq"
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
import FaqsTableModal from "@/components/dashboard/faqs/FaqsTableModal.vue";
import FaqsTable from "@/components/dashboard/faqs/FaqsTable.vue";
import {useFaqsStore} from "@/stores/dashboard/faqs";
export default {
  name: "Faqs",
  components: {FaqsTableModal, FaqsTable},
  setup() {
    const store = useFaqsStore();
    const show = computed(() => store.show);
    onMounted(async () => {
      await store.load();
    });
    return {
      show,
      faqs: computed(() => store.faqs),
      faq: computed(() => store.faq),
      create() {
        store.toggleModal();
        store.new();
      },
      close() {
        store.toggleModal();
        store.new();
      },
      save(faq) {
        store.save(faq);
        store.toggleModal();
      },
      edit(faq) {
        store.setItem(faq);
        store.toggleModal();
      },
      remove(faq) {
        console.log(faq);
        //store.toggleModal();
      }
    }
  }
}
</script>