import {defineStore} from "pinia";
import {BigNumber, ethers} from "ethers";
import {ref} from "vue";

// @ts-ignore
import type {NFTMarketplace} from "@/../dapp-contracts/typechain-types";

import {useNFTStore} from "@/stores/contracts/nft";
import {useMetaMaskStore} from "@/stores/web3/metamask";
import {useWeb3Store} from "@/stores/web3/web3";
import type {NFTItem} from "@/index";
import {useUsersStore} from "@/stores/users.store";
import type {User} from "@/stores/auth";
import type {Item, Metadata} from "@/stores/loader";

export const useMarketPlaceStore = defineStore("marketPlace", () => {
  const name = ref("");
  const contractAddress = ref(""),
    contract = ref(null),
    abi = ref(""),
    itemCount = ref(0),
    items = ref([]),
    fee = ref(0);

  function loadMetamaskContract(chainID: number) {
    // @ts-ignore
    contract.value = new ethers.Contract(contractAddress.value, JSON.parse(abi.value), useMetaMaskStore().signer()) as NFTMarketplace;
  }

  function loadWeb3Contract(chainID: number) {
    // @ts-ignore
    contract.value = new ethers.Contract(contractAddress.value, JSON.parse(abi.value), useWeb3Store().getSigner()) as NFTMarketplace;
  }

  function setAddress(address: string) {
    contractAddress.value = address;
  }

  function getName() {
    // @ts-ignore
    return contract.value.getName();
  }

  function setName(_name: string) {
    name.value = _name;
  }

  function setAbi(_abi: string) {
    abi.value = _abi;
  }

  function setFee(_fee: number) {
    fee.value = _fee;
  }

  function getFeePercent() {
    // @ts-ignore
    return contract.value.getFeePercent();
  }

  function getItemCount(): number {
    return itemCount.value;
  }

  function getItem(itemId: number): Promise<number> {
    // @ts-ignore
    return contract.value.getItem(itemId);
  }



  async function getItems(items: {[id: string]: Item}, metadatas: {[id: string]: Metadata}) {
    try {
      const users = useUsersStore().users;

      const _items: NFTItem[] = [];

      for (let key in items) {
        if (items.hasOwnProperty(key) && metadatas.hasOwnProperty(key)) {
          const item: Item = items[key];
          const metadata: Metadata = metadatas[key];
          const seller = users.find((user: User) => user.address.toLowerCase() === item.Seller.toLowerCase());
          console.log(item, metadata);
          // @ts-ignore
          // const price = BigNumber.from(metadata.total);
          item.metadata = metadata;

          _items.push({
            id: item.ItemId,
            tokenId: item.TokenId,
            nft: item.Nft,
            // @ts-ignore
            seller,
            sold: item.Sold,
            //price: Number(ethers.utils.formatEther(item.Price)),
            metadata,
            feePercent: fee.value,
            fee: 0, // Number(ethers.utils.formatEther(price.sub(item.Price))),
           // total: Number(ethers.utils.formatEther(price)),
          });
        }
      }
      // @ts-ignore
      items.value = _items;

    } catch (e) {
      throw e;
    }
  }

  function buy(itemId: number, itemPrice: number) {
    // @ts-ignore
    return contract.value.buy(itemId, { value: ethers.utils.parseUnits(itemPrice.toString(), "ether") });
  }

  async function createItem(address: string, id: any, price: BigNumber) {
    // @ts-ignore
    return contract.value.createItem(address, id, price);
  }

  function storeFee(_fee: BigNumber) {
    // @ts-ignore
    fee.value = _fee;
  }
  return {
    name, contractAddress, contract, itemCount, items, fee,
    loadWeb3Contract, loadMetamaskContract, getName, setName, setFee, setAddress, setAbi, getFeePercent, getItemCount, getItem, getItems, buy, createItem, storeFee
  }
});

