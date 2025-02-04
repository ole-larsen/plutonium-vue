// @generated by protoc-gen-es v2.2.3
// @generated from file frontend/v1/page.proto (package frontend.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { PublicFile } from "../../common/v1/file_pb";
import type { Empty } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file frontend/v1/page.proto.
 */
export declare const file_frontend_v1_page: GenFile;

/**
 * @generated from message frontend.v1.PublicPage
 */
export declare type PublicPage = Message<"frontend.v1.PublicPage"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: frontend.v1.PublicPageAttributes attributes = 2;
   */
  attributes?: PublicPageAttributes;
};

/**
 * Describes the message frontend.v1.PublicPage.
 * Use `create(PublicPageSchema)` to create a new message.
 */
export declare const PublicPageSchema: GenMessage<PublicPage>;

/**
 * @generated from message frontend.v1.PublicPageAttributes
 */
export declare type PublicPageAttributes = Message<"frontend.v1.PublicPageAttributes"> & {
  /**
   * @generated from field: string title = 1;
   */
  title: string;

  /**
   * @generated from field: string content = 2;
   */
  content: string;

  /**
   * @generated from field: string description = 3;
   */
  description: string;

  /**
   * @generated from field: string link = 4;
   */
  link: string;

  /**
   * @generated from field: string category = 5;
   */
  category: string;

  /**
   * @generated from field: common.v1.PublicFile image = 6;
   */
  image?: PublicFile;
};

/**
 * Describes the message frontend.v1.PublicPageAttributes.
 * Use `create(PublicPageAttributesSchema)` to create a new message.
 */
export declare const PublicPageAttributesSchema: GenMessage<PublicPageAttributes>;

/**
 * @generated from message frontend.v1.PageRequest
 */
export declare type PageRequest = Message<"frontend.v1.PageRequest"> & {
  /**
   * @generated from field: string provider = 1;
   */
  provider: string;
};

/**
 * Describes the message frontend.v1.PageRequest.
 * Use `create(PageRequestSchema)` to create a new message.
 */
export declare const PageRequestSchema: GenMessage<PageRequest>;

/**
 * @generated from message frontend.v1.PageResponse
 */
export declare type PageResponse = Message<"frontend.v1.PageResponse"> & {
  /**
   * @generated from oneof frontend.v1.PageResponse.response
   */
  response: {
    /**
     * @generated from field: frontend.v1.PublicPage data = 1;
     */
    value: PublicPage;
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
 * Describes the message frontend.v1.PageResponse.
 * Use `create(PageResponseSchema)` to create a new message.
 */
export declare const PageResponseSchema: GenMessage<PageResponse>;

