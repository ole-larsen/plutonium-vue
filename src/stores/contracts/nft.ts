import {defineStore} from "pinia";
import {ethers} from "ethers";

import addresses from "@/../dapp-contracts/addresses/addresses.json";
import contractData from "@/../dapp-contracts/artifacts/contracts/NFTCollection.sol/NFT.json";
import type {NFT} from "@/../dapp-contracts/typechain-types";
import { create as ipfsHttpClient } from "ipfs-http-client";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import { useWeb3Store} from "@/stores/web3/web3";
// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from 'nft.storage'

// The "fs" builtin module on Node.js provides access to the file system
import fs from "fs"

// The "path" module provides helpers for manipulating filesystem paths
import path from "path"

import {ref} from "vue";
import {useMetaMaskStore} from "@/stores/web3/metamask";
export const useNFTStore = defineStore("nft", () => {
  const contractAddress = ref("");
  const contract = ref(null);

  function loadMetamaskContract(chainID: number) {
    contractAddress.value = (addresses["NFT"] as {[chain: number]: string})[chainID];

    if (contractAddress.value) {
      // @ts-ignore
      contract.value = new ethers.Contract(contractAddress.value, contractData.abi, useMetaMaskStore().signer()) as NFT;
    }
  }

  function loadWeb3Contract(chainID: number) {
    contractAddress.value = (addresses["NFT"] as {[chain: number]: string})[chainID];

    if (contractAddress.value) {
      // @ts-ignore
      contract.value = new ethers.Contract(contractAddress.value, contractData.abi, useWeb3Store().getSigner()) as NFT;
    }
  }


  async function mint(_item: any) {
  const { file, price, name, description, category, tags } = _item;
  try {
    // create a new NFTStorage client using our API key
    const nftStorage = new NFTStorage({ token: import.meta.env.VITE_NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    const token = {
      image: file,
      name,
      description,
      category,
      tags
    };

    const result = await nftStorage.store(token);
    console.log(result);

    const uri = result.url;

    // @ts-ignore
    const tx = await contract.value.mint(uri);
    await tx.wait();

    // const result = await client.add(JSON.stringify({ image, name, description }));
    // console.log(result);
    // const uri = `https://ipfs.influra.io/ipfs/${result.path}`;
    // console.log(uri);

    // @ts-ignore
    const id = await contract.value.count();

    const price = ethers.utils.parseEther(_item.price.toString());

    const marketplace = useMarketPlaceStore().contractAddress;

    // @ts-ignore
    const approveTx = await contract.value.setApprovalForAll(marketplace, true);
    await approveTx.wait();

    const createTx = await useMarketPlaceStore().createItem(contractAddress.value, id, price);
    console.log(await createTx.wait());
  } catch (e) {
    console.error(e);
  }

}

  async function uploadToIpfs(item: any) {
    const file: any = item.file[0];
    if (typeof file !== "undefined") {
      try {
        const client = ipfsHttpClient({ url: "https://ipfs.influra.io:5001/api/v0" });
        const result = await client.add(file);
        console.log(result);
        const imgUrl = `https://ipfs.influra.io/ipfs/${result.path}`;
        console.log(imgUrl);
      } catch (e) {
        console.error(e);
      }
    }
  }
  return {
    contractAddress,
    contractData,
    contract,
    loadWeb3Contract,
    loadMetamaskContract,
    mint,
    uploadToIpfs
  }
});
