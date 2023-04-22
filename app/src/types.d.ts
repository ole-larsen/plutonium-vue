export type PublicUser = {
  id:        number;
  address:   string;
  email:     string;
  gravatar:  string;
  nonce:     string;
  token:     string;
  username:  string;
  uuid:      string;
  wallpaper: string;
  funds:     string;
  socials:   any[];
  wallets:   any[];
}

export type PublicFile = {
  id: number;
  attributes: {
    alt:      string;
    caption:  string;
    ext:      string;
    hash:     string;
    height:   number;
    width:    number;
    mime:     string;
    name:     string;
    provider: string;
    size:     number;
    url:      string;
  };
}

export type PublicMarketData = {
  data: {
    contracts: {
      marketplace: PublicContract;
      collections: {
        [id: number]: PublicContract;
      };
      auctions: PublicContract[];
    }
    marketplace: PublicMarketplace;
  }
}

export type PublicContract = {
  abi:     string;
  address: string;
  name:    string;
  owner:   string;
  fee:     number;
}

export type PublicMarketplace = {
  categories: PublicCategory[];
}

export type PublicCategory = {
  id: number;
  attributes: {
    title:       string;
    slug:        string;
    content:     string;
    description: string;
    image:       PublicFile;
    collections: PublicCategoryCollection[]
  };
}

export type PublicCategoryCollection = {
  id: number;
  attributes: {
    categoryId: number;
    category?: {
      title: string;
      url: string;
    };
    name: string;
    symbol: string;
    description: string;
    price: string;
    slug: string;
    url: string;
    fee: string;
    owner: PublicUser;
    creator: PublicUser;
    logo: PublicFile;
    featured: PublicFile;
    banner: PublicFile;
    created: string;
    collectibles: PublicCategoryCollectionCollectible[];
    isApproved: boolean;
    isLocked: boolean;
  }
}

export type PublicCategoryCollectionCollectible = {
  id: number;
  attributes: {
    collectionId: number;
    itemId:       number;
    tokenIds:     number[];
    uri:          string;
    owner:        PublicUser;
    creator:      PublicUser;
    metadata:     ERC721Metadata;
    details:      ERC721Details;
  }
}
// https://docs.opensea.io/v1.0/docs/metadata-standards
export type ERC721Metadata = {
  name:             string;
  description:      string;
  image:            string;
  external_url:     string;
  background_color: string;
  animation_url:    string;
  youtube_url:      string;
  attributes: {
    display_type?: string;
    trait_type: string;
    value:      string;
  }[];
}

export type ERC721Details = {
  address:       string;
  auction:       boolean;
  collection:    string;
  fee:           string;
  fee_wei:       string;
  price:         string;
  price_wei:     string;
  tags:          string;
  total:         string;
  total_wei:     string;
  fulfilled:     boolean;
  cancelled:     boolean;
  start_time:    number;
  end_time:      number;
  start_price:   string;
  reserve_price: string;
}

export type CollectionDTO = {
  id?:          number;
  name:        string;
  symbol:      string;
  description: string;
  price:       string;
  slug:        string;
  url:         string;
  fee:         string;
  owner:       string;
  categoryId:  number;
  itemsInCollection?: number;
  categories?: { id: number; label: string }[];
  logo:       number | PublicFile;
  featured:   number | PublicFile;
  banner:     number | PublicFile;
}

export type CollectibleDTO = {
  id?:           number;
  tokenIds?:     number[];
  name?:         string;
  description?:  string;
  price:         number | string;
  file?:         File;
  collectionId:  number;
  tags:          string;
  owner:         string;
  creator:       string;
  auction:       boolean;
  startTime?:    number;
  startPrice?:   string;
  reservePrice?: string;
  endTime?: number;
  uri?:         string;
  quantity:        number;
}

export type PublicMenu = {
  id?: number;
  attributes?: {
    name: string;
    items: PublicMenuItem[]
  };
}

type PublicMenuItem = {
  id: number;
  attributes: {
    name: string;
    orderBy: number;
    link: string;
    items: {
      id: number;
      attributes: {
        name: string;
        link: string;
      }
    }[];
  }
}

export interface ConnectInfo {
  chainId: string;
}

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export type Form = {
  email: string;
  csrf: string;
}

export type SliderItem = {
  btnLink1:    string;
  btnLink2:    string;
  btnText1:    string;
  btnText2:    string;
  description: string;
  heading:     string;
  image:       PublicFile;
  bg:          PublicFile;
}

export type CreateAndSellItem = {
  id: number;
  attributes: {
    title: string;
    description: string;
    link: string;
    image: PublicFile
  }
}

export type PublicPage = {
  id: number;
  attributes: {
    category: string;
    link:     string;
    title:    string;
  }
}

export type ContactFormData = {
  provider: string;
  name: string;
  email: string;
  subject: number;
  subjectItems: { label: string; value: number }[];
  message: string;
  csrf: string;
}

export type Contact = {
  id?: number;
  attributes?: {
    btnLink: string;
    btnText: string;
    heading: string;
    subHeading: string;
    image: PublicFile;
  }
}

export type FAQ = {
  answer:   string;
  question: string;
}

export type WalletConnect = {
  title: string;
  description: string;
  address: string;
  image: PublicFile;
}

export type HelpCenter = {
  title: string;
  description: string;
  link: string;
  image: PublicFile;
}

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

export type AccordionType = { count: number; active: number | null }