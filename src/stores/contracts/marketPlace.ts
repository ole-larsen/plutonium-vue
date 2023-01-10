import {defineStore} from "pinia";
import {BigNumber, ethers} from "ethers";
import {computed, inject, ref} from "vue";

// @ts-ignore
import type {NFTMarketplace} from "@/../dapp-contracts/typechain-types";

import {useMetaMaskStore} from "@/stores/web3/metamask";
import {useWeb3Store} from "@/stores/web3/web3";
import type {NFTItem} from "@/index";
import type {User} from "@/stores/auth";
import type {Item, Metadata} from "@/stores/loader";
import {useAuthStore} from "@/stores/auth";
import {useUsersStore} from "@/stores/users.store";
import {NFTStorage} from "nft.storage";
import {useNFTStore} from "@/stores/contracts/nft";
import {useCollectionStore} from "@/stores/contracts/collection";
export type MarketItem = {
  id: number;
  tokenId: number;
  collectionId: number;
  itemInCollectionId: number;

  fulfilled: boolean;
  cancelled: boolean;

  owner: string;
  creator: string;

  fee: string | BigNumber;
  feePercent: BigNumber;

  price: string | BigNumber;
  total: string | BigNumber;

  metadata: {
    collection: string;
    description: string;
    image: string;
    name: string;
    tags: string;
  };
}

export type CollectionItem = {
  Id: number;
  TokenId: number;
  CollectionId: number;
  ItemInCollectionId: number;
  Fulfilled: boolean;
  Cancelled: boolean;
  Creator: string;
  Owner: string;
  Price: number;
}

export type Collection = {
  Cancelled: boolean;
  Creator: string;
  Description: string;
  Fee: BigNumber;
  Fulfilled: boolean;
  Id: number;
  Name: string;
  Owner: string;
  Price: number;
}

export const useMarketPlaceStore = defineStore("marketPlace", () => {
  const axios: any = inject("axios");  // inject axios
  const name = ref("");
  const contractAddress = ref(""),
    contract = ref(null),
    abi = ref(""),
    collectionsCount = ref(0),
    collections = ref({}),
    itemCount = ref(0),
    items = ref([]),
    fee = ref(0),
    user = computed(() => useAuthStore().user);

  function loadMetamaskContract(chainID: number) {
    // @ts-ignore
    contract.value = new ethers.Contract(contractAddress.value, JSON.parse(abi.value), useMetaMaskStore().signer()) as NFTMarketplace;
  }

  function loadWeb3Contract(chainID: number) {
    // @ts-ignore
    contract.value = new ethers.Contract(contractAddress.value, JSON.parse(abi.value), useWeb3Store().getSigner()) as NFTMarketplace;
  }

  function getName() {
    // @ts-ignore
    return contract.value.getName();
  }

  function getFeePercent() {
    // @ts-ignore
    return contract.value.getFeePercent();
  }

  function setAddress(address: string) {
    contractAddress.value = address;
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

  function buy(item: MarketItem) {
    console.log(item);
    // @ts-ignore
    return contract.value.buy(item.collectionId, item.itemInCollectionId, { value: ethers.utils.parseUnits(item.total.toString(), "ether") });
  }

  async function createItem(address: string, id: any, price: BigNumber) {
    // @ts-ignore
    return contract.value.createItem(address, id, price);
  }

  function storeFee(_fee: BigNumber) {
    // @ts-ignore
    fee.value = _fee;
  }

  function like(item: MarketItem) {
    return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/like`, {
      userId: user.value.id,
      itemId: item.id,
      tokenId: item.tokenId,
      itemInCollectionId: item.itemInCollectionId,
      collectionId: item.collectionId
    }, {
      withCredentials: true
    });
  }

  async function mintCollection(_collection: {
    name: string;
    description: string;
    price: number;
    fee: number;
  }) {
    try {
      if (isFinite(Number(_collection.price)) && isFinite(Number(_collection.fee))) {
        // @ts-ignore
        const tx = await contract.value.createCollection(_collection.name, _collection.description, Number(_collection.price), Number(_collection.fee));
        await tx.wait();
      }
    } catch (e) {
      throw e;
    }
  }

  function storeCollectionsCount(_collectionsCount: number) {
    collectionsCount.value = _collectionsCount;
  }

  async function storeItems(_items: {[id: string]: CollectionItem}, _metadata: {[id: string]: any}) {
    items.value = [];
    for (let i = 1; i <= Object.keys(_items).length; i++) {
      const _item = _items[i.toString()];
      const metadata = _metadata[i.toString()];
      const users = useUsersStore().users;

      const creator = users.find((user: User) => {
        return user.address.toLowerCase() === _item.Creator.toLowerCase();
      });

      const owner = users.find((user: User) => {
        return user.address.toLowerCase() === _item.Owner.toLowerCase();
      });

      const item = {
        id: _item.Id,
        tokenId: _item.TokenId,
        collectionId: _item.CollectionId,
        itemInCollectionId: _item.ItemInCollectionId,

        fulfilled: _item.Fulfilled,
        cancelled: _item.Cancelled,

        owner: owner,
        creator: creator,

        price: _item.Price,

        metadata: metadata
      }
      // @ts-ignore
      items.value.push(item);
    }
    itemCount.value = items.value.length;
  }

  async function storeCollections(_collections: {[id: string]: Collection}) {

    for (let i = 1; i <= collectionsCount.value; i++) {
      try {
        // @ts-ignore
        const collection = _collections[i.toString()];
        const collectionItems = items.value.filter((_item: MarketItem) => Number(_item.collectionId) === Number(collection.Id));

        collectionItems.map((_item: MarketItem) => {
          const price = BigNumber.from(_item.price.toString());
          const fee = price.mul(collection.Fee).div(100);
          const total = price.add(fee);

          // console.log(fee.toString(), total.toString());
          _item.price = ethers.utils.formatEther(_item.price.toString());
          _item.total = ethers.utils.formatEther(String(total));
          _item.fee = ethers.utils.formatEther(String(fee));
          _item.feePercent = collection.Fee;

          return _item;
        });
        Object.defineProperty(collection, "Items", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: items.value.filter((_item: MarketItem) => Number(_item.collectionId) === Number(collection.Id))
        });

        const owner = collection.Owner.toLowerCase();
        // @ts-ignore
        if (!collections.value[owner]) {
          // @ts-ignore
          collections.value[owner] = {};
        }
        // @ts-ignore
        if (!collections.value[owner][collection.Id]) {
          // @ts-ignore
          collections.value[owner][collection.Id] = {
            cancelled: collection.Cancelled,
            creator: collection.Creator,
            description: collection.Description,
            fee: collection.Fee,
            fulfilled: collection.Fulfilled,
            id: collection.Id,
            name: collection.Name,
            owner: collection.Owner,
            price: collection.Price,
            // @ts-ignore
            items: collection.Items
          };
        }
      } catch(e) {
        console.error(e);
      }
    }
  }

  function createCollectionItem(_id: number, _collectionId: number, _price: BigNumber) {
    // @ts-ignore
    return contract.value.createCollectionItem(_id, _collectionId, _price);
  }

  return {
    name, contractAddress, contract, collectionsCount, storeCollectionsCount, storeCollections, collections,
    mintCollection, createCollectionItem, fee,
    loadWeb3Contract, loadMetamaskContract, getName, setName, setFee, setAddress,
    setAbi, getFeePercent, buy, createItem, storeFee, like, items, itemCount, storeItems
  }
});

