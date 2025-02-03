<script lang="ts" setup>
import WallpaperModal from "@/components/Profile/WallpaperModalComponent.vue";
import Avatar from "@/components/Profile/AvatarComponent.vue";

import useDetectOutsideClick from "@/helpers/outside-click";

import { useAuthStore } from '@/stores/auth/store';
import { useProfileStore } from '@/stores/template/profile';
import { PublicUserDto } from '@/types';
import { computed, ComputedRef, reactive, ref, Ref } from 'vue';

const store = useProfileStore();
const user: ComputedRef<PublicUserDto> = computed(() => useAuthStore().getUser());
const profile = ref(null);
const wallpaper: Ref<any> = ref(null);
const wallpapers = ref([]);
const wallPaperStyle = reactive({
  background:user?.value?.attributes.wallpaper ?  `url(${user.value.attributes.wallpaper}) no-repeat center` : `none`,
  backgroundSize: "cover",
  borderRadius: 0,
});
const isActiveWallpaperModal = computed(() => store.isActiveWallpaperModal);
const showEditWallpaper = computed(() => store.showEditAvatarWallpaper);
const showEditWallpaperOptions = computed(() => store.showEditAvatarWallpaperOptions);
const handleWallpaperUpload = () => {
  if (user?.value) {
    const provider = `wallpaper:${user.value.attributes.uuid}`;
    store.handleFileUpload(wallpaper.value.files[0], user.value, provider);
  }
};
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
    wallpapers.value = await useAuthStore().loadWallpapers();
    store.handleWallpaperModal();
  } catch (e) {
    console.error(e);
  }
}

function removeWallpaper() {
  console.log("remove wallpaper");
}

useDetectOutsideClick(profile, () => {
  store.handleOutsideWallpaperOptions();
});

// if (user?.value) {
//   watch(
//     () => user.value.attributes.wallpaper,
//     (url) => {
//       wallPaperStyle.background = `url(${url}) no-repeat center`;
//       wallPaperStyle.backgroundSize = "cover";
//       wallPaperStyle.borderRadius = 0;
//     }
//   );
// }
// 
</script>

<template>
  <div
    class="author-profile flex"
    ref="profile"
    :style="wallPaperStyle"
    @mouseenter="enterEditWallpaper"
    @mouseleave="leaveEditWallpaper"
  >
    <button
      type="button"
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
              <input
                ref="wallpaper"
                v-on:change="handleWallpaperUpload()"
                type="file"
                id="upload-wallpaper"
                hidden
              />
            </li>
            <li class="menu-item">
              <a href="#" @click.prevent="handleWallpaperModal"
                >Choose from Library</a
              >
            </li>
            <li class="menu-item">
              <a href="#" @click.prevent="removeWallpaper">Delete</a>
            </li>
          </ul>
        </li>
      </ul>
    </div> 
    <avatar :user="user" />
    <wallpaper-modal
      :isActiveWallpaperModal="isActiveWallpaperModal"
      :wallpapers="wallpapers"
      :user="user"
    /> 
  </div> 
</template>
