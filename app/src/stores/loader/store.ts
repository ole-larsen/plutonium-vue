import { defineStore } from "pinia";
import type {
  PublicContractsDto,
  CollectionDTO,
  ContactFormData,
  PublicUserDto,
  PublicCategoryCollectionCollectibleDto,
  CollectibleDTO,
  PublicContractDto,
  PublicCategories,
  PublicSliderDto,
  PublicFileDto,
  PublicCategoryDto,
  PublicCreateAndSellItemDto,
  PublicWalletConnectItemDto,
  PublicHelpCenterItemDto,
  PublicFaqItemDto,
  PublicContactDto,
  PublicPageDto,
  SubscribeFormDataDto,
  NonceDto,
  Oauth2TokenDto,
} from "@/types";
import type { ComputedRef, Ref } from "vue";
import { ref, inject, computed } from "vue";

import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";
import { useUserStore } from "@/stores/users/users.store";
import { useMetaMaskStore } from "@/stores/web3/metamask";
import { useWeb3Store } from "@/stores/web3/web3";
import { useAuthStore } from "@/stores/auth/store";
import { useCollectionStore } from "@/stores/contracts/collection";
import { useAuctionStore } from "@/stores/contracts/auction";
import { useSliderStore } from "../../components/Slider/store/slider";
import { useCreateAndSellStore } from "../components/createAndSell";
import { useHelpCenterStore } from "../../components/Pages/store/helpCenter";
import { useFaqStore } from "../../components/Pages/store/faq";
import { useContactStore } from "../../components/Pages/store/contact";
import { error, link } from "@/helpers";

import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { FrontendService } from "@/gen/frontend/v1/frontend_pb";
import { MarketService } from "@/gen/market/v1/market_pb";
import type { Success as MarketSuccess, PublicContract, PublicContracts } from "@/gen/market/v1/contract_pb";
import type { PublicMenuDto } from "@/types";
import type { PublicSlider, PublicSliderItem } from "@/gen/frontend/v1/slider_pb";
import type { PublicMenu } from "@/gen/frontend/v1/menu_pb";
import type { PublicFile } from "@/gen/frontend/v1/file_pb";
import type { PublicCategory } from "@/gen/frontend/v1/category_pb";
import type { MarketplaceCollection } from "@/gen/frontend/v1/collection_pb";
import type { PublicCreateAndSellItem } from "@/gen/frontend/v1/create_and_sell_pb";
import type { PublicWalletConnectItem } from "@/gen/frontend/v1/wallet_connect_pb";
import type { PublicHelpCenterItem, SuccessHelpCenter } from "@/gen/frontend/v1/help_center_pb";
import type { PublicFaqItem, SuccessFaq } from "@/gen/frontend/v1/faq_pb";
import type { PublicContact } from "@/gen/frontend/v1/contact_pb";
import type { PublicPage } from "@/gen/frontend/v1/page_pb";
import type { Nonce } from "@/gen/market/v1/nonce_pb";
import type { PublicUser } from "@/gen/market/v1/user_pb";
import type { PublicFile as MarketPublicFile } from "@/gen/market/v1/file_pb";
import { adapterCreateAndSellItems, adapterFaqItems, adapterHelpCenterItems, adapterOauth2Token, adapterPublicCategories, adapterPublicContact, adapterPublicContracts, adapterPublicMenu, adapterPublicNonce, adapterPublicPage, adapterPublicSlider, adapterPublicVerify, adapterWalletConnectItems } from "./adapters";
import type { Oauth2Token } from "@/gen/market/v1/verify_pb";
export const useLoaderStore = defineStore("loader", () => {
  const axios: any = inject("axios"),
        transport = createConnectTransport({
          baseUrl: import.meta.env.VITE_GRPC_URL,
        }),
        marketClient = createClient(MarketService, transport),
        market = useMarketPlaceStore();
  
  const loading: Ref<boolean> = ref(false);

  async function loadContracts() {
    try {
      const data = await marketClient.contracts({});
      const contracts = (adapterPublicContracts((data.response.value as MarketSuccess).contracts as PublicContracts) as PublicContractsDto).contracts;
      if (contracts.marketplace) {
        market.initMarketplaceContract(contracts.marketplace);

        if (!market.instance) {
          throw Error("Marketplace is not loaded. Please load marketplace contracts first.");
        }
      }  
    } catch (e) {
      error(e);
    }
  }

  const frontendClient = createClient(FrontendService, transport);

  async function loadMenu(provider: string) {
    try {
      const data = await frontendClient.menu({
        provider
      });
      const menu = data.response.value as PublicMenu;
      return { data: adapterPublicMenu(menu) };
    } catch(e) {
      return { data: error(e) };
    }
  }

  async function postSubscribeForm(form: SubscribeFormDataDto) {
    try {
      const data = await frontendClient.postSubscribe({
        body: {
          email: form.email,
          csrf: form.csrf,
        },
      });

      return { data: data.response.value as string }
    } catch(e) {
      return { data: error(e) };
    }
  }

  async function loadSlider(provider: string) {
    try {
      const data = await frontendClient.slider({
        provider
      });
      return { data: adapterPublicSlider(data.response.value as PublicSlider) };
    } catch(e) {
      return { data: error(e) };
    }
  }

  async function loadPage(slug: string) {
    try {
      const data = await frontendClient.page({
        provider: slug
      });
      return { data: adapterPublicPage(data.response.value as PublicPage) };
    } catch(e) {
      return { data: error(e) };
    }
  }

  async function loadContact(pageID: number) {
    try {
      const data = await frontendClient.contact({
        pageId: BigInt(pageID)
      });
      return { data: adapterPublicContact(data.response.value as PublicContact) };
    } catch(e) {
      return { data: error(e) };
    }
  }

  async function postContactForm(form: ContactFormData, pageId: number) {
    try {
      const subject: { label: string; value: number } | undefined =
      form.subjectItems.find(
        (item: { label: string; value: number }) => item.value === form.subject
      );
      const data = await frontendClient.postContact({
        body: {
          pageId: BigInt(pageId),
          provider: form.provider,
          name: form.name,
          email: form.email,
          subject: (subject as { label: string; value: number }).label,
          message: form.message,
          csrf: form.csrf,
        },
      });

      return { data: data.response.value as string }
    } catch(e) {
      return { data: error(e) };
    }
  }

  async function loadFaq() {
    try {
      const data = await frontendClient.faq({
        provider: "faq"
      });
      return { data: adapterFaqItems((data.response.value as SuccessFaq).faq) };
    } catch(e) {
      return { data: error(e) };
    }
  }

  async function loadHelpCenter() {
    try {
      const data = await frontendClient.helpCenter({
        provider: "help-center"
      });
      return { data: adapterHelpCenterItems((data.response.value as SuccessHelpCenter).helpCenter) };
    } catch(e) {
      return { data: error(e) };
    }
  }

  const metamask = useMetaMaskStore(),
  web3 = useWeb3Store();

  async function getNonce(address: string) {
    const data = await marketClient.nonce({ address });
    return adapterPublicNonce(data.response.value as Nonce);
  }

  async function handleWalletConnect(): Promise<{ user: PublicUserDto, token: Oauth2TokenDto }> {
    if (!market.instance?.address) {
      throw Error(`Maketplace cannot connect`);
    }
    if (metamask.isInstalled) {
      await metamask.register();
      market.loadMarketplaceContract(metamask.signer());
      // if (contracts.collections) {
      //   loadCollectionContractsToMetamask(contracts.collections);
      // }
      // if (contracts.auctions) {
      //   loadAuctionContractsToMetamask(contracts.auctions);
      // }
      const { nonce, uuid } = await getNonce(metamask.getAddress());
      const { msg, signature} = await metamask.handleWalletConnect(market.instance.name, nonce, uuid);
      
      return verify(msg, signature, metamask.getAddress());
    } else {
      await web3.register();
      market.loadMarketplaceContract(web3.signer());
      // if (contracts.collections) {
      //   loadCollectionContractsToWeb3(contracts.collections);
      // }
      // if (contracts.auctions) {
      //   loadAuctionContractsToWeb3(contracts.auctions);
      // }
      const { nonce, uuid } = await getNonce(web3.getAddress());
      const { msg, signature } = await web3.handleWalletConnect(market.instance.name, nonce, uuid);
      return verify(msg, signature, web3.getAddress());
    }   
  }

  async function verify(msg: string, signature: string, address: string): Promise<{ user: PublicUserDto, token: Oauth2TokenDto }> {
    const data = await marketClient.verify({ 
      address,
      msg,
      signature
     });
     if (data.response.case === 'data') {
        const { user, token} = data.response.value;
        return {
          user: adapterPublicVerify(user as PublicUser) as PublicUserDto,
          token: adapterOauth2Token(token as Oauth2Token) as Oauth2TokenDto
        };
     } else {
      throw(new Error(data.response.case));
     } 
  }

  async function loadCategories() {
    const data = await marketClient.categories({});
    if (data.response.case === 'data') {
      const { categories } = data.response.value;
      return { data: adapterPublicCategories(categories) };
   } else {
    throw(new Error(data.response.case));
   }
  }
  /*

  
  const collection = useCollectionStore();
  const auction = useAuctionStore();
  
  const createAndSell = useCreateAndSellStore();
  const helpCenter = useHelpCenterStore();
  const faq = useFaqStore();
  const page = usePageStore();
  const contact = useContactStore();
  
  

  function loadBlog(slug: string) {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/frontend/blog/${slug}`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN,
      },
    });
  }

  function loadBlogs() {
    return axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/frontend/blog`, {
      headers: {
        "X-Token": import.meta.env.VITE_X_TOKEN,
      },
    });
  }
  
  function loadUserByAddress(address: string) {
    return axios.get(
      `${import.meta.env.VITE_BACKEND}/api/v1/frontend/users?address=${address}`,
      {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN,
        },
      }
    );
  }

  function upload(file: any, user: PublicUserDto) {
    const formData = new FormData();
    formData.append("name", file.name);
    formData.append("alt", file.alt);
    formData.append("hash", file.hash);
    formData.append("ext", file.ext);
    formData.append("caption", file.caption);
    formData.append("type", file.type);
    formData.append("size", file.size);
    formData.append("width", file.width);
    formData.append("height", file.height);
    formData.append("provider", file.provider);
    formData.append("file", file.file);

    const url = `${import.meta.env.VITE_BACKEND}/api/v1/files`;

    return fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.attributes.token}`,
      },
      body: formData,
    })
      .then((response) =>
        response.status === 200 ? response.json() : response.text()
      )
      .then((file) => {
        return file;
      })
      .catch((e) => {
        throw e;
      });
  }

  function loadCollectionContractsToWeb3(_collections: {
    [id: string]: { abi: string; address: string; name: string };
  }) {
    collection.loadWeb3Contracts(_collections);
  }

  function loadCollectionContractsToMetamask(_collections: {
    [id: string]: { abi: string; address: string; name: string };
  }) {
    collection.loadMetaMaskContracts(_collections);
  }

  function loadAuctionContractsToWeb3(auctions: PublicContractDto[]) {
    auction.loadWeb3Contracts(auctions);
  }

  function loadAuctionContractsToMetamask(auctions: PublicContractDto[]) {
    auction.loadMetaMaskContracts(auctions);
  }

  function loadCollectibleLikes(
    collectible: PublicCategoryCollectionCollectibleDto
  ) {
    return axios.get(
      `${import.meta.env.VITE_BACKEND}/api/v1/like?&itemId=${
        collectible.attributes.itemId
      }&collectionId=${collectible.attributes.collectionId}`,
      {
        headers: {
          "X-Token": import.meta.env.VITE_X_TOKEN,
        },
      }
    );
  }

  function like(collectible: PublicCategoryCollectionCollectibleDto) {
    if (user.value) {
      return axios.post(
        `${import.meta.env.VITE_BACKEND}/api/v1/like`,
        {
          userId: user.value.id,
          itemId: collectible.attributes.itemId,
          collectionId: collectible.attributes.collectionId,
        },
        {
          withCredentials: true,
        }
      );
    }
  }

  function deployCollectible(collectible: CollectibleDTO) {
    return axios.post(
      `${import.meta.env.VITE_BACKEND}/api/v1/collectibles`,
      collectible,
      {
        withCredentials: true,
      }
    );
  }

  function deployCollection(_collection: CollectionDTO) {
    return axios.post(
      `${import.meta.env.VITE_BACKEND}/api/v1/collections`,
      _collection,
      {
        withCredentials: true,
      }
    );
  }

  function deployAuction(
    collectible: PublicCategoryCollectionCollectibleDto,
    biddingTime: number
  ) {
    return axios.post(
      `${import.meta.env.VITE_BACKEND}/api/v1/auction`,
      {
        id: collectible.id,
        collectionId: collectible.attributes.collectionId,
        tokenIds: collectible.attributes.tokenIds,
        itemId: collectible.attributes.itemId,
        biddingtime: biddingTime,
        bid: collectible.attributes.details.price,
      },
      {
        withCredentials: true,
      }
    );
  }

  function updateCollection(_collection: CollectionDTO) {
    return axios.patch(
      `${import.meta.env.VITE_BACKEND}/api/v1/collections`,
      _collection,
      {
        withCredentials: true,
      }
    );
  }
  */
  return {
    loading,
    loadContracts,
    loadMenu,
    postSubscribeForm,
    loadSlider,
    loadPage,
    loadContact,
    postContactForm,
    loadFaq,
    loadHelpCenter,
    handleWalletConnect,
    loadCategories,
    // loadBlog,
    // loadBlogs,
    // upload,
    // loadCollectibleLikes,
    // like,
    // deployCollectible,
    // deployCollection,
    // deployAuction,
    // updateCollection,
    // loadUserByAddress,
  };
});
