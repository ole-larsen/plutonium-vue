<template>
    <CRow>
      <CCol md="6">
        <CForm class="main-menu-form">
          <CButtonGroup role="group">
            <div class="btn btn-input">
              <CFormInput
                v-model="menu.title"
                type="text"
                placeholder="new menu name"/>
            </div>
            <CButton color="dark" @click="createMenu">
              <CIcon :content="cilPlus" size="sm"/>
            </CButton>
          </CButtonGroup>
        </CForm>
      </CCol>
    </CRow>
</template>

<script>
import {computed, toRefs} from "vue";
import {useMenusStore} from "@/stores/dashboard/menus";
import { cilPlus } from "@coreui/icons";
export default {
  name: "CreateMenu",
  props: ["menus"],
  setup(props) {
    const { menus } = toRefs(props);
    const store = useMenusStore();
    const menu = computed(() => store.menu);

    return {
      cilPlus,
      menu,
      async createMenu() {
        if (menu.value.title && !menus.value[menu.value.title]) {
          menus.value[menu.value.title] = menu.value;
          try {
            menu.value.enabled = true;
            await store.save(menu.value);
            await store.load();
          } catch (e) {
            console.error(e);
          }
        }
      }
    };
  },
}
</script>
