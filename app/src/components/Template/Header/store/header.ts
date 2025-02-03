import { defineStore } from "pinia";
import type { PublicMenuDto, PublicUserDto } from "@/types";
import type { ComputedRef, Ref } from "vue";
import { computed, ref } from "vue";
import { useMetaMaskStore } from "@/stores/web3/metamask";
import { useLoaderStore } from "@/stores/loader/store";
import { error } from "@/helpers";
import { useAuthStore } from "@/stores/auth/store";

export const useHeaderStore = defineStore("header", () => {
  const loader = useLoaderStore();
  const auth = useAuthStore();
  
  const isSticky: Ref<boolean> = ref(false),
    isActive: Ref<boolean> = ref(false),
    isActiveMobile: Ref<boolean> = ref(false),
    isActiveSearch: Ref<boolean> = ref(false),
    isAuthorized: Ref<boolean> = ref(false),
    menu: Ref<PublicMenuDto | null> = ref(null),
    name: Ref<string> = ref("Plutonium");

  const publicUser: ComputedRef<PublicUserDto> = computed(() => {
    const user = auth.getUser();
    if (user) {
      isAuthorized.value = true;
    }
    return user;
  });

  function toggleSticky() {
    isSticky.value = window.scrollY >= 100;
  }

  function toggleActive() {
    isActive.value = !isActive.value;
  }

  function toggleActiveMobile() {
    isActiveMobile.value = !isActiveMobile.value;
  }

  function toggleActiveSearch() {
    isActiveSearch.value = !isActiveSearch.value;
  }

  function loadMenu(provider: string) {
    loader.loadMenu(provider)
    .then((response) => {
       menu.value = response.data as PublicMenuDto;
    })
    .catch((e) => {
       error(`Error fetching menu: ${e.message}`);
     });
  }

  async function handleWalletConnect() {
    const { user, token } = await loader.handleWalletConnect();
    
    if (user && token) {
      auth.setUser(user);
      auth.setToken(token);
      isAuthorized.value = true;
    } else {
      auth.removeUser();
      auth.removeToken();
      isAuthorized.value = false;
    }
  }
  return {
    isSticky,
    isActive,
    isActiveMobile,
    isActiveSearch,
    isAuthorized,
    menu,
    name,
    user: publicUser,
    loadMenu,
    handleWalletConnect,
    toggleSticky,
    toggleActive,
    toggleActiveMobile,
    toggleActiveSearch,
  };
});
