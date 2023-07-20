<template>
  <CRow>
    <CCol md="8">
      <CForm>
        <CButtonGroup role="group">
          <div class="btn btn-input">
            <CFormInput
              v-model="menu.title"
              type="text"
              placeholder="name"/>
          </div>
          <div class="btn btn-light">
            <CFormSwitch
              :checked="menu.enabled" color="danger" v-model="menu.enabled" @change="toggleMenu(menu)"/>
          </div>
          <CButton color="light" @click="saveMenu">
            <CIcon icon="cilCheckCircle" size="sm"/>
          </CButton>
          <CButton color="light"  @click="deleteMenu(menu)">
            <CIcon icon="cilXCircle" size="sm"/>
          </CButton>
          <CButton color="light" @click="addSection(menu)">
            <CIcon :icon="cilPlus" size="sm"/>
          </CButton>
          <div class="btn btn-input" v-if="show">
            <create-section :menu="menu"/>
          </div>
        </CButtonGroup>
      </CForm>
    </CCol>
  </CRow>
</template>

<script>
import CreateSection from "@/components/dashboard/menu/CreateSection.vue";
import {computed, toRefs, ref} from "vue";
import {useMenusStore} from "@/stores/dashboard/menus";
import { cilPlus, cilCheckCircle } from "@coreui/icons";
export default {
  name: "EditMenu",
  components: {
    CreateSection
  },
  props: ["menu"],
  setup(props) {
    const show = ref(false);
    const store = useMenusStore();
    const menus = computed(() => store.menus);
    const { menu } = toRefs(props);
    return {
      cilPlus,
      cilCheckCircle,
      menu,
      menus,
      show,
      async saveMenu() {
        if (menu.value.title && !menus.value[menu.value.title]) {
          menus.value[menu.value.title] = menu.value;
          try {
            await store.save(menu.value);
            await store.load();
          } catch (e) {
            console.error(e);
          }
        }
      },
      deleteMenu(menu) {
        console.log("not implemented");
      },
      addSection(menu) {
        show.value = !show.value;
      },
      toggleMenu(menu) {
        store.toggleEnabled(menu);
      }
    };
  },
}
</script>
