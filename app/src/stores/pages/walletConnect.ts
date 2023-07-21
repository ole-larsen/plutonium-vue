import { defineStore } from "pinia";
import type { WalletConnect } from "@/types";
import type { Ref } from "vue";
import { ref } from "vue";
import { useLoaderStore } from "@/stores/loader/store";

export const useWalletConnectStore = defineStore("walletConnect", () => {
  const walletConnect: Ref<WalletConnect[]> = ref([]);
  const loader = useLoaderStore();

  async function load() {
    const { data } = await loader.loadWalletConnect();
    walletConnect.value = data;
    walletConnect.value.map((item: WalletConnect) => {
      if (item.image) {
        item.image.attributes.url =
          import.meta.env.VITE_BACKEND + item.image.attributes.url;
      }
      return item;
    });
  }
  return {
    walletConnect,
    load,
  };
});
