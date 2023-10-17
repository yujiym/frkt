type Meta = {
  name: string
  appName: string
  description: string
  stacks: string[]
}

export const metaNFT: Meta = {
  name: 'Mint Omnichain NFT',
  appName: 'Awesome gaming app',
  description: 'FRKT widget demo for minting omnichain NFT.',
  stacks: ['Lit Protocol MPC', 'Biconomy AA', 'Chainlink CCIP', '🔗 Polygon'],
}

export const signContract: Meta = {
  name: 'Sign Contract Onchain',
  appName: 'A Business app',
  description: 'FRKT widget demo for signing contract document.',
  stacks: [
    'Lit Protocol MPC',
    'The Graph',
    'Gelato',
    'Safe AA Core Kit / Relay Kit',
    'IPFS',
    '🔗 Base',
  ],
}
