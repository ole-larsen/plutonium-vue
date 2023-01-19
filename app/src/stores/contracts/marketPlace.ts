import {defineStore} from "pinia";
import {BigNumber, ethers} from "ethers";
import {computed, inject, ref} from "vue";

// @ts-ignore
import type {NFTMarketplace} from "@ploutonion/dapp-contracts/typechain-types";

import {useMetaMaskStore} from "@/stores/web3/metamask";
import {useWeb3Store} from "@/stores/web3/web3";
import type {User} from "@/stores/auth";
import {useAuthStore} from "@/stores/auth";
import {useUsersStore} from "@/stores/users.store";
import {useLoaderStore} from "@/stores/loader";

export type PublicMarketItem = {
  id: number;
  tokenId: number;
  collectionId: number;
  itemInCollectionId: number;

  fulfilled: boolean;
  cancelled: boolean;

  owner: User;
  creator: User;

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

export type MarketItem = {
  id: number;
  tokenId: number;
  collectionId: number;
  itemInCollectionId: number;

  fulfilled: boolean;
  cancelled: boolean;

  owner: string | User;
  creator: string | User;

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
  cancelled: boolean;
  creator: string;
  description: string;
  fee: BigNumber;
  fulfilled: boolean;
  id: number;
  name: string;
  owner: string;
  price: number;
  items?: any[];
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
  const metamask = useMetaMaskStore();
  const web3 = useWeb3Store();
  const loader = useLoaderStore();

  function loadMetamaskContract(chainID: number) {
    // @ts-ignore
    contract.value = new ethers.Contract(contractAddress.value, JSON.parse(abi.value), metamask.signer()) as NFTMarketplace;
  }

  function loadWeb3Contract(chainID: number) {
    // @ts-ignore
    contract.value = new ethers.Contract(contractAddress.value, JSON.parse(abi.value), web3.getSigner()) as NFTMarketplace;
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
    // @ts-ignore
    return contract.value.buy(item.collectionId, item.itemInCollectionId, { value: ethers.utils.parseUnits(item.total.toString(), "ether") });
  }

  function sell(item: MarketItem) {
    // @ts-ignore
    return contract.value.sell(BigNumber.from(item.collectionId), BigNumber.from(item.itemInCollectionId), ethers.utils.parseUnits(item.price.toString(), "ether"));
  }

  async function createItem(address: string, id: number, price: BigNumber) {
    // @ts-ignore
    return contract.value.createItem(address, id, price);
  }

  function storeFee(_fee: BigNumber) {
    // @ts-ignore
    fee.value = _fee;
  }

  function like(item: MarketItem) {
    if (user.value) {
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
  }

  async function mintCollection(collection: {
    id?: BigNumber;
    name: string;
    symbol: string;
    description: string;
    price: number;
    fee: number;
    creator: string;
  }) {
    console.log("send request to backend to deploy new collection contract", collection)
    // try {
    //   if (isFinite(Number(_collection.price)) && isFinite(Number(_collection.fee))) {
    //     // @ts-ignore
    //     const tx = await contract.value.createCollection(_collection.name, _collection.description, Number(_collection.price), Number(_collection.fee));
    //     const response = await tx.wait();
    //
    //     const address = response.events[0].address;
    //     const args = response.events[0].args;
    //     const blockHash = response.blockHash;
    //     const blockNumber = response.blockNumber;
    //     const transactionHash = response.transactionHash;
    //     const from = response.from;
    //     const to = response.to;
    //     const effectiveGasPrice = response.effectiveGasPrice;
    //     const cumulativeGasUsed = response.cumulativeGasUsed;
    //     const gasUsed = response.gasUsed;
    //     const confirmations = response.confirmations;
    //
    //     await saveCollection({
    //       id: args.id.toNumber(),
    //       name: args.name,
    //       description: args.description,
    //       creator: args.creator,
    //       owner: args.owner,
    //       price: args.price.toString(),
    //       fee: args.fee.toString(),
    //       fulfilled: args.fulfilled,
    //       cancelled: args.cancelled,
    //       address,
    //       blockHash,
    //       blockNumber,
    //       transactionHash,
    //       from,
    //       to,
    //       effectiveGasPrice: effectiveGasPrice.toString(),
    //       cumulativeGasUsed: cumulativeGasUsed.toString(),
    //       gasUsed: gasUsed.toString(),
    //       confirmations
    //     });
    //     await loader.load();
    //   }
    // } catch (e) {
    //   throw e;
    // }
  }

  function saveCollection(_collection: {
    id: number;
    name: string;
    description: string;
    creator: string;
    owner: string;
    price: string;
    fee: string;
    fulfilled: boolean;
    cancelled: boolean;
    address: string;
    blockHash: string;
    blockNumber: number;
    transactionHash: string;
    from: string;
    to: string;
    effectiveGasPrice: string;
    cumulativeGasUsed: string;
    gasUsed: string;
    confirmations: number;
  }) {
    return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/collections`, _collection, {
      withCredentials: true
    });
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
        const users = useUsersStore().users;

        if (collection.items) {
          collection.items.map(async (_item: MarketItem) => {
            const price = BigNumber.from(_item.price.toString());
            const fee = price.mul(collection.fee).div(100);
            const total = price.add(fee);

            _item.price = ethers.utils.formatEther(_item.price.toString());
            _item.total = ethers.utils.formatEther(String(total));
            _item.fee = ethers.utils.formatEther(String(fee));
            _item.feePercent = collection.fee;

            const creator = users.find((user: User) => {
              return user.address.toLowerCase() === (_item.creator as string).toLowerCase();
            });

            const owner = users.find((user: User) => {
              return user.address.toLowerCase() === (_item.owner as string).toLowerCase();
            });

            // @ts-ignore
            _item.creator = creator;
            // @ts-ignore
            _item.owner = owner;

            // @ts-ignore
            items.value.push(_item);
            return _item;
          });
        }

        // @ts-ignore
        collections.value[collection.id] = collection;

      } catch(e) {
        console.error(e);
      }
    }
  }

  function createCollectible(id: BigNumber, collectionId: number, price: BigNumber) {
    // @ts-ignore
    return contract.value.createCollectible(id, collectionId, price);
  }

  function getCollection(id: number) {
    // @ts-ignore
    for (const collectionId in collections.value) {
      if (Number(collectionId) === id) {
        // @ts-ignore
        return collections.value[collectionId];
      }
    }
  }
  return {
    name, contractAddress, contract, collectionsCount, storeCollectionsCount, storeCollections, collections,
    mintCollection, createCollectible, fee, getCollection,
    loadWeb3Contract, loadMetamaskContract, getName, setName, setFee, setAddress,
    setAbi, getFeePercent, buy, createItem, storeFee, like, items, itemCount, storeItems, sell
  }
});

