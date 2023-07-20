<template>
  <CCard class="full-height tags-container">
    <CCardBody>
      <CCardTitle><CButton class="btn btn-primary" @click="create">Create Tag</CButton></CCardTitle>
      <CCardText>
        <tags-table
          :tags="tags"
          @edit="edit"
          @remove="remove"/>
        <tags-table-modal
          :tag="tag"
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
import TagsTableModal from "@/components/dashboard/tags/TagsTableModal.vue";
import TagsTable from "@/components/dashboard/tags/TagsTable.vue";
import {useTagsStore} from "@/stores/dashboard/tags";
export default {
  name: "Tags",
  components: {TagsTableModal, TagsTable},
  setup() {
    const store = useTagsStore();
    const show = computed(() => store.show);
    onMounted(async () => {
      await store.load();
    });
    return {
      show,
      tags: computed(() => store.tags),
      tag: computed(() => store.tag),
      create() {
        store.toggleModal();
        store.new();
      },
      close() {
        store.toggleModal();
        store.new();
      },
      save(tag) {
        store.save(tag);
        store.toggleModal();
      },
      edit(tag) {
        store.setItem(tag);
        store.toggleModal();
      },
      remove(tag) {
        console.log(tag);
        //store.toggleModal();
      }
    }
  }
}
</script>