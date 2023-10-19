import { ethers } from 'hardhat'

import { IERC20, IERC20__factory } from '../../../../typechain-types'

async function main() {
  // const source contract address
  const sourceAddress = '0x7de91d76b13440A69C54375c337828C6c64dc268'

  // LINK Token address
  const link_token_address = '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846'

  // get siger
  const signers = await ethers.getSigners()
  const signer = signers[0]

  console.log(
    ` ======================= send link token start ========================= `
  )

  const link: IERC20 = IERC20__factory.connect(link_token_address, signer)
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
