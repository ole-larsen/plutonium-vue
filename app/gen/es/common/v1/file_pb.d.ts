// @generated by protoc-gen-es v2.2.3
// @generated from file common/v1/file.proto (package common.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file common/v1/file.proto.
 */
export declare const file_common_v1_file: GenFile;

/**
 * @generated from message common.v1.PublicFile
 */
export declare type PublicFile = Message<"common.v1.PublicFile"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: common.v1.PublicFileAttributes attributes = 2;
   */
  attributes?: PublicFileAttributes;
};

/**
 * Describes the message common.v1.PublicFile.
 * Use `create(PublicFileSchema)` to create a new message.
 */
export declare const PublicFileSchema: GenMessage<PublicFile>;

/**
 * @generated from message common.v1.PublicFileAttributes
 */
export declare type PublicFileAttributes = Message<"common.v1.PublicFileAttributes"> & {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * @generated from field: string provider = 2;
   */
  provider: string;

  /**
   * @generated from field: string url = 3;
   */
  url: string;

  /**
   * @generated from field: string alt = 4;
   */
  alt: string;

  /**
   * @generated from field: string caption = 5;
   */
  caption: string;

  /**
   * @generated from field: string ext = 6;
   */
  ext: string;

  /**
   * @generated from field: string hash = 7;
   */
  hash: string;

  /**
   * @generated from field: string mime = 8;
   */
  mime: string;

  /**
   * @generated from field: double size = 9;
   */
  size: number;

  /**
   * @generated from field: int64 width = 10;
   */
  width: bigint;

  /**
   * @generated from field: int64 height = 11;
   */
  height: bigint;
};

/**
 * Describes the message common.v1.PublicFileAttributes.
 * Use `create(PublicFileAttributesSchema)` to create a new message.
 */
export declare const PublicFileAttributesSchema: GenMessage<PublicFileAttributes>;

