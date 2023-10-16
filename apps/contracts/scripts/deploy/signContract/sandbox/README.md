# SignContract Sandbox Info

[sample PDF](https://bafybeifw2wc4m3k6sfwbegldppbimyme6pkhs6scifqmlpkwy4numw43wm.ipfs.dweb.link/SIMPLE_CONTRACT_AGREEMENT.pdf)

## sandbox Sign data

- appId  
  0002
- receipeIs  
  0002
- SignContractName  
  FrktSampleSignContract
- required  
  2
- initUri  
  https://bafybeifw2wc4m3k6sfwbegldppbimyme6pkhs6scifqmlpkwy4numw43wm.ipfs.dweb.link/SIMPLE_CONTRACT_AGREEMENT.pdf
- owners  
  0x1a29B04E144e0EC9ECA49851e65F589877a47268
  0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072
- safeAddress  
  0x0a2839ffacA8424b0532b2BC214F9Ea8B45268Fc

## deployed Contract Info

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
