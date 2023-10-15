import { ethers } from 'hardhat'

/**
 * デプロイメソッド
 */
async function main() {
  // Router address
  const router_address = '0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8'
  // LINK Token address
  const link_token_address = '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846'

  const SourceMinter = await ethers.getContractFactory('SourceMinter')
  // デプロイ
  const sourceMinter = await SourceMinter.deploy(
    router_address,
    link_token_address
  )

  await sourceMinter.waitForDeployment()

  console.log(`deployed to ${sourceMinter.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
