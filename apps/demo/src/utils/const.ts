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
