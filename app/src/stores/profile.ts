import {defineStore} from "pinia";
import type {User} from "@/stores/auth";
import {useAuthStore} from "@/stores/auth";

export const useProfileStore = defineStore({
  id: "profile",
  state: () => ({
    _path: null,
    _showEditAvatarBtn: false,
    _showEditAvatarOptions: false,
    _showEditAvatarWallpaper: false,
    _showEditAvatarWallpaperOptions: false,
    _isActiveWallpaperModal: false,
    _isActiveCollectionModal: false,
    _isActiveModal: false,
    _showUsername: false,
    _showEmail: false
  }),
  getters: {
    path: (state) => state._path,
    showEditAvatarBtn: (state) => state._showEditAvatarBtn,
    showEditAvatarOptions: (state) => state._showEditAvatarOptions,
    showEditAvatarWallpaper: (state) => state._showEditAvatarWallpaper,
    showEditAvatarWallpaperOptions: (state) => state._showEditAvatarWallpaperOptions,
    isActiveWallpaperModal: (state) => state._isActiveWallpaperModal,
    isActiveCollectionModal: (state) => state._isActiveCollectionModal,
    isActiveModal: (state) => state._isActiveModal,
    showUsername: (state) => state._showUsername,
    showEmail: (state) => state._showEmail
  },
  actions: {
    handleEnterEditAvatar() {
      this._showEditAvatarBtn = true;
    },
    handleLeaveEditAvatar() {
      this._showEditAvatarBtn = false;
    },
    handleEnterEditAvatarWallpaper() {
      this._showEditAvatarWallpaper = true;
    },
    handleLeaveEditAvatarWallpaper() {
      this._showEditAvatarWallpaper = false;
    },
    handleEditAvatarWallpaperOptions() {
      this._showEditAvatarWallpaperOptions = true;
    },
    handleEditAvatarOptions() {
      this._showEditAvatarOptions = true;
    },
    handleOutsideAvatarOptions() {
      if (this._showEditAvatarOptions === true) {
        this._showEditAvatarOptions = false;
      }
    },
    handleOutsideWallpaperOptions() {
      if (this._showEditAvatarWallpaperOptions === true) {
        this._showEditAvatarWallpaperOptions = false;
      }
    },
    async handleSelectAvatar(file: any, user: User) {
      try {
        useAuthStore().updateUserAvatar(await useAuthStore().uploadUserAvatar(user, file.attributes.url), file.attributes.url);
        this._isActiveModal = false;
      } catch(e) {
        console.error(e);
      }
    },
    async handleSelectWallpaper(file: any, user: User) {
      try {
        useAuthStore().updateUserWallpaper(await useAuthStore().uploadUserWallpaper(user, file), file.attributes.url);
        this._isActiveWallpaperModal = false;
      } catch(e) {
        console.error(e);
      }
    },
    handleAvatarModal() {
      this._isActiveModal = !this._isActiveModal;
    },
    handleWallpaperModal() {
      this._isActiveWallpaperModal = !this._isActiveWallpaperModal;
    },
    handleCollectionModal() {
      this._isActiveCollectionModal = !this._isActiveCollectionModal;
    },
    handleShowUsername() {
      this._showUsername = !this._showUsername;
    },
    handleShowEmail() {
      this._showEmail = !this._showEmail;
    },
    update(user: User) {
      return useAuthStore().update(user);
    },
    async handleFileUpload(newFile: File, user: User, provider: string) {
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
        this.upload(file, user);
      }
    },
    upload (file: any, user: User) {
      const formData = new FormData();
      formData.append("name", file.name);
      formData.append("alt", file.alt);
      formData.append("hash", file.hash);
      formData.append("ext", file.ext);
      formData.append("caption", file.caption);
      formData.append("type", file.type);
      formData.append("size", file.size);
      formData.append("width", file.width);
      formData.append("height", file.height);
      formData.append("provider", file.provider);
      formData.append("file", file.file);

      let url = `${import.meta.env.VITE_BACKEND}/api/v1/files`;

      return fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user.token}`
        },
        body: formData
      })
        .then((response) => response.status === 200 ? response.json() : response.text())
        .then( (file) => {
          if (file.attributes.provider === `avatar:${user.uuid}`) {
            useAuthStore().updateUserAvatar(user, import.meta.env.VITE_BACKEND + file.attributes.url);
          }
          if (file.attributes.provider === `wallpaper:${user.uuid}`) {
            useAuthStore().updateUserWallpaper(user, import.meta.env.VITE_BACKEND + file.attributes.url);
          }
          this._showEditAvatarOptions = false;
        })
        .catch((e) => {
          console.error(e);
          throw e;
        });
    },
  }
});