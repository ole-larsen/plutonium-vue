import { defineStore } from "pinia";
import type { Ref } from "vue";
import type { ConnectInfo, ProviderRpcError } from "@/types";

import MetaMaskOnboarding from "@metamask/onboarding";
import { getCurrentInstance, ref, toRaw } from "vue";

import { error, log } from "@/helpers";
import { BigNumber } from "ethers";
import { useLoaderStore } from "@/stores/loader/store";
import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";
import { useAuthStore } from "@/stores/auth/store";

export const useMetaMaskStore = defineStore("metamask", () => {
  const loader = useLoaderStore();
  const market = useMarketPlaceStore();
  const auth = useAuthStore();
  const installed = MetaMaskOnboarding.isMetaMaskInstalled();
  const provider =
    getCurrentInstance()?.appContext.config.globalProperties.$ethereum;
  const signer = ref(
    getCurrentInstance()?.appContext.config.globalProperties.$ethereum
  );

  const registered: Ref<boolean> = ref(false);
  const connected: Ref<boolean> = ref(false);
  const chainID: Ref<number> = ref(0);
  const nodeInfo: Ref<string> = ref("");
  const accounts: Ref<string[]> = ref([]);
  const address: Ref<string> = ref("");
  const balance: Ref<BigNumber> = ref(BigNumber.from("0"));
  const networkID: Ref<string> = ref("");

  function _getChainId() {
    return provider.send("eth_chainId");
  }

  function _getNodeInfo() {
    return provider.send("web3_clientVersion");
  }

  function _getAccounts() {
    return provider.send("eth_requestAccounts");
  }

  function _getAddress() {
    return signer.value().getAddress();
  }

  function _getBalance() {
    return signer.value().getBalance();
  }

  function _getNetworkId() {
    return provider.send("net_version");
  }

  function _isConnected() {
    return toRaw(provider).provider.isConnected();
  }

  function _recover(msg: string, signature: string) {
    return provider.send("personal_ecRecover", [msg, signature]);
  }

  function _personalSign(msg: string, from: string) {
    return provider.send("personal_sign", [msg, from, ""]);
  }

  function _disconnect() {
    localStorage.removeItem("address");
    localStorage.removeItem("user");
    connected.value = false;
    registered.value = false;
    auth.removeUser();
    location.reload();
  }

  async function _setupHandlers() {
    const { provider: ethereum } = toRaw(provider);

    ethereum.removeListener("accountsChanged", register);

    ethereum.on("connect", async (connectInfo: ConnectInfo) => {
      chainID.value = parseInt(connectInfo.chainId, 16);
      log(`connected to web3  ${chainID.value} ${nodeInfo.value}`);
    });

    ethereum.on("disconnect", async (e: ProviderRpcError) => {
      error(e);
      _disconnect();
      await register();
    });

    ethereum.on("accountsChanged", async (accounts: string[]) => {
      if (accounts) {
        _disconnect();
      }
      await register();
    });

    ethereum.on("chainChanged", async () => {
      _disconnect();
      await register();
    });
  }

  async function register() {
    if (!provider) {
      registered.value = false;
    }
    await _setupHandlers();
    signer.value = provider.getSigner.bind(provider);
    chainID.value = parseInt(await _getChainId(), 16);
    nodeInfo.value = await _getNodeInfo();
    accounts.value = await _getAccounts();
    address.value = (await _getAddress()).toLowerCase();
    balance.value = await _getBalance();
    networkID.value = await _getNetworkId();
    registered.value = true;
    connected.value = _isConnected();

    const previousAddress = localStorage.getItem("address");
    if (previousAddress !== address.value) {
      _disconnect();
      localStorage.setItem("address", address.value);
    }

    console.log(
      chainID.value,
      nodeInfo.value,
      accounts.value,
      address.value,
      balance.value,
      networkID.value
    );
  }

  async function personalSign() {
    const { data } = await loader.getNonce(address.value);

    const message =
      "\nWelcome to " +
      market.getName() +
      "!\n\n" +
      "Click to sign in and accept the " +
      market.getName() +
      " Terms of Service:\n" +
      "https://" +
      import.meta.env.VITE_DOMAIN +
      "/tos\n\n\n" +
      "This request will not trigger a blockchain transaction or cost any gas fees.\n\n" +
      "Your authentication status will reset after 24 hours.\n\n" +
      "Wallet address:\n" +
      data.address +
      "\n\n" +
      "Nonce:\n" +
      data.nonce;

    const msg = `0x${Buffer.from(message, "utf8").toString("hex")}`;

    const signature = await _personalSign(msg, address.value);
   
    const recovered = await _recover(msg, signature);
   
    if (recovered.toLowerCase() === address.value.toLowerCase()) {
      try {
        const { data } = await loader.verify(msg, signature, address.value);
        auth.storeUser(data);
      } catch (e) {
        console.error(e);
      }
      
    } else {
      auth.removeUser();
    }
  }

  function getChainID() {
    return chainID.value;
  }

  function getBalance() {
    return balance.value;
  }

  function getAddress() {
    return address.value;
  }

  return {
    installed,
    registered,
    register,
    personalSign,
    signer,
    getChainID,
    getBalance,
    getAddress,
  };
});
