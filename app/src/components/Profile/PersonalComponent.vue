<script lang="ts" setup>
import { computed, toRefs } from "vue";

import { useProfileStore } from "@/stores/template/profile";

const store = useProfileStore();

const showUsername = computed(() => store.showUsername);
const showEmail = computed(() => store.showEmail);

const props = defineProps(["user"]);
const { user } = toRefs(props);

function editUsername() {
  store.handleShowUsername();
}

function editEmail() {
  store.handleShowEmail();
}

function updateUsername() {
  if (user?.value) {
    store.update(user.value);
    store.handleShowUsername();
  }
}

function updateEmail() {
  if (user?.value) {
    store.update(user.value);
    store.handleShowEmail();
  }
}
</script>

<template>
  <div class="infor-profile">
    <div class="infor-profile-username">
      <h1 class="title" @click="editUsername">{{ user.attributes.username }}</h1>
      <input
        v-show="showUsername"
        autocomplete="true"
        id="username"
        name="username"
        tabIndex="2"
        aria-required="true"
        type="text"
        placeholder="Your Username"
        v-model="user.attributes.username"
        @keyup.enter="updateUsername"
      />
    </div>
    <div class="infor-profile-address">
      <span>{{ user.attributes.address }}</span>
    </div>
    <div class="infor-profile-email">
      <h2 v-html="`email: ${user.attributes.email}`" @click="editEmail"></h2>
      <input
        v-show="showEmail"
        autocomplete="true"
        id="profile-email"
        name="email"
        tabIndex="2"
        aria-required="true"
        type="email"
        placeholder="Your Email Address"
        v-model="user.attributes.email"
        @keyup.enter="updateEmail"
      />
    </div>

    <div v-for="wallet in user.wallets" v-bind:key="wallet.name">
      <form>
        <div>
          <label class="form-label">{{ wallet.name }}</label>
        </div>
        <input
          type="text"
          class="inputcopy"
          v-model="wallet.address"
          readOnly
        />
        <button type="button" class="btn-copycode">
          <i class="icon-fl-file-1"></i>
        </button>
      </form>
      <br />
    </div>
    <div class="widget-social style-3" v-if="user.socials">
      <ul>
        <li v-for="social in user.socials" v-bind:key="social.id">
          <a :href="social.link" target="_blank"
            ><i :class="social.icon"></i
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>
