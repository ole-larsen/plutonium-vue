import {defineStore} from "pinia";
import {ethers} from "ethers";
import type {NFT} from "@ploutonion/dapp-contracts/typechain-types";
import { create as ipfsHttpClient } from "ipfs-http-client";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import { useWeb3Store} from "@/stores/web3/web3";
import { NFTStorage } from "nft.storage";
import {ref} from "vue";
import {useMetaMaskStore} from "@/stores/web3/metamask";

export const useNFTStore = defineStore("nft", () => {
  const contractAddress = ref("");
  const contract = ref(null);
  const abi = ref("");
  const metamask = useMetaMaskStore();
  const web3 = useWeb3Store();
  const market = useMarketPlaceStore();

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

  async function mint(item: any) {
    const { file, price, name, description, category, tags } = item;
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

      const uri = result.url;

      // @ts-ignore
      const tx = await contract.value.mint(uri);
      await tx.wait();

      // @ts-ignore
      const id = await contract.value.count();

      const price = ethers.utils.parseEther(item.price.toString());

      const marketplace = market.contractAddress;

      // @ts-ignore
      const approveTx = await contract.value.setApprovalForAll(marketplace, true);
      await approveTx.wait();

      const createTx = await market.createItem(contractAddress.value, id, price);
      await createTx.wait();
      location.reload();
    } catch (e) {
      console.error(e);
    }

  }

  async function uploadToIpfs(item: any) {

    if (typeof item.file[0] !== "undefined") {
      try {
        const client = ipfsHttpClient({ url: "https://ipfs.influra.io:5001/api/v0" });
        const result = await client.add(item.file[0]);
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
    contract,
    loadWeb3Contract,
    loadMetamaskContract,
    setAddress,
    setAbi,
    mint,
    uploadToIpfs
  }
});
