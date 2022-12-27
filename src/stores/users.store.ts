import { defineStore } from "pinia";
import {inject, ref} from "vue";
import type {User} from "@/stores/auth";

export const useUsersStore = defineStore("users", () => {
  const axios: any = inject("axios");  // inject axios
  const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/users`;
  const users = ref([]);

  function getData() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/users`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN
      }
    });
  }
  async function load() {
    try {
      const { data } = await getData();

      users.value = data.map((user: User) => {
        if (user.wallpaper) {
          user.wallpaper = import.meta.env.VITE_BACKEND + user.wallpaper;
        }
        if (user.gravatar) {
          user.gravatar = user.gravatar.replace("//localhost:1111", import.meta.env.VITE_BACKEND);
        }
        return user;
      });
    } catch (e) {
      throw e;
    }
  }
  return {
    users,
    load
  }
});