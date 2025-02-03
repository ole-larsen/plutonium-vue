// @generated by protoc-gen-es v2.2.3
// @generated from file market/v1/category.proto (package market.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { PublicFile } from "./file_pb";
import type { MarketplaceCollection } from "./collection_pb";
import type { Empty } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file market/v1/category.proto.
 */
export declare const file_market_v1_category: GenFile;

/**
 * @generated from message market.v1.PublicCategory
 */
export declare type PublicCategory = Message<"market.v1.PublicCategory"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: market.v1.PublicCategoryAttributes attributes = 2;
   */
  attributes?: PublicCategoryAttributes;
};

/**
 * Describes the message market.v1.PublicCategory.
 * Use `create(PublicCategorySchema)` to create a new message.
 */
export declare const PublicCategorySchema: GenMessage<PublicCategory>;

/**
 * @generated from message market.v1.PublicCategoryAttributes
 */
export declare type PublicCategoryAttributes = Message<"market.v1.PublicCategoryAttributes"> & {
  /**
   * @generated from field: string title = 1;
   */
  title: string;

  /**
   * @generated from field: string slug = 2;
   */
  slug: string;

  /**
   * @generated from field: string description = 3;
   */
  description: string;

  /**
   * @generated from field: string content = 4;
   */
  content: string;

  /**
   * @generated from field: market.v1.PublicFile image = 5;
   */
  image?: PublicFile;

  /**
   * @generated from field: repeated market.v1.MarketplaceCollection collections = 6;
   */
  collections: MarketplaceCollection[];
};

/**
 * Describes the message market.v1.PublicCategoryAttributes.
 * Use `create(PublicCategoryAttributesSchema)` to create a new message.
 */
export declare const PublicCategoryAttributesSchema: GenMessage<PublicCategoryAttributes>;

/**
 * @generated from message market.v1.CategoriesRequest
 */
export declare type CategoriesRequest = Message<"market.v1.CategoriesRequest"> & {
  /**
   * @generated from field: string provider = 1;
   */
  provider: string;
};

/**
 * Describes the message market.v1.CategoriesRequest.
 * Use `create(CategoriesRequestSchema)` to create a new message.
 */
export declare const CategoriesRequestSchema: GenMessage<CategoriesRequest>;

/**
 * @generated from message market.v1.SuccessCategories
 */
export declare type SuccessCategories = Message<"market.v1.SuccessCategories"> & {
  /**
   * @generated from field: repeated market.v1.PublicCategory categories = 1;
   */
  categories: PublicCategory[];
};

/**
 * Describes the message market.v1.SuccessCategories.
 * Use `create(SuccessCategoriesSchema)` to create a new message.
 */
export declare const SuccessCategoriesSchema: GenMessage<SuccessCategories>;

/**
 * @generated from message market.v1.CategoriesResponse
 */
export declare type CategoriesResponse = Message<"market.v1.CategoriesResponse"> & {
  /**
   * @generated from oneof market.v1.CategoriesResponse.response
   */
  response: {
    /**
     * @generated from field: market.v1.SuccessCategories data = 1;
     */
    value: SuccessCategories;
    case: "data";
  } | {
    /**
     * @generated from field: google.protobuf.Empty error = 2;
     */
    value: Empty;
    case: "error";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message market.v1.CategoriesResponse.
 * Use `create(CategoriesResponseSchema)` to create a new message.
 */
export declare const CategoriesResponseSchema: GenMessage<CategoriesResponse>;

