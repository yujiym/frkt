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

## How to run (Sample)

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
  | NFT            | [0x0b02f4e617b2c9ee58ae33b403075fa96be0b07a](https://mumbai.polygonscan.com/address/0x0b02f4e617b2c9ee58ae33b403075fa96be0b07a) | mumbai |
  | Receiver       | [0x1d0841b8eDf79cAa822Cf7a834d47f096cA5E27a](https://mumbai.polygonscan.com/address/0x1d0841b8eDf79cAa822Cf7a834d47f096cA5E27a) | mumbai |
  | sender         | [0x7de91d76b13440A69C54375c337828C6c64dc268](https://testnet.snowtrace.io/address/0x7de91d76b13440A69C54375c337828C6c64dc268)   | Fuji   |
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

## SignContract Sandbox Info

[sample PDF](https://bafybeibawd4uszujdype4emondxzksmbsxputel6tip5ocgr3plv746z3e.ipfs.dweb.link/SIMPLE%20CONTRACT%20AGREEMENT.pdf)

### deployed Contract Info

- Mumbai network

  [0xc48810543c1299deA42E9f03A921d727dcED9714](https://mumbai.polygonscan.com/address/0xc48810543c1299deA42E9f03A921d727dcED9714#code)

  - deploy

    ```bash
    pnpm run sandbox:deploy:signContract:mumbai
    ```

    result

    ```bash
    ======================= start =========================
    signContracty deployed to 0xc48810543c1299deA42E9f03A921d727dcED9714
    ======================== end  ========================
    ```

  - verify

    ```bash
    pnpm run sandbox:verify:signContract:mumbai
    ```

    result

    ```bash
    Successfully submitted source code for contract
    contracts/signContract/SignContract.sol:SignContract at 0xc48810543c1299deA42E9f03A921d727dcED9714
    for verification on the block explorer. Waiting for verification result...

    Successfully verified contract SignContract on the block explorer.
    https://mumbai.polygonscan.com/address/0xc48810543c1299deA42E9f03A921d727dcED9714#code
    ```

- ScrollAlpha Network

  [0x8DF7e6234f76e8fAC829feF83E7520635359094C](https://sepolia-blockscout.scroll.io/address/0x8DF7e6234f76e8fAC829feF83E7520635359094C#code)

  - deploy

    ```bash
    pnpm run sandbox:deploy:signContract:scrollAlpha
    ```

    result

    ```bash
    ======================= start =========================
    signContracty deployed to 0x8DF7e6234f76e8fAC829feF83E7520635359094C
    ======================== end  ========================
    ```

  - verify

    ```bash
    pnpm run sandbox:verify:signContract:scrollAlpha
    ```

    result

    ```bash
    Successfully submitted source code for contract
    contracts/signContract/SignContract.sol:SignContract at 0x8DF7e6234f76e8fAC829feF83E7520635359094C
    for verification on the block explorer. Waiting for verification result...

    Successfully verified contract SignContract on the block explorer.
    https://sepolia-blockscout.scroll.io/address/0x8DF7e6234f76e8fAC829feF83E7520635359094C#code
    ```

- Base Goerli network

  [0x50f2f66Eb93E7B5864c192F197af76D4611Ae7b8](https://goerli.basescan.org/address/0x50f2f66Eb93E7B5864c192F197af76D4611Ae7b8#code)

  - deploy

    ```bash
    pnpm run sandbox:deploy:signContract:baseGoerli
    ```

    result

    ```bash
    ======================= start =========================
    signContracty deployed to 0x50f2f66Eb93E7B5864c192F197af76D4611Ae7b8
    ======================== end  ========================
    ```

  - verify

    ```bash
    pnpm run sandbox:verify:signContract:baseGoerli
    ```

    result

    ```bash
    Successfully submitted source code for contract
    contracts/signContract/SignContract.sol:SignContract at 0x50f2f66Eb93E7B5864c192F197af76D4611Ae7b8
    for verification on the block explorer. Waiting for verification result...

    Successfully verified contract SignContract on the block explorer.
    https://goerli.basescan.org/address/0x50f2f66Eb93E7B5864c192F197af76D4611Ae7b8#code
    ```

  - setUp Transaction  
    [0x9b14d8f29852096e1bd9525adf15d0db09d6aa34c96d987b71cf55e3bd136575](https://goerli.basescan.org/tx/0x9b14d8f29852096e1bd9525adf15d0db09d6aa34c96d987b71cf55e3bd136575)

## SubGraph

- Base Goerli

  [https://api.studio.thegraph.com/query/44992/frkt-signcontract/v0.0.01](https://api.studio.thegraph.com/query/44992/frkt-signcontract/v0.0.01)

  sample Query

  ```gql
  query MyQuery {
    signContractCreateds(
      orderBy: signId
      orderDirection: desc
      where: { signId: "1" }
    ) {
      appId
      name
      receipeId
      required
      safeAddress
      signId
      uri
      owners
    }
    changeApproveStatuses(
      orderBy: signId
      orderDirection: desc
      where: { signId: "1" }
    ) {
      appId
      receipeId
      signId
      approveStatus
    }
    signatureAddeds(
      orderBy: signId
      orderDirection: desc
      where: { signId: "1" }
    ) {
      appId
      receipeId
      signId
      signature
    }
  }
  ```

# Applied Prizes

- Safe
  Safe{Core} Account Abstraction SDK

  Our team developed the SignContract widget with the Safe{Core} Account Abstraction SDK built in.

  - protocol-kit  
    [code is here]()
  - relay-kit  
    [code is here]()  
    [Relay Transaction Task ID is 0x8d6ae383814cd4ca70aa72c042e9aaf6db517c6107258bb1c69dde2554bec659](https://relay.gelato.digital/tasks/status/0x8d6ae383814cd4ca70aa72c042e9aaf6db517c6107258bb1c69dde2554bec659)
  - safe-core-sdk-types  
    [code is here]()

- Lit Protocol  
  Programmatic Signing with the Lit JS SDK V3

  Our team developed authbypass, the most prominent feature of this product, using LitProtocol SDK V3.

  GoogleAuth and WebAuthn are supported so that users can implement their preferred authentication method.

  - claming key with Google Auth  
    [code is here]()

  - mint PKP with WebAuth  
    [code is here]()

- Filecoin

  - DWeb It
    The PDF file of the contract used in the SignContract Widget was uploaded to IPFS using Web3.storage.When creating the recipe, the file was uploaded, the IPFS link was set to the smart contract, and the information was stored in The Graph protocol.

    [Contract file data on IPFS](https://bafybeibawd4uszujdype4emondxzksmbsxputel6tip5ocgr3plv746z3e.ipfs.dweb.link/SIMPLE%20CONTRACT%20AGREEMENT.pdf)

    [code is here]()

- Polygon

  - $2,500 Best Public Good with Account Abstraction or Gasless transactions on Polygon

    Our team has developed a gasless cross-chain NFT that combines the capabilities of Biconomy and ChainLink CCIP to mint from the Avalanche testnet to the Polygon testnet.

    For UX optimization, we combined LitProtocol MPC and AA technologies to allow users to create wallets without being aware of the blockchain. All the user has to do is log in and press a button just like in existing apps.

    [Avalanche testnet's Sender Contract is here](https://testnet.snowtrace.io/address/0x10C2B0276F761074B946B23527890BcF32B8356C)

    [Polygon testnet's Reciver Contract is here](https://mumbai.polygonscan.com/address/0x1d0841b8eDf79cAa822Cf7a834d47f096cA5E27a)

    [【OpenSea】Minted NFT (on Polygon testnet)](https://testnets.opensea.io/ja/assets/mumbai/0x0b02f4e617b2c9ee58ae33b403075fa96be0b07a/0)

    [code of account abstraction implementation is here]()

- Scroll

  - Deploy on Scroll  
    Our team deployed SignContract on Scroll Alpha.

    [deployed Contract is here](https://sepolia-blockscout.scroll.io/address/0x8DF7e6234f76e8fAC829feF83E7520635359094C#code)

- The Graph

  - New Subgraph

    Our team deployed a new subgraph to index SignContract data deployed in Base Goerli. This subgraph makes it possible to centrally manage multiple contracts with a single contract.

    [Subgraph's API endpoint is here](https://api.studio.thegraph.com/query/44992/frkt-signcontract/v0.0.01)

    sample Query

    ```gql
    query MyQuery {
      signContractCreateds(
        orderBy: signId
        orderDirection: desc
        where: { signId: "1" }
      ) {
        appId
        name
        receipeId
        required
        safeAddress
        signId
        uri
        owners
      }
      changeApproveStatuses(
        orderBy: signId
        orderDirection: desc
        where: { signId: "1" }
      ) {
        appId
        receipeId
        signId
        approveStatus
      }
      signatureAddeds(
        orderBy: signId
        orderDirection: desc
        where: { signId: "1" }
      ) {
        appId
        receipeId
        signId
        signature
      }
    }
    ```

- Chainlink

  - use Chainlink CCIP

    Our team has developed a gasless cross-chain NFT that combines the capabilities of Biconomy and Litprotocol to mint from the Avalanche testnet to the Polygon testnet.

    [Avalanche testnet's Sender Contract is here](https://testnet.snowtrace.io/address/0x10C2B0276F761074B946B23527890BcF32B8356C)

    [Polygon testnet's Reciver Contract is here](https://mumbai.polygonscan.com/address/0x1d0841b8eDf79cAa822Cf7a834d47f096cA5E27a)

    [【OpenSea】Minted NFT (on Polygon testnet)](https://testnets.opensea.io/ja/assets/mumbai/0x0b02f4e617b2c9ee58ae33b403075fa96be0b07a/1)

    [CCIP Explorer's link](https://ccip.chain.link/address/0x10C2B0276F761074B946B23527890BcF32B8356C)
