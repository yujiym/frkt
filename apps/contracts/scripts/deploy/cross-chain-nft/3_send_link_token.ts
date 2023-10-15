import { ethers } from 'hardhat'

import { IERC20, IERC20__factory } from '../../../typechain-types'
import { FUJI_LINK_ADDRESS, FUJI_SOURCE_ADDRESS } from '../../utils/addresses'

async function main() {
  // const source contract address
  const sourceAddress = FUJI_SOURCE_ADDRESS

  // get siger
  const signers = await ethers.getSigners()
  const signer = signers[0]

  console.log(
    ` ======================= send link token start ========================= `
  )

  const link: IERC20 = IERC20__factory.connect(FUJI_LINK_ADDRESS, signer)
  console.log(
    `ℹ️  Attempting to send 5 of ${link.target} tokens from ${signer.address} to ${sourceAddress}`
  )

  const tx = await link.transfer(sourceAddress, '500000000000000000') // 0.5 Link Token
  await tx.wait()

  console.log(
    ` ======================== send link token end  ======================== `
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
