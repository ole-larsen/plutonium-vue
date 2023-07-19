import { defineStore } from "pinia";
import type { Ref } from "vue";
import { getCurrentInstance, ref } from "vue";
import { BigNumber } from "ethers";
import { error } from "@/helpers";

export const useWeb3Store = defineStore("web3", () => {
  const provider = getCurrentInstance()?.appContext.config.globalProperties.$web3;
  const signer = ref(getCurrentInstance()?.appContext.config.globalProperties.$web3);

  const registered: Ref<boolean>   = ref(false);
  const connected:  Ref<boolean>   = ref(false);
  const chainID:    Ref<number>    = ref(0);
  const nodeInfo:   Ref<string>    = ref("");
  const accounts:   Ref<string[]>  = ref([]);
  const address:    Ref<string>    = ref("");
  const balance:    Ref<BigNumber> = ref(BigNumber.from("0"));
  const networkID:  Ref<string>    = ref("");

  function _getChainId() {
    return provider.send("eth_chainId");
  }

  function _getNodeInfo() {
    return provider.send("web3_clientVersion");
  }

  function _getAccounts() {
    return provider.listAccounts();
  }

  function _getAddress() {
    return signer.value().getAddress();
  }

  function _getBalance() {
    return signer.value().getBalance();
  }

  function _disconnect() {
    localStorage.removeItem("address");
    localStorage.removeItem("user");
    connected.value = false;
    registered.value = false;
  }

  async function register() {
    console.log("trying to connect to web3....");
    console.log(getCurrentInstance()?.appContext.config.globalProperties)
    try {

      signer.value = provider.getSigner.bind(provider);

      chainID.value = parseInt(await _getChainId(), 16);
      nodeInfo.value = await _getNodeInfo();
      accounts.value = await _getAccounts();
      address.value  = await _getAddress();
      balance.value  = await _getBalance();

      registered.value = true;
      connected.value = true;

      const previousAddress = localStorage.getItem("address");
      if (previousAddress !== address.value) {
        localStorage.setItem("address", address.value);
        localStorage.removeItem("user");
      }

      console.log(chainID.value, nodeInfo.value, accounts.value, address.value, balance.value, networkID.value);
    } catch (e) {
      _disconnect();
      error(e);
    }
  }

  function personalSign() {
    console.log("sign")
  }

  function getChainID() {
    return chainID.value;
  }

  return {
    register,
    registered,
    personalSign,
    signer,
    getChainID
  }

});

