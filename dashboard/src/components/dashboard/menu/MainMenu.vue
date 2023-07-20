<template>
  <CListGroup class="menu-list-group" flush>
    <CListGroupItem class="menu-list-group__item">
      <create-menu :menus="menus" />
    </CListGroupItem>
    <CListGroupItem class="menu-list-group__item__divider"></CListGroupItem>

    <template v-for="menu in menus">
      <CListGroupItem class="menu-list-group__item menu-list-group__item__edit-menu">
        <edit-menu :menu="menu" />
      </CListGroupItem>
      <CListGroupItem class="menu-list-group__item__divider"></CListGroupItem>
      <nested-menu
        :items="menu.sections"
        :menu="menu"
        @toggle="toggleSection"
        @update="update"
      />
      <CListGroupItem class="menu-list-group__item__divider"></CListGroupItem>

    </template>
  </CListGroup>
</template>

<script>

import NestedMenu from "@/components/dashboard/menu/NestedMenu.vue";
import {computed, onMounted} from "vue";
import {usePagesStore} from "@/stores/dashboard/pages";
import {useMenusStore} from "@/stores/dashboard/menus";
import CreateMenu from "@/components/dashboard/menu/CreateMenu.vue";
import EditMenu from "@/components/dashboard/menu/EditMenu.vue";
import CreateSectionItem from "@/components/dashboard/menu/CreateSectionItem.vue";
export default {
  name: "MainMenu",
  components: {
    CreateSectionItem,
    EditMenu,
    CreateMenu,
    NestedMenu,
  },
  setup() {

    const store = useMenusStore();
    const pages = computed(() => usePagesStore().pages);
    const menus = computed(() => store.menus);

    onMounted(async () => {
      await store.load();
      if (pages.value.length === 0) {
        await usePagesStore().load();
      }

    });
    return {
      menus,
      pages,
      async toggleSection(_section, _menu) {
        await store.toggleSectionEnabled(_section, _menu);
      },
      async update(_menu) {
        await store.save(_menu);
      }
    };
  },
}
</script>
