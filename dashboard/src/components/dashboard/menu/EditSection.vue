<template>
  <CRow>
    <CCol md="8">
      edit
<!--      <CButtonGroup role="group">-->
<!--        <div class="btn btn-dark">-->
<!--          <CFormSwitch-->
<!--            :checked="section.enabled" color="danger" v-model="section.enabled" @change="toggleSection(section, menu)"/>-->
<!--        </div>-->
<!--        <CButton color="dark" class="menu-group-item-order_by">-->
<!--          {{ section.order_by ? section.order_by : 0 }}-->
<!--        </CButton>-->
<!--        <CButton color="dark" class="menu-group-item-name">-->
<!--          {{ section.title }}-->
<!--        </CButton>-->
<!--        <CButton color="dark" @click.prevent="editSection()">-->
<!--          <CIcon icon="cilPencil" size="sm"/>-->
<!--        </CButton>-->
<!--        <CButton color="dark" @click.prevent="deleteSection(section)">-->
<!--          <CIcon icon="cilXCircle" size="sm"/>-->
<!--        </CButton>-->
<!--        <CButton color="dark" @click.prevent="addSectionItem(section, menu)">-->
<!--          <CIcon icon="cilList" size="sm"/>-->
<!--        </CButton>-->
<!--        <div class="btn" v-if="showSection">-->
<!--          <create-section-item-->
<!--            :menu="menu"-->
<!--            :section="section"/>-->
<!--        </div>-->
<!--      </CButtonGroup>-->
    </CCol>
  </CRow>
</template>

<script>
import {ref, toRefs} from "vue";
import {useMenusStore} from "@/stores/dashboard/menus";
import CreateSectionItem from "@/components/dashboard/menu/CreateSectionItem.vue";

export default {
  name: "EditSection",
  components: {
    CreateSectionItem,
  },
  props: ["menu", "section", "showSection"],
  emits: ["addSectionItem"],
  setup(props, { emit }) {
    const { menu, section, showSection } = toRefs(props);
    const store = useMenusStore();
    const show = ref(false);

    return {
      menu,
      show,
      section,
      showSection,
      editSection() {
        show.value = true;
      },
      saveSection(_section, _menu) {
        show.value = false;
        _section.order_by = _section.order_by ? Number(_section.order_by) : 0;
        store.saveSection(_section, _menu);
      },
      deleteSection(_section) {
        console.log("not implemented");
      },
      toggleSection(_section, _menu) {
        store.toggleSectionEnabled(_section, _menu);
      },
      addSectionItem(_section, _menu) {
        emit("addSectionItem", _section, _menu);
      }
    };
  },
}
</script>
