<script lang="ts" setup>
import type { Ref } from "vue";

import { computed, ref, toRefs } from "vue";

import useDetectOutsideClick from "@/helpers/outside-click";

import { useProfileStore } from "@/stores/template/profile";

import { useAuthStore } from "@/stores/auth/store";

import { error } from "@/helpers";

import AvatarModal from "@/components/Profile/AvatarModalComponent.vue";

const props = defineProps(["user"]);

const { user } = toRefs(props);

const store = useProfileStore();
const auth = useAuthStore();

const show = computed(() => store.showEditAvatarBtn);
const toggleOptions = computed(() => store.showEditAvatarOptions);
const isActiveModal = computed(() => store.isActiveModal);

// dom elements references
const avatar: Ref<any> = ref(null);
const uploadNav: Ref<any> = ref(null);
const avatars = ref([]);

useDetectOutsideClick(uploadNav, () => {
  store.handleOutsideAvatarOptions();
});

const startUpload = () => {
  if (user?.value) {
    const provider = `avatar:${user.value.attributes.uuid}`;
    store.handleFileUpload(avatar.value.files[0], user.value, provider);
  }
};

function enterEdit() {
  store.handleEnterEditAvatar();
}

function leaveEdit() {
  store.handleLeaveEditAvatar();
}

function edit() {
  store.handleEditAvatarOptions();
}

function upload() {
  avatar.value.click();
}

async function toggle() {
  try {
    avatars.value = await auth.loadAvatars();
    store.toggleAvatarModal();
  } catch (e) {
    error(e);
  }
}

function remove() {}
</script>

<template>
  <div class="feature-profile" ref="uploadNav">
    <img
      :src="user.attributes.gravatar"
      alt="image"
      class="avatar"
      @mouseenter="enterEdit"
      @mouseleave="leaveEdit"
    />
    <button
      @mouseenter="enterEdit"
      v-if="show"
      type="button"
      class="btn-edit-avatar"
      @click="edit"
    >
      <i class="icon-fl-icon"></i>
    </button>
    <div class="upload-nav" v-show="toggleOptions">
      <ul class="menu">
        <li class="menu-item menu-item-has-children">
          <ul class="sub-menu">
            <li class="menu-item">
              <a href="#" @click.prevent="upload">Upload</a>
              <input
                ref="avatar"
                v-on:change="startUpload()"
                type="file"
                id="upload-avatar"
                hidden
              />
            </li>
            <li class="menu-item">
              <a href="#" @click.prevent="toggle"
                >Choose from Library</a
              >
            </li>
            <li class="menu-item">
              <a href="#" @click.prevent="remove">Delete</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <avatar-modal
      :isActiveModal="isActiveModal"
      :avatars="avatars"
      :user="user"
    />
  </div>
</template>
