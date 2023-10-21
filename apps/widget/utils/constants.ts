export const BASE_RPC_URL = 'https://rpc.ankr.com/base_goerli'
export const FUJI_RPC_URL = 'https://api.avax-test.network/ext/bc/C/rpc'
// Mumbai destinationChainSelector
export const OPGOERLI_CHAIN_SELECTOR = '2664363617261496610'
// Mumbai destinationChainSelector
export const MUMBAI_CHAIN_SELECTOR = '12532609583862916517'
// Mumbai Receiver Address
export const MUMBAI_RECEIVER_ADDRESS =
  '0x1d0841b8eDf79cAa822Cf7a834d47f096cA5E27a'
// fuji sourceMinter Contract Address
export const SOURCE_MINTER_ADDRESS =
  '0x7de91d76b13440A69C54375c337828C6c64dc268'

export enum PayFeesIn {
  Native,
  LINK,
}

export const SIGN_CONTRACT_ADDRESS =
  '0x50f2f66Eb93E7B5864c192F197af76D4611Ae7b8'

export const GRAPHQL_API_ENDPOINT =
  'https://api.studio.thegraph.com/proxy/44992/frkt-signcontract/v0.0.01'

// type for result of subgraph query
export type SignContractInfos = {
  changeApproveStatuses: ChangeApproveStatuse[]
  signContractCreateds: SignContractCreated[]
  signatureAddeds: SignatureAdded[]
}

type ChangeApproveStatuse = {
  appId: string
  receipeId: string
  signId: number
  approveStatus: boolean
}

type SignContractCreated = {
  appId: string
  name: string
  receipeId: string
  required: number
  safeAddress: string
  signId: number
  uri: string
  owners: string[]
}

type SignatureAdded = {
  appId: string
  receipeId: string
  signId: number
  signature: string
}
