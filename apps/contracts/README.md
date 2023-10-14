# FRKT Contract

## Factory's info

| No  | Name                     | address                                                                                                                               | chain    |
| :-- | :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :------- |
| 1   | SourceMinterFactory      | [0x439E29e9da0f1169D68E0868d7DADA6b45d89e22](https://testnet.snowtrace.io/address/0x439E29e9da0f1169D68E0868d7DADA6b45d89e22)         | Fuji     |
| 2   | NftFactory               | [0xDA31aCa5eAE57FcA36ED109e71B8E407B348aB08](https://goerli-optimism.etherscan.io/address/0xda31aca5eae57fca36ed109e71b8e407b348ab08) | OpGoerli |
| 3   | DestinationMinterFactory | [0x1144D788C4D9E4Ff5b0d175dE29Db46A4200CbA4](https://goerli-optimism.etherscan.io/address/0x1144D788C4D9E4Ff5b0d175dE29Db46A4200CbA4) | OpGoerli |
| 4   | NftFactory               | [0x20D8A7B1ee489d15aE37C26eB26Ec880ec8B62D6](https://mumbai.polygonscan.com/address/0x20D8A7B1ee489d15aE37C26eB26Ec880ec8B62D6)       | Mumbai   |
| 5   | DestinationMinterFactory | [0xC64A2Cb45071A626231CEd45C8DDDfa2a4BA1481](https://mumbai.polygonscan.com/address/0xC64A2Cb45071A626231CEd45C8DDDfa2a4BA1481)       | Mumbai   |
| 6   |                          |                                                                                                                                       |          |

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
  | NFT             | [0xb2F115B172274EB111508317F2435d024Ef64b00](https://goerli-optimism.etherscan.io/address/0xb2F115B172274EB111508317F2435d024Ef64b00) | Op Goerli |
  | Receiver        | [0x7e7086A423a63AacAB1733A9c836Ab2fAC64A1c8](https://goerli-optimism.etherscan.io/address/0x7e7086A423a63AacAB1733A9c836Ab2fAC64A1c8) | OpGoerli  |
  | sender          | [0x10C2B0276F761074B946B23527890BcF32B8356C](https://testnet.snowtrace.io/address/0x10C2B0276F761074B946B23527890BcF32B8356C)         | Fuji      |
  | Link Token      | [0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846](https://testnet.snowtrace.io/address/0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846)         | Fuji      |
  | Fuji Router     | [0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8](https://testnet.snowtrace.io/address/0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8)         | Fuji      |
  | OpGoerli Router | [0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26](https://goerli-optimism.etherscan.io/address/0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26) | OpGoerli  |
  | Chain Selector  | 14767482510784806043                                                                                                                  | fuji      |
  | Chain Selector  | 2664363617261496610                                                                                                                   | Op Goerli |

- B pattern  
  avalanche fuji ⇨ mumbai

  | Name           | Address                                                                                                                         | Chain  |
  | :------------- | :------------------------------------------------------------------------------------------------------------------------------ | :----- |
  | NFT            | []()                                                                                                                            |        |
  | Receiver       | []()                                                                                                                            |        |
  | sender         | []()                                                                                                                            | Fuji   |
  | Link Token     | [0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846](https://testnet.snowtrace.io/address/0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846)   | Fuji   |
  | Fuji Router    | [0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8](https://testnet.snowtrace.io/address/0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8)   | Fuji   |
  | Mumbai Router  | [0x70499c328e1E2a3c41108bd3730F6670a44595D1](https://mumbai.polygonscan.com/address/0x70499c328e1E2a3c41108bd3730F6670a44595D1) | Mumbai |
  | Chain Selector | 12532609583862916517                                                                                                            | mumbai |

## how to run (cross-chain-nft)

- deploy all factory

  - nft factory

    ```bash
    pnpm run deploy:nft:factory:opGoerli
    pnpm run deploy:nft:factory:mumbai
    ```

  - des factory

    ```bash
    pnpm run deploy:des:minter:factory:opGoerli
    pnpm run deploy:des:minter:factory:mumbai
    ```

  - source factory

    ```bash
    pnpm run deploy:source:minter:factory:fuji
    ```

- deploy NFT & DestinationMinter & SourceMinter contract

  ```bash
  pnpm run deploy:receiverSide:opGoerli
  ```

  result

  ```bash
  ======================= receiver side deploy start =========================
  NFT deployed to 0xb2F115B172274EB111508317F2435d024Ef64b00
  ======================== receiver side deploy end  ========================
  DestinationMinter deployed to 0x7e7086A423a63AacAB1733A9c836Ab2fAC64A1c8
  ```

  ```bash
  pnpm run deploy:senderSide:fuji
  ```

  result

  ```bash
  ======================= sender side deploy start =========================
  SourceMinter deployed to 0x10C2B0276F761074B946B23527890BcF32B8356C
  ======================== sender side deploy end  ========================
  ```
