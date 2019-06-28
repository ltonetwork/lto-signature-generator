import {
    TRANSFER_V2,
    TRANSACTION_TYPE_NUMBER,
    Seed,
} from '../../src';
import BigNumber from '../../src/libs/bignumber';
import { crypto } from '../../src/utils';

const configure = {
    PHRASE: 'boil hip drill joke ability ghost match dizzy opera interest damage cute critic happy eye',
    ADDRESS: '3JfLsayRvWbJhZMuP6bmG447DqtHgGWnkuH',
    PUBLIC_KEY: '9c4PB1eQMAz5PYcE7D5o3NQESCZaQ1ieMj2SLTfYxrnY',
    PRIVATE_KEY: 'CEWRQNKVw4TRLhqvcpYmq7p3SvYFZa5odgmUWTkRGXsqJufGKfp2d3uXKbUjrrTj1caETQhjszBGa8jLB8eivXe'
};

describe('sign', () => {

    it('transfer', async () => {

        const seed = Seed.fromExistingPhrase(configure.PHRASE);

        const data = {
            type: TRANSACTION_TYPE_NUMBER.TRANSFER,
            version: 2,
            senderPublicKey: seed.keyPair.publicKey,
            timestamp: new BigNumber(1559146613),
            amount: new BigNumber('100000000'),
            fee: new BigNumber('100000'),
            recipient: '3JfLsayRvWbJhZMuP6bmG447DqtHgGWnkuH',
            attachment: 'hello lto'
        };

        const transfer = new TRANSFER_V2(data);
        expect(crypto.buildTransactionSignature(await transfer.getBytes(), seed.keyPair.privateKey)).toBe('3YFeDvT9PJGNF7Q8K19Ma4Kca2nKb65Y6f7qUAMZP6jYwuysBxR17F7JsBfe3XabRZ7fjV8fPu1nhdavZ4FvqMbt');
    });

    it('transfer 2', async () => {

        const seed = Seed.fromExistingPhrase(configure.PHRASE);

        const data = {
            type: TRANSACTION_TYPE_NUMBER.TRANSFER,
            version: 2,
            senderPublicKey: seed.keyPair.publicKey,
            timestamp: new BigNumber(1526641218066),
            amount: new BigNumber('100000000'),
            fee: new BigNumber('100000000'),
            recipient: '3JfLsayRvWbJhZMuP6bmG447DqtHgGWnkuH',
            attachment: 'falafel'
        };

        const transfer = new TRANSFER_V2(data);
        expect(crypto.buildTransactionSignature(await transfer.getBytes(), seed.keyPair.privateKey)).toBe('41o3ZPiB1hy2jgMuAjCrdCFM6K5PYL6JkAv6UwSb1jnea7yeGNMyJJoK1BkzkoE29U9Z1JjKFvh5ZgPT4BtoTxBt');
    });
});
