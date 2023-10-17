import { BiconomySmartAccountV2, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import { Bundler, IBundler } from '@biconomy/bundler';
import { DEFAULT_ECDSA_OWNERSHIP_MODULE, ECDSAOwnershipValidationModule } from "@biconomy/modules";
import {
  BiconomyPaymaster,
  IPaymaster,
} from '@biconomy/paymaster';
import { Signer } from "ethers";

import { getPayFeesIn } from "@/utils/PayFees";
import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto
} from '@biconomy/paymaster';
import { ethers } from "ethers";
import 'react-toastify/dist/ReactToastify.css';
import { abi as sourceMinterAbi } from "../utils/SourceMinter.json";
import abi from "../utils/abi.json";
import { MUMBAI_CHAIN_SELECTOR, SOURCE_MINTER_ADDRESS } from "./../utils/constants";

const nftAddress = "0x0a7755bDfb86109D9D403005741b415765EAf1Bc"


/**
 * Biconomy用のクラスファイルです。
 */
export class Biconomy { 

  private chainId: number = 0;
  private bundler: IBundler | null = null;
  private paymaster: IPaymaster | null = null;

  /**
   * クラスインスタンスを新しく生成するためのメソッド
   * @param selectedChainId 
   * @returns 
   */
  create(selectedChainId: number) {
    const biconomyService = new Biconomy();
    biconomyService.init(selectedChainId);

    return biconomyService;
  }

  /**
   * 初期化メソッド
   */
  init = (selectedChainId: number) => {
    // chainIDをセット
    this.chainId = selectedChainId;
    // バンドラーやpaymasterの情報をセット
    this.bundler = new Bundler({
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${this.chainId.toString()}/${process.env.NEXT_PUBLIC_BICONOMY_BUNDLER_KEY!}`,    
      chainId: selectedChainId,
      entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    })
    
    this.paymaster = new BiconomyPaymaster({
      paymasterUrl: `https://paymaster.biconomy.io/api/v1/${this.chainId.toString()}/${process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_KEY!}` 
    })
  }

  /**
   * createSmartWallet method
   * @param signer 
   */
  createSmartWallet = async(signer: Signer) => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = await ECDSAOwnershipValidationModule.create({
      signer: signer, 
      moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE
    });

    let biconomySmartAccount = await BiconomySmartAccountV2.create({
      chainId: this.chainId,
      bundler: this.bundler!, 
      paymaster: this.paymaster!,
      entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      defaultValidationModule: module,
      activeValidationModule: module
    })

    const smartContractAddress = await biconomySmartAccount.getAccountAddress();

    return {
      smartContractAddress,
      biconomySmartAccount
    };
  }

  /**
   * mint NFT method
   * @param smartAccount 
   * @param address 
   * @param provider 
   * @param to 
   * @returns 
   */
  mintNft = async (
    smartAccount: BiconomySmartAccountV2, 
    address: string, 
    provider: any, 
    to: string
  ) => {
    // NFTコントラクトのインスタンスを生成
    const contract = new ethers.Contract(
      nftAddress,
      abi,
      provider,
    )

    try {
      const minTx = await contract.populateTransaction.safeMint(address);
      console.log(minTx.data);

      const tx1 = {
        to: to,
        data: minTx.data,
      };

      let userOp = await smartAccount.buildUserOp([tx1]);
      console.log({ userOp })
      
      const biconomyPaymaster = smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
      
      let paymasterServiceData: SponsorUserOperationDto = {
        mode: PaymasterMode.SPONSORED,
        smartAccountInfo: {
          name: 'BICONOMY',
          version: '2.0.0'
        },
        calculateGasLimits: true
      };

      const paymasterAndDataResponse =
        await biconomyPaymaster.getPaymasterAndData(
          userOp,
          paymasterServiceData
        );

      userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;

      if (
        paymasterAndDataResponse.callGasLimit &&
        paymasterAndDataResponse.verificationGasLimit &&
        paymasterAndDataResponse.preVerificationGas
      ) {
        userOp.callGasLimit = paymasterAndDataResponse.callGasLimit;
        userOp.verificationGasLimit =
        paymasterAndDataResponse.verificationGasLimit;
        userOp.preVerificationGas =
        paymasterAndDataResponse.preVerificationGas;
      }
        
      const userOpResponse = await smartAccount.sendUserOp(userOp);
      console.log("userOpHash", userOpResponse);
      
      const { receipt } = await userOpResponse.wait(1);
      console.log("txHash", receipt.transactionHash);

      return receipt.transactionHash;
    } catch (err: any) {
      console.error("err", err);
      console.log("err:", err)
      return;
    }
  } 

  /**
   * cross chain NFT Mint
   */
  crossMintNft = async (
    smartAccount: BiconomySmartAccountV2, 
    provider: any, 
    to: string
  ) => {
    // sourceMinter コントラクトのインスタンスを生成
    const contract = new ethers.Contract(
      SOURCE_MINTER_ADDRESS,
      sourceMinterAbi,
      provider,
    )

    try {
      // get fee
      const fee = getPayFeesIn("LINK");
      // create data
      // const minTx = await contract.interface.encodeFunctionData("mint", [OPGOERLI_CHAIN_SELECTOR, SOURCE_MINTER_ADDRESS, fee]);
      const minTx = await contract.interface.encodeFunctionData("mint", [MUMBAI_CHAIN_SELECTOR, SOURCE_MINTER_ADDRESS, fee]);
      console.log(minTx);

      const tx1 = {
        to: SOURCE_MINTER_ADDRESS,
        data: minTx,
      };

      let userOp = await smartAccount.buildUserOp([tx1]);
      console.log({ userOp })
      
      const biconomyPaymaster = smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
      
      let paymasterServiceData: SponsorUserOperationDto = {
        mode: PaymasterMode.SPONSORED,
        smartAccountInfo: {
          name: 'BICONOMY',
          version: '2.0.0'
        },
        calculateGasLimits: true
      };

      const paymasterAndDataResponse =
        await biconomyPaymaster.getPaymasterAndData(
          userOp,
          paymasterServiceData
        );

      userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;

      if (
        paymasterAndDataResponse.callGasLimit &&
        paymasterAndDataResponse.verificationGasLimit &&
        paymasterAndDataResponse.preVerificationGas
      ) {
        userOp.callGasLimit = paymasterAndDataResponse.callGasLimit;
        userOp.verificationGasLimit =
        paymasterAndDataResponse.verificationGasLimit;
        userOp.preVerificationGas =
        paymasterAndDataResponse.preVerificationGas;
      }
        
      const userOpResponse = await smartAccount.sendUserOp(userOp);
      console.log("userOpHash", userOpResponse);
      
      const { receipt } = await userOpResponse.wait(1);
      console.log("txHash", receipt.transactionHash);
      console.log(`CCIP Explorer Link:  https://ccip.chain.link/msg/${receipt.transactionHash}`)
     
      return receipt.transactionHash;
    } catch (err: any) {
      console.error("err", err);
      console.log("err:", err)
      return;
    }
  }
}

