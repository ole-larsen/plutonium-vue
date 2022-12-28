<script lang="ts" setup>
import AuthorDetails from "@/components/template/Author/AuthorDetails.vue";
import PageTitle from "@/components/template/PageTitle/PageTitle.vue";
import {useUsersStore} from "@/stores/users.store";
import {computed} from "vue";
import type {User} from "@/stores/auth";
import {useRoute} from "vue-router";
const route = useRoute();
const uuid = route.params.uuid // read parameter id (it is reactive)

const store = useUsersStore();
const user: any = computed(() => {
  if (store.users) {
    return store.users.find((_user: User) => _user.uuid === uuid);
  }
  return undefined;
});
</script>
<template>
  <PageTitle v-if="user['uuid']"
             pageTitle="Authors"
             pageTitleActive="author"
             :link="user['uuid']" />
  <section class="tf-profile tf-section">
    <div class="themesflat-container">
      <div class="row">
        <div class="col-md-12" >
          <author-details/>
        </div>
      </div>
    </div>
  </section>
</template>

