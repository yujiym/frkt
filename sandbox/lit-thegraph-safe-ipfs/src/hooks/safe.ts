import Safe, {
    EthersAdapter,
    getSafeContract
} from '@safe-global/protocol-kit';
import { GelatoRelayPack } from '@safe-global/relay-kit';
import { MetaTransactionData, MetaTransactionOptions, OperationType, RelayTransaction } from '@safe-global/safe-core-sdk-types';
import { ethers } from 'ethers';
import signContractAbi from '../utils/SignContract.json';
import { RPC_URL, SIGN_CONTRACT_ADDRESS } from '../utils/constants';

type ResponseData = {
  safeSignerKey: string;
}

// create Contract instance
const contract = new ethers.utils.Interface(signContractAbi);

/**
 * create tx data method
 */
const createTx = async(
  safeSdk: Safe, 
  appId: string,
  receipeId: string,
  signId: number,
  signature: string,
) => {

  // create addSignature function enocode data
  const data = contract.encodeFunctionData("addSignature", [appId, receipeId, signId, signature])
  
  // create tx data
  const safeTransactionData: MetaTransactionData = {
    to: SIGN_CONTRACT_ADDRESS , 
    data: data,
    value: ethers.utils.parseUnits('0', 'ether').toString(),
    operation: OperationType.Call
  };

  // create Tx & sign Tx
  const safeTransaction = await safeSdk.createTransaction({ safeTransactionData });
  const signedSafeTx = await safeSdk.signTransaction(safeTransaction)

  return signedSafeTx;
}

/**
 * call addSigNaturemethod
 */
export const addSigNature = async(
  appId: string,
  receipeId: string,
  signId: number,
  chainId: number,
  safeAddress: any,
  signature: string,
) => {

  // get ethAdapter & safeSdk Object
  const res = await fetch('/api/create-safe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data: ResponseData = await res.json();

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const privateKey = data.safeSignerKey;
  const wallet = new ethers.Wallet(privateKey, provider);


  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: wallet
  })

  const safeSdk = await Safe.create({
    ethAdapter: ethAdapter,
    safeAddress: safeAddress
  })

  
  // create tx data
  const signedSafeTx = await createTx(safeSdk, appId, receipeId, signId, signature);
  // create GelatoRelayPack instance
  const relayKit = new GelatoRelayPack(process.env.NEXT_PUBLIC_GELATO_RELAY_API_KEY);

  // get safe Contract instance
  const safeSingletonContract = await getSafeContract({ 
    ethAdapter, 
    safeVersion: await safeSdk.getContractVersion() 
  })

  // トランザクションを実行するためのデータを絵コード
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
    signedSafeTx.encodedSignatures()
  ])
  
  const options: MetaTransactionOptions = {
    gasLimit: '100000',
    isSponsored: true
  }

  // lelayを介したトランザクション実行用のデータを生成
  const relayTransaction: RelayTransaction = {
    target: safeAddress,
    encodedTransaction: encodedTx,
    chainId: chainId,
    options
  };
  
  // トランザクションを実行
  const response = await relayKit.relayTransaction(relayTransaction);

  return response;
};