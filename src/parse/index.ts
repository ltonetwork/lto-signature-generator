import {
    parseConstructor,
    toScript,
    toAddressOrAlias,
    toBigNumber,
    toNumber,
    toBase58,
    toStringWithLength,
    toTransfers,
    getNumberFromBytes, toData, toAnchors
} from './parseByteConscructor';
import { TRANSACTION_TYPE_NUMBER } from '../constants';


export function parseTransactionBytes(bytes: Uint8Array) {
    const type = getNumberFromBytes(bytes, 1);

    switch (type) {
        case TRANSACTION_TYPE_NUMBER.TRANSFER:
            return parseTransferTx(bytes);
        case TRANSACTION_TYPE_NUMBER.LEASE:
            return parseLeaseTx(bytes);
        case TRANSACTION_TYPE_NUMBER.CANCEL_LEASING:
            return parseCancelLeaseTx(bytes);
        case TRANSACTION_TYPE_NUMBER.MASS_TRANSFER:
            return parseMassTransferTx(bytes);
        case TRANSACTION_TYPE_NUMBER.DATA:
            return parseDataTx(bytes);
        case TRANSACTION_TYPE_NUMBER.SET_SCRIPT:
            return parseSetScriptTx(bytes);
        case TRANSACTION_TYPE_NUMBER.ANCHOR:
            return parseAnchorTx(bytes);
        default:
            throw new Error(`Type ${type} is not supported!`);
    }
}

export function parseOrderBytes() {

}

export const parseTransferTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toBase58('senderPublicKey'),
    toBigNumber('timestamp'),
    toBigNumber('amount'),
    toBigNumber('fee'),
    toAddressOrAlias('recipient'), // TODO! Add attachment
    toStringWithLength('attachment') // TODO! Add attachment parser
]);

export const parseTestTransferTx = parseConstructor([
    toBase58('senderPublicKey'),
    toBigNumber('fee'),
    toBigNumber('timestamp'),
    toNumber('version'),
    toAddressOrAlias('recipient'), // TODO! Add attachment
    toBigNumber('amount'),
    toStringWithLength('attachment') // TODO! Add attachment parser
]);

export const parseLeaseTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toBase58('senderPublicKey'),
    toAddressOrAlias('recipient'),
    toBigNumber('amount'),
    toBigNumber('fee'),
    toBigNumber('timestamp')
]);

export const parseCancelLeaseTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toNumber('chainId'),
    toBase58('senderPublicKey'),
    toBigNumber('fee'),
    toBigNumber('timestamp'),
    toBase58('transactionId')
]);

export const parseMassTransferTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toBase58('senderPublicKey'),
    toTransfers('transfers'),
    toBigNumber('timestamp'),
    toBigNumber('fee'),
    toStringWithLength('attachment')
]);

export const parseDataTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toBase58('senderPublicKey'),
    toData('data'),
    toBigNumber('timestamp'),
    toBigNumber('fee')
]);

export const parseSetScriptTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toNumber('chainId'),
    toBase58('senderPublicKey'),
    toScript('script'),
    toBigNumber('fee'),
    toBigNumber('timestamp')
]);

export const parseAnchorTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toBase58('senderPublicKey'),
    toAnchors('anchors'),
    toBigNumber('timestamp'),
    toBigNumber('fee'),
]);
