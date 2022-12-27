import {defineStore} from "pinia";
import {BigNumber, ethers} from "ethers";
import {ref} from "vue";

import addresses from "@/../dapp-contracts/addresses/addresses.json";
import contractData from "@/../dapp-contracts/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import type {NFTMarketplace} from "@/../dapp-contracts/typechain-types";

import {useNFTStore} from "@/stores/contracts/nft";
import {useMetaMaskStore} from "@/stores/metamask";
import type {NFTItem} from "@/index";
import {useUsersStore} from "@/stores/users.store";
import type {User} from "@/stores/auth";

export const useMarketPlaceStore = defineStore("marketPlace", () => {
  const name = ref("");
  const contractAddress = ref(""),
    contract = ref(null),
    itemCount = ref(0),
    items = ref([]),
    fee = ref(0);

  function loadContract(chainID: number) {
    contractAddress.value = (addresses["NFTMarketplace"] as {[chain: number]: string})[chainID];
    // @ts-ignore
    contract.value = new ethers.Contract(contractAddress.value, contractData.abi, useMetaMaskStore().signer()) as NFTMarketplace;
  }

  function getName() {
    // @ts-ignore
    return contract.value.getName();
  }

  function setName(_name: string) {
    name.value = _name;
  }

  function getFeePercent() {
    // @ts-ignore
    return contract.value.getFeePercent();
  }

  function getItemCount(): Promise<BigNumber> {
    // @ts-ignore
    return (contract.value as NFTMarketplace).getItemCount();
  }

  function getItem(itemId: number): Promise<number> {
    // @ts-ignore
    return contract.value.getItem(itemId);
  }

  async function loadMetadata(item: any) {
    const gateway = "https://nftstorage.link/ipfs/";
    // @ts-ignore
    let uri = await useNFTStore().contract.tokenURI(item.tokenId);

    if (uri.includes("ipnft")) {
      uri = JSON.parse(uri).url;
    }
    uri = uri.replace("ipfs://", gateway);

    const response = await fetch(uri);

    const metadata = await response.json();

    if (metadata.image) {
      metadata.image = metadata.image.replace("ipfs://", gateway);
    }

    return metadata;
  }

  async function getItems() {
    try {

      itemCount.value = (await getItemCount()).toNumber();
      fee.value = await getFeePercent();

      const users = useUsersStore().users;

      const _items: NFTItem[] = [];

      for (let i = 1; i <= itemCount.value; i++) {
        // @ts-ignore
        const item: {
          itemId: BigNumber;
          nft: string;
          price: BigNumber;
          seller: string;
          sold: boolean;
          tokenId: BigNumber;
        } = await getItem(i);

        const metadata = await loadMetadata(item);

        // @ts-ignore
        const price = await contract.value.getTotalPrice(item.itemId);
        const seller = users.find((user: User) => user.address.toLowerCase() === item.seller.toLowerCase());

        // @ts-ignore
        _items.push({
          id: item.itemId.toNumber(),
          tokenId: item.tokenId.toNumber(),
          nft: item.nft,
          // @ts-ignore
          seller,
          sold: item.sold,
          price: Number(ethers.utils.formatEther(item.price)),
          metadata,
          feePercent: fee.value,
          fee: Number(ethers.utils.formatEther(price.sub(item.price))),
          total: Number(ethers.utils.formatEther(price)),
        });
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

    name, contractAddress, contractData, contract, itemCount, items, fee,
    loadContract, getName, setName, getFeePercent, getItemCount, getItem, loadMetadata, getItems, buy, createItem, storeFee
  }
});

