import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";
import type { PublicFile, PublicUser } from "@/types";
import { useAuthStore } from "@/stores/auth/store";
import {useLoaderStore} from "@/stores/loader/store";

export const useProfileStore = defineStore("profile", () => {
  const auth = useAuthStore();
  const loader = useLoaderStore();
  const user = auth.getUser();

  const path: Ref<string | null> = ref(null);
  const showEditAvatarBtn: Ref<boolean> = ref(false);
  const showEditAvatarOptions: Ref<boolean> = ref(false);
  const showEditAvatarWallpaper: Ref<boolean> = ref(false);
  const showEditAvatarWallpaperOptions: Ref<boolean> = ref(false);
  const isActiveWallpaperModal: Ref<boolean> = ref(false);
  const isActiveCollectionModal: Ref<boolean> = ref(false);
  const isActiveERC721Modal: Ref<boolean> = ref(false);

  const isActiveModal: Ref<boolean> = ref(false);
  const showUsername: Ref<boolean> = ref(false);
  const showEmail: Ref<boolean> = ref(false);

  function setPath(slug: string | null) {
    path.value = slug;
  }

  function getPath(): string | null {
    return path.value;
  }

  function handleEnterEditAvatar() {
    showEditAvatarBtn.value = true;
  }

  function handleLeaveEditAvatar() {
    showEditAvatarBtn.value = false;
  }

  function handleEnterEditAvatarWallpaper() {
    showEditAvatarWallpaper.value = true;
  }

  function handleLeaveEditAvatarWallpaper() {
    showEditAvatarWallpaper.value = false;
  }

  function handleEditAvatarWallpaperOptions() {
    showEditAvatarWallpaperOptions.value = true;
  }

  function handleEditAvatarOptions() {
    showEditAvatarOptions.value = true;
  }

  function handleOutsideAvatarOptions() {
    if (showEditAvatarOptions.value) {
      showEditAvatarOptions.value = false;
    }
  }

  function handleOutsideWallpaperOptions() {
    if (showEditAvatarWallpaperOptions.value) {
      showEditAvatarWallpaperOptions.value = false;
    }
  }

  async function handleSelectAvatar(file: PublicFile, user: PublicUser) {
    try {
      auth.updateUserAvatar(await auth.uploadUserAvatar(user, file.attributes.url), file.attributes.url);
      isActiveModal.value = false;
    } catch(e) {
      throw e;
    }
  }

  async function handleSelectWallpaper(file: PublicFile, user: PublicUser) {
    try {
      auth.updateUserWallpaper(await auth.uploadUserWallpaper(user, file), file.attributes.url);
      isActiveWallpaperModal.value = false;
    } catch(e) {
      throw e;
    }
  }

  function handleAvatarModal() {
    isActiveModal.value = !isActiveModal.value;
  }

  function handleWallpaperModal() {
    isActiveWallpaperModal.value = !isActiveWallpaperModal.value;
  }

  function handleCollectionModal() {
    isActiveCollectionModal.value = !isActiveCollectionModal.value;
  }

  function handleERC721Modal() {
    isActiveERC721Modal.value = !isActiveERC721Modal.value;
  }

  function handleShowUsername() {
    showUsername.value = !showUsername.value;
  }

  function handleShowEmail() {
    showEmail.value = !showEmail.value;
  }

  function update(user: PublicUser) {
    return auth.update(user);
  }

  function handleFileUpload(newFile: File, user: PublicUser, provider: string) {
    return new Promise((resolve, reject) => {
      const URL = (window.URL || window.webkitURL);
      const blob = URL.createObjectURL(newFile);

      const file = {
        name: provider + ":" + newFile.name,
        alt: newFile.name,
        caption: newFile.name,
        provider: provider,
        ext: `.${newFile.type.substr(6).split("+")[0]}`,
        type: newFile.type === "image/jpeg" ? "image/jpg" : newFile.type,
        size: newFile.size,
        hash: "",
        thumb: "",
        width: 0,
        height: 0,
        file: newFile
      }

      const img = new Image();

      img.src = blob;

      file.thumb = blob;

      img.onload = () => {
        file.width = img.width;
        file.height = img.height;
        file.file = newFile;
        resolve(upload(file, user));
      }
    });
  }

  function upload (file: any, user: PublicUser) {
    return loader.upload(file, user)
      .then( (file) => {
        if (file.attributes.provider === `avatar:${user.uuid}`) {
          showEditAvatarOptions.value = false;
          auth.updateUserAvatar(user, import.meta.env.VITE_BACKEND + file.attributes.url);
        }
        if (file.attributes.provider === `wallpaper:${user.uuid}`) {
          auth.updateUserWallpaper(user, import.meta.env.VITE_BACKEND + file.attributes.url);
        }
        return file;
      })
      .catch((e) => {
        throw e;
      });
  }



  return {
    setPath,
    getPath,
    showEditAvatarBtn,
    showEditAvatarOptions,
    showEditAvatarWallpaper,
    showEditAvatarWallpaperOptions,
    isActiveWallpaperModal,
    isActiveCollectionModal,
    isActiveERC721Modal,
    isActiveModal,
    showUsername,
    showEmail,
    handleWallpaperModal,
    handleSelectWallpaper,
    handleEnterEditAvatarWallpaper,
    handleLeaveEditAvatarWallpaper,
    handleEditAvatarWallpaperOptions,
    handleOutsideWallpaperOptions,
    handleEnterEditAvatar,
    handleLeaveEditAvatar,
    handleEditAvatarOptions,
    handleOutsideAvatarOptions,
    handleSelectAvatar,
    handleAvatarModal,
    handleCollectionModal,
    handleERC721Modal,
    handleShowUsername,
    handleShowEmail,
    update,
    handleFileUpload
  }
});
