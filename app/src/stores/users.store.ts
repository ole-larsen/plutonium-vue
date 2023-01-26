import { defineStore } from "pinia";
import type {Ref} from "vue";
import {inject, ref, toRaw} from "vue";
import type {User} from "@/stores/auth";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import {ethers} from "ethers";
import {useMetaMaskStore} from "@/stores/web3/metamask";
import {useWeb3Store} from "@/stores/web3/web3";

export const useUsersStore = defineStore("users", () => {
  const axios: any = inject("axios");  // inject axios

  const users: Ref<User[]> = ref([]);

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

      users.value = await Promise.all(data.map(async (user: User) => {
        if (user.wallpaper) {
          user.wallpaper = import.meta.env.VITE_BACKEND + user.wallpaper;
        }
        if (user.gravatar) {
          user.gravatar = user.gravatar.replace("//localhost:1111", import.meta.env.VITE_BACKEND);
        }
        if (!user.funds) {
          const funds = await useMarketPlaceStore().contract.getUserFunds(user.address);
          user.funds = ethers.utils.formatEther(funds).toString();
        }
        return user;
      }));
    } catch (e) {
      console.error(e);
    }
  }
  return {
    users,
    load
  }
});