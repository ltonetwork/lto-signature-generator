import { TLong } from '../interface';


export interface ISignatureGenerator {

    getSignature(privateKey: string): Promise<string>;

    getBytes(): Promise<Uint8Array>;

    getDebugBytes(): Promise<Array<{ bytes: Uint8Array, from: any, value: any }>>;

    getExactBytes(fieldName: string): Promise<Uint8Array>;
}

export interface ISignatureGeneratorConstructor<T> {
    new(data: T): ISignatureGenerator;
}

export interface IDEFAULT_PROPS {
    senderPublicKey: string;
    timestamp: number | TLong;
}

export interface ITRANSFER_PROPS extends IDEFAULT_PROPS {
    amount: TLong;
    fee: TLong;
    recipient: string;
    attachment: string;
    version: number;
}

export interface ILEASE_PROPS extends IDEFAULT_PROPS {
    recipient: string;
    amount: TLong;
    fee: TLong;
    version: number;
}

export interface ICANCEL_LEASING_PROPS extends IDEFAULT_PROPS {
    fee: TLong;
    transactionId: string;
    version: number;
}

export interface ICANCEL_LEASING_PROPS_V2 extends ICANCEL_LEASING_PROPS {
    chainId: number;
}

export interface IMASS_TRANSFER_PROPS extends IDEFAULT_PROPS {
    transfers: Array<IMASS_TRANSFER_TRANSFERS>;
    fee: TLong;
    attachment: string;
    version: number;
}

export interface IDATA_PROPS extends IDEFAULT_PROPS {
    data: Array<IDATA_ENTRY>;
    fee: TLong;
    version: number;
}

export interface ICANCEL_ORDER_PROPS {
    senderPublicKey: string;
    orderId: string;
}

export interface IMASS_TRANSFER_TRANSFERS {
    recipient: string;
    amount: TLong;
}


export interface ISET_SCRIPT_PROPS extends IDEFAULT_PROPS {
    script: string;
    chainId: number;
    fee: TLong;
}

export interface IDATA_ENTRY {
    key: string;
    type: string;
    value: any;
}

export interface IANCHOR_PROPS extends IDEFAULT_PROPS {
    anchors: Array<string>;
    fee: TLong;
}

export type TTX_NUMBER_MAP = {
    4: ISignatureGeneratorConstructor<ITRANSFER_PROPS>;
    8: ISignatureGeneratorConstructor<ILEASE_PROPS>;
    9: ISignatureGeneratorConstructor<ICANCEL_LEASING_PROPS_V2>;
    11: ISignatureGeneratorConstructor<IMASS_TRANSFER_PROPS>;
    12: ISignatureGeneratorConstructor<IDATA_PROPS>;
    13: ISignatureGeneratorConstructor<ISET_SCRIPT_PROPS>;
    15: ISignatureGeneratorConstructor<IANCHOR_PROPS>;
}

export type TTX_TYPE_MAP = {
    transfer: ISignatureGeneratorConstructor<ITRANSFER_PROPS>;
    lease: ISignatureGeneratorConstructor<ILEASE_PROPS>;
    cancelLeasing: ISignatureGeneratorConstructor<ICANCEL_LEASING_PROPS_V2>;
    massTransfer: ISignatureGeneratorConstructor<IMASS_TRANSFER_PROPS>;
    data: ISignatureGeneratorConstructor<IDATA_PROPS>;
    setScript: ISignatureGeneratorConstructor<ISET_SCRIPT_PROPS>;
    anchor: ISignatureGeneratorConstructor<IANCHOR_PROPS>;
}
