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

const MAINNET_BIP39 = {
    PHRASE: 'boil hip drill joke ability ghost match dizzy opera interest damage cute critic happy eye',
    ADDRESS: '3Jz587QDwfhqqJvdjf7M2d1uDCnokpXGjep',
    ADDRESS_1: '3JhBEBqa51MsqdKpnCX6GZRQzqUQJzWSaZH',
    PUBLIC_KEY: '7hMjsBkoPuT9QGHquKsuYKfyLQmjNA7zp8KfQNMCv4R',
    PRIVATE_KEY: '52a1KY3aSgAKk6gJFgX6VR84xesihqr5gVMEJRxo1fHq8MkoQUtyrvT78qpxvh7QrjTzvfUYpyANCHoMGScTd7ds'
};

const TESTNET_BIP39 = {
    PHRASE: 'boil hip drill joke ability ghost match dizzy opera interest damage cute critic happy eye',
    ADDRESS: '3NCmwzGcFM9YqrPkRrU1aW25WEpsJRDvyp4',
    ADDRESS_1: '3Mut44hxNgoarAnwUPskpSRbHsWTrhmozsY',
    PUBLIC_KEY: '7hMjsBkoPuT9QGHquKsuYKfyLQmjNA7zp8KfQNMCv4R',
    PRIVATE_KEY: '52a1KY3aSgAKk6gJFgX6VR84xesihqr5gVMEJRxo1fHq8MkoQUtyrvT78qpxvh7QrjTzvfUYpyANCHoMGScTd7ds'
};

describe('Seed tests', () => {
    let configure: typeof TESTNET | typeof MAINNET;

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

describe('Seed tests bip39', () => {
    let configure: typeof TESTNET_BIP39 | typeof MAINNET_BIP39;

    [MAINNET_BYTE, TESTNET_BYTE].forEach((byte) => {

        describe(`Network byte is ${byte}`, () => {

            beforeEach(() => {
                configure = byte === MAINNET_BYTE ? MAINNET_BIP39 : TESTNET_BIP39;
                config.set({ networkByte: byte });
            });

            it('get address from phrase', () => {
                const seed = Seed.fromExistingPhrase(configure.PHRASE, true, 0);
                expect(seed.address).toBe(configure.ADDRESS);
            });

            it('get address from phrase index 1', () => {
                const seed = Seed.fromExistingPhrase(configure.PHRASE, true, 1);
                expect(seed.address).toBe(configure.ADDRESS_1);
            });

            it('get public key from phrase', () => {
                const seed = Seed.fromExistingPhrase(configure.PHRASE, true, 0);
                expect(seed.keyPair.publicKey).toBe(configure.PUBLIC_KEY);
            });

            it('get private key from phrase', () => {
                const seed = Seed.fromExistingPhrase(configure.PHRASE, true, 0);
                expect(seed.keyPair.privateKey).toBe(configure.PRIVATE_KEY);
            });
        });
    });
});

describe('Seed tests extra', () => {
    it('get address from phrase', () => {

        config.set({ networkByte: MAINNET_BYTE });

        const phrase = 'water process satisfy repeat flag avoid town badge sketch surge split between cabin sugar ill special axis adjust pull useful craft peace flee physical';
        const seed1 = Seed.fromExistingPhrase(phrase, true, 0);
        expect(seed1.address).toBe('3JvLhJfCbXNEdZKkxBscerYkePdCbPAM9o1');

        const seed2 = Seed.fromExistingPhrase(phrase, true, 1);
        expect(seed2.address).toBe('3JtjeoLeWTLm7WB1j8BFTRTWWGf1iGPBpx7');

        const phrase2 = 'shoot island position soft burden budget tooth cruel issue economy destroy above';
        const seed3 = Seed.fromExistingPhrase(phrase2, true, 0);
        expect(seed3.address).toBe('3JtGtoCv2ms7bvWr9KRsQt9RHXaN5fWsdQz');
    });
});
