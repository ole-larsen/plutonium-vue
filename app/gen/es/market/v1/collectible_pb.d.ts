// @generated by protoc-gen-es v2.2.3
// @generated from file market/v1/collectible.proto (package market.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { PublicUser } from "./user_pb";

/**
 * Describes the file market/v1/collectible.proto.
 */
export declare const file_market_v1_collectible: GenFile;

/**
 * @generated from message market.v1.MarketplaceCollectible
 */
export declare type MarketplaceCollectible = Message<"market.v1.MarketplaceCollectible"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: market.v1.MarketplaceCollectibleAttributes attributes = 2;
   */
  attributes?: MarketplaceCollectibleAttributes;
};

/**
 * Describes the message market.v1.MarketplaceCollectible.
 * Use `create(MarketplaceCollectibleSchema)` to create a new message.
 */
export declare const MarketplaceCollectibleSchema: GenMessage<MarketplaceCollectible>;

/**
 * @generated from message market.v1.MarketplaceCollectibleAttributes
 */
export declare type MarketplaceCollectibleAttributes = Message<"market.v1.MarketplaceCollectibleAttributes"> & {
  /**
   * @generated from field: int64 collection_id = 1;
   */
  collectionId: bigint;

  /**
   * @generated from field: repeated int64 token_ids = 2;
   */
  tokenIds: bigint[];

  /**
   * @generated from field: string uri = 3;
   */
  uri: string;

  /**
   * @generated from field: market.v1.PublicUser creator = 4;
   */
  creator?: PublicUser;

  /**
   * @generated from field: market.v1.PublicUser owner = 5;
   */
  owner?: PublicUser;

  /**
   * @generated from field: market.v1.MarketplaceCollectibleDetails details = 6;
   */
  details?: MarketplaceCollectibleDetails;

  /**
   * @generated from field: market.v1.MarketplaceCollectibleMetadata metadata = 7;
   */
  metadata?: MarketplaceCollectibleMetadata;
};

/**
 * Describes the message market.v1.MarketplaceCollectibleAttributes.
 * Use `create(MarketplaceCollectibleAttributesSchema)` to create a new message.
 */
export declare const MarketplaceCollectibleAttributesSchema: GenMessage<MarketplaceCollectibleAttributes>;

/**
 * @generated from message market.v1.MarketplaceCollectibleDetails
 */
export declare type MarketplaceCollectibleDetails = Message<"market.v1.MarketplaceCollectibleDetails"> & {
  /**
   * @generated from field: string address = 1;
   */
  address: string;

  /**
   * @generated from field: bool auction = 2;
   */
  auction: boolean;

  /**
   * @generated from field: bool cancelled = 3;
   */
  cancelled: boolean;

  /**
   * @generated from field: string collection = 4;
   */
  collection: string;

  /**
   * @generated from field: int64 end_time = 5;
   */
  endTime: bigint;

  /**
   * @generated from field: string fee = 6;
   */
  fee: string;

  /**
   * @generated from field: string fee_wei = 7;
   */
  feeWei: string;

  /**
   * @generated from field: bool fulfilled = 8;
   */
  fulfilled: boolean;

  /**
   * @generated from field: bool is_started = 9;
   */
  isStarted: boolean;

  /**
   * @generated from field: string price = 10;
   */
  price: string;

  /**
   * @generated from field: string price_wei = 11;
   */
  priceWei: string;

  /**
   * @generated from field: int64 quantity = 12;
   */
  quantity: bigint;

  /**
   * @generated from field: string reserve_price = 13;
   */
  reservePrice: string;

  /**
   * @generated from field: string reserve_price_wei = 14;
   */
  reservePriceWei: string;

  /**
   * @generated from field: string start_price = 15;
   */
  startPrice: string;

  /**
   * @generated from field: string start_price_wei = 16;
   */
  startPriceWei: string;

  /**
   * @generated from field: int64 start_time = 17;
   */
  startTime: bigint;

  /**
   * @generated from field: string tags = 18;
   */
  tags: string;

  /**
   * @generated from field: string total = 19;
   */
  total: string;

  /**
   * @generated from field: string total_wei = 20;
   */
  totalWei: string;
};

/**
 * Describes the message market.v1.MarketplaceCollectibleDetails.
 * Use `create(MarketplaceCollectibleDetailsSchema)` to create a new message.
 */
export declare const MarketplaceCollectibleDetailsSchema: GenMessage<MarketplaceCollectibleDetails>;

/**
 * @generated from message market.v1.MarketplaceCollectibleMetadata
 */
export declare type MarketplaceCollectibleMetadata = Message<"market.v1.MarketplaceCollectibleMetadata"> & {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * @generated from field: string external_url = 2;
   */
  externalUrl: string;

  /**
   * @generated from field: string animation_url = 3;
   */
  animationUrl: string;

  /**
   * @generated from field: string background_color = 4;
   */
  backgroundColor: string;

  /**
   * @generated from field: string description = 5;
   */
  description: string;

  /**
   * @generated from field: string youtube_url = 6;
   */
  youtubeUrl: string;

  /**
   * @generated from field: string image_url = 7;
   */
  imageUrl: string;

  /**
   * @generated from field: repeated market.v1.MetadataAttributes attributes = 8;
   */
  attributes: MetadataAttributes[];
};

/**
 * Describes the message market.v1.MarketplaceCollectibleMetadata.
 * Use `create(MarketplaceCollectibleMetadataSchema)` to create a new message.
 */
export declare const MarketplaceCollectibleMetadataSchema: GenMessage<MarketplaceCollectibleMetadata>;

/**
 * @generated from message market.v1.MetadataAttributes
 */
export declare type MetadataAttributes = Message<"market.v1.MetadataAttributes"> & {
  /**
   * @generated from field: string trait_type = 1;
   */
  traitType: string;

  /**
   * @generated from field: string value = 2;
   */
  value: string;
};

/**
 * Describes the message market.v1.MetadataAttributes.
 * Use `create(MetadataAttributesSchema)` to create a new message.
 */
export declare const MetadataAttributesSchema: GenMessage<MetadataAttributes>;

