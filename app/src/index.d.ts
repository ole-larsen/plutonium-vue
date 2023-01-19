export type PublicFile = {
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
}

export type NFTItem = {
  id: number;
  tokenId: number;
  nft: string;
  // seller?: User;
  sold: boolean;
  price: number;
  metadata: object;
  feePercent: number;
  fee: number;
  total: number;
}

declare global {
  interface Window {
    ethereum: import("ethers").providers.ExternalProvider;
  }
}

declare module "ethers";