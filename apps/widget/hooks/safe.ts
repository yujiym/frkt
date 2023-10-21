import Safe, { EthersAdapter, getSafeContract } from '@safe-global/protocol-kit'
import { GelatoRelayPack } from '@safe-global/relay-kit'
import {
  MetaTransactionData,
  MetaTransactionOptions,
  OperationType,
  RelayTransaction,
} from '@safe-global/safe-core-sdk-types'
import { ethers } from 'ethers'
import signContractAbi from '~/utils/abis/SignContract.json'
import { BASE_RPC_URL, SIGN_CONTRACT_ADDRESS } from '~/utils/constants'
import { getEnv } from '~/utils/get-env'

// create Contract instance
const contract = new ethers.utils.Interface(signContractAbi)

/**
 * create tx data method
 */
const createTx = async (
  safeSdk: Safe,
  appId: string,
  recipeId: string,
  signId: any,
  signature: string
) => {
  // create addSignature function enocode data
  const data = contract.encodeFunctionData('addSignature', [
    appId,
    recipeId,
    signId,
    signature,
  ])

  // create tx data
  const safeTransactionData: MetaTransactionData = {
    to: SIGN_CONTRACT_ADDRESS,
    data: data,
    value: ethers.utils.parseUnits('0', 'ether').toString(),
    operation: OperationType.Call,
  }

  // create Tx & sign Tx
  const safeTransaction = await safeSdk.createTransaction({
    safeTransactionData,
  })
  const signedSafeTx = await safeSdk.signTransaction(safeTransaction)

  return signedSafeTx
}

/**
 * call addSigNaturemethod
 */
export const addSigNature = async (
  appId: any,
  recipeId: any,
  signId: any,
  chainId: number,
  safeAddress: any,
  signature: string
) => {
  // get ethAdapter & safeSdk Object
  const { SAFE_SIGNER_KEY, GELATO_RELAY_API_KEY } = await getEnv()

  const provider = new ethers.providers.JsonRpcProvider(BASE_RPC_URL)
  const wallet = new ethers.Wallet(SAFE_SIGNER_KEY, provider)

  const ethAdapter = new EthersAdapter({
    ethers: ethers,
    signerOrProvider: wallet || provider,
  })

  const safeSdk = await Safe.create({
    ethAdapter: ethAdapter,
    safeAddress: safeAddress,
  })

  // create tx data
  const signedSafeTx = await createTx(
    safeSdk,
    appId,
    recipeId,
    signId,
    signature
  )
  // create GelatoRelayPack instance
  const relayKit = new GelatoRelayPack(GELATO_RELAY_API_KEY)

  // get safe Contract instance
  const safeSingletonContract = await getSafeContract({
    ethAdapter,
    safeVersion: await safeSdk.getContractVersion(),
  })

  // encode transaction data
  const encodedTx = safeSingletonContract.encode('execTransaction', [
    signedSafeTx.data.to,
    signedSafeTx.data.value,
    signedSafeTx.data.data,
    signedSafeTx.data.operation,
    signedSafeTx.data.safeTxGas,
    signedSafeTx.data.baseGas,
    signedSafeTx.data.gasPrice,
    signedSafeTx.data.gasToken,
    signedSafeTx.data.refundReceiver,
    signedSafeTx.encodedSignatures(),
  ])

  const options: MetaTransactionOptions = {
    gasLimit: '100000',
    isSponsored: true,
  }

  // lelayを介したトランザクション実行用のデータを生成
  const relayTransaction: RelayTransaction = {
    target: safeAddress,
    encodedTransaction: encodedTx,
    chainId: chainId,
    options,
  }

  // execute Transaction
  const response = await relayKit.relayTransaction(relayTransaction)

  return response
}
