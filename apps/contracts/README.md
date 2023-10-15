# FRKT Contract

## Factory's info

| No  | Name                     | address                                                                                                                               | chain    |
| :-- | :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :------- |
| 1   | SourceMinterFactory      | [0xbF2e8A35484f23491F262fcc9151fab7400Abd9E](https://testnet.snowtrace.io/address/0xbF2e8A35484f23491F262fcc9151fab7400Abd9E)         | Fuji     |
| 2   | NftFactory               | [0x938ad601e455ac29bECA9264deb8056C55780990](https://goerli-optimism.etherscan.io/address/0x938ad601e455ac29bECA9264deb8056C55780990) | OpGoerli |
| 3   | DestinationMinterFactory | [0xE10E1a369e38BC25b14EA7FB9083e3911FD15eAf](https://goerli-optimism.etherscan.io/address/0xE10E1a369e38BC25b14EA7FB9083e3911FD15eAf) | OpGoerli |
| 4   | NftFactory               | [0xFaF39d3f292Da9c064fB8414dC549dA7A9c6e266](https://mumbai.polygonscan.com/address/0xFaF39d3f292Da9c064fB8414dC549dA7A9c6e266)       | Mumbai   |
| 5   | DestinationMinterFactory | [0xCd915EF6f984cd448349C375fDE90581f8FE260f](https://mumbai.polygonscan.com/address/0xCd915EF6f984cd448349C375fDE90581f8FE260f)       | Mumbai   |
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
  | NFT             | [](https://goerli-optimism.etherscan.io/address/)                                                                                     | Op Goerli |
  | Receiver        | [](https://goerli-optimism.etherscan.io/address/)                                                                                     | OpGoerli  |
  | sender          | [](https://testnet.snowtrace.io/address/)                                                                                             | Fuji      |
  | Link Token      | [0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846](https://testnet.snowtrace.io/address/0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846)         | Fuji      |
  | Fuji Router     | [0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8](https://testnet.snowtrace.io/address/0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8)         | Fuji      |
  | OpGoerli Router | [0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26](https://goerli-optimism.etherscan.io/address/0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26) | OpGoerli  |
  | Chain Selector  | 14767482510784806043                                                                                                                  | fuji      |
  | Chain Selector  | 2664363617261496610                                                                                                                   | Op Goerli |

- B pattern  
  avalanche fuji ⇨ mumbai

  | Name           | Address                                                                                                                         | Chain  |
  | :------------- | :------------------------------------------------------------------------------------------------------------------------------ | :----- |
  | NFT            | [0x2bE3ea3f1a3D5D668367F28Be3072573FfAc70F4](https://mumbai.polygonscan.com/address/0x2bE3ea3f1a3D5D668367F28Be3072573FfAc70F4) | mumbai |
  | Receiver       | [0x9bE9aC69125c5dEcd0BD14AC15A1872431aF7e15](https://mumbai.polygonscan.com/address/0x9bE9aC69125c5dEcd0BD14AC15A1872431aF7e15) | mumbai |
  | sender         | [0xbF2e8A35484f23491F262fcc9151fab7400Abd9E](https://testnet.snowtrace.io/address/0xbF2e8A35484f23491F262fcc9151fab7400Abd9E)   | Fuji   |
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

  send link toekn

  ```bash
  pnpm run task:sendLinkToken:fuji
  ```

  result

  ```bash
  ======================= send link token start =========================
  ℹ️  Attempting to send 5 of 0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846 tokens from 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 to 0x10C2B0276F761074B946B23527890BcF32B8356C
  ======================== send link token end  ========================
  ```

  CCIP Transaction  
  [CCIP Explorer 0x10C2B0276F761074B946B23527890BcF32B8356C](https://ccip.chain.link/address/0x10C2B0276F761074B946B23527890BcF32B8356C)
