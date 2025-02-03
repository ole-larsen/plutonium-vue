// @generated by protoc-gen-es v2.2.3
// @generated from file frontend/v1/create_and_sell.proto (package frontend.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { PublicFile } from "./file_pb";

/**
 * Describes the file frontend/v1/create_and_sell.proto.
 */
export declare const file_frontend_v1_create_and_sell: GenFile;

/**
 * @generated from message frontend.v1.PublicCreateAndSellItem
 */
export declare type PublicCreateAndSellItem = Message<"frontend.v1.PublicCreateAndSellItem"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: frontend.v1.PublicCreateAndSellItemAttributes attributes = 2;
   */
  attributes?: PublicCreateAndSellItemAttributes;
};

/**
 * Describes the message frontend.v1.PublicCreateAndSellItem.
 * Use `create(PublicCreateAndSellItemSchema)` to create a new message.
 */
export declare const PublicCreateAndSellItemSchema: GenMessage<PublicCreateAndSellItem>;

/**
 * @generated from message frontend.v1.PublicCreateAndSellItemAttributes
 */
export declare type PublicCreateAndSellItemAttributes = Message<"frontend.v1.PublicCreateAndSellItemAttributes"> & {
  /**
   * @generated from field: string title = 1;
   */
  title: string;

  /**
   * @generated from field: string link = 2;
   */
  link: string;

  /**
   * @generated from field: string description = 3;
   */
  description: string;

  /**
   * @generated from field: frontend.v1.PublicFile image = 4;
   */
  image?: PublicFile;
};

/**
 * Describes the message frontend.v1.PublicCreateAndSellItemAttributes.
 * Use `create(PublicCreateAndSellItemAttributesSchema)` to create a new message.
 */
export declare const PublicCreateAndSellItemAttributesSchema: GenMessage<PublicCreateAndSellItemAttributes>;

/**
 * @generated from message frontend.v1.CreateAndSellItemsRequest
 */
export declare type CreateAndSellItemsRequest = Message<"frontend.v1.CreateAndSellItemsRequest"> & {
  /**
   * @generated from field: string provider = 1;
   */
  provider: string;
};

/**
 * Describes the message frontend.v1.CreateAndSellItemsRequest.
 * Use `create(CreateAndSellItemsRequestSchema)` to create a new message.
 */
export declare const CreateAndSellItemsRequestSchema: GenMessage<CreateAndSellItemsRequest>;

/**
 * @generated from message frontend.v1.CreateAndSellRequest
 */
export declare type CreateAndSellRequest = Message<"frontend.v1.CreateAndSellRequest"> & {
  /**
   * @generated from field: string provider = 1;
   */
  provider: string;
};

/**
 * Describes the message frontend.v1.CreateAndSellRequest.
 * Use `create(CreateAndSellRequestSchema)` to create a new message.
 */
export declare const CreateAndSellRequestSchema: GenMessage<CreateAndSellRequest>;

