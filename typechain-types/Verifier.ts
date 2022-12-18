/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace Verifier {
  export type IdentityStruct = {
    userId: PromiseOrValue<BigNumberish>;
    wallet: PromiseOrValue<string>;
  };

  export type IdentityStructOutput = [BigNumber, string] & {
    userId: BigNumber;
    wallet: string;
  };

  export type BidStruct = {
    amount: PromiseOrValue<BigNumberish>;
    bidder: Verifier.IdentityStruct;
  };

  export type BidStructOutput = [BigNumber, Verifier.IdentityStructOutput] & {
    amount: BigNumber;
    bidder: Verifier.IdentityStructOutput;
  };
}

export interface VerifierInterface extends utils.Interface {
  functions: {
    "verify(address,(uint256,(uint256,address)),uint8,bytes32,bytes32)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "verify"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "verify",
    values: [
      PromiseOrValue<string>,
      Verifier.BidStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;

  events: {};
}

export interface Verifier extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VerifierInterface;

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
    verify(
      signer: PromiseOrValue<string>,
      bid: Verifier.BidStruct,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  verify(
    signer: PromiseOrValue<string>,
    bid: Verifier.BidStruct,
    v: PromiseOrValue<BigNumberish>,
    r: PromiseOrValue<BytesLike>,
    s: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    verify(
      signer: PromiseOrValue<string>,
      bid: Verifier.BidStruct,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    verify(
      signer: PromiseOrValue<string>,
      bid: Verifier.BidStruct,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    verify(
      signer: PromiseOrValue<string>,
      bid: Verifier.BidStruct,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
