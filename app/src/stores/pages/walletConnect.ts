import { defineStore } from "pinia";
import type { PublicWalletConnectItemDto } from "@/types";
import type { Ref } from "vue";
import { ref } from "vue";
import { useLoaderStore } from "@/stores/loader/store";

export const useWalletConnectStore = defineStore("walletConnect", () => {
  const walletConnect: Ref<PublicWalletConnectItemDto[]> = ref([]);
  const loader = useLoaderStore();

  async function load() {
    // const { data } = await loader.loadWalletConnect();
    // walletConnect.value = data;
  }
  return {
    walletConnect,
    load,
  };
});
