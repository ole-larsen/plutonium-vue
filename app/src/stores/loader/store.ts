import { defineStore } from "pinia";
import type {
  PublicContractsDto,
  ContactFormData,
  PublicUserDto,
  SubscribeFormDataDto,
  Oauth2TokenDto,
  FileForm,
} from "@/types";
import type { ComputedRef, Ref } from "vue";
import { ref, inject, computed } from "vue";

import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";
import { useMetaMaskStore } from "@/stores/web3/metamask";
import { useWeb3Store } from "@/stores/web3/web3";
import { useAuthStore } from "@/stores/auth/store";
import { error } from "@/helpers";

import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { FrontendService } from "@/gen/frontend/v1/frontend_pb";
import { MarketService } from "@/gen/market/v1/market_pb";
import type { Success as MarketSuccess, PublicContracts } from "@/gen/market/v1/contract_pb";
import type { PublicSlider } from "@/gen/frontend/v1/slider_pb";
import type { PublicMenu } from "@/gen/frontend/v1/menu_pb";
import type { SuccessHelpCenter } from "@/gen/frontend/v1/help_center_pb";
import type { SuccessFaq } from "@/gen/frontend/v1/faq_pb";
import type { PublicContact } from "@/gen/frontend/v1/contact_pb";
import type { PublicPage } from "@/gen/frontend/v1/page_pb";
import type { Nonce } from "@/gen/market/v1/nonce_pb";
import type { PublicUser } from "@/gen/common/v1/user_pb";
import { adapterFaqItems, adapterHelpCenterItems, adapterOauth2Token, adapterPublicCategories, adapterPublicContact, adapterPublicContracts, adapterPublicMenu, adapterPublicNonce, adapterPublicPage, adapterPublicSlider, adapterPublicUser, fileToUint8Array } from "./adapters";
import type { Oauth2Token } from "@/gen/market/v1/verify_pb";
import { ProfileService } from "@/gen/profile/v1/profile_pb";
import { CdnService } from "@/gen/cdn/v1/cdn_pb";
import type { PublicFile } from "@/gen/common/v1/file_pb";

export const useLoaderStore = defineStore("loader", () => {
  const axios: any = inject("axios"),
        transport = createConnectTransport({
          baseUrl: import.meta.env.VITE_GRPC_URL,
        }),
        marketClient = createClient(MarketService, transport),
        cdnClient = createClient(CdnService, transport),
        market = useMarketPlaceStore(),
        auth = useAuthStore();
  
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
          user: adapterPublicUser(user as PublicUser) as PublicUserDto,
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

  const profileClient = createClient(ProfileService, transport);

  async function patchUser(user: PublicUserDto, csrf: string) {
    const token = auth.getToken();
    // TODO write middleware for token
    // TODO write middleware for csrf
    const data = await profileClient.patchUser({ 
      body: {
        csrf: csrf,
        id: BigInt(user.id),
        username: user.attributes.username,
        address: user.attributes.address,
        email: user.attributes.email, 
        gravatar: user.attributes.gravatar,
        wallpaperId: user.attributes.wallpaper ? BigInt(user.attributes.wallpaper?.id) : undefined,
      }  
    });

    const response = data.response.value;
   
    if (response) {
      const publicUser = adapterPublicUser(response as PublicUser) as PublicUserDto;
      publicUser.attributes.address = auth.getUser().attributes.address;
      auth.setUser(publicUser);
    }
  }

  async function uploadFile(file: FileForm, csrf: string): Promise<PublicFile> {
    const data = await cdnClient.uploadFile({
      body: {
        csrf: csrf,
        metadata: {
          alt: file.alt,
          caption: file.caption,
          ext: file.ext,
          height: file.height,
          name: file.name,
          provider: file.provider,
          size: file.size,
          type: file.type,
          width: file.width,
        },
        file: await fileToUint8Array(file.file),
      },
    })
    return data.response.value as PublicFile;
  }

  async function loadAvatars() {
    console.log("Loading avatars");
  }
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
    patchUser,
    uploadFile,
    loadAvatars
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
