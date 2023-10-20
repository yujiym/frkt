/// factory addresses
export const OPGOERLI_NFT_FACTORY_ADDRESS =
  '0x938ad601e455ac29bECA9264deb8056C55780990'
export const MUMBAI_NFT_FACTORY_ADDRESS =
  '0xFaF39d3f292Da9c064fB8414dC549dA7A9c6e266'
export const OPGOERLI_DES_FACTORY_ADDRESS =
  '0xE10E1a369e38BC25b14EA7FB9083e3911FD15eAf'
export const MUMBAI_DES_FACTORY_ADDRESS =
  '0xCd915EF6f984cd448349C375fDE90581f8FE260f'
export const FUJI_SOURCE_FACTORY_ADDRESS =
  '0xbF2e8A35484f23491F262fcc9151fab7400Abd9E'
// router addresses
export const FUJI_ROUTER_ADDRESS = '0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8'
export const OPGOERLI_ROUTER_ADDRESS =
  '0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26'
export const MUMBAI_ROUTER_ADDRESS =
  '0x70499c328e1E2a3c41108bd3730F6670a44595D1'
// Fuji Router address
export const FUJI_SOURCE_ADDRESS = '0x9bE9aC69125c5dEcd0BD14AC15A1872431aF7e15'
// link token addresses
export const FUJI_LINK_ADDRESS = '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846'

import { PayFeesIn } from './constants'

export const getPayFeesIn = (payFeesIn: string) => {
  let fees

  switch (payFeesIn) {
    case 'Native':
      fees = PayFeesIn.Native
      break
    case 'native':
      fees = PayFeesIn.Native
      break
    case 'LINK':
      fees = PayFeesIn.LINK
      break
    case 'link':
      fees = PayFeesIn.LINK
      break
    default:
      fees = PayFeesIn.Native
      break
  }

  return fees
}
