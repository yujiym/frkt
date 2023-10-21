![Test Image 3](/packages/common/assets/img/ogp-dark.png)

# FRKT

No-Code tools for Web2 & 3.<br />
FRKT(/furɪkt/) provides a frictionless UX for any app.<br />
<br />
This repo is build for [ETHOnline 2023](https://ethglobal.com/events/ethonline2023).

[Demo](https://frkt-demo.web.app/) is here.

## Project

### 🤔 Problem

When I was thinking about dApps ideas, I always ran into two onboarding UX issues. User's wallet and initial gas-fee.

### 💡 Solution

Based on Account Abstraction by Biconomy (we can also use other AA stack) and MPC by Lit protocol, we wrap protocols, smart contracts, and other APIs etc. And we made integrating them together as a toolkit. This toolkit provides Zapier or IFTTT like functionality with embedded widgets into any app.

### 🏓 Workflow

1. [App owner] Setup App, Select a recipe to use, Generate widget code in FRKT dashboard
1. [App owner] Install widget code into apps. (paste 1 javascript file & script tag)
1. [App users] When the application user opens the widget.
   1. Create a user's wallet (a. Google Oauth or b. webauthn).
   1. Execute function in a widget (gas-less tx by AA).

### Folder structure

```
├── apps
│   ├── dashboard      -> 🛠️ Dashboard frontend
│   ├── demo           -> ⚽ Demo app frontend
│   ├── frkt-subgraph  -> 📈 The Graph subgraph for widget
│   ├── widget         -> 👓 Widget
│   └── www            -> ✈️ Landing page (frkt.io)
├── packages
│   ├── contracts      -> 🎩 Smart contracts
│   └── common         -> Common libs
...
```

### 🎩 Contracts

Smart contracts for FRKT widget.

- Hardhat

### 🛠️ Dashboard

Dashborad for generationg widget code.

- Next.js (React, TypeScript)
- Tailwind CSS
- Hosted on Vercel
- Vercel Postgres

### ⚽ Demo

FRKT widget integration demo app.
-> [FRKT demos](https://frkt-demo.web.app/)

- Vite (React, TypeScript)
- Tailwind CSS, daisyUI
- Firebase Hosting, Firebase Auth(Google OAuth)

### 👓 Widget

Widget component for recipes.

- Next.js (React, TypeScript)
- Tailwind CSS
- Hosted on Vercel
- Vercel Postgres

### ✈️ Landing page

[FRKT LP](https://frkt.io/)

- Hono, Vite (React, TypeScript)
- Tailwind CSS
- Hosted on Cloudflare Pages

### Applied Prizes

- Safe
  Safe{Core} Account Abstraction SDK

  Our team developed the SignContract widget with the Safe{Core} Account Abstraction SDK built in.

  - protocol-kit  
    [code is here]()
  - relay-kit  
    [code is here]()

    Relay Transaction Task ID is [0x8d6ae383814cd4ca70aa72c042e9aaf6db517c6107258bb1c69dde2554bec659](https://relay.gelato.digital/tasks/status/0x8d6ae383814cd4ca70aa72c042e9aaf6db517c6107258bb1c69dde2554bec659)

  - safe-core-sdk-types  
    [code is here]()

- Lit Protocol  
  Programmatic Signing with the Lit JS SDK V3

  Our team developed authbypass, the most prominent feature of this product, using LitProtocol SDK V3.

  GoogleAuth and WebAuthn are supported so that users can implement their preferred authentication method.

  - claming key with Google Auth  
    [code is here]()

  - mint PKP with WebAuthn  
    [code is here]()

- Filecoin

  - DWeb It
    The PDF file of the contract used in the SignContract Widget was uploaded to IPFS using Web3.storage.When creating the recipe, the file was uploaded, the IPFS link was set to the smart contract, and the information was stored in The Graph protocol.

    [Contract file data on IPFS](https://bafybeibawd4uszujdype4emondxzksmbsxputel6tip5ocgr3plv746z3e.ipfs.dweb.link/SIMPLE%20CONTRACT%20AGREEMENT.pdf)

    [code is here](https://github.com/yujiym/frkt/blob/main/sandbox/web3storage-backend/index.ts)

- Polygon

  - Best Public Good with Account Abstraction or Gasless transactions on Polygon

    Our team has developed a gasless cross-chain NFT that combines the capabilities of Biconomy and ChainLink CCIP to mint from the Avalanche testnet to the Polygon testnet.

    For UX optimization, we combined LitProtocol MPC and AA technologies to allow users to create wallets without being aware of the blockchain. All the user has to do is log in and press a button just like in existing apps.

    [Avalanche testnet's Sender Contract is here](https://testnet.snowtrace.io/address/0x10C2B0276F761074B946B23527890BcF32B8356C)

    [Polygon testnet's Reciver Contract is here](https://mumbai.polygonscan.com/address/0x1d0841b8eDf79cAa822Cf7a834d47f096cA5E27a)

    [【OpenSea】Minted NFT (on Polygon testnet)](https://testnets.opensea.io/ja/assets/mumbai/0x0b02f4e617b2c9ee58ae33b403075fa96be0b07a/0)

    [code of account abstraction implementation is here](https://github.com/yujiym/frkt/blob/main/apps/widget/hooks/biconomy.ts#L85-L162)

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

    [solidity's code of CCIP Contract implementation is here(sender side)](https://github.com/yujiym/frkt/blob/main/packages/contracts/contracts/cross-chain-nft/SourceMinter.sol)

    [frontend's code of CCIP Contract implementation is here](https://github.com/yujiym/frkt/blob/main/apps/widget/hooks/biconomy.ts#L85-L162)
