import {defineStore} from "pinia";
import {BigNumber, ethers} from "ethers";
import {computed, inject, ref} from "vue";
import type {Ref} from "vue";
// @ts-ignore
import type {NFTMarketplace} from "@ploutonion/dapp-contracts/typechain-types";

import {useMetaMaskStore} from "@/stores/web3/metamask";
import {useWeb3Store} from "@/stores/web3/web3";
import type {User} from "@/stores/auth";
import {useAuthStore} from "@/stores/auth";
import {useLoaderStore} from "@/stores/loader";
import {NFTStorage} from "nft.storage";
import {useCollectionStore} from "@/stores/contracts/collection";

export type PublicMarketItem = {
  id: number;
  tokenId: number;
  collectionId: number;

  fulfilled: boolean;
  cancelled: boolean;

  owner: User;
  creator: User;

  fee: string | BigNumber;
  feePercent: BigNumber;

  price: string | BigNumber;
  total: string | BigNumber;
  auction?: boolean;
  metadata: {
    collection: string;
    description: string;
    image: string;
    name: string;
    tags: string;
  };
  comingsoon?: boolean;
  tags?: string;
}

export type MarketItem = {
  id: number;
  tokenId: number;
  collectionId: number;

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
  auction?: boolean;
  useGas?: boolean;
  comingsoon?: boolean;
}

export type CollectionItem = {
  Id: number;
  TokenId: number;
  CollectionId: number;
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
    contract: Ref<any> = ref(null),
    abi = ref(""),
    collectionsCount = ref(0),
    collections = ref({}),
    itemCount = ref(0),
    items = ref([]),
    fee = ref(0),
    owner = ref(""),
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

  function setOwner(_owner: string) {
    owner.value = _owner;
  }

  async function approve(_item: MarketItem) {
    // deprecated: approve moved to backend
    try {
      const approveTx = await useCollectionStore()
        .contract[_item.collectionId]
        .setApprovalForAll(contractAddress.value, true);
      await approveTx.wait();
    } catch(e) {
      throw e;
    }
  }
  async function buy(_item: MarketItem) {
    try {
      _item.owner = (_item.owner as User).address;
      _item.creator = (_item.creator as User).address;

      _item.useGas = import.meta.env.VITE_USE_GAS === "true";
      if (owner.value === _item.owner) {
        _item.useGas = false;
      }
      if (_item.useGas) {
        await approve(_item);
        let collectible = await contract.value.getCollectible(_item.collectionId, _item.id);
        console.log(collectible.owner);
        console.log(collectible.creator);
        console.log("----------------------")
        const tx = await contract.value
          .buyCollectible(collectible.collectionId, collectible.id, {
            value: ethers.utils.parseUnits(_item.total.toString(), "ether")
          });
        await tx.wait();

        collectible = await contract.value.getCollectible(_item.collectionId, _item.id);
        console.log(collectible.owner);
        console.log(collectible.creator);
        await buyCollectible({
          id: collectible.id.toNumber(),
          collectionId: collectible.collectionId.toNumber(),
          tokenId: collectible.tokenId.toNumber(),
          price: collectible.price.toString(),
          total: ethers.utils.parseUnits(_item.total.toString(), "ether").toString(),
          owner: collectible.owner,
          creator: collectible.creator,
          buyer: user.value.address,
          fulfilled: collectible.fulfilled,
          cancelled: collectible.cancelled,
          auction: collectible.auction
        });
        await loader.load();
      }
    } catch (e) {
      throw e;
    }
  }

  function buyCollectible(item: {
    id: number;
    collectionId: number;
    tokenId: number;
    price: string;
    total: string;
    owner: string;
    creator: string;
    buyer: string;
    fulfilled: boolean;
    cancelled: boolean;
    auction: boolean;
  }) {
    return axios.put(`${import.meta.env.VITE_BACKEND}/api/v1/collectibles`, item, {
      withCredentials: true
    });
  }

  async function sell(_item: MarketItem) {
    try {
      _item.owner = (_item.owner as User).address;
      _item.creator = (_item.creator as User).address;

      _item.useGas = import.meta.env.VITE_USE_GAS === "true";
      if (owner.value === _item.owner) {
        _item.useGas = false;
      }

      if (_item.useGas) {
        await approve(_item);
        let collectible = await contract.value.getCollectible(_item.collectionId, _item.id);

        const tx = await contract.value.sellCollectible(collectible.collectionId, collectible.id, ethers.utils.parseUnits(_item.price.toString(), "ether"));
        await tx.wait();

        collectible = await contract.value.getCollectible(_item.collectionId, _item.id);

        await sellCollectible({
          id: collectible.id.toNumber(),
          collectionId: collectible.collectionId.toNumber(),
          tokenId: collectible.tokenId.toNumber(),
          price: ethers.utils.parseEther(_item.price.toString()).toString(),
          owner: collectible.owner,
          creator: collectible.creator,
          fulfilled: collectible.fulfilled,
          cancelled: collectible.cancelled,
          auction: collectible.auction,
          seller: user.value.address,
        });
      }
      await loader.load();
    } catch (e) {
      throw e;
    }
  }

  function sellCollectible(item: {
    id: number;
    collectionId: number;
    tokenId: number;
    price: string;
    owner: string;
    creator: string;
    seller: string;
    fulfilled: boolean;
    cancelled: boolean;
    auction: boolean;
  }) {
    return axios.patch(`${import.meta.env.VITE_BACKEND}/api/v1/collectibles`, item, {
      withCredentials: true
    });
  }

  function like(item: MarketItem) {
    if (user.value) {
      return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/like`, {
        userId: user.value.id,
        tokenId: item.tokenId,
        collectionId: item.collectionId
      }, {
        withCredentials: true
      });
    }
  }

  async function mintCollection(collection: {
    name: string;
    symbol: string;
    description: string;
    price: string;
    fee: number;
    owner: string;
    useGas?: boolean;
  }) {
    if (contract.value) {
      if (collection.owner) {
        try {
          const exist = await contract.value.getCollectionByName(collection.name);
          if (exist.nftCollection === "0x0000000000000000000000000000000000000000") {
            collection.useGas = import.meta.env.VITE_USE_GAS === "true";
            if (owner.value === collection.owner) {
              collection.useGas = false;
            }
            const {data} = await deployCollection(collection);

            if (collection.useGas) {
              const tx = await contract.value
                .createCollection(
                  collection.name,
                  collection.symbol,
                  collection.description,
                  Number(collection.fee),
                  Number(collection.price),
                  data.address,
                  data.owner,
              );
              await tx.wait();
            }
          }
          await loader.load();
        } catch (e) {
          console.error(e);
        }
      } else {
        location.reload();
      }
    }
    return;
  }

  function deployCollection(_collection: {
    name: string;
    symbol: string;
    description: string;
    price: string;
    fee: number;
    owner: string;
    useGas?: boolean;
  }) {
    return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/collections`, _collection, {
      withCredentials: true
    });
  }

  function storeCollectionsCount(_collectionsCount: number) {
    collectionsCount.value = _collectionsCount;
  }

  async function storeCollections(_collections: {[id: string]: Collection}) {
    items.value = [];
    for (const id in _collections) {
      if (_collections.hasOwnProperty(id)) {
        const collection = _collections[id];
        if (collection.items) {
          collection.items.map((_item: MarketItem) => {
            // @ts-ignore
            items.value.push(_item);
            // @ts-ignore
            return _item;
          });
          // @ts-ignore
          collections.value[id] = collection;
        }
      }
    }
  }

  async function mintCollectible(_item: {
    collectionId: number;
    count: number;
    description: string[];
    file: File,
    name: string[];
    price: number[];
    tags: string[];
    owner: string;
    creator: string;
    collections?: { id: number; label: string };
    image: string;
    useGas?: boolean;
    uri?: string[];
    auction: boolean;
    fulfilled: boolean;
    cancelled: boolean;
  }) {
    if (!_item.owner) {
      location.reload();
    }
    _item.useGas = import.meta.env.VITE_USE_GAS === "true";

    if (owner.value === _item.owner) {
      _item.useGas = false;
    }

    try {

      const collectionContract = useCollectionStore().contract[_item.collectionId];
      const collection = await getCollection(_item.collectionId);

      if (collectionContract && collection) {

        // create a new NFTStorage client using our API key
        const nftStorage = new NFTStorage({token: import.meta.env.VITE_NFT_STORAGE_KEY})

        for (let i = 1; i <= _item.count; i++) {
          const token = {
            image:       _item.file,
            name:        _item.name[i],
            description: _item.description[i],
            collection:  collection.name,
            tags:        _item.tags[i],
            number:      i
          };
          let result = await nftStorage.store(token);
          if (!_item.uri) {
            _item.uri = [];
          }
          _item.uri[i] = result.url;


            // await deployCollectible({
            //   auction: _item.auction,
            //   collectionId: _item.collectionId,
            //   creator: _item.creator,
            //   owner: _item.owner,
            //   price: _item.price[i].toString(),
            //   useGas: _item.useGas,
            //   tokenId: 0,
            //   uri: _item.uri[i]
            // });

          if (_item.useGas) {

            const tx = await collectionContract.safeMint(_item.uri[i]);

            let response = await tx.wait();

            if (response && response.events) {
              let args = response.events[0].args;
              if (args) {


                const approveTx = await useCollectionStore()
                  .contract[_item.collectionId]
                  .setApprovalForAll(contractAddress.value, true);
                await approveTx.wait();

                const createTx = await contract.value
                  .createCollectible(args.tokenId.toNumber(), collection.id.toNumber(),
                    ethers.utils.parseEther(_item.price[i].toString()), _item.auction, { from: _item.owner });

                await createTx.wait();

                const id = await contract.value.getCollectibleCount(collection.id);

                const collectible = await contract.value.getCollectible(collection.id, id);

                await deployCollectible({
                  id: id.toNumber(),
                  auction: _item.auction,
                  collectionId: _item.collectionId,
                  creator: collectible.creator.toLowerCase(),
                  owner: collectible.owner.toLowerCase(),
                  price: _item.price[i].toString(),
                  tokenId: args.tokenId.toNumber(),
                  useGas: _item.useGas,
                });
              }
            }
          }
        }
      }
      await loader.load();
    } catch (e) {
      console.error(e);
    }
  }

  function deployCollectible(_item: {
    id: number;
    tokenId: number;
    collectionId: number;
    price: string;
    owner: string;
    creator: string;
    useGas?: boolean;
    auction: boolean;
    uri?: string;
  }) {
      return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/collectibles`, _item, {
        withCredentials: true
      });
  }

  function createCollectible(_tokenId: BigNumber, _collectionId: BigNumber, _price: BigNumber, _owner: string, _auction: boolean) {
    // @ts-ignore
    return contract.value
      .createCollectible(_tokenId, _collectionId, _price, _auction, { from: _owner });
  }

  function getCollectibleCount(collectionId: BigNumber) {
    // @ts-ignore
    return contract.value.getCollectibleCount(collectionId);
  }

  function getCollectible(collectionId: BigNumber, id: BigNumber) {
    // @ts-ignore
    return contract.value.getCollectible(collectionId, id);
  }

  function getCollection(_collectionId: number) {
    // @ts-ignore
    return contract.value.getCollection(_collectionId);
  }

  return {
    name, contractAddress, contract, collectionsCount, storeCollectionsCount, storeCollections, collections,
    mintCollection, createCollectible, fee, getCollection,
    loadWeb3Contract, loadMetamaskContract, getName, setName, setFee, setAddress,
    setAbi, getFeePercent, buy, like, items, itemCount, mintCollectible, sell, setOwner, getCollectibleCount
  }
});

