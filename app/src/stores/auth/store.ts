import {defineStore} from "pinia";
import type {PublicFile, PublicUser} from "@/types";
import { ref } from "vue";
import { link } from "@/helpers";

export const useAuthStore = defineStore("auth", () => {
  const LS_KEY = "metamask:auth";

  const user = ref(localStorage.getItem(LS_KEY)
    ? JSON.parse(localStorage.getItem(LS_KEY) as string)
    : undefined);

  function getUser(): PublicUser {
    return user.value;
  }

  function storeUser(_user: PublicUser) {
    if (_user.gravatar) {
      _user.gravatar = _user.gravatar.replace("//localhost:1111", import.meta.env.VITE_BACKEND);
    }
    if (_user.wallpaper) {
      _user.wallpaper = link(_user.wallpaper);
    }
    localStorage.setItem(LS_KEY, JSON.stringify(_user));
    user.value = _user;
  }

  function removeUser() {
    localStorage.removeItem(LS_KEY);
    delete user.value;
  }

  function update(_user: PublicUser) {
    if (user.value.id === _user.id && user.value.uuid === _user.uuid) {
      user.value.username = _user.username;
      user.value.email = _user.email;
      localStorage.setItem(LS_KEY, JSON.stringify(user.value));
      return uploadUser();
    }
  }

  function uploadUser() {
    return fetch(`${import.meta.env.VITE_BACKEND}/api/v1/users`, {
      method: "POST", // or "PUT"
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.value.token}`
      },
      body: JSON.stringify(user.value)
    })
      .then((response) => response.json());
  }

  function updateUserAvatar(_user: PublicUser, url: string) {
    if (user.value.id === _user.id && user.value.uuid === _user.uuid) {
      user.value.gravatar = url;
      localStorage.setItem(LS_KEY, JSON.stringify(user.value));
    }
  }

  function updateUserWallpaper(_user: PublicUser, url: string) {
    if (user.value.id === _user.id && user.value.uuid === _user.uuid) {
      user.value.wallpaper = url;
      localStorage.setItem(LS_KEY, JSON.stringify(user.value));
    }
  }

  function uploadUserAvatar(_user: PublicUser, url: string) {
    if (user.value.id === _user.id && user.value.uuid === _user.uuid) {
      user.value.gravatar = url;
      return fetch(`${import.meta.env.VITE_BACKEND}/api/v1/users`, {
        method: "POST", // or "PUT"
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.value.token}`
        },
        body: JSON.stringify(user.value)
      })
        .then((response) => response.json());
    }
  }

  function uploadUserWallpaper(_user: PublicUser, file: any) {
    if (user.value.id === _user.id && user.value.uuid === _user.uuid) {
      user.value.wallpaperId = file.id;
      return fetch(`${import.meta.env.VITE_BACKEND}/api/v1/users`, {
        method: "POST", // or "PUT"
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.value.token}`
        },
        body: JSON.stringify(user.value)
      })
        .then((response) => response.json());
    }
  }

  function loadAvatars() {
    const provider = `avatar:${user.value.uuid}`;
    return fetch(`${import.meta.env.VITE_BACKEND}/api/v1/avatars?provider=${provider}`, {
      method: "GET", // or "PUT"
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.value.token}`
      },
    })
      .then((response) => response.json())
      .then((files) => {
        return files.map((file: PublicFile) => {
          file.attributes.url = `${import.meta.env.VITE_BACKEND}${file.attributes.url}`;
          return file;
        });
      });
  }

  function loadWallpapers() {
    const provider = `wallpaper:${user.value.uuid}`;
    return fetch(`${import.meta.env.VITE_BACKEND}/api/v1/avatars?provider=${provider}`, {
      method: "GET", // or "PUT"
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.value.token}`
      },
    })
      .then((response) => response.json())
      .then((files) => {
        return files.map((file: any) => {
          file.attributes.url = `${import.meta.env.VITE_BACKEND}${file.attributes.url}`;
          return file;
        });
      });
  }

  return {
    getUser,
    storeUser,
    removeUser,
    update,
    updateUserAvatar,
    updateUserWallpaper,
    uploadUserAvatar,
    uploadUserWallpaper,
    loadAvatars,
    loadWallpapers
  }
});