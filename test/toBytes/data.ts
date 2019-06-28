import {
    IANCHOR_PROPS,
    ICANCEL_LEASING_PROPS,
    ICANCEL_LEASING_PROPS_V2,
    IDATA_PROPS,
    ILEASE_PROPS,
    IMASS_TRANSFER_PROPS,
    ISET_SCRIPT_PROPS,
    ITRANSFER_PROPS,
    MAINNET_BYTE,
    TRANSACTION_TYPE_NUMBER
} from '../../src';
import BigNumber from '../../src/libs/bignumber';

export type T_TRANSACTION_PROPS = ITRANSFER_PROPS |
    ILEASE_PROPS |
    ICANCEL_LEASING_PROPS |
    IMASS_TRANSFER_PROPS |
    IDATA_PROPS |
    ISET_SCRIPT_PROPS |
    IANCHOR_PROPS

export const TEST_TRANSACTIONS_DATA: Array<{ data: T_TRANSACTION_PROPS; type: TRANSACTION_TYPE_NUMBER, bytes: Uint8Array }> = [
    {
        data: {
            senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
            fee: new BigNumber(100000),
            timestamp: new BigNumber(1547555878561),
            version: 1,
            recipient: '3PAs2qSeUAfgqSKS8LpZPKGYEjJKcud9Djr',
            amount: new BigNumber(200000),
            attachment: 'Kq9Fxqv1fSnyf2kZkdn',
        },
        type: TRANSACTION_TYPE_NUMBER.TRANSFER,
        bytes: Uint8Array.from( [4, 1, 19, 252, 132, 31, 108, 218, 109, 24, 75, 198, 202, 86, 159, 217, 210, 255,
            88, 88, 90, 106, 253, 69, 144, 38, 209, 216, 59, 162, 141, 206, 251, 97, 0, 0, 1, 104, 81, 132, 182, 161, 0,
            0, 0, 0, 0, 3, 13, 64, 0, 0, 0, 0, 0, 1, 134, 160, 1, 87, 97, 254, 60, 70, 209, 13, 112, 117, 56, 38, 78,
            107, 37, 199, 141, 222, 157, 134, 75, 180, 68, 110, 124, 37, 0, 19, 75, 113, 57, 70, 120, 113, 118, 49, 102,
            83, 110, 121, 102, 50, 107, 90, 107, 100, 110
        ])
    },
    {
        data: {
            senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
            fee: new BigNumber(100000),
            timestamp: new BigNumber(1547555878561),
            version: 2,
            recipient: '3PAs2qSeUAfgqSKS8LpZPKGYEjJKcud9Djr',
            amount: new BigNumber(200000),
            attachment: 'Kq9Fxqv1fSnyf2kZkdn',
        },
        type: TRANSACTION_TYPE_NUMBER.TRANSFER,
        bytes: Uint8Array.from([4, 2, 19, 252, 132, 31, 108, 218, 109, 24, 75, 198, 202, 86, 159, 217, 210, 255,
            88, 88, 90, 106, 253, 69, 144, 38, 209, 216, 59, 162, 141, 206, 251, 97, 0, 0, 1, 104, 81, 132, 182, 161, 0,
            0, 0, 0, 0, 3, 13, 64, 0, 0, 0, 0, 0, 1, 134, 160, 1, 87, 97, 254, 60, 70, 209, 13, 112, 117, 56, 38, 78,
            107, 37, 199, 141, 222, 157, 134, 75, 180, 68, 110, 124, 37, 0, 19, 75, 113, 57, 70, 120, 113, 118, 49, 102,
            83, 110, 121, 102, 50, 107, 90, 107, 100, 110
        ])
    },
    {
        data: {
            senderPublicKey: 'b8AB1PQWE7kH55cS48uDTV5fezrAyDTCf7iePyXNzNm',
            fee: new BigNumber(100000),
            timestamp: 1528813353617,
            version: 1,
            amount: new BigNumber(500000000),
            recipient: '3P2HNUd5VUPLMQkJmctTPEeeHumiPN2GkTb'
        } as ILEASE_PROPS,
        type: TRANSACTION_TYPE_NUMBER.LEASE,
        bytes: Uint8Array.from([8, 8, 189, 215, 92, 61, 104, 71, 120, 249, 69, 188, 133, 166, 0, 155, 193, 24,
            183, 22, 111, 111, 236, 205, 82, 243, 237, 62, 223, 115, 163, 189, 26, 1, 87, 3, 223, 123, 99, 217, 4, 50,
            24, 208, 205, 153, 142, 44, 81, 36, 110, 29, 209, 96, 55, 94, 242, 250, 154, 0, 0, 0, 0, 29, 205, 101, 0, 0,
            0, 0, 0, 0, 1, 134, 160, 0, 0, 1, 99, 244, 96, 122, 145
        ])
    },
    {
        data: {
            senderPublicKey: '27C8ksVhVFUXyngF1F8TfyCGLmkDMsm2QuTv4VvhBpJU',
            fee: new BigNumber(100000),
            timestamp: 1543922401531,
            version: 2,
            amount: new BigNumber(50000000000),
            recipient: '3PEDGbdcSYAorLoV4oDVSJPTezGUPFrZj8f'
        } as ILEASE_PROPS,
        type: TRANSACTION_TYPE_NUMBER.LEASE,
        bytes: Uint8Array.from([8, 2, 16, 113, 194, 191, 58, 129, 20, 158, 230, 197, 166, 98, 76, 99, 66, 135,
            118, 233, 165, 158, 26, 117, 23, 246, 57, 123, 217, 249, 243, 168, 55, 65, 1, 87, 134, 186, 107, 125, 95,
            44, 61, 52, 136, 233, 54, 73, 184, 20, 79, 160, 152, 16, 141, 174, 109, 125, 95, 116, 0, 0, 0, 11, 164, 59,
            116, 0, 0, 0, 0, 0, 0, 1, 134, 160, 0, 0, 1, 103, 120, 242, 64, 251
        ])
    },
    {
        data: {
            senderPublicKey: 'DFYiAU7CJ3Vm3n2eofLVzfxuSBxjVTuR3bsdJqvyY7s',
            fee: new BigNumber(100000),
            timestamp: 1528764508254,
            version: 1,
            transactionId: 'CwbYAN5635JFsjg9P7rHRuYTRGsX7UuLuhGqnCocWCYF'
        } as ICANCEL_LEASING_PROPS_V2,
        type: TRANSACTION_TYPE_NUMBER.CANCEL_LEASING,
        bytes: Uint8Array.from([9, 3, 35, 106, 240, 202, 147, 105, 122, 61, 98, 171, 49, 118, 68, 182, 155,
            147, 144, 135, 161, 239, 93, 247, 161, 52, 199, 28, 243, 144, 237, 230, 58, 0, 0, 0, 0, 0, 1, 134, 160, 0,
            0, 1, 99, 241, 119, 40, 94, 177, 108, 248, 166, 139, 12, 240, 236, 11, 55, 207, 45, 118, 135, 41, 201, 178, 242,
            215, 251, 167, 0, 90, 114, 127, 219, 19, 208, 178, 227, 93, 88])
    },
    {
        data: {
            senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
            fee: new BigNumber(100000),
            timestamp: 1548157067513,
            chainId: MAINNET_BYTE,
            version: 2,
            transactionId: '2BB8bfVgxcUh3qNCEZ2QYEPcZFgvU5JmSoR12VG7phMV'
        } as ICANCEL_LEASING_PROPS_V2,
        type: TRANSACTION_TYPE_NUMBER.CANCEL_LEASING,
        bytes: Uint8Array.from([9, 2, 76, 19, 252, 132, 31, 108, 218, 109, 24, 75, 198, 202, 86, 159, 217,
            210, 255, 88, 88, 90, 106, 253, 69, 144, 38, 209, 216, 59, 162, 141, 206, 251, 97, 0, 0, 0, 0, 0, 1, 134,
            160, 0, 0, 1, 104, 117, 90, 32, 249, 17, 118, 243, 62, 62, 38, 190, 102, 93, 75, 137, 211, 247, 119, 157, 211, 0,
            212, 101, 28, 127, 102, 179, 132, 224, 70, 59, 1, 187, 250, 187, 220])
    },
    {
        data: {
            senderPublicKey: '5wFd85gKDAXuTzxiyMzfA8FQ5zhgm8fsw7XoDWVUAnT6',
            fee: new BigNumber(200000),
            timestamp: 1548666204769,
            version: 1,
            attachment: '',
            transfers: [
                {
                    recipient: '3PCAB4sHXgvtu5NPoen6EXR5yaNbvsEA8Fx',
                    amount: new BigNumber(10)
                },
                {
                    recipient: '3PCAB4sHXgvtu5NPoen6EXR5yaNbvsEA8Fj',
                    amount: new BigNumber(100)
                }
            ]
        } as IMASS_TRANSFER_PROPS,
        type: TRANSACTION_TYPE_NUMBER.MASS_TRANSFER,
        bytes: Uint8Array.from([11, 1, 73, 84, 165, 59, 174, 39, 29, 193, 150, 36, 88, 139, 63, 37, 181, 32,
            207, 191, 163, 21, 107, 57, 155, 195, 19, 233, 78, 164, 146, 238, 180, 21, 0, 2, 1, 87, 112, 52, 77, 202,
            82, 5, 242, 179, 33, 107, 38, 35, 166, 247, 171, 246, 158, 243, 92, 74, 190, 19, 109, 23, 0, 0, 0, 0, 0, 0,
            0, 10, 1, 87, 112, 52, 77, 202, 82, 5, 242, 179, 33, 107, 38, 35, 166, 247, 171, 246, 158, 243, 92, 74, 190,
            19, 109, 10, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 1, 104, 147, 178, 242, 97, 0, 0, 0, 0, 0, 3, 13, 64, 0, 0
        ])
    },
    {
        data: {
            senderPublicKey: 'G9rStAuSaNjMi9KZNVfHymhCUeaWLFqAy88VtTAJre3q',
            fee: new BigNumber(100000),
            timestamp: 1523101012149,
            version: 1,
            data: [
                {
                    key: 'bool',
                    type: 'boolean',
                    value: true
                }
            ],
        } as IDATA_PROPS,
        type: TRANSACTION_TYPE_NUMBER.DATA,
        bytes: Uint8Array.from([12, 1, 225, 35, 220, 2, 179, 125, 144, 119, 17, 183, 146, 243, 98, 211,
            44, 63, 144, 99, 118, 90, 175, 179, 3, 196, 213, 255, 119, 247, 33, 192, 193, 48, 0, 1, 0, 4, 98, 111, 111,
            108, 1, 1, 0, 0, 1, 98, 159, 229, 16, 181, 0, 0, 0, 0, 0, 1, 134, 160])
    },
    {
        data: {
            senderPublicKey: '3LZmDK7vuSBsDmFLxJ4qihZynUz8JF9e88dNu5fsus5p',
            fee: new BigNumber(2082496),
            chainId: MAINNET_BYTE,
            timestamp: 1537973512182,
            version: 1,
            script: 'base64:AQQAAAAEaW5hbAIAAAAESW5hbAQAAAAFZWxlbmECAAAAB0xlbnVza2EEAAAABGxvdmUCAAAAC0luYWxMZW51c2thCQAAAAAAAAIJAAEsAAAAAgUAAAAEaW5hbAUAAAAFZWxlbmEFAAAABGxvdmV4ZFt5',
            data: [
                {
                    key: 'bool',
                    type: 'boolean',
                    value: true
                }
            ],
        } as ISET_SCRIPT_PROPS,
        type: TRANSACTION_TYPE_NUMBER.SET_SCRIPT,
        bytes: Uint8Array.from([13, 1, 76, 34, 186, 116, 34, 172, 44, 197, 73, 214, 113, 5, 102, 225, 116,
            239, 194, 226, 141, 33, 84, 123, 133, 156, 120, 24, 208, 196, 25, 42, 49, 161, 31, 1, 0, 114, 1, 4, 0, 0,
            0, 4, 105, 110, 97, 108, 2, 0, 0, 0, 4, 73, 110, 97, 108, 4, 0, 0, 0, 5, 101, 108, 101, 110, 97, 2, 0, 0,
            0, 7, 76, 101, 110, 117, 115, 107, 97, 4, 0, 0, 0, 4, 108, 111, 118, 101, 2, 0, 0, 0, 11, 73, 110, 97, 108,
            76, 101, 110, 117, 115, 107, 97, 9, 0, 0, 0, 0, 0, 0, 2, 9, 0, 1, 44, 0, 0, 0, 2, 5, 0, 0, 0, 4, 105, 110,
            97, 108, 5, 0, 0, 0, 5, 101, 108, 101, 110, 97, 5, 0, 0, 0, 4, 108, 111, 118, 101, 120, 100, 91, 121, 0, 0,
            0, 0, 0, 31, 198, 192, 0, 0, 1, 102, 22, 93, 103, 246])
    },
    {
        data: {
            senderPublicKey: '3LZmDK7vuSBsDmFLxJ4qihZynUz8JF9e88dNu5fsus5p',
            fee: new BigNumber(2082496),
            timestamp: 1537973512182,
            version: 1,
            anchors: [
                'Bjj4AWTNrjQVHqgWbP2XaxXz4DYH1WZMyERHxsad7b2w'
            ],
        } as IANCHOR_PROPS,
        type: TRANSACTION_TYPE_NUMBER.ANCHOR,
        bytes: Uint8Array.from([15, 1, 34, 186, 116, 34, 172, 44, 197, 73, 214, 113, 5, 102, 225, 116, 239,
            194, 226, 141, 33, 84, 123, 133, 156, 120, 24, 208, 196, 25, 42, 49, 161, 31, 0, 1, 0, 32, 159, 134, 208,
            129, 136, 76, 125, 101, 154, 47, 234, 160, 197, 90, 208, 21, 163, 191, 79, 27, 43, 11, 130, 44, 209, 93,
            108, 21, 176, 240, 10, 8, 0, 0, 1, 102, 22, 93, 103, 246, 0, 0, 0, 0, 0, 31, 198, 192
        ])
    }
];
