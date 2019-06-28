import {
    TRANSFER,
    LEASE_V2,
    CANCEL_LEASING_V2,
    MASS_TRANSFER,
    DATA,
    SET_SCRIPT,
    ANCHOR,
    MAINNET_BYTE,
    TRANSACTION_TYPE_NUMBER,
    TRANSACTION_TYPE_VERSION,
    TX_NUMBER_MAP, parseDataTx, TRANSFER_V2, parseAnchorTx,
} from '../../src';
import TRANSACTIONS_DATA from './transactionsData';
import BigNumber from '../../src/libs/bignumber';
import {
    parseLeaseTx,
    parseTransferTx,
    parseCancelLeaseTx,
    parseMassTransferTx,
    parseSetScriptTx,
    parseTransactionBytes
} from '../../src/parse';


describe('parse', () => {

    it('transfer', done => {

        const data = {
            type: TRANSACTION_TYPE_NUMBER.TRANSFER,
            version: 1,
            senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
            timestamp: new BigNumber(1538663245955),
            amount: new BigNumber('1000000'),
            fee: new BigNumber('100000'),
            recipient: '3PCAB4sHXgvtu5NPoen6EXR5yaNbvsEA8Fj',
            attachment: 'some text'
        };

        // @ts-ignore
        new TRANSFER(data).getBytes().then(bytes => {
            expect(parseTransferTx(bytes)).toEqual(data);
            done();
        }).catch(done);
    });

    it('transfer v2 extra', done => {

        // const data = {
        //     type: TRANSACTION_TYPE_NUMBER.TRANSFER,
        //     version: 2,
        //     senderPublicKey: '9c4PB1eQMAz5PYcE7D5o3NQESCZaQ1ieMj2SLTfYxrnY',
        //     timestamp: new BigNumber(1),
        //     amount: new BigNumber('1'),
        //     fee: new BigNumber('1'),
        //     recipient: '3JfLsayRvWbJhZMuP6bmG447DqtHgGWnkuH',
        //     attachment: ''
        // };

        const data = {
            type: TRANSACTION_TYPE_NUMBER.TRANSFER,
            version: 2,
            senderPublicKey: '9c4PB1eQMAz5PYcE7D5o3NQESCZaQ1ieMj2SLTfYxrnY',
            timestamp: new BigNumber(1526641218066),
            amount: new BigNumber('100000000'),
            fee: new BigNumber('100000000'),
            recipient: '3JfLsayRvWbJhZMuP6bmG447DqtHgGWnkuH',
            attachment: 'falafel'
        };

        // @ts-ignore
        new TRANSFER_V2(data).getBytes().then(bytes => {
            expect(parseTransferTx(bytes)).toEqual(data);
            done();
        }).catch(done);
    });

    it('transfer v2', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.TRANSFER];

        new TRANSFER_V2(data).getBytes().then(bytes => {
            expect(parseTransferTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('lease', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.LEASE];

        new LEASE_V2(data).getBytes().then(bytes => {
            // console.log(bytes);
            expect(parseLeaseTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('cancel leasing', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.CANCEL_LEASING];

        new CANCEL_LEASING_V2(data).getBytes().then(bytes => {
            expect(parseCancelLeaseTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('mass transfer', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.MASS_TRANSFER];

        new MASS_TRANSFER(data).getBytes().then(bytes => {
            expect(parseMassTransferTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('data', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.DATA];

        new DATA(data).getBytes().then(bytes => {
            expect(parseDataTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('set script "true"', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.SET_SCRIPT];

        new SET_SCRIPT(data).getBytes().then(bytes => {
            expect(parseSetScriptTx(bytes)).toEqual(data);
            done();
        }).catch(done);
    });

    it('set empty script', done => {

        const data = {
            type: TRANSACTION_TYPE_NUMBER.SET_SCRIPT,
            version: TRANSACTION_TYPE_VERSION.SET_SCRIPT,
            chainId: MAINNET_BYTE,
            senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
            script: 'base64:',
            fee: new BigNumber('100000'),
            timestamp: new BigNumber(1538663245955)
        };

        new SET_SCRIPT(data).getBytes().then(bytes => {
            expect(parseSetScriptTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('anchor', done => {

        const data = {
            type: TRANSACTION_TYPE_NUMBER.ANCHOR,
            version: TRANSACTION_TYPE_VERSION.ANCHOR,
            senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
            fee: new BigNumber('100000'),
            timestamp: new BigNumber(1538663245955),
            anchors: [
                'Bjj4AWTNrjQVHqgWbP2XaxXz4DYH1WZMyERHxsad7b2w'
            ]
        };

        new ANCHOR(data).getBytes().then(bytes => {
            expect(parseAnchorTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    Object.keys(TRANSACTIONS_DATA).forEach(stringType => {
        const type = Number(stringType);
        //@ts-ignore
        const data = TRANSACTIONS_DATA[stringType];

        it(`check parseTransactionBytes with transaction type ${type}`, done => {
            //@ts-ignore
            const Generator = TX_NUMBER_MAP[type];

            //@ts-ignore
            new Generator(data).getBytes().then(bytes => {
                expect(parseTransactionBytes(bytes)).toEqual(data);
                done();
            }).catch(done);

        });
    });

    it('check parseTransactionBytes with wrong transaction type', () => {
        expect(() => parseTransactionBytes(Uint8Array.from([100, 1]))).toThrow('Type 100 is not supported!');
    });
});
