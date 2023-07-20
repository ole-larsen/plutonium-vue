<template>
  <CCard class="full-height help-centers-container">
    <CCardBody>
      <CCardTitle><CButton class="btn btn-primary" @click="create">Create Help Center</CButton></CCardTitle>
      <CCardText>
        <help-center-table
          :helpCenters="helpCenters"
          @edit="edit"
          @remove="remove"/>
        <help-center-table-modal
          :helpCenter="helpCenter"
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
import HelpCenterTable from "@/components/dashboard/helpCenter/HelpCenterTable.vue";
import HelpCenterTableModal from "@/components/dashboard/helpCenter/HelpCenterTableModal.vue";
import {useHelpCenterStore} from "@/stores/dashboard/helpCenter";
export default {
  name: "HelpCenter",
  components: {HelpCenterTableModal, HelpCenterTable},
  setup() {
    const store = useHelpCenterStore();
    const show = computed(() => store.show);
    onMounted(async () => {
      await store.load();
    });
    return {
      show,
      helpCenters: computed(() => store.helpCenters),
      helpCenter: computed(() => store.helpCenter),
      create() {
        store.toggleModal();
        store.new();
      },
      close() {
        store.toggleModal();
        store.new();
      },
      save(helpCenter) {
        store.save(helpCenter);
        store.toggleModal();
      },
      edit(helpCenter) {
        store.setItem(helpCenter);
        store.toggleModal();
      },
      remove(helpCenter) {
        console.log(helpCenter);
        //store.toggleModal();
      }
    }
  }
}
</script>