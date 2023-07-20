<template>
  <CCard class="full-height pages-container">
    <CCardBody>
      <CCardTitle>
        <CButton class="btn btn-dark" @click="create">
          <CIcon :content="cilPlus" size="sm"/> Page
        </CButton>
      </CCardTitle>
      <CCardText>
        <tags-input v-if="tags.length" :tags="tags"/>
        <pages-table
          :pages="pages"
          @edit="edit"
          @remove="remove"/>
        <pages-table-modal
          :page="page"
          :show="show"
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
import PagesTableModal from "@/components/dashboard/pages/PagesTableModal.vue";
import PagesTable from "@/components/dashboard/pages/PagesTable.vue";
import TagsInput from "@/components/dashboard/tags/TagsInput.vue";
import {usePagesStore} from "@/stores/dashboard/pages";
import {useTagsStore} from "@/stores/dashboard/tags";
export default {
  name: "Pages",
  components: {TagsInput, PagesTableModal, PagesTable},
  setup() {
    const store = usePagesStore();
    const tagsStore = useTagsStore();
    const show = computed(() => store.show);
    const tags = computed(() => tagsStore.tags);
    onMounted(async () => {
      await store.load();
      if (tags.value.length === 0) {
        await tagsStore.load();
      }
    });
    return {
      tags,
      show,
      cilPlus,
      pages: computed(() => store.pages),
      page: computed(() => store.page),
      create() {
        store.toggleModal();
        store.new();
      },
      close() {
        store.toggleModal();
        store.new();
      },
      save(page) {
        store.save(page);
        store.toggleModal();
      },
      edit(page) {
        store.setItem(page);
        store.toggleModal();
      },
      remove(page) {
        console.log(page);
        //store.toggleModal();
      }
    }
  }
}
</script>