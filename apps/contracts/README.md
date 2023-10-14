# FRKT Contract

## Factory's info

| No  | Name                     | address | chain    |
| :-- | :----------------------- | :------ | :------- |
| 1   | SourceMinterFactory      |         | Fuji     |
| 2   | NftFactory               |         | OpGoerli |
| 3   | DestinationMinterFactory |         | OpGoerli |
| 4   | NftFactory               |         | Mumbai   |
| 5   | DestinationMinterFactory |         | Mumbai   |
| 6   |                          |         |          |

## How to run

- install

  ```bash
  pnpm istall
  ```

- deploy to polygon mumbai

  ```bash
  pnpm run deploy:mumbai
  ```

- delpy to optimism Goerli

  ```bash
  pnpm run deploy:opGoerli
  ```

- deploy to Scroll Alpha

  ```bash
  pnpm run deploy:scrollAlpha
  ```

- deploy to ploygon zkevm

  ```bash
  pnpm run deploy:polygonZkevm
  ```

- deploy to baseGoerli

  ```bash
  pnpm run deploy:baseGoerli
  ```

## NFT'S metadataInfo

[metedata is here](https://ipfs.io/ipfs/bafkreia34hl3lhr2z6n577miz3ibhb2sximvmv2gufxgrslu4q3jj2zkri)

## CCIP info

- todo (sender chain)

  1. deploy sender CCIP Contract
  2. run script

- toto (receiver chain)

  1. deploy NFT contract
  2. deploy receiver contract
  3. run script

- required Info

  1. receiver's router contract address
  2. sender's router contract address
  3. nft contract address
  4. sender's LINK token address

- A pattern  
  avalanche fuji ⇨ Op goerli

  | Name            | Address                                                                                                                               | Chain     |
  | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :-------- |
  | NFT             | []()                                                                                                                                  | Op Goerli |
  | Receiver        | []()                                                                                                                                  | OpGoerli  |
  | sender          | []()                                                                                                                                  | Fuji      |
  | Link Token      | [0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846](https://testnet.snowtrace.io/address/0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846)         | Fuji      |
  | Fuji Router     | [0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8](https://testnet.snowtrace.io/address/0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8)         | Fuji      |
  | OpGoerli Router | [0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26](https://goerli-optimism.etherscan.io/address/0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26) | OpGoerli  |
  | Chain Selector  | 14767482510784806043                                                                                                                  | fuji      |
  | Chain Selector  | 2664363617261496610                                                                                                                   | Op Goerli |

- B pattern  
  avalanche fuji ⇨ Op goerli

  | Name           | Address                                                                                                                         | Chain  |
  | :------------- | :------------------------------------------------------------------------------------------------------------------------------ | :----- |
  | NFT            | []()                                                                                                                            |        |
  | Receiver       | []()                                                                                                                            |        |
  | sender         | []()                                                                                                                            | Fuji   |
  | Link Token     | [0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846](https://testnet.snowtrace.io/address/0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846)   | Fuji   |
  | Fuji Router    | [0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8](https://testnet.snowtrace.io/address/0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8)   | Fuji   |
  | Mumbai Router  | [0x70499c328e1E2a3c41108bd3730F6670a44595D1](https://mumbai.polygonscan.com/address/0x70499c328e1E2a3c41108bd3730F6670a44595D1) | Mumbai |
  | Chain Selector | 12532609583862916517                                                                                                            | mumbai |
