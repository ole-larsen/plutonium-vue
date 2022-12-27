
import { defineStore } from "pinia";
import {getCurrentInstance, toRaw} from "vue";
import {ethers, utils} from "ethers";

export const useWeb3Store = defineStore({
  id: "web3",
  state: () => ({
    provider: getCurrentInstance()?.appContext.config.globalProperties.$web3,
    registered: false,
    connected:  false,
    isMetaMask: false,
    accounts:   [""],
    address:    "",
    chainID: 0,
    nodeInfo: "",
    balance: 0,
    signer: getCurrentInstance()?.appContext.config.globalProperties.$web3,
  }),
  getters: {
    isRegistered:  (state) => state.registered,
    isConnected:   (state) => state.connected,
    checkMetaMask: (state) => state.isMetaMask,
    getChainID:    (state) => state.chainID,
    getAccounts:   (state) => state.accounts,
    getNodeInfo:   (state) => state.nodeInfo,
    getBalance:    (state) => utils.formatEther(state.balance),
    getAddress:    (state) => state.address,
    getProvider:   (state) => state.provider,
    getSigner:     (state) => state.signer
  },
  actions: {
    async register() {
      // if (!this.provider) {
      //   return this.registered = false;
      // }
      try {
        const provider = toRaw(this.provider);
        this.signer = provider.getSigner.bind(provider);

        this.chainID = parseInt(await this.storeChainId(), 16);
        this.nodeInfo = await this.storeNodeInfo();
        this.accounts = await this.storeAccounts();
        this.address  = await this.storeAddress();
        this.balance  = await this.storeBalance();
        this.registered = true;
        const previousAddress = localStorage.getItem("address");
        if (previousAddress !== this.address) {
          localStorage.setItem("address", this.address);
          localStorage.removeItem("user");
        }
        console.log("from web3", this.chainID, this.nodeInfo);
      } catch (e) {
        this.registered = false;
        this.connected = false;
        console.error(e);
      }
    },
    storeAddress() {
      return this.signer().getAddress();
    },
    storeBalance() {
      return this.signer().getBalance();
    },
    storeAccounts() {
      return this.provider.listAccounts();
    },
    storeChainId() {
      return this.provider.send("eth_chainId");
    },
    storeNodeInfo() {
      return this.provider.send("web3_clientVersion");
    }
  }
});
