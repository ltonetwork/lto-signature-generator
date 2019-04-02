import {
    Attachment,
    Base58, Base64,
    ByteProcessor,
    DataEntries,
    IDATA_PROPS,
    IMASS_TRANSFER_PROPS,
    ISET_SCRIPT_PROPS,
    Recipient,
    ScriptVersion,
    Transfers,
    TRANSACTION_TYPE_NUMBER, Int,
    ICANCEL_LEASING_PROPS_V2, IANCHOR_PROPS, AnchorEntries
} from '..';
import {
    ICANCEL_LEASING_PROPS,
    ILEASE_PROPS,
    ISignatureGenerator,
    ISignatureGeneratorConstructor,
    ITRANSFER_PROPS,
    TTX_NUMBER_MAP,
    TTX_TYPE_MAP
} from './interface';
import { concatUint8Arrays } from '../utils/concat';
import crypto from '../utils/crypto';
import * as constants from '../constants';


const ERRORS = {
    NO_DATA: { code: 'NO_DATA', message: 'No data' },
    FIELD_ERROR: { code: 'FIELD_ERROR', message: 'Invalid field', field: null },
};


export function generate<T>(fields: Array<ByteProcessor | number>): ISignatureGeneratorConstructor<T> {

    const errors: Array<any> = [];

    if (!fields || !fields.length) {
        errors.push(ERRORS.NO_DATA);
    }

    // Fields of the original data object
    const storedFields: Record<string, ByteProcessor> = Object.create(null);

    // Data bytes or functions returning data bytes via promises
    const byteProviders: Array<Function | Uint8Array> = [];

    fields.forEach((field: ByteProcessor | number) => {
        if (field instanceof ByteProcessor) {
            // Remember user data fields
            storedFields[field.name] = field;
            // All user data must be represented as bytes
            byteProviders.push((data: any) => {
                try {
                    return field.process(data[field.name]);
                } catch (e) {
                    throw { ...ERRORS.FIELD_ERROR, field: field.name, message: e.message };
                }
            });
        } else if (typeof field === 'number') {
            // All static data must be converted to bytes as well
            byteProviders.push(Uint8Array.from([field]));
        } else {
            errors.push({ ...ERRORS.FIELD_ERROR, field });
        }
    });

    if (errors.length) {
        throw errors;
    }

    class SignatureGenerator implements ISignatureGenerator {

        // Array of Uint8Array and promises which return Uint8Array
        private readonly _dataHolders: Array<Uint8Array | Promise<Uint8Array>>;
        // Request data provided by user
        private readonly _rawData: any;

        private _errors = [];

        constructor(hashMap: any = {}) {

            // Save all needed values from user data
            this._rawData = Object.keys(storedFields).reduce((store: any, key: any) => {
                store[key] = hashMap[key];
                return store;
            }, {});

            this._dataHolders = byteProviders.map((provider) => {
                if (typeof provider === 'function') {
                    // Execute function so that they return promises containing Uint8Array data
                    try {
                        return provider(this._rawData);
                    } catch (e) {
                        // @ts-ignore
                        this._errors.push(e);
                    }
                } else {
                    // Or just pass Uint8Array data
                    return provider;
                }
            });

            if (this._errors.length) {
                throw this._errors;
            }
        }

        public getSignature(privateKey: string): Promise<string> {
            return this.getBytes().then((dataBytes) => {
                return crypto.buildTransactionSignature(dataBytes, privateKey);
            });
        }

        // Get byte representation of the transaction
        public getBytes(): Promise<Uint8Array> {
            return Promise.all(this._dataHolders).then((multipleDataBytes: Uint8Array[]) => {
                if (multipleDataBytes.length === 1) {
                    return multipleDataBytes[0];
                } else {
                    return concatUint8Arrays(...multipleDataBytes);
                }
            });
        }

        public getDebugBytes(): Promise<Array<{ bytes: Uint8Array, from: any, value: any }>> {
            return Promise.all(fields.map((field: any, i) => {
                const value = field && field.name ? this._rawData[field.name] : null;
                const result = this._dataHolders[i];
                if (result instanceof Promise) {
                    return result.then(bytes => {
                        return { bytes, from: field && field.name || field, value };
                    });
                } else {
                    return Promise.resolve({ bytes: result, from: field, value });
                }
            }));
        }

        // Get bytes of an exact field from user data
        public getExactBytes(fieldName: string): Promise<Uint8Array> {

            if (!(fieldName in storedFields)) {
                throw new Error(`There is no field '${fieldName}' in 'RequestDataType class`);
            }

            const byteProcessor = storedFields[fieldName];
            const userData = this._rawData[fieldName];
            return byteProcessor.process(userData);
        }

    }

    return SignatureGenerator;
}

export const TX_NUMBER_MAP: TTX_NUMBER_MAP = Object.create(null);
export const TX_TYPE_MAP: TTX_TYPE_MAP = Object.create(null);

export const TRANSFER = generate<ITRANSFER_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.TRANSFER,
    new Base58('senderPublicKey'),
    new Int('timestamp', 8),
    new Int('amount', 8),
    new Int('fee', 8),
    new Recipient('recipient'),
    new Attachment('attachment')
]);

export const TRANSFER_V2 = generate<ITRANSFER_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.TRANSFER,
    2,
    new Base58('senderPublicKey'),
    new Int('timestamp', 8),
    new Int('amount', 8),
    new Int('fee', 8),
    new Recipient('recipient'),
    new Attachment('attachment')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.TRANSFER] = TRANSFER_V2;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.TRANSFER] = TRANSFER_V2;

export const LEASE = generate<ILEASE_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.LEASE,
    new Base58('senderPublicKey'),
    new Recipient('recipient'),
    new Int('amount', 8),
    new Int('fee', 8),
    new Int('timestamp', 8)
]);

export const LEASE_V2 = generate<ILEASE_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.LEASE,
    2,
    new Base58('senderPublicKey'),
    new Recipient('recipient'),
    new Int('amount', 8),
    new Int('fee', 8),
    new Int('timestamp', 8),
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.LEASE] = LEASE_V2;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.LEASE] = LEASE_V2;

export const CANCEL_LEASING = generate<ICANCEL_LEASING_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.CANCEL_LEASING,
    new Base58('senderPublicKey'),
    new Int('fee', 8),
    new Int('timestamp', 8),
    new Base58('transactionId')
]);

export const CANCEL_LEASING_V2 = generate<ICANCEL_LEASING_PROPS_V2>([
    constants.TRANSACTION_TYPE_NUMBER.CANCEL_LEASING,
    2,
    new Int('chainId', 1),
    new Base58('senderPublicKey'),
    new Int('fee', 8),
    new Int('timestamp', 8),
    new Base58('transactionId')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.CANCEL_LEASING] = CANCEL_LEASING_V2;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.CANCEL_LEASING] = CANCEL_LEASING_V2;

export const MASS_TRANSFER = generate<IMASS_TRANSFER_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.MASS_TRANSFER,
    constants.TRANSACTION_TYPE_VERSION.MASS_TRANSFER,
    new Base58('senderPublicKey'),
    new Transfers('transfers'),
    new Int('timestamp', 8),
    new Int('fee', 8),
    new Attachment('attachment')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.MASS_TRANSFER] = MASS_TRANSFER;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.MASS_TRANSFER] = MASS_TRANSFER;

export const DATA = generate<IDATA_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.DATA,
    constants.TRANSACTION_TYPE_VERSION.DATA,
    new Base58('senderPublicKey'),
    new DataEntries('data'),
    new Int('timestamp', 8),
    new Int('fee', 8)
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.DATA] = DATA;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.DATA] = DATA;

export const SET_SCRIPT = generate<ISET_SCRIPT_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.SET_SCRIPT,
    constants.TRANSACTION_TYPE_VERSION.SET_SCRIPT,
    new Int('chainId', 1),
    new Base58('senderPublicKey'),
    new ScriptVersion('script'),
    new Base64('script'),
    new Int('fee', 8),
    new Int('timestamp', 8)
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.SET_SCRIPT] = SET_SCRIPT;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.SET_SCRIPT] = SET_SCRIPT;

export const ANCHOR = generate<IANCHOR_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.ANCHOR,
    constants.TRANSACTION_TYPE_VERSION.ANCHOR,
    new Base58('senderPublicKey'),
    new AnchorEntries('anchors'),
    new Int('timestamp', 8),
    new Int('fee', 8),
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.ANCHOR] = ANCHOR;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.ANCHOR] = ANCHOR;

export const BYTES_GENERATORS_MAP: Record<TRANSACTION_TYPE_NUMBER, Record<number, ISignatureGeneratorConstructor<any>>> = {
    [TRANSACTION_TYPE_NUMBER.TRANSFER]: {
        1: TRANSFER,
        2: TRANSFER_V2
    },
    [TRANSACTION_TYPE_NUMBER.LEASE]: {
        1: LEASE,
        2: LEASE_V2
    },
    [TRANSACTION_TYPE_NUMBER.CANCEL_LEASING]: {
        1: CANCEL_LEASING,
        2: CANCEL_LEASING_V2
    },
    [TRANSACTION_TYPE_NUMBER.MASS_TRANSFER]: {
        1: MASS_TRANSFER
    },
    [TRANSACTION_TYPE_NUMBER.DATA]: {
        1: DATA
    },
    [TRANSACTION_TYPE_NUMBER.SET_SCRIPT]: {
        1: SET_SCRIPT
    },
    [TRANSACTION_TYPE_NUMBER.ANCHOR]: {
        1: ANCHOR
    },
} as any;
