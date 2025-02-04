// @generated by protoc-gen-es v2.2.3
// @generated from file common/v1/user.proto (package common.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { PublicFile } from "./file_pb";

/**
 * Describes the file common/v1/user.proto.
 */
export declare const file_common_v1_user: GenFile;

/**
 * @generated from message common.v1.PublicUserAttributes
 */
export declare type PublicUserAttributes = Message<"common.v1.PublicUserAttributes"> & {
  /**
   * @generated from field: string username = 2;
   */
  username: string;

  /**
   * @generated from field: string address = 3;
   */
  address: string;

  /**
   * @generated from field: string email = 4;
   */
  email: string;

  /**
   * @generated from field: string uuid = 5;
   */
  uuid: string;

  /**
   * @generated from field: string gravatar = 6;
   */
  gravatar: string;

  /**
   * @generated from field: string nonce = 7;
   */
  nonce: string;

  /**
   * @generated from field: string token = 8;
   */
  token: string;

  /**
   * @generated from field: string funds = 9;
   */
  funds: string;

  /**
   * @generated from field: common.v1.PublicFile wallpaper = 10;
   */
  wallpaper?: PublicFile;

  /**
   * @generated from field: string created = 11;
   */
  created: string;
};

/**
 * Describes the message common.v1.PublicUserAttributes.
 * Use `create(PublicUserAttributesSchema)` to create a new message.
 */
export declare const PublicUserAttributesSchema: GenMessage<PublicUserAttributes>;

/**
 * @generated from message common.v1.PublicUser
 */
export declare type PublicUser = Message<"common.v1.PublicUser"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: common.v1.PublicUserAttributes attributes = 2;
   */
  attributes?: PublicUserAttributes;
};

/**
 * Describes the message common.v1.PublicUser.
 * Use `create(PublicUserSchema)` to create a new message.
 */
export declare const PublicUserSchema: GenMessage<PublicUser>;

