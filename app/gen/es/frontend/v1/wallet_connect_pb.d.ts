// @generated by protoc-gen-es v2.2.3
// @generated from file frontend/v1/wallet_connect.proto (package frontend.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { PublicFile } from "./file_pb";

/**
 * Describes the file frontend/v1/wallet_connect.proto.
 */
export declare const file_frontend_v1_wallet_connect: GenFile;

/**
 * @generated from message frontend.v1.PublicWalletConnectItem
 */
export declare type PublicWalletConnectItem = Message<"frontend.v1.PublicWalletConnectItem"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: frontend.v1.PublicWalletConnectItemAttributes attributes = 2;
   */
  attributes?: PublicWalletConnectItemAttributes;
};

/**
 * Describes the message frontend.v1.PublicWalletConnectItem.
 * Use `create(PublicWalletConnectItemSchema)` to create a new message.
 */
export declare const PublicWalletConnectItemSchema: GenMessage<PublicWalletConnectItem>;

/**
 * @generated from message frontend.v1.PublicWalletConnectItemAttributes
 */
export declare type PublicWalletConnectItemAttributes = Message<"frontend.v1.PublicWalletConnectItemAttributes"> & {
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
 * Describes the message frontend.v1.PublicWalletConnectItemAttributes.
 * Use `create(PublicWalletConnectItemAttributesSchema)` to create a new message.
 */
export declare const PublicWalletConnectItemAttributesSchema: GenMessage<PublicWalletConnectItemAttributes>;

/**
 * @generated from message frontend.v1.WalletConnectItemsRequest
 */
export declare type WalletConnectItemsRequest = Message<"frontend.v1.WalletConnectItemsRequest"> & {
  /**
   * @generated from field: string provider = 1;
   */
  provider: string;
};

/**
 * Describes the message frontend.v1.WalletConnectItemsRequest.
 * Use `create(WalletConnectItemsRequestSchema)` to create a new message.
 */
export declare const WalletConnectItemsRequestSchema: GenMessage<WalletConnectItemsRequest>;

