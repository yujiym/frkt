import '@nomicfoundation/hardhat-toolbox'
import 'dotenv/config'
import { HardhatUserConfig } from 'hardhat/config'

const {
  REPORT_GAS,
  PRIVATE_KEY,
  COINMARKETCAP_API_KEY,
  MUMBAI_API_URL,
  OPTIMISM_GOERLI_URL,
} = process.env

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  networks: {
    scrollAlpha: {
      url: 'https://sepolia-rpc.scroll.io/' || '',
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    mumbai: {
      url: MUMBAI_API_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    baseGoerli: {
      url: 'https://goerli.base.org',
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      gasPrice: 1000000000,
    },
    opGoerli: {
      url: OPTIMISM_GOERLI_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    polygonZkevm: {
      url: `https://rpc.public.zkevm-test.net`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    fuji: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      enabled: REPORT_GAS ? true : false,
      currency: 'JPY',
      gasPriceApi:
        'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice',
      coinmarketcap: COINMARKETCAP_API_KEY,
    },
  },
  etherscan: {
    apiKey: {
      scrollAlpha: 'abc',
    },
    customChains: [
      {
        network: 'scrollAlpha',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia-blockscout.scroll.io/api',
          browserURL: 'https://sepolia-blockscout.scroll.io/',
        },
      },
    ],
  },
}

export default config
