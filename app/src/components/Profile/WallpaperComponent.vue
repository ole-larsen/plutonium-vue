<script lang="ts" setup>
import WallpaperModal from "@/components/Profile/WallpaperModalComponent.vue";
import Avatar from "@/components/Profile/AvatarComponent.vue";

import useDetectOutsideClick from "@/helpers/outside-click";
import { useCookies } from "vue3-cookies";
import { useAuthStore } from '@/stores/auth/store';
import { useProfileStore } from '@/stores/template/profile';
import { PublicFileDto, PublicUserDto } from '@/types';
import { computed, ComputedRef, onMounted, reactive, ref, Ref, watch } from 'vue';
const { cookies } = useCookies();
const store = useProfileStore();
const auth = useAuthStore();
const user: ComputedRef<PublicUserDto> = computed(() => auth.getUser());
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
const csrf: Ref<string> = ref("");

onMounted(() => {
  csrf.value = cookies.get("_csrf");
  if (user.value.attributes.wallpaper) {
    const url = user.value.attributes.wallpaper.attributes.url;
    wallPaperStyle.background = `url(${url}) no-repeat center`;
    wallPaperStyle.backgroundSize = "cover";
    wallPaperStyle.borderRadius = 0;
  }
});
const uploadWallpaper = async () => {
  const provider = `wallpaper:${user.value.attributes.uuid}`;
  const img = await store.upload(wallpaper.value.files[0], provider, csrf.value);
  if (img) {
    const userForUpdate: PublicUserDto = {
      id: user.value.id,
      attributes: {
        wallpaper: img as PublicFileDto,
      },
    };
    await store.update(userForUpdate, csrf.value);
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

function clickUploadWallpaper() {
  wallpaper.value.click();
}

async function handleWallpaperModal() {
  // try {
  //   wallpapers.value = await useAuthStore().loadWallpapers();
  //   store.handleWallpaperModal();
  // } catch (e) {
  //   console.error(e);
  // }
}

function removeWallpaper() {
  console.log("remove wallpaper");
}

useDetectOutsideClick(profile, () => {
  store.handleOutsideWallpaperOptions();
});

if (user?.value) {
  watch(
    () => user.value.attributes.wallpaper?.attributes.url,
    (url) => {
      console.log(url)
      wallPaperStyle.background = `url(${url}) no-repeat center`;
      wallPaperStyle.backgroundSize = "cover";
      wallPaperStyle.borderRadius = 0;
    }
  );
}

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
              <a href="#" @click.prevent="clickUploadWallpaper">Upload</a>
              <input
                ref="wallpaper"
                v-on:change="uploadWallpaper()"
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
