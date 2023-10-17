import SafeApiKit from '@safe-global/api-kit';
import Safe, {
  EthersAdapter,
  SafeAccountConfig,
  SafeFactory,
  getSafeContract
} from '@safe-global/protocol-kit';
import { GelatoRelayPack } from '@safe-global/relay-kit';
import { MetaTransactionData, MetaTransactionOptions, OperationType, RelayTransaction } from '@safe-global/safe-core-sdk-types';
import { ethers } from 'ethers';
import { NFT_ADDRESS, RPC_URL, TX_SERVICE_URL } from '../utils/constants';
import { abi } from './../../src/utils/MyNFT.json';

// base Goerli RPC
const rpc_url = RPC_URL;
const provider = new ethers.providers.JsonRpcProvider(rpc_url);

// コントラクト用のインスタンスを作成
const contract = new ethers.utils.Interface(abi);

/**
 * init ProtocolKit instance
 */
export const initProtocolKit = async() => {
  // Initialize signers
  // ここはWeb3authかlitで持ってくる。
  const owner1Signer = new ethers.Wallet(process.env.NEXT_PUBLIC_OWNER_1_PRIVATE_KEY!, provider);
  const pkpWalletAddress = "0x1a29B04E144e0EC9ECA49851e65F589877a47268" // pkp wallet address

  // SafeAccount作成のための設定
  const safeAccountConfig: SafeAccountConfig = {
    owners: [
      await owner1Signer.getAddress(),
      pkpWalletAddress
    ],
    threshold: 1,
  }

  // create EtherAdapter instance
  const ethAdapterOwner = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer
  });

  console.log("ethAdapterOwner:", ethAdapterOwner);

  const safeVersion = '1.3.0'

  // create factory instance
  const safeFactory = await SafeFactory.create({ 
    ethAdapter: ethAdapterOwner, 
    //safeVersion: safeVersion,
    //isL1SafeMasterCopy: false
  });

  const version = await safeFactory.getSafeVersion();
  console.log("version:", version);
  
  const chainId = await safeFactory.getChainId();
  console.log("chainId:", chainId);

  const safeFactoryAddr = safeFactory.getAddress();
  console.log("safeFactoryAddr:", safeFactoryAddr);

  const predictSafeAddress = await safeFactory.predictSafeAddress(safeAccountConfig);
  console.log("predictSafeAddress:", predictSafeAddress);

  // TODO 別のコントラクトで作成したsafeコントラクトアドレスとユーザーのアドレスを紐付けてチェックする機能が必要そう。
  const txServiceUrl = TX_SERVICE_URL;
  const safeService = new SafeApiKit({ 
    txServiceUrl, 
    ethAdapter: ethAdapterOwner
  });

  // 生成済みのsafeAccounts一覧を取得するメソッド
  const safes = await safeService.getSafesByOwner(pkpWalletAddress);
  console.log("safes:", safes.safes);

  var safeSdkOwner1;
  var safeAddress;

  // 一つも生成されていない場合には新規で作成それ以外の場合は作成ずみのSafeAccoutをアドレスとして詰める。
  if(safes.safes.length == 0) {
    // deploy safe account
    safeSdkOwner1 = await safeFactory.deploySafe({ 
      safeAccountConfig,
      options: {
        gasLimit: 5000000
      }
    });
    console.log("safeSdkOwner1:", safeSdkOwner1);

    // get safe address
    safeAddress = await safeSdkOwner1.getAddress();
    console.log("safeAddress:", safeAddress);
  } else {
    // すでにsafeのスマートコントラクトウォレットアドレスを取得していればそれでインスタンスを作成
    safeAddress = safes.safes[0]
  }

  // Safeのインスタンスを作成
  const safeSdk = await Safe.create({ 
    ethAdapter: ethAdapterOwner, 
    safeAddress: safeAddress!
  });

  console.log("safeSdk:", safeSdk);
  const balance = await provider.getBalance(safeAddress!);
  // get safe's balance
  console.log("Safe's balance:", parseInt(balance._hex.toString(), 16));
  console.log(`https://app.safe.global/gor:${safeAddress}`);

  return {
    ethAdapterOwner,
    safeAddress,
    safeSdk,
    senderAddress: owner1Signer
  };
};

/**
 * init SafeApiKit instance
 */
export const initSafeApiKit = async() => {
  const txServiceUrl = TX_SERVICE_URL;
  // create eth adapter instance
  const { 
    ethAdapterOwner: ethAdapter,
    safeAddress,
    safeSdk,
    senderAddress
  } = await initProtocolKit();

  const safeService = new SafeApiKit({ 
    txServiceUrl, 
    ethAdapter 
  });

  console.log("safeService:", safeService);

  const nonce = await safeService.getNextNonce(safeAddress!);
  console.log("safeAddress's nonce:", nonce);

  return {
    safeService,
    ethAdapter,
    safeAddress,
    safeSdk,
    senderAddress
  };
};

/**
 * 送信用のトランザクションデータをpropseするためのメソッド
 */
const proposeTx = async(
  safeSdk: any,
  safeService: any,
  safeAddress: any,
  senderAddress: any,
  safeTransaction: any
) => {
  const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
  const senderSignature = await safeSdk.signTransactionHash(safeTxHash);

  // call proposeTransaction method
  const result = await safeService.proposeTransaction({
    safeAddress,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress,
    senderSignature: senderSignature.data
  });

  console.log("proposeTransaction result:", result);

  // この時点で proxy Contractが作られる。

  return result;
};

/**
 * 送信用のトランザクションデータを作成するためのメソッド
 */
export const createSendTx = async(safeSdk: any, recipient: string, amount: string) => {
  
  // create tx data
  const safeTransactionData: MetaTransactionData = {
    to: recipient,
    data: '0x',
    value: ethers.utils.parseUnits(amount, 'ether').toString(),
    operation: OperationType.Call
  };

  const safeTransaction = await safeSdk.createTransaction({ safeTransactionData });
  // トランザクションを署名
  const signedSafeTx = await safeSdk.signTransaction(safeTransaction)

  return signedSafeTx;
}

/**
 * NFT発行用のトランザクションデータを作成するためのメソッド
 */
const createMintNftTx = async(
  safeSdk: any, 
  safeAddress:string
) => {

  // エンコードデータを作成
  const data = contract.encodeFunctionData("mint", [safeAddress])
  
  // create tx data
  const safeTransactionData: MetaTransactionData = {
    to: NFT_ADDRESS , // NFTコントラクトのアドレス
    data: data,
    value: ethers.utils.parseUnits('0', 'ether').toString(),
    operation: OperationType.Call
  };

  const safeTransaction = await safeSdk.createTransaction({ safeTransactionData });
  // トランザクションを署名
  const signedSafeTx = await safeSdk.signTransaction(safeTransaction)

  return signedSafeTx;
}

/**
 * ネイティブトークンを送金するメソッド
 */
export const sendEthTx = async(
  safeAddress: any,
  recipient: string, 
  amount: string
) => {
  const owner1Signer = new ethers.Wallet(process.env.NEXT_PUBLIC_OWNER_1_PRIVATE_KEY!, provider);

  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer || provider
  })

  const safeSdk = await Safe.create({
    ethAdapter,
    safeAddress: safeAddress
  })

  // create tx data
  const signedSafeTx = await createSendTx(safeSdk, recipient, amount);
  // GelatoRelayPack型のインスタンスを生成
  const relayKit = new GelatoRelayPack(process.env.NEXT_PUBLIC_GELATO_RELAY_API_KEY);

  // safe Contractを取得
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
    chainId: 5,
    options
  };
  
  // トランザクションを実行
  const response = await relayKit.relayTransaction(relayTransaction);

  return response;
};

/**
 * NFTをミントするメソッド
 */
export const mintNftTx = async(
  safeAddress: any,
) => {
  const owner1Signer = new ethers.Wallet(process.env.NEXT_PUBLIC_OWNER_1_PRIVATE_KEY!, provider);

  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer || provider
  })

  const safeSdk = await Safe.create({
    ethAdapter,
    safeAddress: safeAddress
  })

  // create tx data
  const signedSafeTx = await createMintNftTx(safeSdk, safeAddress);
  // GelatoRelayPack型のインスタンスを生成
  const relayKit = new GelatoRelayPack(process.env.NEXT_PUBLIC_GELATO_RELAY_API_KEY);

  // safe Contractを取得
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
    chainId: 5,
    options
  };
  
  // トランザクションを実行
  const response = await relayKit.relayTransaction(relayTransaction);

  return response;
};