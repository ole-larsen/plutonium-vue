import { defineStore } from "pinia";
import type { ComputedRef, Ref } from "vue";
import { computed, ref } from "vue";
import type {
  CollectibleDTO,
  CollectionDTO,
  PublicCategory,
  PublicCategoryCollection,
  PublicCategoryCollectionCollectible,
  PublicContract,
  PublicFile,
  PublicUser,
} from "@/types";
import type { Marketplace } from "@ploutonion/dapp-contracts/typechain-types/contracts/Marketplace";
import { error, link, slugify } from "@/helpers";
import type { BigNumber } from "ethers";
import { ethers } from "ethers";
import { useMetaMaskStore } from "@/stores/web3/metamask";
import { useWeb3Store } from "@/stores/web3/web3";

import { useCollectionStore } from "@/stores/contracts/collection";
import { useAuthStore } from "@/stores/auth/store";
import { useLoaderStore } from "@/stores/loader/store";
import { NFTStorage } from "nft.storage";
import { useAuctionStore } from "@/stores/contracts/auction";
import moment from "moment";

export const useMarketPlaceStore = defineStore("marketPlace", () => {
  const loader = useLoaderStore();
  const metamask = useMetaMaskStore();
  const web3 = useWeb3Store();
  const auth = useAuthStore();
  const auction = useAuctionStore();

  const contract: Ref<any> = ref(null);
  const contractAddress = ref("");
  const name = ref("");
  const abi = ref("");
  const fee = ref(0);
  const owner = ref("");

  const categories: Ref<PublicCategory[]> = ref([]);

  const collections: Ref<PublicCategoryCollection[]> = ref([]);

  const user: ComputedRef<PublicUser> = computed(() => auth.getUser());

  function storeContract(contract: PublicContract): void {
    contractAddress.value = contract.address;
    name.value = contract.name;
    abi.value = contract.abi;
    fee.value = contract.fee;
    owner.value = contract.owner;
  }

  function storeCategories(_categories: PublicCategory[]): void {
    categories.value = _categories.map((_category: PublicCategory) => {
      if (_category.attributes.image) {
        _category.attributes.image.attributes.url = link(
          _category.attributes.image.attributes.url
        );
      }
      if (_category.attributes.collections) {
        _category.attributes.collections = _category.attributes.collections.map(
          (collection: PublicCategoryCollection) => {
            if (collection.attributes.logo) {
              collection.attributes.logo.attributes.url = link(
                collection.attributes.logo.attributes.url
              );
            }
            if (collection.attributes.featured) {
              collection.attributes.featured.attributes.url = link(
                collection.attributes.featured.attributes.url
              );
            }
            if (collection.attributes.banner) {
              collection.attributes.banner.attributes.url = link(
                collection.attributes.banner.attributes.url
              );
            }
            collection.attributes.category = {
              title: _category.attributes.title,
              url: _category.attributes.slug,
            };

            return collection;
          }
        );
      }
      return _category;
    });
  }

  function storeCollections() {
    collections.value = categories.value.reduce(
      (total: PublicCategoryCollection[], next: PublicCategory) =>
        total.concat(next.attributes.collections),
      []
    );
  }

  function getCategories(): PublicCategory[] {
    return categories.value;
  }

  function getName(): string {
    return 'Plutonium';
    //return name.value;
  }

  function getCollections(): PublicCategoryCollection[] {
    return collections.value;
  }

  function loadMetamaskContract() {
    if (metamask.registered) {
      contract.value = new ethers.Contract(
        contractAddress.value,
        JSON.parse(abi.value),
        metamask.signer()
      ) as Marketplace;
    }
  }

  function loadWeb3Contract() {
    if (web3.registered) {
      contract.value = new ethers.Contract(
        contractAddress.value,
        JSON.parse(abi.value),
        web3.signer()
      ) as Marketplace;
    }
  }

  // async function approve(_item: PublicMarketItem) {
  //   // deprecated: approve moved to backend
  //   const approveTx = await useCollectionStore().contract[
  //     _item.collectionId
  //   ].setApprovalForAll(contractAddress.value, true);
  //   await approveTx.wait();
  // }

  // async function buy(_item: PublicMarketItem) {
  //   try {
  //     _item.owner = (_item.owner as PublicUser).address;
  //     _item.creator = (_item.creator as PublicUser).address;

  //     _item.useGas = import.meta.env.VITE_USE_GAS === "true";
  //     // if (owner.value === _item.owner) {
  //     //   _item.useGas = false;
  //     // }
  //     console.log(
  //       _item,
  //       _item.metadata.total,
  //       Number(_item.metadata.total_wei),
  //       ethers.utils
  //         .parseUnits(Number(_item.metadata.total_wei).toString(), "wei")
  //         .toString()
  //     );
  //     if (_item.useGas) {
  //       let collectible = await contract.value.getCollectible(
  //         _item.collectionId,
  //         _item.id
  //       );

  //       const totalWei = ethers.utils.parseUnits(
  //         Number(_item.metadata.total_wei).toString(),
  //         "wei"
  //       );

  //       await approve(_item);

  //       const tx = await contract.value.buyCollectible(
  //         collectible.collectionId,
  //         collectible.id,
  //         {
  //           value: totalWei,
  //         }
  //       );
  //       console.log(await tx.wait());

  //       collectible = await contract.value.getCollectible(
  //         _item.collectionId,
  //         _item.id
  //       );

  //       await buyCollectible({
  //         id: collectible.id.toNumber(),
  //         collectionId: collectible.collectionId.toNumber(),
  //         tokenId: collectible.tokenId.toNumber(),
  //         price: collectible.price.toString(),
  //         total: Number(_item.metadata.total_wei).toString(),
  //         owner: collectible.owner,
  //         creator: collectible.creator,
  //         buyer: user.value.address,
  //         fulfilled: collectible.fulfilled,
  //         cancelled: collectible.cancelled,
  //         auction: collectible.auction,
  //       });
  //       await loader.load();
  //     }
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // function buyCollectible(item: {
  //   id: number;
  //   collectionId: number;
  //   tokenId: number;
  //   price: string;
  //   total: string;
  //   owner: string;
  //   creator: string;
  //   buyer: string;
  //   fulfilled: boolean;
  //   cancelled: boolean;
  //   auction: boolean;
  // }) {
  //   return axios.put(
  //     `${import.meta.env.VITE_BACKEND}/api/v1/collectibles`,
  //     item,
  //     {
  //       withCredentials: true,
  //     }
  //   );
  // }

  // async function sell(_item: PublicMarketItem) {
  //   try {
  //     _item.owner = (_item.owner as PublicUser).address;
  //     _item.creator = (_item.creator as PublicUser).address;

  //     _item.useGas = import.meta.env.VITE_USE_GAS === "true";
  //     if (owner.value === _item.owner) {
  //       _item.useGas = false;
  //     }

  //     if (_item.useGas) {
  //       await approve(_item);
  //       let collectible = await contract.value.getCollectible(
  //         _item.collectionId,
  //         _item.id
  //       );

  //       const tx = await contract.value.sellCollectible(
  //         collectible.collectionId,
  //         collectible.id,
  //         ethers.utils.parseUnits(_item.metadata.price.toString(), "ether")
  //       );
  //       await tx.wait();

  //       collectible = await contract.value.getCollectible(
  //         _item.collectionId,
  //         _item.id
  //       );

  //       await sellCollectible({
  //         id: collectible.id.toNumber(),
  //         collectionId: collectible.collectionId.toNumber(),
  //         tokenId: collectible.tokenId.toNumber(),
  //         price: ethers.utils
  //           .parseEther(_item.metadata.price.toString())
  //           .toString(),
  //         owner: collectible.owner,
  //         creator: collectible.creator,
  //         fulfilled: collectible.fulfilled,
  //         cancelled: collectible.cancelled,
  //         auction: collectible.auction,
  //         seller: user.value.address,
  //       });
  //     }
  //     await loader.load();
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // function sellCollectible(item: {
  //   id: number;
  //   collectionId: number;
  //   tokenId: number;
  //   price: string;
  //   owner: string;
  //   creator: string;
  //   seller: string;
  //   fulfilled: boolean;
  //   cancelled: boolean;
  //   auction: boolean;
  // }) {
  //   return axios.patch(
  //     `${import.meta.env.VITE_BACKEND}/api/v1/collectibles`,
  //     item,
  //     {
  //       withCredentials: true,
  //     }
  //   );
  // }

  async function editCollection(collection: CollectionDTO) {
    if (contract.value) {
      if (collection.owner) {
        try {
          const exist = await contract.value.getCollection(collection.id);

          if (
            exist.nftCollection !== "0x0000000000000000000000000000000000000000"
          ) {
            // convert price and fee to wei for using as floats
            const collectionFee = ethers.utils.parseEther(
              collection.fee.toString()
            );
            const collectionPrice = collection.price
              ? ethers.utils.parseEther(collection.price.toString())
              : 0;
            const { data } = await loader.updateCollection({
              id: collection.id,
              categoryId: collection.categoryId,
              name: collection.name,
              symbol: collection.symbol,
              description: collection.description,
              price: collectionPrice.toString(),
              fee: collectionFee.toString(),
              slug: collection.slug,
              url: collection.url,
              owner: collection.owner,
              logo: (collection.logo as PublicFile).id,
              featured: (collection.featured as PublicFile).id,
              banner: (collection.banner as PublicFile).id,
            });

            if (data.address) {
              const tx = await contract.value.editCollection(
                collection.id,
                collection.name,
                collection.symbol,
                collection.description,
                collectionFee,
                collectionPrice,
                data.address,
                collection.owner
              );
              console.log(await tx.wait());
              // location.reload();
            }
          }
          await loader.load();
        } catch (e) {
          error(e);
        }
      } else {
        location.reload();
      }
    }
    return;
  }

  async function mintCollection(collection: CollectionDTO) {
    if (contract.value) {
      if (collection.owner) {
        try {
          const exist = await contract.value.getCollectionIdByName(
            collection.name
          );
          console.log(collection, exist.toNumber());
          if (exist.toNumber() === 0) {
            // convert price and fee to wei for using as floats
            const collectionFee = ethers.utils.parseEther(
              collection.fee.toString()
            );
            const collectionPrice = collection.price
              ? ethers.utils.parseEther(collection.price.toString())
              : 0;

            const { data } = await loader.deployCollection({
              categoryId: collection.categoryId,
              name: collection.name,
              symbol: collection.symbol,
              description: collection.description,
              price: collectionPrice.toString(),
              fee: collectionFee.toString(),
              slug: collection.slug,
              url: collection.url,
              owner: collection.owner,
              logo: collection.logo as number,
              featured: collection.featured as number,
              banner: collection.banner as number,
            });

            if (data.address) {
              const tx = await contract.value.createCollection(
                collection.name,
                collection.symbol,
                collection.description,
                collectionFee,
                collectionPrice,
                data.address,
                data.owner
              );
              await tx.wait();
              location.reload();
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

  function getCollection(_collectionId: number) {
    return contract.value.getCollection(_collectionId);
  }

  async function mintERC721(collectible: CollectibleDTO) {
    if (!collectible.owner) {
      location.reload();
    }

    const collectionContract =
      useCollectionStore().contract[collectible.collectionId];
    const collection = await getCollection(collectible.collectionId);

    if (collectionContract && collection) {
      // create a new NFTStorage client using our API key
      const nftStorage = new NFTStorage({
        token: import.meta.env.VITE_NFT_STORAGE_KEY,
      });
      const slug = slugify(collectible.name as string);
      const metadata: {
        name: string;
        description: string;
        image: File;
        external_url: string;
        attributes?: {
          trait_type: string;
          value: string;
        }[];
      } = {
        name: collectible.name as string,
        description: collectible.description as string,
        image: collectible.file as File,
        external_url: `/assets/ethereum/${collection.nftCollection}/${slug}`,
        // attributes:  [
        //   {
        //     "trait_type": "tag",
        //     "value": _item.tags
        //   },
        //   {
        //     "trait_type": "collection",
        //     "value": collection.name
        //   }
        // ]
      };

      const result = await nftStorage.store(metadata);

      collectible.uri = result.url;

      let tx: any;
      if (collectible.quantity > 1) {
        tx = await collectionContract.mint(
          collectible.uri,
          collectible.quantity
        );
      } else {
        tx = await collectionContract.safeMint(collectible.uri);
      }
      const txResponse = await tx.wait();

      if (txResponse && txResponse.events) {
        const approveTx = await useCollectionStore().contract[
          collectible.collectionId
        ].setApprovalForAll(contractAddress.value, true);

        await approveTx.wait();
        const events = txResponse.events;
        const tokenIds = [];

        for (const event of events) {
          const args = event.args;
          tokenIds.push(args.tokenId);
        }

        if (!collectible.startTime) {
          collectible.startTime = moment().unix();
        }

        if (!collectible.endTime) {
          collectible.endTime = moment().add(1, "years").unix();
        }
        collectible.tokenIds = tokenIds.map((tokenId: BigNumber) =>
          tokenId.toNumber()
        );
        const collectionId = await contract.value.getCollectionIdByName(
          collection.name
        );

        const lastCollectibleId = await contract.value.getCollectibleCount(
          collectionId
        );

        collectible.id = lastCollectibleId.add(1).toNumber();

        const response = await loader.deployCollectible(collectible);

        const createTx = await contract.value.createCollectible(
          tokenIds,
          collectionId,
          collectible.auction,
          response.data.auction,
          { from: collectible.owner }
        );
        console.log(await createTx.wait());
      }
    }
    await loader.load();
  }

  async function placeBid(collectible: PublicCategoryCollectionCollectible) {
    const contract =
      auction.contract[
        "auction_" +
          collectible.attributes.collectionId +
          ":" +
          collectible.attributes.itemId
      ];

    try {
      // benefeciary is the current nft collection address
      if (collectible.attributes.details.total_wei) {
        // const tx = await contract.bid({ value: collectible.attributes.details.total_wei });
        // console.log(await tx.wait());
        console.log(await contract.highestBidder());
        console.log(await contract.highestBid());
        const timestamp = await contract.auctionEndTime();
        console.log(new Date(timestamp.toNumber() * 1000));
        console.log(collectible.attributes.details.total_wei);
        console.log(user.value.address);
      }
      // console.log(await tx.wait());
      // console.log(await contract.highestBidder());
      // console.log(await contract.highestBid());
    } catch (e) {
      console.log(e);
    }
    // console.log());
    // console.log(await loader.deployAuction(collectible, biddingTime));
  }

  function getOwner() {
    return owner.value;
  }

  function startAuction(collectionId: number, itemId: number) {
    return contract.value.startAuction(collectionId, itemId);
  }
  return {
    storeContract,
    storeCategories,
    getCategories,
    storeCollections,
    getCollections,
    getName,
    getOwner,
    contractAddress,
    startAuction,
    loadMetamaskContract,
    loadWeb3Contract,
    mintCollection,
    editCollection,
    mintERC721,
    placeBid,
  };
});
