<script lang="ts" setup>
import ProfileDetails from "@/components/template/Profile/ProfileDetails.vue";
import PageTitle from "@/components/template/PageTitle/PageTitle.vue";
import {computed} from "vue";
import {useAuthStore} from "@/stores/auth";
const user = computed(() => useAuthStore().user);
</script>
<template>
  <PageTitle v-if="user['uuid']"
       pageTitle="Profile"
       pageTitleActive="profile"
       :link="user['uuid']" />
  <section class="tf-profile tf-section">
    <div class="themesflat-container">
      <div class="row">
        <div class="col-md-12" >
          <profile-details/>
        </div>
      </div>
    </div>
  </section>
</template>

