import {defineStore} from "pinia";
import {ethers} from "ethers";
import type {NFT} from "@ploutonion/dapp-contracts/typechain-types";
import { useWeb3Store} from "@/stores/web3/web3";
import {ref} from "vue";
import {useMetaMaskStore} from "@/stores/web3/metamask";
import type {File} from "nft.storage";
import {NFTStorage} from "nft.storage";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import {useLoaderStore} from "@/stores/loader";
import axios from "axios";

export const useCollectionStore = defineStore("collection", () => {
  const contractAddress = ref("");
  const contract = ref(null);
  const abi = ref("");
  const market = useMarketPlaceStore();
  const metamask = useMetaMaskStore();
  const web3 = useWeb3Store();
  const loader = useLoaderStore();

  function loadMetamaskContract(chainID: number) {
    if (contractAddress.value) {
      // @ts-ignore
      contract.value = new ethers.Contract(contractAddress.value, JSON.parse(abi.value), metamask.signer()) as NFT;
    }
  }

  function loadWeb3Contract(chainID: number) {
    if (contractAddress.value) {
      // @ts-ignore
      contract.value = new ethers.Contract(contractAddress.value, JSON.parse(abi.value), web3.getSigner()) as NFT;
    }
  }

  function setAbi(_abi: string) {
    abi.value = _abi;
  }

  function setAddress(address: string) {
    contractAddress.value = address;
  }

  async function mint(item: {
    collectionId: number;
    count: number;
    description: string;
    file: File,
    name: string;
    price: number;
    tags: string;
  }) {
    let collectionName = "";

    for (const id in market.collections) {
      // @ts-ignore
      if (market.collections[id].id === item.collectionId) {
        // @ts-ignore
        collectionName = market.collections[id].name;
      }
    }

    if (collectionName !== "") {
      try {
        // create a new NFTStorage client using our API key
        const nftStorage = new NFTStorage({token: import.meta.env.VITE_NFT_STORAGE_KEY})

        // call client.store, passing in the image & metadata
        const token = {
          image: item.file,
          name: item.name,
          description: item.description,
          collection: collectionName,
          tags: item.tags,
          count: item.count
        };

        const result = await nftStorage.store(token);

        const uri = result.url;

        // @ts-ignore
        const tx = await contract.value.safeMint(uri);
        const response = await tx.wait();

        const address: string = response.events[0].address;
        const args = response.events[0].args;
        const blockHash: string = response.blockHash;
        const blockNumber: number = response.blockNumber;
        const transactionHash: string = response.transactionHash;
        const from: string = response.from;
        const to: string = response.to;
        const effectiveGasPrice: string = response.effectiveGasPrice;
        const cumulativeGasUsed: string = response.cumulativeGasUsed;
        const gasUsed: string = response.gasUsed;
        const confirmations: number = response.confirmations;
        const collection = market.getCollection(item.collectionId);

        const price = ethers.utils.parseEther(item.price.toString());

        const marketplace = market.contractAddress;

        // @ts-ignore
        const approveTx = await contract.value.setApprovalForAll(marketplace, true);
        await approveTx.wait();

        const createTx = await market.createCollectible(args.tokenId, item.collectionId, price);

        await createTx.wait();

        // @ts-ignore
        const id = await market.contract.getCollectionCollectibleCount(item.collectionId);

        await saveItem({
          id: id.toNumber(),
          tokenId: args.tokenId.toNumber(),
          collectionId: item.collectionId,
          name: item.name,
          description: item.description,
          tags: item.tags,
          uri: uri,
          creator: collection.owner,
          owner: collection.owner,
          price: item.price.toString(),
          fee: collection.fee.toString(),
          fulfilled: false,
          cancelled: false,
          address,
          blockHash,
          blockNumber,
          transactionHash,
          from,
          to,
          effectiveGasPrice: effectiveGasPrice.toString(),
          cumulativeGasUsed: cumulativeGasUsed.toString(),
          gasUsed: gasUsed.toString(),
          confirmations
        });
        await loader.load();
      } catch (e) {
        console.error(e);
      }
    }
  }

  function saveItem(_item: {
    id: number;
    tokenId: number;
    collectionId: number;
    uri: string;
    name: string;
    description: string;
    tags: string;
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
    return axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/collections-items`, _item, {
      withCredentials: true
    });
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
