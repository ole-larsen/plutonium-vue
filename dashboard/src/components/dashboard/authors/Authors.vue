<template>
  <CCard class="full-height authors-container">
    <CCardBody>
      <CCardTitle><CButton class="btn btn-primary" @click="create">Create Author</CButton></CCardTitle>
      <CCardText>
        <authors-table
          :authors="authors"
          @edit="edit"
          @remove="remove"/>
        <authors-table-modal
          :author="author"
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
import AuthorsTableModal from "@/components/dashboard/authors/AuthorsTableModal.vue";
import AuthorsTable from "@/components/dashboard/authors/AuthorsTable.vue";
import {useAuthorsStore} from "@/stores/dashboard/authors";
export default {
  name: "Authors",
  components: {AuthorsTableModal, AuthorsTable},
  setup() {
    const store = useAuthorsStore();
    const show = computed(() => store.show);
    onMounted(async () => {
      await store.load();
    });
    return {
      show,
      authors: computed(() => store.authors),
      author: computed(() => store.author),
      create() {
        store.toggleModal();
        store.new();
      },
      close() {
        store.toggleModal();
        store.new();
      },
      save(author) {
        store.save(author);
        store.toggleModal();
      },
      edit(author) {
        store.setItem(author);
        store.toggleModal();
      },
      remove(author) {
        console.log(author);
        //store.toggleModal();
      }
    }
  }
}
</script>