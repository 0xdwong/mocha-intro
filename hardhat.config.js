require("@nomiclabs/hardhat-waffle");
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ 'path': path.join(path.resolve(__dirname, '.'), '.env') });


const mnemonic = process.env.MNEMONIC;
const providerUrl = process.env.PROVIDER_URL;


module.exports = {
    solidity: {
        compilers: [{
            version: "0.8.4",
        }]
    },
    defaultNetwork: 'hardhat',
    settings: {
        optimizer: {
            enabled: true,
            runs: 200
        },
    },
    networks: {
        hardhat: {
            chainId: 31337,
            accounts: {
                count: 10,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
                accountsBalance: '10000000000000000000000', // (10000 ETH)
            },
        },
        localhost: {
            url: "http://127.0.0.1:8545",
            chainId: 31337,
            accounts: {
                count: 10,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
                accountsBalance: '10000000000000000000000', // (10000 ETH)
            },
        },
        main: {
            url: providerUrl,
            accounts: {
                count: 1,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
            },
            chainId: 1,
        },
        goerli: {
            url: providerUrl,
            accounts: {
                count: 1,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
            },
            chainId: 5,
        },
    }
};