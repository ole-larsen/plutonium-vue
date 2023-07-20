<template>
  <draggable
    class="dragArea"
    tag="ul"
    :list="items"
    :group="{ name: 'g1' }"
    item-key="id"
    @end="toggleEnd"
  >
    <template #item="{ element, index }">
      <span>
        <CListGroupItem class="menu-list-group__item menu-list-group__item__edit-menu">
          <CRow>
            <CCol md="8">
              <CForm v-if="!section">
                <CButtonGroup role="group">
                  <div class="btn btn-light btn-input">
                    <CFormInput
                      v-model="element.title"
                      type="text"
                      placeholder="title"/>
                  </div>
                  <div class="btn btn-light">
                    <CFormSwitch
                      :checked="element.enabled" color="danger" v-model="element.enabled" @change="toggle(element, menu)"/>
                  </div>
                  <CButton color="light" @click="save">
                    <CIcon icon="cilCheckCircle" size="sm"/>
                  </CButton>
                  <CButton color="light"  @click="remove">
                    <CIcon icon="cilXCircle" size="sm"/>
                  </CButton>
                  <CButton color="light" @click="add(element.id)">
                    <CIcon :icon="cilPlus" size="sm"/>
                  </CButton>
                  <div class="btn btn-light btn-input" v-if="show[element.id]">
                    <create-section-item
                      :menu="menu"
                      :section="element" />
                  </div>
                </CButtonGroup>
              </CForm>
              <CForm v-if="section">
                <CButtonGroup role="group">
                  <div class="btn btn-light">
                    {{ element.order_by }}
                  </div>
                  <div class="btn btn-light btn-input">
                    <CFormInput
                      v-model="element.title"
                      type="text"
                      placeholder="title"/>
                  </div>
                  <div class="btn btn-light">
                    <CFormSwitch
                      :checked="element.enabled" color="danger"
                      v-model="element.enabled"
                      @change="togglePage(element)"/>
                  </div>
                  <CButton color="light" @click="savePage">
                    <CIcon icon="cilCheckCircle" size="sm"/>
                  </CButton>
                  <CButton color="light"  @click="removePage(element)">
                    <CIcon icon="cilXCircle" size="sm"/>
                  </CButton>
                  <div class="btn btn-light btn-input" v-if="show[element.id]">
                    <create-section-item
                      :menu="menu"
                      :section="element" />
                  </div>
                </CButtonGroup>
              </CForm>
            </CCol>
          </CRow>
        </CListGroupItem>
        <CListGroupItem class="menu-list-group__item__divider"></CListGroupItem>
        <nested-menu
          :section="element"
          :items="element.items"
          :menu="menu"
          @update="update"
        />
      </span>

    </template>
  </draggable>
</template>

<script>
import { cilPlus, cilCheckCircle } from "@coreui/icons";
import CreateSectionItem from "@/components/dashboard/menu/CreateSectionItem.vue";
import draggable from "vuedraggable";
import {toRefs, ref} from "vue";
export default {
  name: "NestedMenu",
  components: {
    draggable, CreateSectionItem
  },
  props: ["items", "menu", "section"],
  emits: ["toggle", "update"],

  setup(props, { emit }) {
    const show = ref({});
    const { items, menu, section } = toRefs(props);
    return {
      items,
      menu,
      show,
      section,
      cilPlus,
      cilCheckCircle,
      toggle(element, _menu) {
        emit("toggle", element, _menu);
      },
      toggleEnd(event) {
        for (let i = 0; i < items.value.length; i++) {
          items.value[i].order_by = i;
        }
        emit("update", menu.value);
      },
      save() {
        emit("update", menu.value);
      },
      remove() {
        console.log("not implemented");
      },
      add(id) {
        const trigger = show.value[id];
        for (let i = 0; i < items.value.length; i++) {
          show.value[items.value[i].id] = false;
        }
        show.value[id] = !trigger;
      },
      togglePage(_element) {
        _element.enabled = !_element.enabled;
        emit("update", menu.value);
      },
      savePage() {
        console.log(menu.value);
      },
      removePage(_element) {
        const index = section.value.items.findIndex((item) => item.id === _element.id);
        section.value.items.splice(index, 1);
        emit("update", menu.value);
      },
      update(_menu) {
        emit("update", _menu);
      }
    };
  },
}
</script>