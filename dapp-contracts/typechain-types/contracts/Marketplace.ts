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
    tokenIds: PromiseOrValue<BigNumberish>[];
    owners: PromiseOrValue<string>[];
    creator: PromiseOrValue<string>;
    isAuction: PromiseOrValue<boolean>;
    price: PromiseOrValue<BigNumberish>;
    fulfilled: PromiseOrValue<boolean>[];
    isLocked: PromiseOrValue<boolean>;
  };

  export type CollectibleStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber[],
    string[],
    string,
    boolean,
    BigNumber,
    boolean[],
    boolean
  ] & {
    id: BigNumber;
    collectionId: BigNumber;
    tokenIds: BigNumber[];
    owners: string[];
    creator: string;
    isAuction: boolean;
    price: BigNumber;
    fulfilled: boolean[];
    isLocked: boolean;
  };

  export type CollectionStruct = {
    name: PromiseOrValue<string>;
    symbol: PromiseOrValue<string>;
    description: PromiseOrValue<string>;
    nftCollection: PromiseOrValue<string>;
    fee: PromiseOrValue<BigNumberish>;
    owner: PromiseOrValue<string>;
    creator: PromiseOrValue<string>;
    isApproved: PromiseOrValue<boolean>;
    isLocked: PromiseOrValue<boolean>;
  };

  export type CollectionStructOutput = [
    string,
    string,
    string,
    string,
    BigNumber,
    string,
    string,
    boolean,
    boolean
  ] & {
    name: string;
    symbol: string;
    description: string;
    nftCollection: string;
    fee: BigNumber;
    owner: string;
    creator: string;
    isApproved: boolean;
    isLocked: boolean;
  };
}

export interface MarketplaceInterface extends utils.Interface {
  functions: {
    "buy(uint256,uint256,uint256)": FunctionFragment;
    "claimFunds()": FunctionFragment;
    "createCollectible(uint256[],uint256,bool,uint256)": FunctionFragment;
    "createCollection(string,string,string,uint256,address,address)": FunctionFragment;
    "editCollectible(uint256,uint256,uint256,bool,bool)": FunctionFragment;
    "editCollection(uint256,string,string,string,uint256,address,address,bool,bool)": FunctionFragment;
    "endAuction(uint256,uint256)": FunctionFragment;
    "getCollectible(uint256,uint256)": FunctionFragment;
    "getCollectibleCount(uint256)": FunctionFragment;
    "getCollection(uint256)": FunctionFragment;
    "getCollectionCounter()": FunctionFragment;
    "getCollectionIdByName(string)": FunctionFragment;
    "getFee()": FunctionFragment;
    "getName()": FunctionFragment;
    "getOwner()": FunctionFragment;
    "getUserFunds(address)": FunctionFragment;
    "sell(uint256,uint256,uint256)": FunctionFragment;
    "setFee(uint256)": FunctionFragment;
    "setName(string)": FunctionFragment;
    "startAuction(uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "buy"
      | "claimFunds"
      | "createCollectible"
      | "createCollection"
      | "editCollectible"
      | "editCollection"
      | "endAuction"
      | "getCollectible"
      | "getCollectibleCount"
      | "getCollection"
      | "getCollectionCounter"
      | "getCollectionIdByName"
      | "getFee"
      | "getName"
      | "getOwner"
      | "getUserFunds"
      | "sell"
      | "setFee"
      | "setName"
      | "startAuction"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "buy",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "claimFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createCollectible",
    values: [
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createCollection",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "editCollectible",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>,
      PromiseOrValue<boolean>
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
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<boolean>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "endAuction",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
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
    functionFragment: "getCollectionCounter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCollectionIdByName",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "getFee", values?: undefined): string;
  encodeFunctionData(functionFragment: "getName", values?: undefined): string;
  encodeFunctionData(functionFragment: "getOwner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getUserFunds",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "sell",
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
  encodeFunctionData(
    functionFragment: "startAuction",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
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
    functionFragment: "editCollectible",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "endAuction", data: BytesLike): Result;
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
    functionFragment: "getCollectionCounter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollectionIdByName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getName", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getUserFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sell", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setName", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "startAuction",
    data: BytesLike
  ): Result;

  events: {
    "Buy(uint256,uint256,uint256[],uint256,address,uint256)": EventFragment;
    "ClaimFunds(address,uint256)": EventFragment;
    "CreateCollectible(uint256,uint256,uint256[],address[],address,bool,uint256)": EventFragment;
    "CreateCollection(uint256,string,string,uint256,address,address,address)": EventFragment;
    "EditCollectible(uint256,uint256,bool,bool,address)": EventFragment;
    "EditCollection(uint256,string,string,uint256,address,address,address,bool,bool)": EventFragment;
    "Sell(uint256,uint256,uint256[],address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Buy"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ClaimFunds"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreateCollectible"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreateCollection"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EditCollectible"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EditCollection"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Sell"): EventFragment;
}

export interface BuyEventObject {
  id: BigNumber;
  collectionId: BigNumber;
  tokenIds: BigNumber[];
  price: BigNumber;
  buyer: string;
  quantity: BigNumber;
}
export type BuyEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber[], BigNumber, string, BigNumber],
  BuyEventObject
>;

export type BuyEventFilter = TypedEventFilter<BuyEvent>;

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
  tokenIds: BigNumber[];
  owners: string[];
  creator: string;
  isAuction: boolean;
  price: BigNumber;
}
export type CreateCollectibleEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber[], string[], string, boolean, BigNumber],
  CreateCollectibleEventObject
>;

export type CreateCollectibleEventFilter =
  TypedEventFilter<CreateCollectibleEvent>;

export interface CreateCollectionEventObject {
  id: BigNumber;
  name: string;
  symbol: string;
  fee: BigNumber;
  collection: string;
  creator: string;
  owner: string;
}
export type CreateCollectionEvent = TypedEvent<
  [BigNumber, string, string, BigNumber, string, string, string],
  CreateCollectionEventObject
>;

export type CreateCollectionEventFilter =
  TypedEventFilter<CreateCollectionEvent>;

export interface EditCollectibleEventObject {
  collectionId: BigNumber;
  collectibleId: BigNumber;
  isLocked: boolean;
  isAuction: boolean;
  owner: string;
}
export type EditCollectibleEvent = TypedEvent<
  [BigNumber, BigNumber, boolean, boolean, string],
  EditCollectibleEventObject
>;

export type EditCollectibleEventFilter = TypedEventFilter<EditCollectibleEvent>;

export interface EditCollectionEventObject {
  id: BigNumber;
  name: string;
  symbol: string;
  fee: BigNumber;
  collection: string;
  creator: string;
  owner: string;
  isApproved: boolean;
  isLocked: boolean;
}
export type EditCollectionEvent = TypedEvent<
  [
    BigNumber,
    string,
    string,
    BigNumber,
    string,
    string,
    string,
    boolean,
    boolean
  ],
  EditCollectionEventObject
>;

export type EditCollectionEventFilter = TypedEventFilter<EditCollectionEvent>;

export interface SellEventObject {
  id: BigNumber;
  collectionId: BigNumber;
  tokenIds: BigNumber[];
  creator: string;
  seller: string;
  quantity: BigNumber;
}
export type SellEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber[], string, string, BigNumber],
  SellEventObject
>;

export type SellEventFilter = TypedEventFilter<SellEvent>;

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
    buy(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      _quantity: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimFunds(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createCollectible(
      _tokenIds: PromiseOrValue<BigNumberish>[],
      _collectionId: PromiseOrValue<BigNumberish>,
      _isAuction: PromiseOrValue<boolean>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createCollection(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      fee: PromiseOrValue<BigNumberish>,
      nftCollection: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    editCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _isLocked: PromiseOrValue<boolean>,
      _isAuction: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    editCollection(
      id: PromiseOrValue<BigNumberish>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      fee: PromiseOrValue<BigNumberish>,
      nftCollection: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      isApproved: PromiseOrValue<boolean>,
      isLocked: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    endAuction(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[Marketplace.CollectibleStructOutput]>;

    getCollectibleCount(
      _collectionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getCollection(
      collectionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[Marketplace.CollectionStructOutput]>;

    getCollectionCounter(overrides?: CallOverrides): Promise<[BigNumber]>;

    getCollectionIdByName(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    getName(overrides?: CallOverrides): Promise<[string]>;

    getOwner(overrides?: CallOverrides): Promise<[string]>;

    getUserFunds(
      userAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    sell(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      _quantity: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFee(
      marketFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setName(
      marketName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    startAuction(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  buy(
    _collectionId: PromiseOrValue<BigNumberish>,
    _collectibleId: PromiseOrValue<BigNumberish>,
    _quantity: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimFunds(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createCollectible(
    _tokenIds: PromiseOrValue<BigNumberish>[],
    _collectionId: PromiseOrValue<BigNumberish>,
    _isAuction: PromiseOrValue<boolean>,
    _price: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createCollection(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    description: PromiseOrValue<string>,
    fee: PromiseOrValue<BigNumberish>,
    nftCollection: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  editCollectible(
    _collectionId: PromiseOrValue<BigNumberish>,
    _collectibleId: PromiseOrValue<BigNumberish>,
    _price: PromiseOrValue<BigNumberish>,
    _isLocked: PromiseOrValue<boolean>,
    _isAuction: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  editCollection(
    id: PromiseOrValue<BigNumberish>,
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    description: PromiseOrValue<string>,
    fee: PromiseOrValue<BigNumberish>,
    nftCollection: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    isApproved: PromiseOrValue<boolean>,
    isLocked: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  endAuction(
    _collectionId: PromiseOrValue<BigNumberish>,
    _collectibleId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getCollectible(
    _collectionId: PromiseOrValue<BigNumberish>,
    _collectibleId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<Marketplace.CollectibleStructOutput>;

  getCollectibleCount(
    _collectionId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getCollection(
    collectionId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<Marketplace.CollectionStructOutput>;

  getCollectionCounter(overrides?: CallOverrides): Promise<BigNumber>;

  getCollectionIdByName(
    name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getFee(overrides?: CallOverrides): Promise<BigNumber>;

  getName(overrides?: CallOverrides): Promise<string>;

  getOwner(overrides?: CallOverrides): Promise<string>;

  getUserFunds(
    userAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  sell(
    _collectionId: PromiseOrValue<BigNumberish>,
    _collectibleId: PromiseOrValue<BigNumberish>,
    _quantity: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFee(
    marketFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setName(
    marketName: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  startAuction(
    _collectionId: PromiseOrValue<BigNumberish>,
    _collectibleId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    buy(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      _quantity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    claimFunds(overrides?: CallOverrides): Promise<void>;

    createCollectible(
      _tokenIds: PromiseOrValue<BigNumberish>[],
      _collectionId: PromiseOrValue<BigNumberish>,
      _isAuction: PromiseOrValue<boolean>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    createCollection(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      fee: PromiseOrValue<BigNumberish>,
      nftCollection: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    editCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _isLocked: PromiseOrValue<boolean>,
      _isAuction: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    editCollection(
      id: PromiseOrValue<BigNumberish>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      fee: PromiseOrValue<BigNumberish>,
      nftCollection: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      isApproved: PromiseOrValue<boolean>,
      isLocked: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    endAuction(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<Marketplace.CollectibleStructOutput>;

    getCollectibleCount(
      _collectionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollection(
      collectionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<Marketplace.CollectionStructOutput>;

    getCollectionCounter(overrides?: CallOverrides): Promise<BigNumber>;

    getCollectionIdByName(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFee(overrides?: CallOverrides): Promise<BigNumber>;

    getName(overrides?: CallOverrides): Promise<string>;

    getOwner(overrides?: CallOverrides): Promise<string>;

    getUserFunds(
      userAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sell(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      _quantity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFee(
      marketFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setName(
      marketName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    startAuction(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Buy(uint256,uint256,uint256[],uint256,address,uint256)"(
      id?: null,
      collectionId?: null,
      tokenIds?: null,
      price?: null,
      buyer?: PromiseOrValue<string> | null,
      quantity?: null
    ): BuyEventFilter;
    Buy(
      id?: null,
      collectionId?: null,
      tokenIds?: null,
      price?: null,
      buyer?: PromiseOrValue<string> | null,
      quantity?: null
    ): BuyEventFilter;

    "ClaimFunds(address,uint256)"(
      user?: null,
      amount?: null
    ): ClaimFundsEventFilter;
    ClaimFunds(user?: null, amount?: null): ClaimFundsEventFilter;

    "CreateCollectible(uint256,uint256,uint256[],address[],address,bool,uint256)"(
      id?: null,
      collectionId?: null,
      tokenIds?: null,
      owners?: null,
      creator?: PromiseOrValue<string> | null,
      isAuction?: null,
      price?: null
    ): CreateCollectibleEventFilter;
    CreateCollectible(
      id?: null,
      collectionId?: null,
      tokenIds?: null,
      owners?: null,
      creator?: PromiseOrValue<string> | null,
      isAuction?: null,
      price?: null
    ): CreateCollectibleEventFilter;

    "CreateCollection(uint256,string,string,uint256,address,address,address)"(
      id?: null,
      name?: null,
      symbol?: null,
      fee?: null,
      collection?: PromiseOrValue<string> | null,
      creator?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null
    ): CreateCollectionEventFilter;
    CreateCollection(
      id?: null,
      name?: null,
      symbol?: null,
      fee?: null,
      collection?: PromiseOrValue<string> | null,
      creator?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null
    ): CreateCollectionEventFilter;

    "EditCollectible(uint256,uint256,bool,bool,address)"(
      collectionId?: null,
      collectibleId?: null,
      isLocked?: null,
      isAuction?: null,
      owner?: null
    ): EditCollectibleEventFilter;
    EditCollectible(
      collectionId?: null,
      collectibleId?: null,
      isLocked?: null,
      isAuction?: null,
      owner?: null
    ): EditCollectibleEventFilter;

    "EditCollection(uint256,string,string,uint256,address,address,address,bool,bool)"(
      id?: null,
      name?: null,
      symbol?: null,
      fee?: null,
      collection?: PromiseOrValue<string> | null,
      creator?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      isApproved?: null,
      isLocked?: null
    ): EditCollectionEventFilter;
    EditCollection(
      id?: null,
      name?: null,
      symbol?: null,
      fee?: null,
      collection?: PromiseOrValue<string> | null,
      creator?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      isApproved?: null,
      isLocked?: null
    ): EditCollectionEventFilter;

    "Sell(uint256,uint256,uint256[],address,address,uint256)"(
      id?: null,
      collectionId?: null,
      tokenIds?: null,
      creator?: PromiseOrValue<string> | null,
      seller?: PromiseOrValue<string> | null,
      quantity?: null
    ): SellEventFilter;
    Sell(
      id?: null,
      collectionId?: null,
      tokenIds?: null,
      creator?: PromiseOrValue<string> | null,
      seller?: PromiseOrValue<string> | null,
      quantity?: null
    ): SellEventFilter;
  };

  estimateGas: {
    buy(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      _quantity: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimFunds(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createCollectible(
      _tokenIds: PromiseOrValue<BigNumberish>[],
      _collectionId: PromiseOrValue<BigNumberish>,
      _isAuction: PromiseOrValue<boolean>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createCollection(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      fee: PromiseOrValue<BigNumberish>,
      nftCollection: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    editCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _isLocked: PromiseOrValue<boolean>,
      _isAuction: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    editCollection(
      id: PromiseOrValue<BigNumberish>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      fee: PromiseOrValue<BigNumberish>,
      nftCollection: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      isApproved: PromiseOrValue<boolean>,
      isLocked: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    endAuction(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollectibleCount(
      _collectionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollection(
      collectionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollectionCounter(overrides?: CallOverrides): Promise<BigNumber>;

    getCollectionIdByName(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFee(overrides?: CallOverrides): Promise<BigNumber>;

    getName(overrides?: CallOverrides): Promise<BigNumber>;

    getOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getUserFunds(
      userAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sell(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      _quantity: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFee(
      marketFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setName(
      marketName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    startAuction(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    buy(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      _quantity: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimFunds(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createCollectible(
      _tokenIds: PromiseOrValue<BigNumberish>[],
      _collectionId: PromiseOrValue<BigNumberish>,
      _isAuction: PromiseOrValue<boolean>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createCollection(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      fee: PromiseOrValue<BigNumberish>,
      nftCollection: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    editCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _isLocked: PromiseOrValue<boolean>,
      _isAuction: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    editCollection(
      id: PromiseOrValue<BigNumberish>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      fee: PromiseOrValue<BigNumberish>,
      nftCollection: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      isApproved: PromiseOrValue<boolean>,
      isLocked: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    endAuction(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getCollectible(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollectibleCount(
      _collectionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollection(
      collectionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollectionCounter(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollectionIdByName(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getName(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUserFunds(
      userAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sell(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      _quantity: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFee(
      marketFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setName(
      marketName: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    startAuction(
      _collectionId: PromiseOrValue<BigNumberish>,
      _collectibleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
