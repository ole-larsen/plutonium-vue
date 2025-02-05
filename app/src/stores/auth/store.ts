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
    if (publicUser.attributes.gravatar && !publicUser.attributes.gravatar.includes("gravatar")) {
      publicUser.attributes.gravatar = import.meta.env.VITE_UPLOADER + publicUser.attributes.gravatar;
    }
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

  return {
    getToken,
    setToken,
    removeToken,
    getUser,
    setUser,
    removeUser,
  };
});
