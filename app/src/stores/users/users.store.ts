import { defineStore } from "pinia";
import type { PublicUser } from "@/types";
import type { Ref } from "vue";
import { ref } from "vue";

export const useUserStore = defineStore("users", () => {
  const users: Ref<PublicUser[]> = ref([]);

  function storeUsers(_users: PublicUser[]) {
    users.value = _users.map((user: PublicUser) => {
      if (user.wallpaper) {
        user.wallpaper = import.meta.env.VITE_BACKEND + user.wallpaper;
      }

      if (user.gravatar) {
        user.gravatar = user.gravatar.replace("//localhost:1111", import.meta.env.VITE_BACKEND);
      }

      return user;
    });
  }

  function getUsers(): PublicUser[] {
    return users.value
  }

  return {
    storeUsers,
    getUsers
  }
});