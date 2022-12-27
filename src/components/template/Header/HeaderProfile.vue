<script setup lang="ts">
import {toRefs} from "vue";

const props = defineProps({
  user: Object
});

const { user } = toRefs(props);

</script>
<template>
  <div class="admin_active" id="header_admin">
    <div class="header_avatar" v-if="user">
      <div class="price">
        <span>2.45 <strong>ETH</strong> </span>
      </div>
      <img
        class="avatar"
        :src="user.gravatar"
        alt="avatar"
      />
      <div class="avatar_popup mt-20">
        <div class="d-flex align-items-center copy-text justify-content-between">
          <span> {{ user.address }}</span>
          <router-link to="/" class="ml-2">
            <i class="fal fa-copy"></i>
          </router-link>
        </div>
        <div class="d-flex align-items-center mt-10">
<!--          <img-->
<!--            class="coin"-->
<!--            src={imgsun}-->
<!--            alt="/"-->
<!--          />-->
          <div class="info ml-10">
            <p class="text-sm font-book text-gray-400">Balance</p>
            <p class="w-full text-sm font-bold text-green-500">16.58 ETH</p>
          </div>
        </div>
        <div class="hr"></div>
        <div class="links mt-20">
          <router-link to="#">
            <i class="fab fa-accusoft"></i> <span> My items</span>
          </router-link>
          <a class="mt-10" href="/edit-profile">
            <i class="fas fa-pencil-alt"></i> <span> Edit Profile</span>
          </a>
          <a class="mt-10" href="/login" id="logout">
            <i class="fal fa-sign-out"></i> <span> Logout</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
