import type { PublicCategory } from "@/gen/market/v1/category_pb";
import type { PublicContact } from "@/gen/frontend/v1/contact_pb";
import type { PublicCreateAndSellItem } from "@/gen/frontend/v1/create_and_sell_pb";
import type { PublicFaqItem } from "@/gen/frontend/v1/faq_pb";
import type { PublicHelpCenterItem } from "@/gen/frontend/v1/help_center_pb";
import type { PublicMenu } from "@/gen/frontend/v1/menu_pb";
import type { PublicPage } from "@/gen/frontend/v1/page_pb";
import type { PublicSlider, PublicSliderItem } from "@/gen/frontend/v1/slider_pb";
import type { PublicWalletConnectItem } from "@/gen/frontend/v1/wallet_connect_pb";
import type { PublicContracts } from "@/gen/market/v1/contract_pb";
import type { PublicFile } from "@/gen/common/v1/file_pb";
import type { Nonce } from "@/gen/market/v1/nonce_pb";
import type { PublicUser } from "@/gen/common/v1/user_pb";
import type { Oauth2Token } from "@/gen/market/v1/verify_pb";
import type { NonceDto, Oauth2TokenDto, PublicCategoryDto, PublicContactDto, PublicContractsDto, PublicCreateAndSellItemDto, PublicFaqItemDto, PublicFileDto, PublicHelpCenterItemDto, PublicMenuDto, PublicPageDto, PublicSliderDto, PublicUserDto, PublicWalletConnectItemDto } from "@/types";
import { link } from "@/helpers";

export function adapterPublicMenu(menu: PublicMenu): PublicMenuDto {
    return {
      id: Number(menu.id), 
      attributes: {
        name: menu.attributes?.name || "",
        link: menu.attributes?.link || "",
        orderBy: Number(menu.attributes?.orderBy || 0), 
        items: (menu.attributes?.items || []).map(adapterPublicMenu), 
      },
    };
  }
  export function adapterPublicFile(file: PublicFile): PublicFileDto | null{
    if (file && file.attributes) {
      return {
        id: Number(file.id),
        attributes: {
          alt: file.attributes.alt,
          caption: file.attributes.caption,
          ext: file.attributes.ext,
          hash: file.attributes.hash,
          height: Number(file.attributes.height),
          width: Number(file.attributes.width),
          mime: file.attributes.mime,
          name: file.attributes.name,
          provider: file.attributes.provider,
          size: Number(file.attributes.size),
          url: link(file.attributes.url),
        }
      }
    }
    return null;
  }
  export function adapterPublicSlider(slider: PublicSlider): PublicSliderDto |  null { 
    if (slider && slider.attributes) {
      return {
        id: Number(slider.id),
        attributes: {
          sliderItems: (slider.attributes.sliderItems).map((sliderItem: PublicSliderItem) => {
            return {
              id: Number(sliderItem.id),
              attributes: {
                description: sliderItem.description,
                heading: sliderItem.heading,
                bg: adapterPublicFile(sliderItem.bg as PublicFile),
                btnLink1: sliderItem.btnLink1,
                btnLink2: sliderItem.btnLink2,
                btnText1: sliderItem.btnText1,
                btnText2: sliderItem.btnText2,
                image: adapterPublicFile(sliderItem.image as PublicFile),
              }
            }
          }),
        },
      }
    }
    return null;
  }
  export function adapterPublicCategories(categories: PublicCategory[]): PublicCategoryDto[] {
    const converted: PublicCategoryDto[] = [];
    for (const category of categories) {
      if (category.attributes) {
        converted.push({
          id: Number(category.id),
          attributes: {
            title: category.attributes.title,
            slug: '/category/' + category.attributes.slug,
            content: category.attributes.content,
            description: category.attributes.description,
            image: adapterPublicFile(category.attributes.image as PublicFile),
            // collections: (category.attributes.collections).filter(collection => collection).map(
            //   (collection: MarketplaceCollection) => {
            //     if (collection.attributes) {
            //       return {
            //         id: Number(collection.id),
            //         attributes: {
            //           categoryId: Number(collection.attributes.categoryId),
            //           name: collection.attributes.name,
            //           url: collection.attributes.url,
            //           slug: collection.attributes.slug,
            //           symbol: collection.attributes.symbol,
            //           description: collection.attributes.description,
            //           fee: collection.attributes.fee,
            //           address: collection.attributes.address,
            //           maxItems: Number(collection.attributes.maxItems),
            //           owner: null, 
            //           creator: null,
            //           created: collection.attributes.created,
            //           collectibles: [],
            //           isApproved: collection.attributes.isApproved,
            //           isLocked: collection.attributes.isLocked,
            //           logo: adapterPublicFile(collection.attributes.logo as PublicFile),
            //           featured: adapterPublicFile(collection.attributes.featured as PublicFile),
            //           banner: adapterPublicFile(collection.attributes.banner as PublicFile),
            //         }
            //       };
            //     }
            //     return null;
            //   }
            // ),
          },
        });
      }

    }
    return converted;
  }
  export function adapterCreateAndSellItems(items: PublicCreateAndSellItem[]): PublicCreateAndSellItemDto[] {
    const converted: PublicCreateAndSellItemDto[] = [];
    for (const item of items) {
      if (item.attributes) {
        converted.push({
          id: Number(item.id),
          attributes: {
            title: item.attributes.title,
            link: item.attributes.link,
            description: item.attributes.description,
            image: adapterPublicFile(item.attributes.image as PublicFile),
          },
        });
      }

    }
    return converted;
  } 
  export function adapterWalletConnectItems(items: PublicWalletConnectItem[]): PublicWalletConnectItemDto[] {
    const converted: PublicWalletConnectItemDto[] = [];
    for (const item of items) {
      if (item.attributes) {
        converted.push({
          id: Number(item.id),
          attributes: {
            title: item.attributes.title,
            link: item.attributes.link,
            description: item.attributes.description,
            image: adapterPublicFile(item.attributes.image as PublicFile),
          },
        });
      }

    }
    return converted;
  } 
  export function adapterHelpCenterItems(items: PublicHelpCenterItem[]): PublicHelpCenterItemDto[] {
    const converted: PublicHelpCenterItemDto[] = [];
    for (const item of items) {
      if (item.attributes) {
        converted.push({
          id: Number(item.id),
          attributes: {
            title: item.attributes.title,
            link: item.attributes.link,
            description: item.attributes.description,
            image: adapterPublicFile(item.attributes.image as PublicFile),
          },
        });
      }
    }
    return converted;
  } 
  export function adapterFaqItems(items: PublicFaqItem[]): PublicFaqItemDto[] {
    const converted: PublicFaqItemDto[] = [];
    for (const item of items) {
      if (item.attributes) {
        converted.push({
          id: Number(item.id),
          attributes: {
            question: item.attributes.question,
            answer: item.attributes.answer,
          },
        });
      }
    }
    return converted;
  } 
  export function adapterPublicContact(item: PublicContact): PublicContactDto | null {
    if (item.attributes) {
      return {
        id: Number(item.id),
        attributes: {
          heading: item.attributes.heading,
          subHeading: item.attributes.subHeading,
          link: item.attributes.link,
          text: item.attributes.text,
          csrf: item.attributes.csrf,
          image: adapterPublicFile(item.attributes.image as PublicFile),
        },
      }
    }
    return null;
  }
  export function adapterPublicPage(item: PublicPage): PublicPageDto | null {
    if (item.attributes) {
      return {
        id: Number(item.id),
        attributes: {
          title: item.attributes.title,
          category: item.attributes.category,
          link: item.attributes.link,
          content: item.attributes.content,
          image: adapterPublicFile(item.attributes.image as PublicFile),
        },
      }
    }
    return null;
  }
  export function adapterPublicContracts(item: PublicContracts): PublicContractsDto | null {
    if (item.marketplace) {
      return {
        contracts: {
          marketplace: {
            abi: item.marketplace.abi,
            address: item.marketplace.address,
            name: item.marketplace.name,
            owner: item.marketplace.owner,
            fee: Number(item.marketplace.fee),
          },
          auctions: [],
          collections: [],
        }
      }
    }
    return null;
  }
  export function adapterPublicNonce(item: Nonce): NonceDto {
    return {
      address: item.address,
      nonce: item.nonce,
      uuid: item.uuid,
    };
  }
  export function adapterPublicUser(item: PublicUser): PublicUserDto | null {
    if (item.attributes) {
      return {
        id: Number(item.id),
        attributes: {
          address: item.attributes.address,
          email: item.attributes.email,
          username: item.attributes.username,
          uuid: item.attributes.uuid,
          gravatar: item.attributes.gravatar,
          wallpaper: adapterPublicFile(item.attributes.wallpaper as  PublicFile)
        }
      };
    }
    return null;
  }

  export function adapterOauth2Token(item: Oauth2Token): Oauth2TokenDto {
    return {
      accessToken: item.accessToken,
      code: item.code,
      expiry: item.expiry?.seconds?.toString(),
      originalUrl: item.originalUrl,
      refreshToken: item.refreshToken,
      state: item.state,
      tokenType: item.tokenType,
    }
  }

  export function fileToUint8Array(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.result instanceof ArrayBuffer) {
                resolve(new Uint8Array(reader.result));
            } else {
                reject(new Error("Failed to convert file to Uint8Array"));
            }
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}
