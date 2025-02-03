import { defineStore } from "pinia";
import type { Ref } from "vue";
import type { ConnectInfo, ProviderRpcError } from "@/types";

import MetaMaskOnboarding from "@metamask/onboarding";
import { getCurrentInstance, ref, toRaw } from "vue";

import { error, log } from "@/helpers";
import { BigNumber } from "ethers";

export const useMetaMaskStore = defineStore("metamask", () => {
  const isInstalled = MetaMaskOnboarding.isMetaMaskInstalled();
  const provider =
    getCurrentInstance()?.appContext.config.globalProperties.$ethereum;
  const signer = ref(
    getCurrentInstance()?.appContext.config.globalProperties.$ethereum
  );

  const isRegistered: Ref<boolean> = ref(false);
  const isConnected: Ref<boolean> = ref(false);
  const chainID: Ref<number> = ref(0);
  const nodeInfo: Ref<string> = ref("");
  const accounts: Ref<string[]> = ref([]);
  const address: Ref<string> = ref("");
  const networkID: Ref<string> = ref("");

  function loadChainId() {
    return provider.send("eth_chainId");
  }

  function loadNodeInfo() {
    return provider.send("web3_clientVersion");
  }

  function loadAccounts() {
    return provider.send("eth_requestAccounts");
  }

  function loadAddress() {
    return signer.value().getAddress();
  }

  function getBalance() {
    return provider.getSigner().getBalance();
  }

  function loadNetworkId() {
    return provider.send("net_version");
  }

  function loadIsConnected() {
    return toRaw(provider).provider.isConnected();
  }

  function recover(msg: string, signature: string) {
    return provider.send("personal_ecRecover", [msg, signature]);
  }

  async function loadPersonalSign(msg: string, from: string) {
    try {
        return await provider.send("personal_sign", [msg, from, ""]);
    } catch (error) {
        console.warn("personal_sign failed, trying eth_sign...");
        return await provider.send("eth_sign", [from, msg]); // Reverse order for eth_sign
    }
  }

  function disconnect() {
    localStorage.removeItem("address");
    localStorage.removeItem("user");
    isConnected.value = false;
    isRegistered.value = false;
    location.reload();
  }

  async function setupHandlers() {
    const { provider: ethereum } = toRaw(provider);

    ethereum.removeListener("accountsChanged", register);

    ethereum.on("connect", async (connectInfo: ConnectInfo) => {
      chainID.value = parseInt(connectInfo.chainId, 16);
      log(`connected to web3  ${chainID.value} ${nodeInfo.value}`);
    });

    ethereum.on("disconnect", async (e: ProviderRpcError) => {
      error(e);
      disconnect();
      await register();
    });

    ethereum.on("accountsChanged", async (accounts: string[]) => {
      if (accounts) {
        disconnect();
      }
      await register();
    });

    ethereum.on("chainChanged", async () => {
      disconnect();
      await register();
    });
  }

  async function register() {
    console.log("trying to connect to metamask....");
    if (!provider) {
      isRegistered.value = false;
    }
    await setupHandlers();
    signer.value = provider.getSigner.bind(provider);
    chainID.value = parseInt(await loadChainId(), 16);
    nodeInfo.value = await loadNodeInfo();
    accounts.value = await loadAccounts();
    address.value = (await loadAddress()).toLowerCase();
    
    networkID.value = await loadNetworkId();
    isRegistered.value = true;
    isConnected.value = loadIsConnected();

    const previousAddress = localStorage.getItem("address");
    if (previousAddress !== address.value) {
      disconnect();
      localStorage.setItem("address", address.value);
    }

    console.log(
      chainID.value,
      nodeInfo.value,
      accounts.value,
      address.value,
      networkID.value,
      await getBalance()
    );
  }

  async function handleWalletConnect(marketName: string, nonce: string, uuid: string) {   
    const message =
      "\nWelcome to " +
      marketName +
      "!\n\n" +
      "Click to sign in and accept the " +
      marketName +
      " Terms of Service:\n" +
      "https://" +
      import.meta.env.VITE_DOMAIN +
      "/tos\n\n\n" +
      "This request will not trigger a blockchain transaction or cost any gas fees.\n\n" +
      "Your authentication status will reset after 24 hours.\n\n" +
      "Wallet address:\n" +
      address.value +
      "\n\n" +
      "Nonce:\n" +
      nonce;

    const msg = `0x${Buffer.from(message, "utf8").toString("hex")}`;

    const signature = await loadPersonalSign(msg, address.value);

    const recovered = await recover(msg, signature);
   
    if (recovered.toLowerCase() === address.value.toLowerCase()) {
      return { msg, signature };
    } else {
      throw new Error("Invalid signature");
    }
  }

  function getChainID() {
    return chainID.value;
  }

  function getAddress() {
    return address.value;
  }

  return {
    isInstalled,
    isRegistered,
    register,
    handleWalletConnect,
    signer,
    getChainID,
    getBalance,
    getAddress,
  };
});
