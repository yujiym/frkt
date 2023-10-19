import { ethers } from 'hardhat'

import {
  FUJI_LINK_ADDRESS,
  FUJI_ROUTER_ADDRESS,
  FUJI_SOURCE_FACTORY_ADDRESS,
} from './../../utils/addresses'

async function main() {
  // set contract address
  const sourceFactoryAddress = FUJI_SOURCE_FACTORY_ADDRESS
  const routerAddress = FUJI_ROUTER_ADDRESS
  const linkTokenAddress = FUJI_LINK_ADDRESS

  // receipe ID
  const receipeId = '0001'

  // get Contract info
  const sourceFactory = await ethers.getContractAt(
    'SourceMinterFactory',
    sourceFactoryAddress
  )

  console.log(
    ` ======================= sender side deploy start ========================= `
  )

  sourceFactory.on('SourceMinterCreated', (res) => {
    console.log(` SourceMinter deployed to ${res}`)
  })

  const resonse = await sourceFactory.createSourceMinter(
    receipeId,
    ethers.getAddress(routerAddress),
    ethers.getAddress(linkTokenAddress)
  )

  sourceFactory.removeAllListeners()

  console.log(
    ` ======================== sender side deploy end  ======================== `
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
