import { defineStore } from "pinia";
import type { PublicUserDto } from "@/types";
import type { Ref } from "vue";
import { ref } from "vue";

export const useUserStore = defineStore("users", () => {
  const users: Ref<PublicUserDto[]> = ref([]);

  function storeUsers(_users: PublicUserDto[]) {
    users.value = _users;
  }

  function getUsers(): PublicUserDto[] {
    return users.value;
  }

  return {
    storeUsers,
    getUsers,
  };
});
