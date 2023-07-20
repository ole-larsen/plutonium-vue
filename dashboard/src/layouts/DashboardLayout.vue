<template>
  <div>
    <DashboardSidebar/>
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <DashboardHeader />
      <div class="body flex-grow-1 px-3">
        <CContainer lg>
          <router-view/>
        </CContainer>
      </div>
      <DashboardFooter />
    </div>
  </div>
</template>
<script>
import { CContainer } from "@coreui/vue";
import DashboardFooter from "@/components/dashboard/Footer.vue";
import DashboardHeader from "@/components/dashboard/Header.vue";
import DashboardSidebar from "@/components/dashboard/Sidebar.vue";
import {useTagsStore} from "@/stores/dashboard/tags";
import {onMounted} from "vue";
import {useCategoriesStore} from "@/stores/dashboard/categories";
import {useBlogsStore} from "@/stores/dashboard/blogs";
import {useAuthorsStore} from "@/stores/dashboard/authors";
import {usePagesStore} from "@/stores/dashboard/pages";

export default {
  name: "DashboardLayout",
  components: {
    DashboardFooter,
    DashboardHeader,
    DashboardSidebar,
    CContainer,
  },
  setup() {
    onMounted(async () => {
      await useTagsStore().load();
      await useAuthorsStore().load();
      await useCategoriesStore().load();
      await useBlogsStore().load();
      await usePagesStore().load();
    });
  }
}
</script>
