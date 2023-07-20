<template>
  <CFormSelect
    v-model="pageId"
    @change="select"
    aria-label="Select page"
    :options="options">
  </CFormSelect>
</template>

<script>
import {nextTick, onMounted, ref, toRefs} from "vue";
import {usePagesStore} from "@/stores/dashboard/pages";
import {useMenusStore} from "@/stores/dashboard/menus";

export default {
  name: "CreateSectionItem",
  props: ["section", "menu"],
  setup(props) {
    const { section, menu } = toRefs(props);
    const store = usePagesStore();
    const pageId = ref(null);
    const options = ref([
      "Select page"
    ]);

    onMounted(async () => {
      if (store.pages.length === 0) {
        await store.load();
      }
      const pages = store.pages.map(page => {
        return {
          label: page.title,
          value: page.id
        }
      });
      options.value.push(...pages);
    });
    return {
      pageId,
      options,
      select() {
        nextTick(async () => {
          const page = store.pages.find((page) => Number(page.id) === Number(pageId.value));
          if (page) {
            if (!section.value.items) {
              section.value.items = [];
            }
            if (!section.value.items.map(page => Number(page.id)).includes(Number(pageId.value))) {
              page.order_by = section.value.items.length;
              section.value.items.push(page);
              await useMenusStore().save(menu.value);
            }
          }
          pageId.value = null;
        });
      }
    };
  },
}
</script>
