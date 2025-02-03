// @generated by protoc-gen-es v2.2.3
// @generated from file frontend/v1/contact.proto (package frontend.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { PublicFile } from "./file_pb";
import type { Empty } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file frontend/v1/contact.proto.
 */
export declare const file_frontend_v1_contact: GenFile;

/**
 * @generated from message frontend.v1.PublicContact
 */
export declare type PublicContact = Message<"frontend.v1.PublicContact"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: frontend.v1.PublicContactAttributes attributes = 2;
   */
  attributes?: PublicContactAttributes;
};

/**
 * Describes the message frontend.v1.PublicContact.
 * Use `create(PublicContactSchema)` to create a new message.
 */
export declare const PublicContactSchema: GenMessage<PublicContact>;

/**
 * @generated from message frontend.v1.PublicContactAttributes
 */
export declare type PublicContactAttributes = Message<"frontend.v1.PublicContactAttributes"> & {
  /**
   * @generated from field: string heading = 1;
   */
  heading: string;

  /**
   * @generated from field: string sub_heading = 2;
   */
  subHeading: string;

  /**
   * @generated from field: string link = 3;
   */
  link: string;

  /**
   * @generated from field: string text = 4;
   */
  text: string;

  /**
   * @generated from field: string csrf = 5;
   */
  csrf: string;

  /**
   * @generated from field: frontend.v1.PublicFile image = 6;
   */
  image?: PublicFile;
};

/**
 * Describes the message frontend.v1.PublicContactAttributes.
 * Use `create(PublicContactAttributesSchema)` to create a new message.
 */
export declare const PublicContactAttributesSchema: GenMessage<PublicContactAttributes>;

/**
 * @generated from message frontend.v1.PublicContactForm
 */
export declare type PublicContactForm = Message<"frontend.v1.PublicContactForm"> & {
  /**
   * @generated from field: string csrf = 1;
   */
  csrf: string;

  /**
   * @generated from field: int64 page_id = 2;
   */
  pageId: bigint;

  /**
   * @generated from field: string provider = 3;
   */
  provider: string;

  /**
   * @generated from field: string subject = 4;
   */
  subject: string;

  /**
   * @generated from field: string name = 5;
   */
  name: string;

  /**
   * @generated from field: string email = 6;
   */
  email: string;

  /**
   * @generated from field: string message = 7;
   */
  message: string;
};

/**
 * Describes the message frontend.v1.PublicContactForm.
 * Use `create(PublicContactFormSchema)` to create a new message.
 */
export declare const PublicContactFormSchema: GenMessage<PublicContactForm>;

/**
 * @generated from message frontend.v1.ContactRequest
 */
export declare type ContactRequest = Message<"frontend.v1.ContactRequest"> & {
  /**
   * @generated from field: int64 page_id = 1;
   */
  pageId: bigint;
};

/**
 * Describes the message frontend.v1.ContactRequest.
 * Use `create(ContactRequestSchema)` to create a new message.
 */
export declare const ContactRequestSchema: GenMessage<ContactRequest>;

/**
 * @generated from message frontend.v1.ContactResponse
 */
export declare type ContactResponse = Message<"frontend.v1.ContactResponse"> & {
  /**
   * @generated from oneof frontend.v1.ContactResponse.response
   */
  response: {
    /**
     * @generated from field: frontend.v1.PublicContact data = 1;
     */
    value: PublicContact;
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
 * Describes the message frontend.v1.ContactResponse.
 * Use `create(ContactResponseSchema)` to create a new message.
 */
export declare const ContactResponseSchema: GenMessage<ContactResponse>;

/**
 * @generated from message frontend.v1.PostContactRequest
 */
export declare type PostContactRequest = Message<"frontend.v1.PostContactRequest"> & {
  /**
   * @generated from field: frontend.v1.PublicContactForm body = 1;
   */
  body?: PublicContactForm;
};

/**
 * Describes the message frontend.v1.PostContactRequest.
 * Use `create(PostContactRequestSchema)` to create a new message.
 */
export declare const PostContactRequestSchema: GenMessage<PostContactRequest>;

/**
 * @generated from message frontend.v1.PostContactResponse
 */
export declare type PostContactResponse = Message<"frontend.v1.PostContactResponse"> & {
  /**
   * @generated from oneof frontend.v1.PostContactResponse.response
   */
  response: {
    /**
     * @generated from field: string data = 1;
     */
    value: string;
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
 * Describes the message frontend.v1.PostContactResponse.
 * Use `create(PostContactResponseSchema)` to create a new message.
 */
export declare const PostContactResponseSchema: GenMessage<PostContactResponse>;

