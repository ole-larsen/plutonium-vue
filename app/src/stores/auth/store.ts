import { defineStore } from "pinia";
import type { Oauth2TokenDto, PublicFileDto, PublicUserDto } from "@/types";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const LS_KEY = "auth:user";
  const AT_KEY = "auth:oauth2";

  const user = ref(
    localStorage.getItem(LS_KEY)
      ? JSON.parse(localStorage.getItem(LS_KEY) as string)
      : undefined
  );

  function getUser(): PublicUserDto {
    return user.value;
  }

  function setUser(publicUser: PublicUserDto) {
    localStorage.setItem(LS_KEY, JSON.stringify(publicUser));
    user.value = publicUser;
  } 

  function removeUser() {
    localStorage.removeItem(LS_KEY);
    delete user.value;
  }

  const token = ref(
    localStorage.getItem(AT_KEY)
      ? JSON.parse(localStorage.getItem(AT_KEY) as string)
      : undefined
  );
  function getToken(): Oauth2TokenDto {
    return token.value;
  }

  function setToken(tkn: Oauth2TokenDto) {
    localStorage.setItem(AT_KEY, JSON.stringify(tkn));
    token.value = tkn;
  } 

  function removeToken() {
    localStorage.removeItem(AT_KEY);
    delete token.value;
  }

  function update(publicUser: PublicUserDto) {
    if (user.value.id === publicUser.id && user.value.attributes.uuid === publicUser.attributes.uuid) {
      user.value.attributes.username = publicUser.attributes.username;
      user.value.attributes.email = publicUser.attributes.email;
      localStorage.setItem(LS_KEY, JSON.stringify(user.value));
      return uploadUser();
    }
  }

  function uploadUser() {
    return fetch(`${import.meta.env.VITE_BACKEND}/api/v1/users`, {
      method: "POST", // or "PUT"
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.value.attributes.token}`,
      },
      body: JSON.stringify(user.value),
    }).then((response) => response.json());
  }

  function updateUserAvatar(publicUser: PublicUserDto, url: string) {
    if (user.value.id === publicUser.id && user.value.attributes.uuid === publicUser.attributes.uuid) {
      user.value.attributes.gravatar = url;
      localStorage.setItem(LS_KEY, JSON.stringify(user.value));
    }
  }

  function updateUserWallpaper(publicUser: PublicUserDto, url: string) {
    if (user.value.id === publicUser.id && user.value.attributes.uuid === publicUser.attributes.uuid) {
      user.value.attributes.wallpaper = url;
      localStorage.setItem(LS_KEY, JSON.stringify(user.value));
    }
  }

  function uploadUserAvatar(publicUser: PublicUserDto, url: string) {
    if (user.value.id === publicUser.id && user.value.attributes.uuid === publicUser.attributes.uuid) {
      user.value.gravatar = url;
      return fetch(`${import.meta.env.VITE_BACKEND}/api/v1/users`, {
        method: "POST", // or "PUT"
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.value.token}`,
        },
        body: JSON.stringify(user.value),
      }).then((response) => response.json());
    }
  }

  function uploadUserWallpaper(publicUser: PublicUserDto, file: any) {
    if (user.value.id === publicUser.id && user.value.uuid === publicUser.attributes.uuid) {
      user.value.attributes.wallpaperId = file.id;
      return fetch(`${import.meta.env.VITE_BACKEND}/api/v1/users`, {
        method: "POST", // or "PUT"
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.value.token}`,
        },
        body: JSON.stringify(user.value),
      }).then((response) => response.json());
    }
  }

  function loadAvatars() {
    const provider = `avatar:${user.value.uuid}`;
    return fetch(
      `${import.meta.env.VITE_BACKEND}/api/v1/avatars?provider=${provider}`,
      {
        method: "GET", // or "PUT"
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.value.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((files) => {
        return files.map((file: PublicFileDto) => {
          file.attributes.url = `${import.meta.env.VITE_BACKEND}${
            file.attributes.url
          }`;
          return file;
        });
      });
  }

  function loadWallpapers() {
    const provider = `wallpaper:${user.value.uuid}`;
    return fetch(
      `${import.meta.env.VITE_BACKEND}/api/v1/frontend/avatars?provider=${provider}`,
      {
        method: "GET", // or "PUT"
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.value.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((files) => {
        return files.map((file: any) => {
          file.attributes.url = `${import.meta.env.VITE_BACKEND}${
            file.attributes.url
          }`;
          return file;
        });
      });
  }

  return {
    getToken,
    setToken,
    removeToken,
    getUser,
    setUser,
    removeUser,
    update,
    updateUserAvatar,
    updateUserWallpaper,
    uploadUserAvatar,
    uploadUserWallpaper,
    loadAvatars,
    loadWallpapers,
  };
});
