import { MAINNET_BYTE, TESTNET_BYTE, Seed, config } from '../src';

const MAINNET = {
    PHRASE: 'boil hip drill joke ability ghost match dizzy opera interest damage cute critic happy eye',
    ADDRESS: '3JfLsayRvWbJhZMuP6bmG447DqtHgGWnkuH',
    PUBLIC_KEY: '9c4PB1eQMAz5PYcE7D5o3NQESCZaQ1ieMj2SLTfYxrnY',
    PRIVATE_KEY: 'CEWRQNKVw4TRLhqvcpYmq7p3SvYFZa5odgmUWTkRGXsqJufGKfp2d3uXKbUjrrTj1caETQhjszBGa8jLB8eivXe'
};

const TESTNET = {
    PHRASE: 'boil hip drill joke ability ghost match dizzy opera interest damage cute critic happy eye',
    ADDRESS: '3Mt3hTqpEC31i6q25HxRow4HWsvMDwcw6Nx',
    PUBLIC_KEY: '9c4PB1eQMAz5PYcE7D5o3NQESCZaQ1ieMj2SLTfYxrnY',
    PRIVATE_KEY: 'CEWRQNKVw4TRLhqvcpYmq7p3SvYFZa5odgmUWTkRGXsqJufGKfp2d3uXKbUjrrTj1caETQhjszBGa8jLB8eivXe'
};

let configure: typeof TESTNET | typeof MAINNET;

describe('Seed tests', () => {
    [MAINNET_BYTE, TESTNET_BYTE].forEach((byte) => {

        describe(`Network byte is ${byte}`, () => {

            beforeEach(() => {
                configure = byte === MAINNET_BYTE ? MAINNET : TESTNET;
                config.set({ networkByte: byte });
            });

            it('get address from phrase', () => {
                const seed = Seed.fromExistingPhrase(configure.PHRASE);
                expect(seed.address).toBe(configure.ADDRESS);
            });

            it('get public key from phrase', () => {
                const seed = Seed.fromExistingPhrase(configure.PHRASE);
                expect(seed.keyPair.publicKey).toBe(configure.PUBLIC_KEY);
            });

            it('get private key from phrase', () => {
                const seed = Seed.fromExistingPhrase(configure.PHRASE);
                expect(seed.keyPair.privateKey).toBe(configure.PRIVATE_KEY);
            });
        });

    });
});
