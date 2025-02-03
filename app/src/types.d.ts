export type Oauth2TokenDto = {
  accessToken: string;
  code: string;
  expiry?: string;
  originalUrl: string;
  refreshToken: string;
  state: string;
  tokenType: string;
};

export type PublicUserDto = {
  id: number;
  attributes: {
    address: string;
    email: string;
    gravatar: string;
    username: string;
    uuid: string;
    wallpaper: PublicFileDto | null;
    funds?: string;
    socials?: any[];
    wallets?: any[];
  }
};

export type PublicFileDto = {
  id: number;
  attributes: {
    alt: string;
    caption: string;
    ext: string;
    hash: string;
    height: number;
    width: number;
    mime: string;
    name: string;
    provider: string;
    size: number;
    url: string;
  };
};

export type PublicFaqItemDto = {
  id: number;
  attributes: {
    question: string;
    answer: string;
  };
};

export type PublicHelpCenterItemDto = {
  id: number;
  attributes: {
    title: string;
    description: string;
    link: string;
    image: PublicFileDto | null;
  }
};

export type PublicContractsDto = {
  contracts: {
    marketplace: PublicContractDto;
    collections: {
      [id: number]: PublicContractDto;
    };
    auctions: {
      [id: number]: PublicContractDto;
    };
  }
};

export type PublicContractDto = {
  abi: string;
  address: string;
  name: string;
  owner?: string;
  fee?: number;
};

export type PublicCategories = {
  data: PublicCategoryDto[]
};

export type PublicCategoryDto = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    description: string;
    image: PublicFileDto | null;
    collections?: (MarketplaceCollectionDto | null)[];
  };
};

export type MarketplaceCollectionDto = {
  id: number;
  attributes: {
      categoryId: number;
      name: string;
      slug: string;
      url: string;
      symbol: string;
      description: string;
      fee: string;
      address: string;
      maxItems: number;
      isApproved: boolean;
      isLocked: boolean;
      logo: PublicFileDto | null;
      banner: PublicFileDto | null;
      featured: PublicFileDto | null;
      creator: PublicUserDto | null;
      owner: PublicUserDto | null;
      created: string;
      price: string;
      collectibles: PublicCategoryCollectionCollectible[];
      category; PublicCategoryDto;
  };
};

export type PublicCategoryCollectionCollectibleDto = {
  id: number;
  attributes: {
    collectionId: number;
    itemId: number;
    tokenIds: number[];
    uri: string;
    owner: PublicUserDto;
    creator: PublicUserDto;
    metadata: ERC721Metadata;
    details: ERC721Details;
  };
};
// https://docs.opensea.io/v1.0/docs/metadata-standards
export type ERC721Metadata = {
  name: string;
  description: string;
  image: string;
  external_url: string;
  background_color: string;
  animation_url: string;
  youtube_url: string;
  attributes: {
    display_type?: string;
    trait_type: string;
    value: string;
  }[];
};

export type ERC721Details = {
  address: string;
  auction: boolean;
  collection: string;
  fee: string;
  fee_wei: string;
  price: string;
  price_wei: string;
  tags: string;
  total: string;
  total_wei: string;
  fulfilled: boolean;
  cancelled: boolean;
  start_time: number;
  end_time: number;
  start_price: string;
  reserve_price: string;
};

export type CollectionDTO = {
  id?: number;
  name: string;
  symbol: string;
  description: string;
  price: string;
  slug: string;
  url: string;
  fee: string;
  owner: string;
  categoryId: number;
  itemsInCollection?: number;
  categories?: { id: number; label: string }[];
  logo?: PublicFileDto;
  featured?: PublicFileDto;
  banner?: PublicFileDto;
};

export type CollectibleDTO = {
  id?: number;
  tokenIds?: number[];
  name?: string;
  description?: string;
  price: number | string;
  file?: File;
  collectionId: number;
  tags: string;
  owner: string;
  creator: string;
  auction: boolean;
  startTime?: number;
  startPrice?: string;
  reservePrice?: string;
  endTime?: number;
  uri?: string;
  quantity: number;
};

export type PublicMenuDto = {
  id: number;
  attributes: {
    name: string;
    link: string;
    orderBy: number;
    items: PublicMenuDto[];
  };
};

export type NonceDto = {
  address: string;
  nonce: string;
  uuid: string;
};

export interface ConnectInfo {
  chainId: string;
}

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export type SubscribeFormDataDto = {
  email: string;
  csrf: string;
};

export type PublicSliderDto = {
  id: number;
  attributes: {
    sliderItems: SliderItemDto[];
  };
}
export type SliderItemDto = {
  id: number;
  attributes: {
    btnLink1: string;
    btnLink2: string;
    btnText1: string;
    btnText2: string;
    description: string;
    heading: string;
    image: PublicFileDto | null;
    bg: PublicFileDto | null;
  },
};

export type PublicCreateAndSellItemDto = {
  id: number;
  attributes: {
    title: string;
    description: string;
    link: string;
    image: PublicFileDto | null;
  };
};

export type PublicWalletConnectItemDto = {
  id: number;
  attributes: {
    title: string;
    link: string;
    description: string;
    image: PublicFileDto | null;
  }
};

export type PublicPageDto = {
  id: number;
  attributes: {
    title: string;
    category: string;
    link: string;
    content: string;
    image: PublicFileDto | null;
  };
};

export type ContactFormData = {
  provider: string;
  name: string;
  email: string;
  subject: number;
  subjectItems: { label: string; value: number }[];
  message: string;
  csrf: string;
};

export type PublicContactDto = {
  id: number;
  attributes: {
    heading: string;
    subHeading: string;
    link: string;
    text: string;
    csrf: string;
    image: PublicFileDto | null;
  };
};

export type BlogItem = any;

export type BlogItemTag = { title: string };

export type PublicMarketItem = {
  id: number;
  tokenId: number;
  collectionId: number;
  creator: User | string;
  owner: User | string;
  useGas?: boolean;
  metadata: {
    address: string;
    auction: boolean;
    cancelled: boolean;
    description: string;
    fee: string;
    fee_wei: string;
    fulfilled: boolean;
    image: string;
    name: string;
    price: string;
    price_wei: string;
    tags: string;
    total: string;
    total_wei: string;
    url: string;
  };
  comingsoon?: boolean;
};

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
};

export type AccordionType = { count: number; active: number | null };
