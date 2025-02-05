<script lang="ts" setup>
import type { Ref } from "vue";

import { computed, onMounted, ref, toRefs } from "vue";

import { useCookies } from "vue3-cookies";
import useDetectOutsideClick from "@/helpers/outside-click";

import { useProfileStore } from "@/stores/template/profile";

import { useAuthStore } from "@/stores/auth/store";

import { error } from "@/helpers";

import AvatarModal from "@/components/Profile/AvatarModalComponent.vue";
import { PublicFileDto, PublicUserDto } from "@/types";

const props = defineProps(["user"]);

const { user } = toRefs(props);

const store = useProfileStore();
const { cookies } = useCookies();
const show = computed(() => store.showEditAvatarBtn);
const toggleOptions = computed(() => store.showEditAvatarOptions);
const isActiveModal = computed(() => store.isActiveModal);

// dom elements references
const avatar: Ref<any> = ref(null);
const uploadNav: Ref<any> = ref(null);
const avatars = ref([]);

const csrf: Ref<string> = ref("");

onMounted(() => {
  csrf.value = cookies.get("_csrf");
});

useDetectOutsideClick(uploadNav, () => {
  store.handleOutsideAvatarOptions();
});

const startUpload = async () => {
  if (user?.value) {
    const provider = `avatar:${user.value.attributes.uuid}`;
    const img = await store.upload(avatar.value.files[0], provider, csrf.value);
    if (img) {
      const userForUpdate: PublicUserDto = {
      id: user.value.id,
      attributes: {
        gravatar: (img as PublicFileDto).attributes.url,
      },
    };
    await store.update(userForUpdate, csrf.value);
    }
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
    await store.loadAvatars();
    //store.toggleAvatarModal();
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
