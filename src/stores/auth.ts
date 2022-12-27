import {defineStore} from "pinia";
import {ref} from "vue";
import {LS_KEY} from "@/stores/metamask";
import {useLoaderStore} from "@/stores/loader";

export type User = {
  address: string;
  email: string;
  gravatar: string;
  id: number;
  nonce: number;
  token: string;
  username: string;
  uuid: string;
  wallpaper: string;
}
export const useAuthStore = defineStore("auth", () => {
  const user = ref(localStorage.getItem(LS_KEY) ? JSON.parse(localStorage.getItem(LS_KEY) as string) : undefined);

  function storeUser (key: string, _user: User) {
    if (_user.gravatar) {
      _user.gravatar = _user.gravatar.replace("//localhost:1111", import.meta.env.VITE_BACKEND);
    }
    if (_user.wallpaper) {
      _user.wallpaper = `${import.meta.env.VITE_BACKEND}${_user.wallpaper}`;
    }
    localStorage.setItem(key, JSON.stringify(_user));
    user.value = _user;
  }

  function removeUser(key: string) {
    localStorage.removeItem(key);
     delete user.value;
  }

  function updateUserAvatar(_user: {id: number; uuid: string; gravatar: string; username: string; email: string}, url: string) {
    if (user.value.id === _user.id && user.value.uuid === _user.uuid) {
      user.value.gravatar = url;
      console.log(url);
      localStorage.setItem(LS_KEY, JSON.stringify(user.value));
    }
  }

  function updateUserWallpaper(_user: {id: number; uuid: string; gravatar: string; username: string; email: string}, url: string) {
    if (user.value.id === _user.id && user.value.uuid === _user.uuid) {
      user.value.wallpaper = url;
      localStorage.setItem(LS_KEY, JSON.stringify(user.value));
    }
  }

  function update(_user: {id: number; uuid: string; gravatar: string; username: string; email: string}) {
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

  function uploadUserAvatar(_user: User, url: string) {
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

  function uploadUserWallpaper(_user: User, file: any) {
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
        return files.map((file: any) => {
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

  return { user,
    loadWallpapers,
    loadAvatars,
    uploadUserWallpaper,
    uploadUserAvatar,
    uploadUser,
    storeUser,
    removeUser,
    update,
    updateUserWallpaper,
    updateUserAvatar
  }
});
