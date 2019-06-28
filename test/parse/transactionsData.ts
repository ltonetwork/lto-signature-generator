import { MAINNET_BYTE, TRANSACTION_TYPE_NUMBER, TRANSACTION_TYPE_VERSION } from '../../src';
import BigNumber from '../../src/libs/bignumber';


export default {
    [TRANSACTION_TYPE_NUMBER.TRANSFER ]: {
        type: TRANSACTION_TYPE_NUMBER.TRANSFER,
        version: TRANSACTION_TYPE_VERSION.TRANSFER,
        senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
        timestamp: new BigNumber(1538663245955),
        amount: new BigNumber('1000000'),
        fee: new BigNumber('100000'),
        recipient: '3PCAB4sHXgvtu5NPoen6EXR5yaNbvsEA8Fj',
        attachment: 'some text'
    },
    [TRANSACTION_TYPE_NUMBER.LEASE]: {
        type: TRANSACTION_TYPE_NUMBER.LEASE,
        version: TRANSACTION_TYPE_VERSION.LEASE,
        senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
        recipient: '3PCAB4sHXgvtu5NPoen6EXR5yaNbvsEA8Fj',
        amount: new BigNumber('1000000'),
        fee: new BigNumber('100000'),
        timestamp: new BigNumber(1538663245955)
    },
    [TRANSACTION_TYPE_NUMBER.CANCEL_LEASING]: {
        type: TRANSACTION_TYPE_NUMBER.CANCEL_LEASING,
        version: TRANSACTION_TYPE_VERSION.CANCEL_LEASING,
        chainId: MAINNET_BYTE,
        senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
        fee: new BigNumber('100000'),
        timestamp: new BigNumber(1538663245955),
        transactionId: '5KgcMoMVTVfUAKVsXcL34TEaKTbdwNuVq92aJv8Ydrx5'
    },
    [TRANSACTION_TYPE_NUMBER.MASS_TRANSFER]: {
        type: TRANSACTION_TYPE_NUMBER.MASS_TRANSFER,
        version: TRANSACTION_TYPE_VERSION.MASS_TRANSFER,
        senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
        transfers: [
            {
                recipient: '3PCAB4sHXgvtu5NPoen6EXR5yaNbvsEA8Fj',
                amount: new BigNumber('100000')
            },
            {
                recipient: '3PCAB4sHXgvtu5NPoen6EXR5yaNbvsEA8Fx',
                amount: new BigNumber('200000')
            }
        ],
        timestamp: new BigNumber(1538663245955),
        fee: new BigNumber('100000'),
        attachment: 'Some attachment'
    },
    [TRANSACTION_TYPE_NUMBER.DATA]: {
        type: 12,
        version: 1,
        senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
        data: [
            { key: 'int', type: 'integer', value: new BigNumber(24) },
            { key: 'bool', type: 'boolean', value: true },
            { key: 'blob', type: 'binary', value: 'base64:AQa3b8tH' },
            { key: 'string', type: 'string', value: 'Some string with length' },
            { key: 'lessInt', type: 'integer', value: new BigNumber(-1) },
            { key: 'lessInt2', type: 'integer', value: new BigNumber(-2) },
            { key: 'lessInt3', type: 'integer', value: new BigNumber(-10) },
        ],
        fee: new BigNumber('100000'),
        timestamp: new BigNumber(1538663245955)
    },
    [TRANSACTION_TYPE_NUMBER.SET_SCRIPT]: {
        type: TRANSACTION_TYPE_NUMBER.SET_SCRIPT,
        version: TRANSACTION_TYPE_VERSION.SET_SCRIPT,
        chainId: MAINNET_BYTE,
        senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
        script: 'base64:AQa3b8tH',
        fee: new BigNumber('100000'),
        timestamp: new BigNumber(1538663245955)
    },
    [TRANSACTION_TYPE_NUMBER.ANCHOR]: {
        type: TRANSACTION_TYPE_NUMBER.ANCHOR,
        version: TRANSACTION_TYPE_VERSION.ANCHOR,
        senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
        fee: new BigNumber('100000'),
        timestamp: new BigNumber(1538663245955),
        anchors: [
            'Bjj4AWTNrjQVHqgWbP2XaxXz4DYH1WZMyERHxsad7b2w'
        ]
    },
};
