import {
  BiconomySmartAccountV2,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from '@biconomy/account'
import { Bundler } from '@biconomy/bundler'
import {
  DEFAULT_ECDSA_OWNERSHIP_MODULE,
  ECDSAOwnershipValidationModule,
} from '@biconomy/modules'
import { BiconomyPaymaster } from '@biconomy/paymaster'
import { Signer } from 'ethers'

import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
} from '@biconomy/paymaster'
import { ethers } from 'ethers'
import { abi as sourceMinterAbi } from '../utils/abis/SourceMinter.json'
import { getPayFeesIn } from './../utils/PayFees'
import {
  MUMBAI_CHAIN_SELECTOR,
  MUMBAI_RECEIVER_ADDRESS,
  SOURCE_MINTER_ADDRESS,
} from './../utils/constants'

const getEnv = async () => {
  const res = await fetch('/api/env')
  const { env } = await res.json()
  return env
}

/**
 * createSmartWallet method
 * @param signer
 */
export const createSmartWallet = async (
  selectedChainId: number,
  signer: Signer
) => {
  // get env data
  const { BICONOMY_BUNDLER_KEY, BICONOMY_PAYMASTER_KEY } = await getEnv()
  // set chainId
  const chainId = selectedChainId

  // set bandler Info
  const bundler = new Bundler({
    bundlerUrl: `https://bundler.biconomy.io/api/v2/${chainId.toString()}/${BICONOMY_BUNDLER_KEY!}`,
    chainId: selectedChainId,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  })

  // set paymaster Info
  const paymaster = new BiconomyPaymaster({
    paymasterUrl: `https://paymaster.biconomy.io/api/v1/${chainId.toString()}/${BICONOMY_PAYMASTER_KEY!}`,
  })

  // eslint-disable-next-line @next/next/no-assign-module-variable
  const module = await ECDSAOwnershipValidationModule.create({
    signer: signer,
    moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
  })

  const biconomySmartAccount = await BiconomySmartAccountV2.create({
    chainId: chainId,
    bundler: bundler!,
    paymaster: paymaster!,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    defaultValidationModule: module,
    activeValidationModule: module,
  })

  const smartContractAddress = await biconomySmartAccount.getAccountAddress()

  return {
    smartContractAddress,
    biconomySmartAccount,
  }
}

/**
 * cross chain NFT Mint
 * @return ccipLink
 */
export const crossMintNft = async (
  smartAccount: BiconomySmartAccountV2,
  provider: any,
  to: string
) => {
  console.log('to', to)

  // sourceMinter contract
  const contract = new ethers.Contract(
    SOURCE_MINTER_ADDRESS,
    sourceMinterAbi,
    provider
  )

  try {
    // get fee
    const fee = getPayFeesIn('LINK')
    // create data
    const minTx = await contract.interface.encodeFunctionData('mint', [
      MUMBAI_CHAIN_SELECTOR,
      MUMBAI_RECEIVER_ADDRESS,
      to,
      fee,
    ])
    console.log('minTx:', minTx)

    const tx1 = {
      to: SOURCE_MINTER_ADDRESS,
      data: minTx,
    }

    const userOp = await smartAccount.buildUserOp([tx1])
    console.log({ userOp })

    const biconomyPaymaster =
      smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>

    const paymasterServiceData: SponsorUserOperationDto = {
      mode: PaymasterMode.SPONSORED,
      smartAccountInfo: {
        name: 'BICONOMY',
        version: '2.0.0',
      },
      calculateGasLimits: true,
    }

    const paymasterAndDataResponse =
      await biconomyPaymaster.getPaymasterAndData(userOp, paymasterServiceData)

    userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData

    if (
      paymasterAndDataResponse.callGasLimit &&
      paymasterAndDataResponse.verificationGasLimit &&
      paymasterAndDataResponse.preVerificationGas
    ) {
      userOp.callGasLimit = paymasterAndDataResponse.callGasLimit
      userOp.verificationGasLimit =
        paymasterAndDataResponse.verificationGasLimit
      userOp.preVerificationGas = paymasterAndDataResponse.preVerificationGas
    }

    const userOpResponse = await smartAccount.sendUserOp(userOp)
    console.log('userOpHash', userOpResponse)

    const { receipt } = await userOpResponse.wait(1)
    console.log('txHash', receipt)
    console.log(
      `CCIP Explorer Link:  https://ccip.chain.link/msg/${receipt.transactionHash}`
    )

    return receipt.transactionHash
  } catch (err: any) {
    console.error('err', err)
    console.log('err:', err)
    return
  }
}
