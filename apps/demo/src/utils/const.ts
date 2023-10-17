type Meta = {
  name: string
  appName: string
  description: string
  stacks: string[]
}

export const metaNFT: Meta = {
  name: 'Mint omnichain NFT',
  appName: 'Awesome gaming app',
  description: 'FRKT widget demo for minting omnichain NFT.',
  stacks: ['Lit Protocol MPC', 'Biconomy AA', 'Chainlink CCIP', 'Polygon'],
}

export const signContract: Meta = {
  name: 'Sign Contract',
  appName: 'Onchain Sign Contract',
  description: 'FRKT widget demo for Signing Contract.',
  stacks: [
    'Lit Protocol MPC',
    'The Graph',
    'Gelato',
    'Safe AA Core Kit',
    'Sage Relay Kit',
    'IPFS',
    'Base',
  ],
}

export const BASE_GOERLI_RPC_URL = 'https://base-goerli.rpc.thirdweb.com'
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
