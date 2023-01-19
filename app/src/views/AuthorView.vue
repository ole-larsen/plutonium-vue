<script lang="ts" setup>
import AuthorDetails from "@/components/template/Author/AuthorDetails.vue";
import PageTitle from "@/components/template/PageTitle/PageTitle.vue";
import {useUsersStore} from "@/stores/users.store";
import {computed, onBeforeMount, ref} from "vue";
import type {User} from "@/stores/auth";
import {useRoute} from "vue-router";
const route = useRoute();
const uuid = route.params.uuid // read parameter id (it is reactive)
const store = useUsersStore();

const user: any = computed(() => store.users.find((_user: User) => _user.uuid === uuid));

onBeforeMount(async () => {
  await store.load();
});
</script>
<template>
  <PageTitle v-if="user && user['uuid']"
             pageTitle="Authors"
             pageTitleActive="author"
             :link="user['uuid']" />
  <section class="tf-profile tf-section">
    <div class="themesflat-container">
      <div class="row">
        <div class="col-md-12" >
          <author-details :user="user"/>
        </div>
      </div>
    </div>
  </section>
</template>

