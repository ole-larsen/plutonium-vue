<template>
  <CCard class="full-height categories-container">
    <CCardBody>
      <CCardTitle>
        <CButton class="btn btn-dark" @click="create">
          <CIcon :content="cilPlus" size="sm"/> Category
        </CButton>
      </CCardTitle>
      <CCardText>
        <categories-table
          :categories="categories"
          @edit="edit"
          @remove="remove"/>
        <categories-table-modal
          :category="category"
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
import CategoriesTableModal from "@/components/dashboard/categories/CategoriesTableModal.vue";
import CategoriesTable from "@/components/dashboard/categories/CategoriesTable.vue";
import {useCategoriesStore} from "@/stores/dashboard/categories";
export default {
  name: "Categories",
  components: {CategoriesTableModal, CategoriesTable},
  setup() {
    const store = useCategoriesStore();
    const show = computed(() => store.show);
    onMounted(async () => {
      await store.load();
    });
    return {
      cilPlus,
      show,
      categories: computed(() => store.categories),
      category: computed(() => store.category),
      create() {
        store.toggleModal();
        store.new();
      },
      close() {
        store.toggleModal();
        store.new();
      },
      save(blog) {
        store.save(blog);
        store.toggleModal();
      },
      edit(blog) {
        store.setItem(blog);
        store.toggleModal();
      },
      remove(blog) {
        console.log(blog);
        //store.toggleModal();
      }
    }
  }
}
</script>