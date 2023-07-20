<template>
  <CForm>
    <CButtonGroup role="group">
      <div class="btn btn-input">
        <CFormInput
          v-model="section.title"
          type="text"
          :placeholder="`section name ${menu.title}`"/>
      </div>
      <CButton color="light" @click="createSection(section, menu)">
        <CIcon :icon="cilCheckCircle" size="sm"/>
      </CButton>
      <CButton color="light"  @click="removeSection(section, menu)">
        <CIcon icon="cilXCircle" size="sm"/>
      </CButton>
    </CButtonGroup>
  </CForm>
</template>

<script>
import { cilPlus, cilCheckCircle } from "@coreui/icons";
import {ref, toRefs} from "vue";
import {useMenusStore} from "@/stores/dashboard/menus";

export default {
  name: "CreateSection",
  props: ["menu"],
  setup(props) {
    const { menu } = toRefs(props);
    const store = useMenusStore();
    const section = ref({
      title: ""
    });
    return {
      cilPlus,
      cilCheckCircle,
      menu,
      section,
      createSection(_section, _menu) {
        store.createSection(_section, _menu);
        section.value = {
          title: ""
        }
      },
      removeSection(_section, _menu) {
        console.log("not implemented");
      },
    };
  },
}
</script>
