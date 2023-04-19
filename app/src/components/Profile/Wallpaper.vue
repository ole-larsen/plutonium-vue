<script lang="ts" setup>
import type { Ref } from "vue";

import {computed, reactive, ref, toRefs, watch} from "vue";

import useDetectOutsideClick from "@/helpers/outside-click";

import { useProfileStore } from "@/stores/template/profile";

import { useAuthStore } from "@/stores/auth/store";
import { useLoaderStore } from "@/stores/loader/store";

import WallpaperModal  from "@/components/Profile/WallpaperModal.vue";

import Avatar from "@/components/Profile/Avatar.vue";

const store  = useProfileStore();
const auth   = useAuthStore();
const loader = useLoaderStore();

const showEditWallpaper        = computed(() => store.showEditAvatarWallpaper);
const showEditWallpaperOptions = computed(() => store.showEditAvatarWallpaperOptions);
const isActiveWallpaperModal   = computed(() => store.isActiveWallpaperModal);

const props = defineProps(["user"]);
const { user } = toRefs(props);

const avatar: Ref<any> = ref(null);

const wallpaper: Ref<any> = ref(null);
const wallpapers = ref([]);
const profile = ref(null);

useDetectOutsideClick(profile, () => {
  store.handleOutsideWallpaperOptions();
});

const handleWallpaperUpload = () => {
  if (user) {
    const provider = `wallpaper:${user.value.uuid}`
    store.handleFileUpload(wallpaper.value.files[0], user.value, provider);
  }
}

const wallPaperStyle = reactive({
  background: `url(${user?.value?.wallpaper}) no-repeat center`,
  backgroundSize: "cover",
  borderRadius: 0
});

if (user) {
  watch(
    () => user.value.wallpaper,
    (url) => {
      wallPaperStyle.background = `url(${url}) no-repeat center`;
      wallPaperStyle.backgroundSize = "cover";
      wallPaperStyle.borderRadius = 0;
    });
}

function enterEditWallpaper() {
  store.handleEnterEditAvatarWallpaper();
}

function leaveEditWallpaper() {
  store.handleLeaveEditAvatarWallpaper();
}

function editWallpaper() {
  store.handleEditAvatarWallpaperOptions();
}

function uploadWallpaper() {
  wallpaper.value.click();
}

async function handleWallpaperModal() {
  try {
    wallpapers.value = await auth.loadWallpapers();
    store.handleWallpaperModal();
  } catch (e) {
    console.error(e);
  }
}

function removeWallpaper() {}

</script>

<template>
  <div class="author-profile flex" ref="profile" :style="wallPaperStyle"
       @mouseenter="enterEditWallpaper"
       @mouseleave="leaveEditWallpaper">
    <button type="button"
            v-if="showEditWallpaper"
            class="btn-edit-wallpaper"
            @click="editWallpaper"
    >
      <i class="icon-fl-icon"></i>
    </button>
    <div class="upload-nav-wallpaper" v-show="showEditWallpaperOptions">
      <ul class="menu">
        <li class="menu-item menu-item-has-children">
          <ul class="sub-menu">
            <li class="menu-item">
              <a href="#" @click.prevent="uploadWallpaper">Upload</a>
              <input ref="wallpaper" v-on:change="handleWallpaperUpload()"  type="file" id="upload-wallpaper" hidden>
            </li>
            <li class="menu-item"><a href="#" @click.prevent="handleWallpaperModal">Choose from Library</a></li>
            <li class="menu-item"><a href="#" @click.prevent="removeWallpaper">Delete</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <avatar :user="user"/>
    <wallpaper-modal
      :isActiveWallpaperModal="isActiveWallpaperModal"
      :wallpapers="wallpapers"
      :user="user"/>
  </div>
</template>