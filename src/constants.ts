export const enum TRANSACTION_TYPE_NUMBER {
    TRANSFER = 4,
    LEASE = 8,
    CANCEL_LEASING = 9,
    MASS_TRANSFER = 11,
    DATA = 12,
    SET_SCRIPT = 13,
    ANCHOR = 15,
}

export const enum TRANSACTION_TYPE {
    TRANSFER = 'transfer',
    LEASE = 'lease',
    CANCEL_LEASING = 'cancelLeasing',
    MASS_TRANSFER = 'massTransfer',
    DATA = 'data',
    SET_SCRIPT = 'setScript',
    ANCHOR = 'anchor',
}

export const enum TRANSACTION_TYPE_VERSION {
    TRANSFER = 2,
    LEASE = 2,
    CANCEL_LEASING = 2,
    MASS_TRANSFER = 1,
    DATA = 1,
    SET_SCRIPT = 1,
    ANCHOR = 1,
}

export const enum DATA_TRANSACTION_FIELD_TYPES {
    INTEGER,
    BOOLEAN,
    BINARY,
    STRING
}

export const WAVES_BLOCKCHAIN_ID = '';

export const MAINNET_BYTE: number = 'L'.charCodeAt(0);
export const TESTNET_BYTE: number = 'T'.charCodeAt(0);

export const ADDRESS_VERSION: number = 1;
export const ALIAS_VERSION: number = 2;

export const SET_SCRIPT_LANG_VERSION: number = 1;

export const TRANSFER_ATTACHMENT_BYTE_LIMIT: number = 140;
export const DATA_TX_SIZE_WITHOUT_ENTRIES = 52;
export const DATA_ENTRIES_BYTE_LIMIT: number = 140 * 1024 - DATA_TX_SIZE_WITHOUT_ENTRIES; // 140 kb for the whole tx

export const INITIAL_NONCE: number = 0;
export const PRIVATE_KEY_LENGTH: number = 64;
export const PUBLIC_KEY_LENGTH: number = 32;

// That is to mark ByteProcessor instances which cannot be affected by user
export const STUB_NAME = 'reservedName';

export const HDPATH = `m/44'/353'/0'/0'/`;
