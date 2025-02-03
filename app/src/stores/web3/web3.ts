
import { defineStore } from "pinia";
import type { Ref } from "vue";
import { getCurrentInstance, ref, toRaw } from "vue";
import { BigNumber, ethers } from "ethers";
import { error } from "@/helpers";

export const useWeb3Store = defineStore("web3", () => {
  const provider =
    getCurrentInstance()?.appContext.config.globalProperties.$web3;
  const signer = ref(
    getCurrentInstance()?.appContext.config.globalProperties.$web3
  );

  const isRegistered: Ref<boolean> = ref(false);
  const isConnected: Ref<boolean> = ref(false);
  const chainID: Ref<number> = ref(0);
  const nodeInfo: Ref<string> = ref("");
  const accounts: Ref<string[]> = ref([]);
  const address: Ref<string> = ref("");
  const balance: Ref<BigNumber> = ref(BigNumber.from("0"));
  const networkID: Ref<string> = ref("");

  function loadChainId() {
    return provider.send("eth_chainId");
  }

  function loadNodeInfo() {
    return provider.send("web3_clientVersion");
  }

  function loadAccounts() {
    return provider.listAccounts();
  }

  function loadAddress() {
    return signer.value().getAddress();
  }

  function loadBalance() {
    return signer.value().getBalance();
  }

  function loadNetworkId() {
    return provider.send("net_version");
  }

  function loadIsConnected() {
    return toRaw(provider).provider.isConnected();
  }
  
  function recover(msg: string, signature: string) {
    return ethers.utils.verifyMessage(msg, signature);
  }
  
  function loadPersonalSign(msg: string, from: string) {
    return provider.send("eth_sign", [from, msg]);
  }

  function disconnect() {
    localStorage.removeItem("address");
    localStorage.removeItem("user");
    isConnected.value = false;
    isRegistered.value = false;
  }

  async function setupHandlers() {
    const ethereum = toRaw(provider);

    ethereum.removeListener("accountsChanged", register);

    ethereum.on("connect", async (connectInfo: { chainId: string }) => {
      chainID.value = parseInt(connectInfo.chainId, 16);
      console.log(`Connected to Web3 - Chain ID: ${chainID.value}`);
    });

    ethereum.on("disconnect", async (e: Error) => {
      error(e);
      disconnect();
      await register();
    });

    ethereum.on("accountsChanged", async (newAccounts: string[]) => {
      if (newAccounts.length === 0) {
        disconnect();
      } else {
        await register();
      }
    });

    ethereum.on("chainChanged", async () => {
      disconnect();
      await register();
    });

    ethereum.on("networkChanged", async () => {
      networkID.value = await loadNetworkId();
      console.log(`Network changed: ${networkID.value}`);
    });
  }

  async function register() {
    console.log("trying to connect to web3....");
    if (!provider) {
      isRegistered.value = false;
    }
    try {
      await setupHandlers();
      signer.value = provider.getSigner.bind(provider);
      chainID.value = parseInt(await loadChainId(), 16);
      nodeInfo.value = await loadNodeInfo();
      accounts.value = await loadAccounts();
      address.value = await loadAddress();
      balance.value = await loadBalance();
      networkID.value = await loadNetworkId();
      isRegistered.value = true;
      isConnected.value = true;

      const previousAddress = localStorage.getItem("address");
      if (previousAddress !== address.value) {
        localStorage.setItem("address", address.value);
        localStorage.removeItem("user");
      }

      console.log(
        chainID.value,
        nodeInfo.value,
        accounts.value,
        address.value,
        balance.value,
        networkID.value
      );
    } catch (e) {
      disconnect();
      error(e);
    }
  }

  async function handleWalletConnect(marketName: string, nonce: string, uuid: string) {
    // Check if address is defined
    if (!address.value) {
        throw new Error("Wallet address is not available.");
    }

    // Build the message dynamically
    const message = `
        \nWelcome to ${marketName}!\n\n
        Click to sign in and accept the ${marketName} Terms of Service:\n
        https://${import.meta.env.VITE_DOMAIN}/tos\n\n\n
        This request will not trigger a blockchain transaction or cost any gas fees.\n\n
        Your authentication status will reset after 24 hours.\n\n
        Wallet address:\n${address.value}\n\n
        Nonce:\n${nonce}
    `;
    const msg = `0x${Buffer.from(message, "utf8").toString("hex")}`;
   
    const signature = await loadPersonalSign(msg, address.value);

    // Recover the signer address from the message and signature
    const recovered = recover(message, signature);
    
    if (recovered.toLowerCase() === address.value.toLowerCase()) {
        return { msg, signature };
    } else {
        throw new Error("Invalid signature");
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
    register,
    isRegistered,
    handleWalletConnect,
    signer,
    getChainID,
    getBalance,
    getAddress,
  };
});
