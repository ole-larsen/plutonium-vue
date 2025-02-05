// @generated by protoc-gen-es v2.2.3
// @generated from file frontend/v1/frontend.proto (package frontend.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenService } from "@bufbuild/protobuf/codegenv1";
import type { MenuRequestSchema, MenuResponseSchema } from "./menu_pb";
import type { PageRequestSchema, PageResponseSchema } from "./page_pb";
import type { ContactRequestSchema, ContactResponseSchema, PostContactRequestSchema, PostContactResponseSchema } from "./contact_pb";
import type { FaqRequestSchema, FaqResponseSchema } from "./faq_pb";
import type { HelpCenterRequestSchema, HelpCenterResponseSchema } from "./help_center_pb";
import type { SliderRequestSchema, SliderResponseSchema } from "./slider_pb";
import type { PostSubscribeRequestSchema, PostSubscribeResponseSchema } from "./subscribe_pb";
import type { UploadFileRequestSchema, UploadFileResponseSchema } from "./file_pb";

/**
 * Describes the file frontend/v1/frontend.proto.
 */
export declare const file_frontend_v1_frontend: GenFile;

/**
 * @generated from service frontend.v1.FrontendService
 */
export declare const FrontendService: GenService<{
  /**
   * @generated from rpc frontend.v1.FrontendService.Menu
   */
  menu: {
    methodKind: "unary";
    input: typeof MenuRequestSchema;
    output: typeof MenuResponseSchema;
  },
  /**
   * @generated from rpc frontend.v1.FrontendService.Page
   */
  page: {
    methodKind: "unary";
    input: typeof PageRequestSchema;
    output: typeof PageResponseSchema;
  },
  /**
   * @generated from rpc frontend.v1.FrontendService.Contact
   */
  contact: {
    methodKind: "unary";
    input: typeof ContactRequestSchema;
    output: typeof ContactResponseSchema;
  },
  /**
   * @generated from rpc frontend.v1.FrontendService.Faq
   */
  faq: {
    methodKind: "unary";
    input: typeof FaqRequestSchema;
    output: typeof FaqResponseSchema;
  },
  /**
   * @generated from rpc frontend.v1.FrontendService.HelpCenter
   */
  helpCenter: {
    methodKind: "unary";
    input: typeof HelpCenterRequestSchema;
    output: typeof HelpCenterResponseSchema;
  },
  /**
   * @generated from rpc frontend.v1.FrontendService.Slider
   */
  slider: {
    methodKind: "unary";
    input: typeof SliderRequestSchema;
    output: typeof SliderResponseSchema;
  },
  /**
   * @generated from rpc frontend.v1.FrontendService.PostSubscribe
   */
  postSubscribe: {
    methodKind: "unary";
    input: typeof PostSubscribeRequestSchema;
    output: typeof PostSubscribeResponseSchema;
  },
  /**
   * @generated from rpc frontend.v1.FrontendService.PostContact
   */
  postContact: {
    methodKind: "unary";
    input: typeof PostContactRequestSchema;
    output: typeof PostContactResponseSchema;
  },
  /**
   * @generated from rpc frontend.v1.FrontendService.UploadFile
   */
  uploadFile: {
    methodKind: "unary";
    input: typeof UploadFileRequestSchema;
    output: typeof UploadFileResponseSchema;
  },
}>;

