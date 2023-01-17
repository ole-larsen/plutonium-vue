import {getCurrentInstance, inject, toRaw, ref} from "vue";
import { defineStore } from "pinia";
import {BigNumber, ethers, utils} from "ethers";
import axios from "axios";
import * as ethUtil from 'ethereumjs-util';
import {Buffer} from "buffer";
import {useAuthStore} from "@/stores/auth";

interface ConnectInfo {
  chainId: string;
}

interface ProviderMessage {
  type: string;
  data: unknown;
}

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

interface AccountPermission {
  caveats: {type: string; value: string[]}[]
  date: number;
  id: string;
  invoker: string;
  parentCapability: string;
}

interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

interface Block {
  baseFeePerGas: string;
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: string;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactions: string[];
  transactionsRoot: string;
  uncles: string[];
}

export const LS_KEY = "metamask:auth";

export const useMetaMaskStore = defineStore({
  id: "metamask",
  state: () => ({
    _provider: getCurrentInstance()?.appContext.config.globalProperties.$ethereum,
    _registered: false,
    _connected:  false,
    _accounts:   [""],
    _address:    "",
    _chainID:    0,
    _networkId:  "",
    _nodeInfo:   "",
    _balance: BigNumber.from("0"),
    _publicKey: "",
    _signer: getCurrentInstance()?.appContext.config.globalProperties.$ethereum,
    _accountsPermission: {},
    _blockByNumber: {}
  }),
  getters: {
    registered:     (state) => state._registered,
    connected:      (state) => toRaw(state._provider).provider.isConnected(),
    isMetaMask:     (state) => toRaw(state._provider).provider.isMetaMask,
    chainID:        (state) => state._chainID,
    networkID:      (state) => state._networkId,
    accounts:       (state) => state._accounts,
    nodeInfo:       (state) => state._nodeInfo,
    balance:        (state) => utils.formatEther(state._balance),
    address:        (state) => state._address,
    provider:       (state) => state._provider,
    signer:         (state) => state._signer,
    publicKey:      (state) => state._publicKey
  },
  actions: {
    watchAsset(address: string, symbol: string, imgUrl: string) {
      toRaw(this._provider).provider
        .request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: address,
              symbol: symbol,
              decimals: 18,
              image: imgUrl
            },
          },
        })
        .then((success: boolean) => {
          if (success) {
            console.log(`${symbol} successfully added to wallet!`);
          } else {
            throw new Error('Something went wrong.');
          }
        })
        .catch(console.error);
    },
    async setupHandlers() {
      const { provider: ethereum } = toRaw(this._provider);
      ethereum.removeListener("accountsChanged", this.register);

      ethereum.on("connect", async (connectInfo: ConnectInfo) => {
        this._chainID = parseInt(connectInfo.chainId, 16);
        console.log("connected to web3", this._chainID, this._nodeInfo);
      });

      ethereum.on("disconnect", async (e: ProviderRpcError) => {
        await this.register();
      });

      ethereum.on('accountsChanged', (accounts: string[]) => {
        if (useAuthStore().user && useAuthStore().user.address.toLowerCase() !== accounts[0].toLowerCase()) {
          useAuthStore().removeUser(LS_KEY);
          localStorage.removeItem("address");
          localStorage.removeItem("user");
          location.reload();
        }
        this.register();
      });

      ethereum.on("chainChanged", this.register);

    },
    async register() {

      if (!this._provider) {
        return this._registered = false;
      }
      try {
        console.log("trying to connect to metamask....");

        await this.setupHandlers();

        const provider = toRaw(this._provider);

        this._signer = provider.getSigner.bind(provider);

        this._chainID = parseInt(await this.storeChainId(), 16);

        this._nodeInfo = await this.storeNodeInfo();
        this._accounts = await this.storeAccounts();

        const address = await this.storeAddress();
        this._address  = address.toLowerCase();
        this._balance  = await this.storeBalance();
        this._blockByNumber = await this.storeBlockByNumber();
        this._networkId = await this.storeNetworkId();
        // this._accountsPermission = await this.requestPermissions();
        this._registered = true;
        this._connected = this.isConnected();
        const previousAddress = localStorage.getItem("address");
        if (previousAddress !== this._address) {
          localStorage.setItem("address", this._address);
          localStorage.removeItem("user");
        }
      } catch (e) {
        this._registered = false;
        this._connected = false;
        localStorage.removeItem("address");
        localStorage.removeItem("user");
        console.error(e);
      }
    },
    isConnected() {
      return toRaw(this._provider).provider.isConnected();
    },
    storeAddress() {
      return this._signer().getAddress();
    },
    storeBalance() {
      return this._signer().getBalance();
    },
    storeAccounts() {
      return this._provider.send("eth_requestAccounts");
    },
    storeChainId() {
      return this._provider.send("eth_chainId");
    },
    storeNodeInfo() {
      return this._provider.send("web3_clientVersion");
    },
    getNewAccounts() {
      return this._provider.send("eth_requestAccounts");
    },
    storeNetworkId() {
      return this._provider.send("net_version");
    },
    storeBlockByNumber() {
      return this._provider.send("eth_getBlockByNumber", ['latest', false]);
    },
    requestPermissions() {
      return this._provider.send("wallet_requestPermissions", [{ eth_accounts: {} }]);
    },
    getNonce() {
      return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/auth/wallet-connect?address=${this._address}`, {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN
        }
      });
    },
    verify(msg: string, signature: string, address: string) {
      return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/auth/wallet-connect`, {
        msg,
        signature,
        address
      }, {
        withCredentials: true
      });
    },

    recover(msg: string, signature: string) {
      return this._provider.send("personal_ecRecover", [msg, signature]);
    },
    personalSign(data: {address: string; nonce: string; uuid: string}, from: string) {
      // const msg = `0x${ethUtil.keccak256(Buffer.from(JSON.stringify(data), "utf8")).toString('hex')}`;
      const msg = `0x${Buffer.from(JSON.stringify(data), "utf8").toString('hex')}`;
      return this._provider.send("personal_sign", [msg, from, '']);
    },
    storePublicKey(msg: string, signature: string) {
      const msgBuffer = ethUtil.toBuffer(msg);
      const msgHash = ethUtil.hashPersonalMessage(msgBuffer)
      const signatureParams = ethUtil.fromRpcSig(signature);
      const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
      );
      this._publicKey = ethUtil.bufferToHex(publicKey);
    },
    async login() {
      try {
        const { data } = await this.getNonce();
        const signature = await this.personalSign(data, this._address);
        const msg = `0x${Buffer.from(JSON.stringify(data), "utf8").toString("hex")}`;
        // const msg = `0x${ethUtil.keccak256(Buffer.from(JSON.stringify(data), "utf8")).toString('hex')}`;
        const address = await this.recover(msg, signature);
        if (address.toLowerCase() === this._address.toLowerCase()) {
          const { data } = await this.verify(msg, signature, address);

          useAuthStore().storeUser(LS_KEY, data);
        } else {
          console.log(LS_KEY);
          useAuthStore().removeUser(LS_KEY);
        }
      } catch(e) {
        console.error(e);
      }
    }
  }
});