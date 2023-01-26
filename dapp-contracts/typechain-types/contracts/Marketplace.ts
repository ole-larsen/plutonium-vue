/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace Marketplace {
  export type CollectibleStruct = {
    id: PromiseOrValue<BigNumberish>;
    collectionId: PromiseOrValue<BigNumberish>;
    tokenId: PromiseOrValue<BigNumberish>;
    price: PromiseOrValue<BigNumberish>;
    owner: PromiseOrValue<string>;
    creator: PromiseOrValue<string>;
    fulfilled: PromiseOrValue<boolean>;
    cancelled: PromiseOrValue<boolean>;
    auction: PromiseOrValue<boolean>;
  };

  export type CollectibleStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string,
    boolean,
    boolean,
    boolean
  ] & {
    id: BigNumber;
    collectionId: BigNumber;
    tokenId: BigNumber;
    price: BigNumber;
    owner: string;
    creator: string;
    fulfilled: boolean;
    cancelled: boolean;
    auction: boolean;
  };

  export type CollectionStruct = {
    id: PromiseOrValue<BigNumberish>;
    name: PromiseOrValue<string>;
    symbol: PromiseOrValue<string>;
    description: PromiseOrValue<string>;
    nftCollection: PromiseOrValue<string>;
    fee: PromiseOrValue<BigNumberish>;
    price: PromiseOrValue<BigNumberish>;
    owner: PromiseOrValue<string>;
    creator: PromiseOrValue<string>;
    fulfilled: PromiseOrValue<boolean>;
    cancelled: PromiseOrValue<boolean>;
  };

  export type CollectionStructOutput = [
    BigNumber,
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    string,
    string,
    boolean,
    boolean
  ] & {
    id: BigNumber;
    name: string;
    symbol: string;
    description: string;
    nftCollection: string;
    fee: BigNumber;
    price: BigNumber;
    owner: string;
    creator: string;
    fulfilled: boolean;
    cancelled: boolean;
  };
}

export interface MarketplaceInterface extends utils.Interface {
  functions: {
    "buyCollectible(uint256,uint256)": FunctionFragment;
    "cancelCollectible(uint256,uint256)": FunctionFragment;
    "claimFunds()": FunctionFragment;
    "createCollectible(uint256,uint256,uint256,bool)": FunctionFragment;
    "createCollection(string,string,string,uint256,uint256,address,address)": FunctionFragment;
    "editCollection(uint256,string,string,string,uint256,uint256,address,address)": FunctionFragment;
    "getCollectible(uint256,uint256)": FunctionFragment;
    "getCollectibleCount(uint256)": FunctionFragment;
    "getCollection(uint256)": FunctionFragment;
    "getCollectionByName(string)": FunctionFragment;
    "getCollectionBySymbol(string)": FunctionFragment;
    "getCollectionsCount()": FunctionFragment;
    "getFee()": FunctionFragment;
    "getName()": FunctionFragment;
    "getOwner()": FunctionFragment;
    "getUserFunds(address)": FunctionFragment;
    "revertCancelCollectible(uint256,uint256)": FunctionFragment;
    "sellCollectible(uint256,uint256,uint256)": FunctionFragment;
    "setFee(uint256)": FunctionFragment;
    "setName(string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "buyCollectible"
      | "cancelCollectible"
      | "claimFunds"
      | "createCollectible"
      | "createCollection"
      | "editCollection"
      | "getCollectible"
      | "getCollectibleCount"
      | "getCollection"
      | "getCollectionByName"
      | "getCollectionBySymbol"
      | "getCollectionsCount"
      | "getFee"
      | "getName"
      | "getOwner"
      | "getUserFunds"
      | "revertCancelCollectible"
      | "sellCollectible"
      | "setFee"
      | "setName"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "buyCollectible",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelCollectible",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "claimFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createCollectible",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createCollection",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "editCollection",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollectible",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollectibleCount",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollection",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollectionByName",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollectionBySymbol",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollectionsCount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getFee", values?: undefined): string;
  encodeFunctionData(functionFragment: "getName", values?: undefined): string;
  encodeFunctionData(functionFragment: "getOwner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getUserFunds",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "revertCancelCollectible",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "sellCollectible",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setFee",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setName",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "buyCollectible",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelCollectible",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claimFunds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createCollectible",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollectible",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollectibleCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollectionByName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollectionBySymbol",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollectionsCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getName", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getUserFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revertCancelCollectible",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sellCollectible",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setName", data: BytesLike): Result;

  events: {
    "BuyCollectible(uint256,uint256,uint256,uint256,uint256,address,address,address,bool,bool)": EventFragment;
    "CancelCollectible(uint256,uint256,address)": EventFragment;
    "ClaimFunds(address,uint256)": EventFragment;
    "CreateCollectible(uint256,uint256,uint256,uint256,address,address,bool,bool,bool)": EventFragment;
    "CreateCollection(uint256,string,string,string,uint256,uint256,address,address,address)": EventFragment;
    "EditCollection(uint256,string,string,string,uint256,uint256,address,address,address)": EventFragment;
    "RevertCancelCollectible(uint256,uint256,address)": EventFragment;
    "SellCollectible(uint256,uint256,uint256,uint256,uint256,address,address,address,bool,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BuyCollectible"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CancelCollectible"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ClaimFunds"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreateCollectible"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreateCollection"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EditCollection"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RevertCancelCollectible"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SellCollectible"): EventFragment;
}

export interface BuyCollectibleEventObject {
  id: BigNumber;
  collectionId: BigNumber;
  tokenId: BigNumber;
  price: BigNumber;
  percent: BigNumber;
  creator: string;
  buyer: string;
  owner: string;
  fulfilled: boolean;
  cancelled: boolean;
}
export type BuyCollectibleEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string,
    string,
    boolean,
    boolean
  ],
  BuyCollectibleEventObject
>;

export type BuyCollectibleEventFilter = TypedEventFilter<BuyCollectibleEvent>;

export interface CancelCollectibleEventObject {
  collectionId: BigNumber;
  id: BigNumber;
  owner: string;
}
export type CancelCollectibleEvent = TypedEvent<
  [BigNumber, BigNumber, string],
  CancelCollectibleEventObject
>;

export type CancelCollectibleEventFilter =
  TypedEventFilter<CancelCollectibleEvent>;

export interface ClaimFundsEventObject {
  user: string;
  amount: BigNumber;
}
export type ClaimFundsEvent = TypedEvent<
  [string, BigNumber],
  ClaimFundsEventObject
>;

export type ClaimFundsEventFilter = TypedEventFilter<ClaimFundsEvent>;

export interface CreateCollectibleEventObject {
  id: BigNumber;
  collectionId: BigNumber;
  tokenId: BigNumber;
  price: BigNumber;
  owner: string;
  creator: string;
  fulfilled: boolean;
  cancelled: boolean;
  auction: boolean;
}
export type CreateCollectibleEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string,
    boolean,
    boolean,
    boolean
  ],
  CreateCollectibleEventObject
>;

export type CreateCollectibleEventFilter =
  TypedEventFilter<CreateCollectibleEvent>;

export interface CreateCollectionEventObject {
  id: BigNumber;
  name: string;
  symbol: string;
  description: string;
  fee: BigNumber;
  price: BigNumber;
  collection: string;
  creator: string;
  owner: string;
}
export type CreateCollectionEvent = TypedEvent<
  [
    BigNumber,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    string,
    string,
    string
  ],
  CreateCollectionEventObject
>;

export type CreateCollectionEventFilter =
  TypedEventFilter<CreateCollectionEvent>;

export interface EditCollectionEventObject {
  id: BigNumber;
  name: string;
  symbol: string;
  description: string;
  fee: BigNumber;
  price: BigNumber;
  collection: string;
  creator: string;
  owner: string;
}
export type EditCollectionEvent = TypedEvent<
  [
    BigNumber,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    string,
    string,
    string
  ],
  EditCollectionEventObject
>;

export type EditCollectionEventFilter = TypedEventFilter<EditCollectionEvent>;

export interface RevertCancelCollectibleEventObject {
  collectionId: BigNumber;
  id: BigNumber;
  owner: string;
}
export type RevertCancelCollectibleEvent = TypedEvent<
  [BigNumber, BigNumber, string],
  RevertCancelCollectibleEventObject
>;

export type RevertCancelCollectibleEventFilter =
  TypedEventFilter<RevertCancelCollectibleEvent>;

export interface SellCollectibleEventObject {
  id: BigNumber;
  collectionId: BigNumber;
  tokenId: BigNumber;
  price: BigNumber;
  percent: BigNumber;
  creator: string;
  buyer: string;
  owner: string;
  fulfilled: boolean;
  cancelled: boolean;
}
export type SellCollectibleEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string,
    string,
    boolean,
    boolean
  ],
  SellCollectibleEventObject
>;

export type SellCollectibleEventFilter = TypedEventFilter<SellCollectibleEvent>;

export interface Marketplace extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MarketplaceInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    buyCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cancelCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimFunds(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createCollectible(
      _tokenId: PromiseOrValue<BigNumberish>,
      _collectionId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _auction: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createCollection(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _fee: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _nftCollection: PromiseOrValue<string>,
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    editCollection(
      _id: PromiseOrValue<BigNumberish>,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _fee: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _nftCollection: PromiseOrValue<string>,
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[Marketplace.CollectibleStructOutput]>;

    getCollectibleCount(
      _collectionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getCollection(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[Marketplace.CollectionStructOutput]>;

    getCollectionByName(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[Marketplace.CollectionStructOutput]>;

    getCollectionBySymbol(
      _symbol: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[Marketplace.CollectionStructOutput]>;

    getCollectionsCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    getFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    getName(overrides?: CallOverrides): Promise<[string]>;

    getOwner(overrides?: CallOverrides): Promise<[string]>;

    getUserFunds(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    revertCancelCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sellCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFee(
      _fee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setName(
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  buyCollectible(
    _collectionId: PromiseOrValue<BigNumberish>,
    _id: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancelCollectible(
    _collectionId: PromiseOrValue<BigNumberish>,
    _id: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimFunds(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createCollectible(
    _tokenId: PromiseOrValue<BigNumberish>,
    _collectionId: PromiseOrValue<BigNumberish>,
    _price: PromiseOrValue<BigNumberish>,
    _auction: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createCollection(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _description: PromiseOrValue<string>,
    _fee: PromiseOrValue<BigNumberish>,
    _price: PromiseOrValue<BigNumberish>,
    _nftCollection: PromiseOrValue<string>,
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  editCollection(
    _id: PromiseOrValue<BigNumberish>,
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _description: PromiseOrValue<string>,
    _fee: PromiseOrValue<BigNumberish>,
    _price: PromiseOrValue<BigNumberish>,
    _nftCollection: PromiseOrValue<string>,
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getCollectible(
    _collectionId: PromiseOrValue<BigNumberish>,
    _id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<Marketplace.CollectibleStructOutput>;

  getCollectibleCount(
    _collectionId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getCollection(
    _id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<Marketplace.CollectionStructOutput>;

  getCollectionByName(
    _name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<Marketplace.CollectionStructOutput>;

  getCollectionBySymbol(
    _symbol: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<Marketplace.CollectionStructOutput>;

  getCollectionsCount(overrides?: CallOverrides): Promise<BigNumber>;

  getFee(overrides?: CallOverrides): Promise<BigNumber>;

  getName(overrides?: CallOverrides): Promise<string>;

  getOwner(overrides?: CallOverrides): Promise<string>;

  getUserFunds(
    _owner: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  revertCancelCollectible(
    _collectionId: PromiseOrValue<BigNumberish>,
    _id: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sellCollectible(
    _collectionId: PromiseOrValue<BigNumberish>,
    _id: PromiseOrValue<BigNumberish>,
    _price: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFee(
    _fee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setName(
    _name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    buyCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    cancelCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    claimFunds(overrides?: CallOverrides): Promise<void>;

    createCollectible(
      _tokenId: PromiseOrValue<BigNumberish>,
      _collectionId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _auction: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    createCollection(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _fee: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _nftCollection: PromiseOrValue<string>,
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    editCollection(
      _id: PromiseOrValue<BigNumberish>,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _fee: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _nftCollection: PromiseOrValue<string>,
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<Marketplace.CollectibleStructOutput>;

    getCollectibleCount(
      _collectionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollection(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<Marketplace.CollectionStructOutput>;

    getCollectionByName(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<Marketplace.CollectionStructOutput>;

    getCollectionBySymbol(
      _symbol: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<Marketplace.CollectionStructOutput>;

    getCollectionsCount(overrides?: CallOverrides): Promise<BigNumber>;

    getFee(overrides?: CallOverrides): Promise<BigNumber>;

    getName(overrides?: CallOverrides): Promise<string>;

    getOwner(overrides?: CallOverrides): Promise<string>;

    getUserFunds(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    revertCancelCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    sellCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFee(
      _fee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setName(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "BuyCollectible(uint256,uint256,uint256,uint256,uint256,address,address,address,bool,bool)"(
      id?: null,
      collectionId?: null,
      tokenId?: null,
      price?: null,
      percent?: null,
      creator?: PromiseOrValue<string> | null,
      buyer?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      fulfilled?: null,
      cancelled?: null
    ): BuyCollectibleEventFilter;
    BuyCollectible(
      id?: null,
      collectionId?: null,
      tokenId?: null,
      price?: null,
      percent?: null,
      creator?: PromiseOrValue<string> | null,
      buyer?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      fulfilled?: null,
      cancelled?: null
    ): BuyCollectibleEventFilter;

    "CancelCollectible(uint256,uint256,address)"(
      collectionId?: null,
      id?: null,
      owner?: null
    ): CancelCollectibleEventFilter;
    CancelCollectible(
      collectionId?: null,
      id?: null,
      owner?: null
    ): CancelCollectibleEventFilter;

    "ClaimFunds(address,uint256)"(
      user?: null,
      amount?: null
    ): ClaimFundsEventFilter;
    ClaimFunds(user?: null, amount?: null): ClaimFundsEventFilter;

    "CreateCollectible(uint256,uint256,uint256,uint256,address,address,bool,bool,bool)"(
      id?: null,
      collectionId?: null,
      tokenId?: null,
      price?: null,
      owner?: PromiseOrValue<string> | null,
      creator?: PromiseOrValue<string> | null,
      fulfilled?: null,
      cancelled?: null,
      auction?: null
    ): CreateCollectibleEventFilter;
    CreateCollectible(
      id?: null,
      collectionId?: null,
      tokenId?: null,
      price?: null,
      owner?: PromiseOrValue<string> | null,
      creator?: PromiseOrValue<string> | null,
      fulfilled?: null,
      cancelled?: null,
      auction?: null
    ): CreateCollectibleEventFilter;

    "CreateCollection(uint256,string,string,string,uint256,uint256,address,address,address)"(
      id?: null,
      name?: null,
      symbol?: null,
      description?: null,
      fee?: null,
      price?: null,
      collection?: PromiseOrValue<string> | null,
      creator?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null
    ): CreateCollectionEventFilter;
    CreateCollection(
      id?: null,
      name?: null,
      symbol?: null,
      description?: null,
      fee?: null,
      price?: null,
      collection?: PromiseOrValue<string> | null,
      creator?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null
    ): CreateCollectionEventFilter;

    "EditCollection(uint256,string,string,string,uint256,uint256,address,address,address)"(
      id?: null,
      name?: null,
      symbol?: null,
      description?: null,
      fee?: null,
      price?: null,
      collection?: PromiseOrValue<string> | null,
      creator?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null
    ): EditCollectionEventFilter;
    EditCollection(
      id?: null,
      name?: null,
      symbol?: null,
      description?: null,
      fee?: null,
      price?: null,
      collection?: PromiseOrValue<string> | null,
      creator?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null
    ): EditCollectionEventFilter;

    "RevertCancelCollectible(uint256,uint256,address)"(
      collectionId?: null,
      id?: null,
      owner?: null
    ): RevertCancelCollectibleEventFilter;
    RevertCancelCollectible(
      collectionId?: null,
      id?: null,
      owner?: null
    ): RevertCancelCollectibleEventFilter;

    "SellCollectible(uint256,uint256,uint256,uint256,uint256,address,address,address,bool,bool)"(
      id?: null,
      collectionId?: null,
      tokenId?: null,
      price?: null,
      percent?: null,
      creator?: PromiseOrValue<string> | null,
      buyer?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      fulfilled?: null,
      cancelled?: null
    ): SellCollectibleEventFilter;
    SellCollectible(
      id?: null,
      collectionId?: null,
      tokenId?: null,
      price?: null,
      percent?: null,
      creator?: PromiseOrValue<string> | null,
      buyer?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      fulfilled?: null,
      cancelled?: null
    ): SellCollectibleEventFilter;
  };

  estimateGas: {
    buyCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cancelCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimFunds(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createCollectible(
      _tokenId: PromiseOrValue<BigNumberish>,
      _collectionId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _auction: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createCollection(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _fee: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _nftCollection: PromiseOrValue<string>,
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    editCollection(
      _id: PromiseOrValue<BigNumberish>,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _fee: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _nftCollection: PromiseOrValue<string>,
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollectibleCount(
      _collectionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollection(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollectionByName(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollectionBySymbol(
      _symbol: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollectionsCount(overrides?: CallOverrides): Promise<BigNumber>;

    getFee(overrides?: CallOverrides): Promise<BigNumber>;

    getName(overrides?: CallOverrides): Promise<BigNumber>;

    getOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getUserFunds(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    revertCancelCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sellCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFee(
      _fee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setName(
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    buyCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancelCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimFunds(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createCollectible(
      _tokenId: PromiseOrValue<BigNumberish>,
      _collectionId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _auction: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createCollection(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _fee: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _nftCollection: PromiseOrValue<string>,
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    editCollection(
      _id: PromiseOrValue<BigNumberish>,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _fee: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _nftCollection: PromiseOrValue<string>,
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollectibleCount(
      _collectionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollection(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollectionByName(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollectionBySymbol(
      _symbol: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollectionsCount(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getName(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUserFunds(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    revertCancelCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sellCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFee(
      _fee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setName(
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
