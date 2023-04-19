<script lang="ts" setup>

import type { Ref } from "vue";

import { computed, ref, toRefs } from "vue";

import useDetectOutsideClick from "@/helpers/outside-click";

import { useProfileStore } from "@/stores/template/profile";

import { useAuthStore } from "@/stores/auth/store";

import { error} from "@/helpers";

import AvatarModal from "@/components/Profile/AvatarModal.vue";

const props = defineProps(["user"]);

const { user } = toRefs(props);

const store  = useProfileStore();
const auth   = useAuthStore();

const showEditAvatarBtn        = computed(() => store.showEditAvatarBtn);
const showEditAvatarOptions    = computed(() => store.showEditAvatarOptions);
const isActiveModal            = computed(() => store.isActiveModal);

// dom elements references
const avatar: Ref<any> = ref(null);
const uploadNav: Ref<any> = ref(null);
const avatars = ref([]);

useDetectOutsideClick(uploadNav, () => {
  store.handleOutsideAvatarOptions();
});

const handleAvatarUpload = () => {
  if (user) {
    const provider = `avatar:${user.value.uuid}`
    store.handleFileUpload(avatar.value.files[0], user.value, provider);
  }
}

function enterEditAvatar() {
  store.handleEnterEditAvatar();
}

function leaveEditAvatar() {
  store.handleLeaveEditAvatar();
}

function editAvatar() {
  store.handleEditAvatarOptions();
}

function uploadAvatar() {
  avatar.value.click();
}

async function handleAvatarModal() {
  try {
    avatars.value = await auth.loadAvatars();
    store.handleAvatarModal();
  } catch (e) {
    error(e);
  }
}

function removeAvatar() {
}

</script>

<template>
  <div class="feature-profile" ref="uploadNav">
    <img :src="user.gravatar" alt="image" class="avatar" @mouseenter="enterEditAvatar" @mouseleave="leaveEditAvatar">
    <button @mouseenter="enterEditAvatar"
            v-if="showEditAvatarBtn"
            type="button"
            class="btn-edit-avatar"
            @click="editAvatar">
      <i class="icon-fl-icon"></i>
    </button>
    <div class="upload-nav" v-show="showEditAvatarOptions">
      <ul class="menu">
        <li class="menu-item menu-item-has-children">
          <ul class="sub-menu">
            <li class="menu-item">
              <a href="#" @click.prevent="uploadAvatar">Upload</a>
              <input ref="avatar" v-on:change="handleAvatarUpload()"  type="file" id="upload-avatar" hidden>
            </li>
            <li class="menu-item"><a href="#" @click.prevent="handleAvatarModal">Choose from Library</a></li>
            <li class="menu-item"><a href="#" @click.prevent="removeAvatar">Delete</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <avatar-modal
      :isActiveModal="isActiveModal"
      :avatars="avatars"
      :user="user"/>
  </div>
</template>