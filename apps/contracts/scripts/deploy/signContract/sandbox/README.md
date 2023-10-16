# SignContract Sandbox Info

[sample PDF](https://bafybeifw2wc4m3k6sfwbegldppbimyme6pkhs6scifqmlpkwy4numw43wm.ipfs.dweb.link/SIMPLE_CONTRACT_AGREEMENT.pdf)

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
