<template>
  <CCard class="full-height sliders-container">
    <CCardBody>
      <CCardTitle>
        <CButton class="btn btn-dark" @click="create">
          <CIcon :content="cilPlus" size="sm"/> Slider
        </CButton>
      </CCardTitle>
      <CCardText>
        <sliders-table
          :sliders="sliders"
          @edit="edit"
          @remove="remove" />
        <sliders-table-modal
          :show="show"
          :slider="slider"
          @close="close"
          @save="save"
        />
      </CCardText>
    </CCardBody>
  </CCard>
</template>

<script>
import { cilPlus } from "@coreui/icons";
import {computed, onMounted} from "vue";
import SlidersTable from "@/components/dashboard/sliders/SlidersTable.vue";
import SlidersTableModal from "@/components/dashboard/sliders/SlidersTableModal.vue";
import {useSliderStore} from "@/stores/dashboard/sliders";
export default {
  name: "Sliders",
  components: {SlidersTableModal, SlidersTable},
  setup() {
    const store = useSliderStore();
    const show = computed(() => store.show);
    onMounted(async () => {
      await store.load();
    });
    return {
      cilPlus,
      show,
      sliders: computed(() => store.sliders),
      slider: computed(() => store.slider),
      create() {
        store.toggleModal();
        store.new();
      },
      close() {
        store.toggleModal();
        store.new();
      },
      save(slider) {
        store.save(slider);
        store.toggleModal();
      },
      edit(slider) {
        store.setSlider(slider);
        store.toggleModal();
      },
      remove(slider) {
        console.log(slider);
        //store.toggleModal();
      }
    }
  }
}
</script>