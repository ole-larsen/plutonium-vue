import {defineStore} from "pinia";
import {ethers} from "ethers";

import type {NFT} from "@/../dapp-contracts/typechain-types";

import { useWeb3Store} from "@/stores/web3/web3";

import {ref} from "vue";
import {useMetaMaskStore} from "@/stores/web3/metamask";
import {File, NFTStorage} from "nft.storage";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import {useLoaderStore} from "@/stores/loader";
export const useCollectionStore = defineStore("collection", () => {
  const contractAddress = ref("");
  const contract = ref(null);
  const abi = ref("");
  const market = useMarketPlaceStore();
  function loadMetamaskContract(chainID: number) {
    if (contractAddress.value) {
      // @ts-ignore
      contract.value = new ethers.Contract(contractAddress.value, JSON.parse(abi.value), useMetaMaskStore().signer()) as NFT;
    }
  }

  function loadWeb3Contract(chainID: number) {
    if (contractAddress.value) {
      // @ts-ignore
      contract.value = new ethers.Contract(contractAddress.value, JSON.parse(abi.value), useWeb3Store().getSigner()) as NFT;
    }
  }

  function setAbi(_abi: string) {
    abi.value = _abi;
  }

  function setAddress(address: string) {
    contractAddress.value = address;
  }

  async function mint(_item: {
    collectionId: number;
    count: number;
    description: string;
    file: File,
    name: string;
    price: number;
    tags: string;
  }) {
    let collectionName = "";

    for (const owner in market.collections) {
      if (market.collections.hasOwnProperty(owner)) {
        // @ts-ignore
        const collections = market.collections[owner];
        for (const id in collections) {
          if (collections[id].id.toNumber() === _item.collectionId) {
            collectionName = collections[id].name;
          }
        }
      }
    }

    if (collectionName !== "") {
      try {
        // create a new NFTStorage client using our API key
        const nftStorage = new NFTStorage({token: import.meta.env.VITE_NFT_STORAGE_KEY})

        // call client.store, passing in the image & metadata
        const token = {
          image: _item.file,
          name: _item.name,
          description: _item.description,
          collection: collectionName,
          tags: _item.tags,
          count: _item.count
        };

        const result = await nftStorage.store(token);

        const uri = result.url;

        // @ts-ignore
        const tx = await contract.value.safeMint(uri);
        await tx.wait();

        // @ts-ignore
        const id = await contract.value.totalSupply();

        const price = ethers.utils.parseEther(_item.price.toString());

        const marketplace = useMarketPlaceStore().contractAddress;

        // @ts-ignore
        const approveTx = await contract.value.setApprovalForAll(marketplace, true);
        await approveTx.wait();

        const createTx = await useMarketPlaceStore().createCollectionItem(id, _item.collectionId, price);

        await createTx.wait();

      } catch (e) {
        console.error(e);
      }
    }
  }

  return {
    contractAddress,
    contract,
    loadWeb3Contract,
    loadMetamaskContract,
    setAddress,
    setAbi,
    mint
  }
});
